// src/components/PageViewTracker.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageViewGeo } from "@/lib/analytics";

export function PageViewTracker() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    trackPageViewGeo(`${pathname}${search}`);
  }, [pathname, search]);
  return null;
}

// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import { trackEvent } from "@/lib/analytics";

// export function PageViewTracker() {
//   const { pathname, search } = useLocation();

//   useEffect(() => {
//     const page = `${pathname}${search}`;
//     trackEvent("page_view", { page });
//   }, [pathname, search]);

//   return null;
// }
