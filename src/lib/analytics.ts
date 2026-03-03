// =============================================================================
// src/lib/analytics.ts
//
// Dual analytics: Vercel Analytics (uendret) + Appwrite geo-tracking (oppgradert)
//
// FIKSER vs. forrige versjon:
//   1. flush() sendte dobbelt-stringifisert body — nå riktig format
//   2. logGeoEvent blokkerte i dev — nå logger til console i dev
//   3. Bedre feilhåndtering i flush() for debugging
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics/react";

const isProd = import.meta.env.PROD;
const isDev = import.meta.env.DEV;

// ---------------------------------------------------------------------------
// Appwrite Function endpoint
// ---------------------------------------------------------------------------

function getGeoFunctionUrl(): string | null {
  const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT as string | undefined;
  const functionId = import.meta.env.VITE_APPWRITE_GEO_FUNCTION_ID as string | undefined;
  if (!endpoint || !functionId) return null;
  return `${endpoint}/functions/${functionId}/executions`;
}

const GEO_URL = getGeoFunctionUrl();
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID as string | undefined;

// ---------------------------------------------------------------------------
// UTM context (minne, ingen cookies) - beholdt med utm_term
// ---------------------------------------------------------------------------

function parseUTM(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of [
    "utm_source", "utm_campaign", "utm_medium",
    "utm_content", "utm_term",
  ]) {
    const val = p.get(key);
    if (val) utm[key] = val.slice(0, 200);
  }
  return utm;
}

const utmContext = parseUTM();

// ---------------------------------------------------------------------------
// Referrer parsing
// ---------------------------------------------------------------------------

const REFERRER_MAP: Record<string, string> = {
  "google.com": "google",
  "google.no": "google",
  "bing.com": "bing",
  "duckduckgo.com": "duckduckgo",
  "facebook.com": "facebook",
  "l.facebook.com": "facebook",
  "lm.facebook.com": "facebook",
  "m.facebook.com": "facebook",
  "instagram.com": "instagram",
  "l.instagram.com": "instagram",
  "t.co": "twitter",
  "twitter.com": "twitter",
  "x.com": "twitter",
  "linkedin.com": "linkedin",
  "tiktok.com": "tiktok",
  "snapchat.com": "snapchat",
  "youtube.com": "youtube",
  "vg.no": "vg",
  "nrk.no": "nrk",
  "dagbladet.no": "dagbladet",
  "aftenposten.no": "aftenposten",
  "glamdalen.no": "glamdalen",
  "glomdalen.no": "glamdalen",
  "kongsvinger.kommune.no": "kongsvinger-kommune",
  "ticketmaster.no": "ticketmaster",
  "billettservice.no": "billettservice",
  "tikkio.com": "tikkio",
};

function parseReferrer(): { raw: string; source: string } {
  if (typeof document === "undefined") return { raw: "", source: "" };
  const ref = document.referrer;
  if (!ref) return { raw: "", source: "direct" };

  try {
    const hostname = new URL(ref).hostname.replace(/^www\./, "");
    const own = window.location.hostname.replace(/^www\./, "");
    if (hostname === own) return { raw: "", source: "" };
    const source = REFERRER_MAP[hostname] ?? hostname;
    return { raw: ref, source };
  } catch {
    return { raw: ref, source: "unknown" };
  }
}

const referrerData = parseReferrer();

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type AnalyticsEventName =
  | "page_view"
  | "nav_menu_toggle"
  | "ticket_click"
  | "scroll_depth"
  | "section_view"
  | "sponsor_click";

type AnalyticsEventPayloads = {
  page_view: { page: string };
  nav_menu_toggle: { open: boolean; device: "mobile" | "desktop" };
  ticket_click: {
    source:
      | "header_desktop"
      | "header_mobile"
      | "header_desktop_nav"
      | "header_mobile_nav"
      | "hero_main"
      | "hero_more_info"
      | "other";
    page?: string;
  };
  scroll_depth: { page: string; depth: 25 | 50 | 75 | 100 };
  section_view: { page: string; section: string };
  sponsor_click: {
    sponsorId: string;
    sponsorName: string;
    tier: string;
    page: "sponsors";
  };
};

type GeoEvent = {
  type: string;
  timestamp: string;
  page?: string;
  source?: string;
  section?: string;
  sponsor_id?: string;
  sponsor_name?: string;
  scroll_pct?: number;
  referrer?: string;
  referrer_source?: string;
  [key: string]: string | number | boolean | null | undefined;
};

// ---------------------------------------------------------------------------
// Do Not Track + Global Privacy Control
// ---------------------------------------------------------------------------

function isDoNotTrack(): boolean {
  if (typeof navigator === "undefined") return true;
  return (
    navigator.doNotTrack === "1" ||
    (navigator as unknown as { globalPrivacyControl?: string })
      .globalPrivacyControl === "1"
  );
}

// ---------------------------------------------------------------------------
// Vercel Analytics (UENDRET)
// ---------------------------------------------------------------------------

export function trackEvent<N extends AnalyticsEventName>(
  name: N,
  payload: AnalyticsEventPayloads[N]
) {
  if (!isProd) return;
  track(name, payload);
}

// ---------------------------------------------------------------------------
// Geo-event batching
// ---------------------------------------------------------------------------

const FLUSH_INTERVAL_MS = 5_000;
const MAX_BUFFER_SIZE = 20;

let geoBuffer: GeoEvent[] = [];
let flushTimer: ReturnType<typeof setInterval> | null = null;
let geoInitialized = false;

function enqueueGeoEvent(event: GeoEvent): void {
  geoBuffer.push(event);
  if (isDev) {
    console.log("[analytics] Enqueued geo event:", event.type, "| Buffer size:", geoBuffer.length);
  }
  if (geoBuffer.length >= MAX_BUFFER_SIZE) flushGeoBuffer();
}

// =============================================================================
// FIX 1: flushGeoBuffer — korrekt body-format for Appwrite REST API
//
// Appwrite POST /functions/{id}/executions forventer:
//   { "body": "<string>", "async": true }
//
// Forrige versjon sendte:
//   body: JSON.stringify({ body: JSON.stringify({events}), async: true })
//         ↑ DOBBEL stringifisering — Appwrite la til enda et lag
//
// Nå: payload er ren string, wrappet korrekt ÉN gang.
// =============================================================================

function flushGeoBuffer(useBeacon = false): void {
  if (geoBuffer.length === 0) return;
  if (!GEO_URL || !PROJECT_ID) {
    geoBuffer = [];
    return;
  }

  const events = [...geoBuffer];
  geoBuffer = [];

  // Den faktiske dataen som funksjonen skal motta
  const eventsPayload = JSON.stringify({ events });

  if (isDev) {
    console.log(`[analytics] Flushing ${events.length} geo events`, { useBeacon });
  }

  // sendBeacon overlever tab-close/navigering bort
  // if (useBeacon && typeof navigator.sendBeacon === "function") {
  //   // sendBeacon kan ikke sette custom headers.
  //   // Appwrite godtar ?project= som query param for autentisering.
  //   // NB: dette kan feile med 401 — det er en kjent begrensning.
  //   // Hovedflyten (fetch) håndterer de fleste events.
  //   const blob = new Blob([
  //     JSON.stringify({ body: eventsPayload, async: true })
  //   ], { type: "application/json" });
  //   navigator.sendBeacon(`${GEO_URL}?project=${PROJECT_ID}`, blob);
  //   return;
  // }

  // Vanlig fetch — korrekt Appwrite execution format
  fetch(GEO_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Appwrite-Project": PROJECT_ID,
    },
    body: JSON.stringify({
      body: eventsPayload,  // string — Appwrite putter dette i req.body
      async: true,
    }),
    keepalive: true,
  })
    .then((response) => {
      if (isDev) {
        console.log("[analytics] Flush response:", response.status, response.statusText);
        // Les response body for debugging
        response.json().then((data) => {
          console.log("[analytics] Flush response body:", data);
        }).catch(() => {});
      }
    })
    .catch((err) => {
      if (isDev) {
        console.error("[analytics] Flush failed:", err);
      }
      // Stille feiling i prod — analytics må aldri krasje siden
    });
}

// ---------------------------------------------------------------------------
// Geo init + lifecycle
// ---------------------------------------------------------------------------

export function initGeoAnalytics(): void {
  if (geoInitialized) return;
  if (isDoNotTrack()) return;
  if (!GEO_URL || !PROJECT_ID) {
    if (isDev) {
      console.warn("[analytics] Geo-tracking deaktivert: mangler env-variabler.");
      console.warn("[analytics] GEO_URL:", GEO_URL, "PROJECT_ID:", PROJECT_ID);
    }
    return;
  }

  geoInitialized = true;

  if (isDev) {
    console.log("[analytics] Geo-analytics initialisert.");
    console.log("[analytics] Endpoint:", GEO_URL);
  }

  flushTimer = setInterval(() => flushGeoBuffer(), FLUSH_INTERVAL_MS);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushGeoBuffer(true);
  });

  window.addEventListener("pagehide", () => flushGeoBuffer(true));
}

export function destroyGeoAnalytics(): void {
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
  flushGeoBuffer(true);
  geoInitialized = false;
}

// ---------------------------------------------------------------------------
// Core geo logger
// =============================================================================
// FIX 2: Fjernet `if (!isProd) return;` guard
//
// Forrige versjon blokkerte ALLE geo-events i dev-modus.
// Nå: events sendes alltid når geoInitialized === true.
// isProd-guarden er kun på Vercel Analytics (trackEvent), ikke geo.
// For å teste i dev: sett VITE_APPWRITE_* env-variabler i .env.local
// =============================================================================

function logGeoEvent(
  type: string,
  meta: Omit<GeoEvent, "type" | "timestamp"> = {}
): void {
  // Sjekk at geo-systemet er initialisert (inkluderer DNT-sjekk)
  if (!geoInitialized) return;
  if (isDoNotTrack()) return;
  if (!GEO_URL || !PROJECT_ID) return;

  const event: GeoEvent = {
    type,
    timestamp: new Date().toISOString(),
    ...(type === "page_view" && referrerData.source
      ? { referrer: referrerData.raw, referrer_source: referrerData.source }
      : {}),
    ...utmContext,
    ...meta,
  };

  enqueueGeoEvent(event);
}

/**
 * BAKOVERKOMPATIBILITET
 */
export async function trackGeoEvent(
  payload: Record<string, string | number | boolean | null | undefined> & { type: string }
): Promise<void> {
  const { type, ...rest } = payload;
  logGeoEvent(type, rest);
}

// ---------------------------------------------------------------------------
// Kombinerte hjelpefunksjoner
// ---------------------------------------------------------------------------

export function trackTicketClick(
  source: AnalyticsEventPayloads["ticket_click"]["source"],
  page?: string
): void {
  trackEvent("ticket_click", { source, page });
  logGeoEvent("ticket_click", { source, page });
}

export function trackSponsorClick(
  sponsorId: string,
  sponsorName: string,
  tier: string
): void {
  trackEvent("sponsor_click", { sponsorId, sponsorName, tier, page: "sponsors" });
  logGeoEvent("sponsor_click", {
    sponsor_id: sponsorId,
    sponsor_name: sponsorName,
    page: "sponsors",
  });
}

export function trackPageViewGeo(page: string): void {
  trackEvent("page_view", { page });
  logGeoEvent("page_view", { page });
}

export function trackSectionViewGeo(page: string, section: string): void {
  trackEvent("section_view", { page, section });
  logGeoEvent("section_view", { page, section });
}

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function usePageView(page: string) {
  useEffect(() => {
    trackPageViewGeo(page);
  }, [page]);
}

export function useScrollDepthTracking(page: string) {
  const firedRef = useRef<Record<number, boolean>>({
    25: false, 50: false, 75: false, 100: false,
  });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = (scrollTop / docHeight) * 100;
      ([25, 50, 75, 100] as const).forEach((threshold) => {
        if (!firedRef.current[threshold] && percent >= threshold) {
          firedRef.current[threshold] = true;
          trackEvent("scroll_depth", { page, depth: threshold });
          logGeoEvent("scroll_depth", { page, scroll_pct: threshold });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, page]);
}

export function useSectionTracker(sectionName: string, page?: string) {
  const ref = useRef<HTMLElement | null>(null);
  const hasFired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasFired.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired.current) {
          hasFired.current = true;
          const p = page ?? window.location.pathname;
          trackSectionViewGeo(p, sectionName);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionName, page]);

  return ref;
}
// // src/lib/analytics.ts
// import { useEffect, useRef, useState } from "react";
// import { track } from "@vercel/analytics/react";

// const isProd = import.meta.env.PROD;

// // ─── Appwrite Function endpoint ───────────────────────────────────────────────
// function getGeoFunctionUrl(): string | null {
//   const endpoint  = import.meta.env.VITE_APPWRITE_ENDPOINT as string | undefined;
//   const functionId = import.meta.env.VITE_APPWRITE_GEO_FUNCTION_ID as string | undefined;
//   if (!endpoint || !functionId) return null;
//   return `${endpoint}/v1/functions/${functionId}/executions`;
// }

// const GEO_URL        = getGeoFunctionUrl();
// const PROJECT_ID     = import.meta.env.VITE_APPWRITE_PROJECT_ID as string | undefined;

// // ─── UTM context (minne, ingen cookies) ──────────────────────────────────────
// function parseUTM(): Record<string, string> {
//   if (typeof window === "undefined") return {};
//   const p   = new URLSearchParams(window.location.search);
//   const utm: Record<string, string> = {};
//   for (const key of [
//     "utm_source", "utm_campaign", "utm_medium",
//     "utm_content", "utm_term",
//   ]) {
//     const val = p.get(key);
//     if (val) utm[key] = val;
//   }
//   return utm;
// }

// const utmContext = parseUTM();

// // ─── Types ────────────────────────────────────────────────────────────────────
// type AnalyticsEventName =
//   | "page_view"
//   | "nav_menu_toggle"
//   | "ticket_click"
//   | "scroll_depth"
//   | "section_view"
//   | "sponsor_click";

// type AnalyticsEventPayloads = {
//   page_view:        { page: string };
//   nav_menu_toggle:  { open: boolean; device: "mobile" | "desktop" };
//   ticket_click: {
//     source:
//       | "header_desktop"
//       | "header_mobile"
//       | "header_desktop_nav"
//       | "header_mobile_nav"
//       | "hero_main"
//       | "hero_more_info"
//       | "other";
//     page?: string;
//   };
//   scroll_depth:  { page: string; depth: 25 | 50 | 75 | 100 };
//   section_view:  { page: string; section: string };
//   sponsor_click: {
//     sponsorId:   string;
//     sponsorName: string;
//     tier:        string;
//     page:        "sponsors";
//   };
// };

// type GeoPayload = {
//   type: "ticket_click" | "sponsor_click" | "page_view" | "section_view";
//   page?:         string;
//   source?:       string;
//   section?:      string;
//   sponsor_id?:   string;
//   sponsor_name?: string;
// } & Record<string, string | number | boolean | null | undefined>;

// // ─── Vercel Analytics (uendret) ───────────────────────────────────────────────
// export function trackEvent<N extends AnalyticsEventName>(
//   name: N,
//   payload: AnalyticsEventPayloads[N]
// ) {
//   if (!isProd) return;
//   track(name, payload);
// }

// // ─── Geo-event til Appwrite Function ─────────────────────────────────────────
// export async function trackGeoEvent(payload: GeoPayload): Promise<void> {
//   if (!isProd)    return;
//   if (!GEO_URL)   return;
//   if (!PROJECT_ID) return;
//   if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") return;

//   try {
//     await fetch(GEO_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type":       "application/json",
//         "X-Appwrite-Project": PROJECT_ID,
//       },
//       body:      JSON.stringify({ ...payload, ...utmContext }),
//       keepalive: true,
//     });
//   } catch {
//     // Aldri krasj siden – analytics bryter aldri UX
//   }
// }

// // ─── Kombinerte hjelpefunksjoner ──────────────────────────────────────────────
// export function trackTicketClick(
//   source: AnalyticsEventPayloads["ticket_click"]["source"],
//   page?: string
// ): void {
//   trackEvent("ticket_click", { source, page });
//   void trackGeoEvent({ type: "ticket_click", source, page });
// }

// export function trackSponsorClick(
//   sponsorId:   string,
//   sponsorName: string,
//   tier:        string
// ): void {
//   trackEvent("sponsor_click", { sponsorId, sponsorName, tier, page: "sponsors" });
//   void trackGeoEvent({
//     type:         "sponsor_click",
//     sponsor_id:   sponsorId,
//     sponsor_name: sponsorName,
//     page:         "sponsors",
//   });
// }

// export function trackPageViewGeo(page: string): void {
//   trackEvent("page_view", { page });
//   void trackGeoEvent({ type: "page_view", page });
// }

// export function trackSectionViewGeo(page: string, section: string): void {
//   trackEvent("section_view", { page, section });
//   void trackGeoEvent({ type: "section_view", page, section });
// }

// // ─── Hooks ────────────────────────────────────────────────────────────────────
// export function usePageView(page: string) {
//   useEffect(() => {
//     trackPageViewGeo(page);
//   }, [page]);
// }

// export function useScrollDepthTracking(page: string) {
//   const firedRef = useRef<Record<number, boolean>>({
//     25: false, 50: false, 75: false, 100: false,
//   });
//   const [enabled, setEnabled] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     setEnabled(true);
//   }, []);

//   useEffect(() => {
//     if (!enabled) return;
//     const onScroll = () => {
//       const scrollTop  = window.scrollY;
//       const docHeight  = document.body.scrollHeight - window.innerHeight;
//       if (docHeight <= 0) return;
//       const percent = (scrollTop / docHeight) * 100;
//       ([25, 50, 75, 100] as const).forEach((threshold) => {
//         if (!firedRef.current[threshold] && percent >= threshold) {
//           firedRef.current[threshold] = true;
//           trackEvent("scroll_depth", { page, depth: threshold });
//         }
//       });
//     };
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [enabled, page]);
// }

// // src/lib/analytics.ts
// import { useEffect, useRef, useState } from "react";
// import { track } from "@vercel/analytics/react";

// const isProd = import.meta.env.PROD;

// type AnalyticsEventName =
//   | "page_view"
//   | "nav_menu_toggle"
//   | "ticket_click"
//   | "scroll_depth"
//   | "section_view"
//   | "sponsor_click";

// type AnalyticsEventPayloads = {
//   page_view: {
//     page: string;
//   };
//   nav_menu_toggle: {
//     open: boolean;
//     device: "mobile" | "desktop";
//   };
//   ticket_click: {
//     source:
//       | "header_desktop"
//       | "header_mobile"
//       | "header_desktop_nav"
//       | "header_mobile_nav"
//       | "hero_main"
//       | "hero_more_info"
//       | "other";
//     page?: string;
//   };
//   scroll_depth: {
//     page: string;
//     depth: 25 | 50 | 75 | 100;
//   };
//   section_view: {
//     page: string;
//     section: string;
//   };
//   sponsor_click: {
//     sponsorId: string;
//     sponsorName: string;
//     tier: string;
//     page: "sponsors";
//   };
// };

// export function trackEvent<N extends AnalyticsEventName>(
//   name: N,
//   payload: AnalyticsEventPayloads[N]
// ) {
//   if (!isProd) return;
//   track(name, payload);
// }

// // Valgfri hook – fin hvis du vil bruke manuelt i enkelte sider
// export function usePageView(page: string) {
//   useEffect(() => {
//     trackEvent("page_view", { page });
//   }, [page]);
// }

// export function useScrollDepthTracking(page: string) {
//   const firedRef = useRef<Record<number, boolean>>({
//     25: false,
//     50: false,
//     75: false,
//     100: false,
//   });
//   const [enabled, setEnabled] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     setEnabled(true);
//   }, []);

//   useEffect(() => {
//     if (!enabled) return;

//     const onScroll = () => {
//       const scrollTop = window.scrollY;
//       const docHeight = document.body.scrollHeight - window.innerHeight;
//       if (docHeight <= 0) return;

//       const percent = (scrollTop / docHeight) * 100;

//       [25, 50, 75, 100].forEach((threshold) => {
//         if (!firedRef.current[threshold] && percent >= threshold) {
//           firedRef.current[threshold] = true;
//           trackEvent("scroll_depth", {
//             page,
//             depth: threshold as 25 | 50 | 75 | 100,
//           });
//         }
//       });
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, [enabled, page]);
// }
