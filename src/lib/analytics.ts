// src/lib/analytics.ts
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics/react";

const isProd = import.meta.env.PROD;

// ─── Appwrite Function endpoint ───────────────────────────────────────────────
function getGeoFunctionUrl(): string | null {
  const endpoint  = import.meta.env.VITE_APPWRITE_ENDPOINT as string | undefined;
  const functionId = import.meta.env.VITE_APPWRITE_GEO_FUNCTION_ID as string | undefined;
  if (!endpoint || !functionId) return null;
  return `${endpoint}/v1/functions/${functionId}/executions`;
}

const GEO_URL        = getGeoFunctionUrl();
const PROJECT_ID     = import.meta.env.VITE_APPWRITE_PROJECT_ID as string | undefined;

// ─── UTM context (minne, ingen cookies) ──────────────────────────────────────
function parseUTM(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const p   = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of [
    "utm_source", "utm_campaign", "utm_medium",
    "utm_content", "utm_term",
  ]) {
    const val = p.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

const utmContext = parseUTM();

// ─── Types ────────────────────────────────────────────────────────────────────
type AnalyticsEventName =
  | "page_view"
  | "nav_menu_toggle"
  | "ticket_click"
  | "scroll_depth"
  | "section_view"
  | "sponsor_click";

type AnalyticsEventPayloads = {
  page_view:        { page: string };
  nav_menu_toggle:  { open: boolean; device: "mobile" | "desktop" };
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
  scroll_depth:  { page: string; depth: 25 | 50 | 75 | 100 };
  section_view:  { page: string; section: string };
  sponsor_click: {
    sponsorId:   string;
    sponsorName: string;
    tier:        string;
    page:        "sponsors";
  };
};

type GeoPayload = {
  type: "ticket_click" | "sponsor_click" | "page_view" | "section_view";
  page?:         string;
  source?:       string;
  section?:      string;
  sponsor_id?:   string;
  sponsor_name?: string;
} & Record<string, string | number | boolean | null | undefined>;

// ─── Vercel Analytics (uendret) ───────────────────────────────────────────────
export function trackEvent<N extends AnalyticsEventName>(
  name: N,
  payload: AnalyticsEventPayloads[N]
) {
  if (!isProd) return;
  track(name, payload);
}

// ─── Geo-event til Appwrite Function ─────────────────────────────────────────
export async function trackGeoEvent(payload: GeoPayload): Promise<void> {
  if (!isProd)    return;
  if (!GEO_URL)   return;
  if (!PROJECT_ID) return;
  if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") return;

  try {
    await fetch(GEO_URL, {
      method: "POST",
      headers: {
        "Content-Type":       "application/json",
        "X-Appwrite-Project": PROJECT_ID,
      },
      body:      JSON.stringify({ ...payload, ...utmContext }),
      keepalive: true,
    });
  } catch {
    // Aldri krasj siden – analytics bryter aldri UX
  }
}

// ─── Kombinerte hjelpefunksjoner ──────────────────────────────────────────────
export function trackTicketClick(
  source: AnalyticsEventPayloads["ticket_click"]["source"],
  page?: string
): void {
  trackEvent("ticket_click", { source, page });
  void trackGeoEvent({ type: "ticket_click", source, page });
}

export function trackSponsorClick(
  sponsorId:   string,
  sponsorName: string,
  tier:        string
): void {
  trackEvent("sponsor_click", { sponsorId, sponsorName, tier, page: "sponsors" });
  void trackGeoEvent({
    type:         "sponsor_click",
    sponsor_id:   sponsorId,
    sponsor_name: sponsorName,
    page:         "sponsors",
  });
}

export function trackPageViewGeo(page: string): void {
  trackEvent("page_view", { page });
  void trackGeoEvent({ type: "page_view", page });
}

export function trackSectionViewGeo(page: string, section: string): void {
  trackEvent("section_view", { page, section });
  void trackGeoEvent({ type: "section_view", page, section });
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
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
      const scrollTop  = window.scrollY;
      const docHeight  = document.body.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = (scrollTop / docHeight) * 100;
      ([25, 50, 75, 100] as const).forEach((threshold) => {
        if (!firedRef.current[threshold] && percent >= threshold) {
          firedRef.current[threshold] = true;
          trackEvent("scroll_depth", { page, depth: threshold });
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, page]);
}

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
