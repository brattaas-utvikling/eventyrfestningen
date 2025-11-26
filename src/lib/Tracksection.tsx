
import { useEffect, useRef, type ReactNode } from "react";
import { trackEvent } from "./analytics";

export function TrackSection({
  page,
  section,
  children,
}: {
  page: string;
  section: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent("section_view", { page, section });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [page, section]);

  return <div ref={ref}>{children}</div>;
}
