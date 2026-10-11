// src/components/sections/PrinsenHero.tsx
// «Oberst Krebs og den franske prinsen» øverst på forsiden etter audition:
// samme StageHero som audition, uten ordbilde, med forestillingsdatoer og billettknapp.

import { Ticket } from "lucide-react";
import { useLocation } from "react-router-dom";
import { StageHero, type StageHeroImages } from "@/components/sections/StageHero";
import { Button } from "@/components/ui/Button";
import { trackTicketClick } from "@/lib/analytics";

interface PrinsenHeroProps {
  srTitle: string;
  dateLabel: string;
  dateTime: string;
  ticketLabel: string;
  ticketUrl: string;
  images: StageHeroImages;
}

export function PrinsenHero({
  srTitle,
  dateLabel,
  dateTime,
  ticketLabel,
  ticketUrl,
  images,
}: PrinsenHeroProps) {
  const { pathname } = useLocation();

  return (
    <StageHero
      headingId="prinsen-hero-title"
      srTitle={srTitle}
      dateLabel={dateLabel}
      dateTime={dateTime}
      images={images}
    >
      <Button
        size="xl"
        variant="torch"
        withShine
        asChild
        className="w-full sm:w-auto sm:min-w-[280px] active:scale-[0.97]"
      >
        <a
          href={ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTicketClick("hero_main", pathname)}
        >
          <Ticket className="mr-3 h-5 w-5" aria-hidden="true" />
          {ticketLabel}
          <span className="sr-only">(åpnes i ny fane)</span>
        </a>
      </Button>
    </StageHero>
  );
}
