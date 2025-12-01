// src/lib/analytics.ts
import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics/react";

const isProd = import.meta.env.PROD;

type AnalyticsEventName =
  | "page_view"
  | "nav_menu_toggle"
  | "ticket_click"
  | "scroll_depth"
  | "section_view"
  | "sponsor_click";

type AnalyticsEventPayloads = {
  page_view: {
    page: string;
  };
  nav_menu_toggle: {
    open: boolean;
    device: "mobile" | "desktop";
  };
  ticket_click: {
    source:
      | "header_desktop"
      | "header_mobile"
      | "hero_main"
      | "hero_more_info"
      | "other";
    page?: string;
  };
  scroll_depth: {
    page: string;
    depth: 25 | 50 | 75 | 100;
  };
  section_view: {
    page: string;
    section: string;
  };
  sponsor_click: {
    sponsorId: string;
    sponsorName: string;
    tier: string;
    page: "sponsors";
  };
};

export function trackEvent<N extends AnalyticsEventName>(
  name: N,
  payload: AnalyticsEventPayloads[N]
) {
  if (!isProd) return;
  track(name, payload);
}

// Valgfri hook – fin hvis du vil bruke manuelt i enkelte sider
export function usePageView(page: string) {
  useEffect(() => {
    trackEvent("page_view", { page });
  }, [page]);
}

export function useScrollDepthTracking(page: string) {
  const firedRef = useRef<Record<number, boolean>>({
    25: false,
    50: false,
    75: false,
    100: false,
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

      [25, 50, 75, 100].forEach((threshold) => {
        if (!firedRef.current[threshold] && percent >= threshold) {
          firedRef.current[threshold] = true;
          trackEvent("scroll_depth", {
            page,
            depth: threshold as 25 | 50 | 75 | 100,
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, page]);
}
