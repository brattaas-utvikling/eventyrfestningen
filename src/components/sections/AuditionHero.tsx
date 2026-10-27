// src/components/sections/AuditionHero.tsx
// A-versjonen av Audition Hero.
// Mobil: prinsen øverst, tekst under.
// Nettbrett stående: kontrollert bildestørrelse og responsiv tittel.
// Desktop: tekst til venstre, prinsen til høyre.

import { preload } from "react-dom";
import { motion, MotionConfig, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import type { AuditionSignup } from "@/components/sections/AuditionSignupLinks";
import type { StageHeroImages } from "@/components/sections/StageHero";

const MQ_DESKTOP = "(min-width: 1024px) and (orientation: landscape)";
const MQ_TABLET = "(min-width: 768px)";
const MQ_MOBILE = "(max-width: 767px)";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const list: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT,
    },
  },
};

const character: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE_OUT,
    },
  },
};

interface AuditionHeroProps {
  title: string;
  showTitle: string;
  dateLabel: string;
  dateTime: string;
  signupHeading: string;
  signupNote?: string;
  deadlineLabel?: string;
  deadlineDateTime?: string;
  signups: readonly AuditionSignup[];
  images: StageHeroImages;
}

export function AuditionHero({
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
}: AuditionHeroProps) {
  const { pathname } = useLocation();

  // Prioriter bakgrunnsbildene for raskere visning av hero-seksjonen.
  preload(images.bgDesktop, {
    as: "image",
    fetchPriority: "high",
    media: MQ_DESKTOP,
  });

  preload(images.bgTablet, {
    as: "image",
    fetchPriority: "high",
    media: "(min-width: 768px) and (max-width: 1023px)",
  });

  preload(images.bgMobile, {
    as: "image",
    fetchPriority: "high",
    media: MQ_MOBILE,
  });

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="
          relative isolate mt-(--header-h,4rem)
          min-h-[calc(100svh-var(--header-h,4rem))]
          overflow-hidden bg-cynical-950
        "
        aria-labelledby="audition-title"
      >
        {/* Responsiv bakgrunn */}
        <picture aria-hidden="true">
          <source media={MQ_DESKTOP} srcSet={images.bgDesktop} />
          <source media={MQ_TABLET} srcSet={images.bgTablet} />

          <img
            src={images.bgMobile}
            alt=""
            className="
              absolute inset-0 -z-20
              h-full w-full object-cover opacity-60
            "
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        {/* Mørk gradient for god kontrast */}
        <div
          className="
            absolute inset-0 -z-10
            bg-linear-to-t from-cynical-950
            via-cynical-950/70 to-cynical-950/20
            desk:bg-linear-to-r
            desk:from-cynical-950/95
            desk:via-cynical-950/60
            desk:to-cynical-950/10
          "
          aria-hidden="true"
        />

        {/* Hovedlayout */}
        <div
          className="
            mx-auto grid min-h-[inherit] max-w-7xl
            grid-rows-[minmax(9rem,1fr)_auto]
            px-5 pb-10 sm:px-8

            desk:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]
            desk:grid-rows-1 desk:gap-8
            desk:px-12 desk:pb-0
          "
        >
          {/* Prinsen: øverst på mobil, til høyre på desktop */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={character}
            className="
              pointer-events-none relative
              -mx-5 sm:-mx-8
              desk:order-2 desk:mx-0
            "
            aria-hidden="true"
          >
            <img
              src={images.character}
              alt=""
              width={900}
              height={1335}
              className="
                absolute inset-x-0 bottom-0
                mx-auto h-[190%] w-auto max-w-none
                translate-y-[48%]
                drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)]

                sm:h-[155%]
                sm:translate-y-[38%]

                md:h-[125%]
                md:translate-y-[25%]

                desk:inset-auto desk:right-0 desk:bottom-0
                desk:h-[min(92%,52rem)]
                desk:translate-y-0
              "
              loading="eager"
              decoding="async"
            />
          </motion.div>

          {/* Tittel, logo, dato og påmelding */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={list}
            className="
              relative flex flex-col
              items-center text-center

              desk:order-1 desk:items-start
              desk:justify-center desk:py-16
              desk:text-left
            "
          >
            <h1
              id="audition-title"
              className="flex flex-col items-center desk:items-start"
            >
              <span className="sr-only">
                {`${title}: ${showTitle}`}
              </span>

              {/* AUDITION – skalerer med både bredde og høyde */}
              <motion.span
                variants={item}
                aria-hidden="true"
                className="
                  spice-mark block whitespace-nowrap
                  leading-[0.9] text-burgundy-700
                  [text-shadow:0_4px_24px_rgb(0_0_0/0.8)]

                  text-[clamp(4rem,min(23vw,10svh),7.5rem)]

                  sm:text-[clamp(4.5rem,min(16vw,11svh),7rem)]

                  md:text-[clamp(4.5rem,min(12vw,10svh),6.5rem)]

                  desk:text-[clamp(6rem,7vw,9rem)]
                "
              >
                {title}
              </motion.span>

              {/* Showlogo */}
              <motion.img
                variants={item}
                src={images.logo}
                alt=""
                width={1200}
                height={525}
                className="
                  mt-3 h-auto w-[min(84vw,23rem)]

                  sm:w-[min(70vw,25rem)]
                  md:w-[min(58vw,24rem)]

                  desk:mt-4
                  desk:w-[min(30vw,26rem)]
                "
                loading="eager"
                decoding="async"
              />
            </h1>

            {/* Auditiondato */}
            <motion.p
              variants={item}
              className="
                mt-5 font-heading leading-tight
                text-cynical-50
                text-[clamp(1.5rem,min(6.5vw,5svh),2.25rem)]
                desk:text-[clamp(2rem,3vw,3rem)]
              "
            >
              <time dateTime={dateTime}>{dateLabel}</time>
            </motion.p>

            {/* Påmelding */}
            <motion.div
              variants={item}
              className="mt-6 w-full max-w-sm desk:max-w-none"
            >
              <p
                id="audition-signup-hero"
                className="
                  text-sm font-medium uppercase
                  tracking-[0.12em] text-cynical-300
                "
              >
                {signupHeading}
              </p>

              {signupNote && (
                <p className="sr-only">{signupNote}</p>
              )}

              <ul
                className="
                  mt-3 flex flex-col gap-2.5
                  desk:flex-row desk:flex-wrap
                "
                aria-labelledby="audition-signup-hero"
              >
                {signups.map((signup) => (
                  <li key={signup.id}>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="
                        group w-full justify-between gap-3
                        motion-safe:active:scale-[0.97]
                        desk:w-auto
                      "
                    >
                      <a
                        href={signup.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent("audition_click", {
                            placement: "hero",
                            group: signup.id,
                            page: pathname,
                          })
                        }
                      >
                        {signup.label}

                        <ArrowRight
                          className="
                            h-4 w-4 shrink-0 text-gold-300
                            motion-safe:transition-transform
                            motion-safe:duration-200
                            [@media(hover:hover)]:group-hover:translate-x-0.5
                          "
                          aria-hidden="true"
                        />

                        <span className="sr-only">
                          (åpnes i ny fane)
                        </span>
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>

              {/* Påmeldingsfrist */}
              {deadlineLabel && (
                <p className="mt-4 text-sm font-medium text-gold-300">
                  <time dateTime={deadlineDateTime}>
                    {deadlineLabel}
                  </time>
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}