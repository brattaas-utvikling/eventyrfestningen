// src/components/sections/AuditionSection.tsx
//
// Audition-seksjon i vanlig innholdsbredde, med bakgrunnsbildet i full bredde (bleed).
// Rolig animasjon som resten av siden: prinsen og teksten toner inn når seksjonen kommer til syne.

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { AuditionSignupLinks, type AuditionSignup } from "@/components/sections/AuditionSignupLinks";

// ─── Motion ─────────────────────────────────────────────────────────────────

const spring = { type: "spring", stiffness: 220, damping: 26, mass: 0.9 } as const;

const v = {
  character: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
  } satisfies Variants,
  content: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.08 } },
  } satisfies Variants,
};

// ─── Component ────────────────────────────────────────────────────────────

interface AuditionSectionProps {
  title: string;
  showTitle: string;
  dateLabel: string;
  dateTime: string;
  signupHeading: string;
  signupNote?: string;
  deadlineLabel?: string;
  deadlineDateTime?: string;
  signups: readonly AuditionSignup[];
  images: {
    bgDesktop: string;
    bgTablet: string;
    bgMobile: string;
    character: string;
    logo: string;
  };
}

export function AuditionSection({
  title,
  showTitle,
  dateLabel,
  dateTime,
  signupHeading,
  signupNote,
  deadlineLabel,
  deadlineDateTime,
  signups,
  images,
}: AuditionSectionProps) {
  const reduced = useReducedMotion();

  const mv = (variants: Variants, amount = 0.2) =>
    reduced
      ? {}
      : { variants, initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount } };

  return (
    <section
      className="relative flex h-[calc(100svh-var(--header-h,4rem))] min-h-[30rem] flex-col justify-end overflow-hidden bg-cynical-950 lg:justify-center"
      aria-labelledby="audition-section-title"
    >
      {/* Bakgrunn i full bredde */}
      <picture aria-hidden="true">
        <source media="(min-width: 1024px)" srcSet={images.bgDesktop} />
        <source media="(min-width: 768px)" srcSet={images.bgTablet} />
        <img
          src={images.bgMobile}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div
        className="absolute inset-0 bg-cynical-950/25
          lg:bg-linear-to-r lg:from-cynical-950/55 lg:via-cynical-950/20 lg:to-cynical-950/10"
        aria-hidden="true"
      />

      <Container className="relative py-6 sm:py-10 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Prinsen ────────────────────────────────────────────────── */}
          <motion.div {...mv(v.character)} className="order-1 lg:order-2 flex justify-center">
            <img
              src={images.character}
              alt=""
              width={900}
              height={1335}
              className="h-[min(38svh,26rem)] short:h-[36svh] tall:h-[min(46svh,30rem)] md:tall:h-[min(48svh,36rem)] w-auto lg:h-[min(64svh,38rem)]
                drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)]"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          {/* ── Innhold ────────────────────────────────────────────────── */}
          <motion.div {...mv(v.content)} className="order-2 lg:order-1 -mt-44 tall:-mt-[26svh] md:tall:-mt-[30svh] lg:mt-0 flex flex-col items-center text-center">
            <h2 id="audition-section-title" className="flex flex-col items-center">
              <span className="sr-only">
                {title}: {showTitle}
              </span>
              <span
                aria-hidden="true"
                className="spice-mark block whitespace-nowrap leading-none text-burgundy-700
                  -rotate-[10deg] my-[0.3em] lg:-rotate-[12deg]
                  text-[clamp(3.5rem,min(24vw,11svh),7rem)] md:text-[clamp(5rem,min(17vw,13svh),10rem)] lg:text-[clamp(4.5rem,min(11vw,14svh),9rem)]
                  [-webkit-text-stroke:0.06em_var(--color-cynical-950)] [paint-order:stroke_fill]
                  [filter:drop-shadow(0_6px_14px_rgb(0_0_0/0.55))]"
              >
                {title}
              </span>
              <img
                src={images.logo}
                alt=""
                width={1200}
                height={525}
                className="h-auto w-[min(64vw,22rem,28svh)] lg:w-[min(26rem,80%,34svh)]
                  drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]"
                loading="lazy"
                decoding="async"
              />
            </h2>

            <p
              className="mt-4 font-heading text-cynical-50 leading-tight
                text-[clamp(1.4rem,min(6.5vw,5svh),2.75rem)]
                drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
            >
              <time dateTime={dateTime}>{dateLabel}</time>
            </p>

            <AuditionSignupLinks
              className="mt-5 lg:mt-6"
              heading={signupHeading}
              note={signupNote}
                deadlineLabel={deadlineLabel}
                deadlineDateTime={deadlineDateTime}
              signups={signups}
              placement="section"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
