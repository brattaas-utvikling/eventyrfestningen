// src/components/sections/NextSeasonTeaser.tsx
//
// To-kolonne teaser for neste sesongs forestilling.
// Bilde til venstre, tekst + CTA til høyre (speilvendt på mobil: bilde øverst).

import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { trackTicketClick } from "@/lib/analytics";
import { useLocation } from "react-router-dom";

// ─── Motion ─────────────────────────────────────────────────────────────────

const spring = { type: "spring", stiffness: 220, damping: 26, mass: 0.9 } as const;

const v = {
  image: {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { ...spring, stiffness: 200 } },
  } satisfies Variants,
  content: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.08 } },
  } satisfies Variants,
};

// ─── Component ────────────────────────────────────────────────────────────

export default function NextSeasonTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  const mv = (variants: Variants, amount = 0.2) =>
    reduced
      ? {}
      : { variants, initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount } };

  return (
    <section
      ref={sectionRef}
      className="relative bg-cynical-900 overflow-hidden"
      aria-labelledby="next-season-heading"
    >
      {/* Ambient torch-glow i bakgrunnen — subtilt, ingen radial spotlight-klisje */}
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,161,35,0.05)_0%,transparent_35%)]"
        aria-hidden="true"
      />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Bilde ──────────────────────────────────────────────────── */}
          <motion.div {...mv(v.image)} className="relative order-1">
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-md rounded-xl overflow-hidden border-4 border-torch-500/40 shadow-[0_0_60px_rgba(255,161,35,0.2)] hover:border-torch-500/60 hover:shadow-[0_0_80px_rgba(255,161,35,0.3)] motion-safe:transition-all motion-safe:duration-500 transform-gpu">
              <img
                src="/media/oberst-franske-prinsen.webp"
                alt="Plakat for Oberst Krebs og den Franske Prinsen, sommeren 2027"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={600}
                height={800}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-cynical-900/40 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Ambient pulse bak bildet, matcher AnnouncementSection */}
            {!reduced && (
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.18, 0.32, 0.18] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -z-10 bg-torch-500/14 blur-3xl rounded-xl"
                aria-hidden="true"
              />
            )}
          </motion.div>

          {/* ── Innhold ────────────────────────────────────────────────── */}
          <motion.div {...mv(v.content)} className="order-2 space-y-6 text-center lg:text-left">
            <p className="eyebrow text-torch-300/90 text-[0.7rem] sm:text-xs">
              Neste sommer
            </p>

            <h2
              id="next-season-heading"
              className="h2 uppercase tracking-[0.04em] text-white drop-shadow-[0_0_24px_rgba(251,191,36,0.2)]"
            >
              Oberst Krebs og den Franske Prinsen
            </h2>

            <p className="font-heading text-gold-300 text-lg sm:text-xl tracking-[-0.01em]">
              Sommeren 2027
            </p>

            <p className="text-white/80 text-base lg:text-[1.0625rem] leading-relaxed max-w-prose mx-auto lg:mx-0">
              Krebs får selskap av en fransk prins, og et nytt kapittel i festningens historie tar form. Historien fortsetter på Kongsvinger festning.
            </p>

            {/* Urgency-badge */}
            <div className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm text-gold-200">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Billetter i salg allerede nå
              </span>
            </div>

            <div className="pt-2 flex justify-center lg:justify-start">
              <Button asChild variant="gold" size="lg" withShine>
                <a
                  href="https://eventyrfestningen.ticketco.events/no/nb"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackTicketClick("next_season_teaser", pathname)}
                >
                  Sikre billetter til 2027
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}