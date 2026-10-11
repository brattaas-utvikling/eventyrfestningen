// src/components/sections/AuditionSignupLinks.tsx
// Tre likeverdige påmeldingslenker (én per gruppe) til eksterne Google Skjema.
// Tekstlenke med pil, samme uttrykk som «Les hele historien» i HistoryScene.
// Brukes av både AuditionHero og AuditionSection.

import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export interface AuditionSignup {
  id: string;
  label: string;
  url: string;
}

interface AuditionSignupLinksProps {
  heading: string;
  note?: string;
  deadlineLabel?: string;
  deadlineDateTime?: string;
  signups: readonly AuditionSignup[];
  placement: "hero" | "section";
  className?: string;
}

export function AuditionSignupLinks({
  heading,
  note,
  deadlineLabel,
  deadlineDateTime,
  signups,
  placement,
  className,
}: AuditionSignupLinksProps) {
  const { pathname } = useLocation();

  return (
    <div className={cn("flex w-full max-w-[22rem] flex-col items-center", className)}>
      <p
        id={`audition-signup-${placement}`}
        className="font-heading text-base text-cynical-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] short:sr-only tall:text-lg desk:text-xl"
      >
        {heading}
      </p>
      {note && <p className="sr-only">{note}</p>}
      <ul className="mt-1 flex w-full flex-col items-center tall:mt-2 desk:mt-2" aria-labelledby={`audition-signup-${placement}`}>
        {signups.map((signup) => (
          <li key={signup.id}>
            <Button
              asChild
              variant="link"
              className="group h-11 px-1 text-base font-medium! tracking-normal! text-gold-300 hover:text-gold-200 hover:no-underline
                focus-visible:ring-gold-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
            >
              <a
                href={signup.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("audition_click", { placement, group: signup.id, page: pathname })
                }
              >
                <span className="border-b-2 border-gold-500/30 group-hover:border-gold-400/60 motion-safe:transition-colors motion-safe:duration-200">
                  {signup.label}
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-1"
                  aria-hidden="true"
                />
                <span className="sr-only">(åpnes i ny fane)</span>
              </a>
            </Button>
          </li>
        ))}
      </ul>
      {deadlineLabel && (
        <p className="mt-1.5 text-sm font-medium text-cynical-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] tall:mt-2 desk:mt-2">
          <time dateTime={deadlineDateTime}>{deadlineLabel}</time>
        </p>
      )}
    </div>
  );
}
