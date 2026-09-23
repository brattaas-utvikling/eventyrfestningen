// src/components/sections/EventHero.tsx
// Fullskjerms hero med bakgrunnsbilde og tekst i kode.
// Bildene velges av nettleseren via <picture>, så bare riktig variant lastes ned.

import { preload } from "react-dom";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { useReducedMotion } from "@/hooks/useRedusedMotion";

const MQ_DESKTOP = "(min-width: 1024px), (orientation: landscape) and (max-height: 500px)";
const MQ_TABLET = "(min-width: 768px)";
const MQ_MOBILE = "(max-width: 767px) and (orientation: portrait), (max-width: 767px) and (min-height: 501px)";

interface EventHeroImages {
  bgDesktop: string;
  bgTablet: string;
  bgMobile: string;
}

interface EventHeroProps {
  titleSpice: string;
  titleMain: string;
  dateLabel: string;
  dateTime: string;
  timeLabel: string;
  note?: string;
  images: EventHeroImages;
}

function fadeUp(delay: number, reduced: boolean) {
  const transition: Transition = { duration: 0.75, delay, ease: "easeOut" };
  return {
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition,
  };
}

export function EventHero({
  titleSpice,
  titleMain,
  dateLabel,
  dateTime,
  timeLabel,
  note,
  images,
}: EventHeroProps) {
  const reduced = useReducedMotion();

  // LCP: hent riktig bakgrunn tidlig (React 19 hoister til <head>)
  preload(images.bgDesktop, { as: "image", fetchPriority: "high", media: MQ_DESKTOP });
  preload(images.bgTablet, { as: "image", fetchPriority: "high", media: "(min-width: 768px) and (max-width: 1023px) and (min-height: 501px)" });
  preload(images.bgMobile, { as: "image", fetchPriority: "high", media: MQ_MOBILE });

  return (
    <section
      className="relative h-[calc(100svh-var(--header-h,4rem))] min-h-[560px] mt-(--header-h,4rem) overflow-hidden bg-cynical-950"
      aria-labelledby="event-hero-title"
    >
      {/* Lag 1: bakgrunn */}
      <div className="absolute inset-0" aria-hidden="true">
        <picture>
          <source media={MQ_DESKTOP} srcSet={images.bgDesktop} />
          <source media={MQ_TABLET} srcSet={images.bgTablet} />
          <img
            src={images.bgMobile}
            alt=""
            className="absolute inset-0 h-full w-full object-cover
              md:inset-auto md:top-0 md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-none
              md:mask-[linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]
              lg:left-auto lg:right-0 lg:translate-x-0
              lg:mask-[linear-gradient(to_right,transparent,black_18%)]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      {/* Lag 2: varmt fakkellys + lesbarhet */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-40"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_70%_60%,var(--color-torch-500)_0%,transparent_55%)] motion-safe:animate-flicker" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none
          bg-linear-to-t from-cynical-950/95 via-cynical-950/45 to-transparent
          lg:bg-linear-to-tr lg:from-cynical-950/90 lg:via-cynical-950/35 lg:to-transparent"
        aria-hidden="true"
      />

      {/* Lag 3: tekst – midtstilt «trakt» som smalner nedover */}
      <div
        className="relative z-10 flex h-full flex-col justify-end
          px-5 pb-8 sm:px-8 sm:pb-10
          lg:pl-16 lg:pb-12 xl:pl-24"
      >
        <div className="mx-auto flex w-fit max-w-full flex-col items-center text-center lg:mx-0">
          <h1 id="event-hero-title">
            <motion.span
              {...fadeUp(0.35, reduced)}
              className="spice-mark block leading-[0.9] text-gold-400
                text-[clamp(3.5rem,20vw,7.5rem)]
                [filter:drop-shadow(0_0_22px_rgb(190_18_60/0.9))_drop-shadow(0_2px_3px_rgb(0_0_0/0.8))]"
            >
              {titleSpice}
            </motion.span>
            <motion.span
              {...fadeUp(0.5, reduced)}
              className="mt-2 block font-heading uppercase text-cynical-50 leading-none
                text-[clamp(2rem,10.5vw,4rem)]
                drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]"
            >
              {titleMain}
            </motion.span>
          </h1>

          <motion.div
            {...fadeUp(0.65, reduced)}
            className="mt-5 h-px w-[92%] bg-linear-to-r from-transparent via-gold-400/70 to-transparent"
            aria-hidden="true"
          />

          <motion.p
            {...fadeUp(0.75, reduced)}
            className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-cynical-50 sm:gap-x-10
              text-[clamp(1rem,4.5vw,1.75rem)] font-medium
              drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          >
            <time dateTime={dateTime}>{dateLabel}</time>
            <span>{timeLabel}</span>
          </motion.p>

          {note && (
            <motion.p
              {...fadeUp(0.85, reduced)}
              className="mt-4 max-w-[75%] text-balance text-cynical-50/90 font-medium sm:max-w-none
                text-[clamp(0.9rem,3.8vw,1.2rem)]
                drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            >
              {note}
            </motion.p>
          )}

          <motion.img
            {...fadeUp(1, reduced)}
            src="/logo.svg"
            alt="Eventyrfestningen"
            width={1057}
            height={181}
            className="mt-6 h-auto w-[36%] max-w-[240px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
