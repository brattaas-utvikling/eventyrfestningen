// src/components/sections/StageHero.tsx
// Fullskjerms hero i lag: bakgrunn, drivende røyk, prinsen og tekst i kode.
// Felles for AuditionHero (med «AUDITION»-ordbilde) og PrinsenHero (uten, med større logo).

import { preload } from "react-dom";
import { motion, MotionConfig, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Desktop-bildet brukes bare på liggende skjermer; stående nettbrett (også iPad Pro) får nettbrett-bildet.
const MQ_DESKTOP = "(min-width: 1024px) and (orientation: landscape), (orientation: landscape) and (max-height: 500px)";
const MQ_TABLET = "(min-width: 768px)";
const MQ_MOBILE = "(max-width: 767px) and (orientation: portrait), (max-width: 767px) and (min-height: 501px)";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

function fadeUp(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE_OUT } },
  };
}

// Koreografi (sekunder): bakgrunn 0 → prinsen 0.15 → bokstavene 0.35+ → logo → dato → handling.
// Uten ordbilde kommer logoen rett etter prinsen.
function makeVariants(hasWordmark: boolean) {
  const t = hasWordmark ? 0 : -0.45;
  return {
    bg: {
      hidden: { opacity: 0, scale: 1.08 },
      show: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE_OUT } },
    },
    fog: {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 2, delay: 0.3, ease: "easeOut" } },
    },
    character: {
      hidden: { opacity: 0, x: "14%", rotate: 5 },
      show: {
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: { type: "spring", duration: 1.1, bounce: 0.18, delay: 0.15 },
      },
    },
    letter: {
      hidden: { opacity: 0, y: "0.4em", rotate: -10, scale: 1.3, filter: "blur(6px)" },
      show: (i: number) => ({
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { type: "spring", duration: 0.7, bounce: 0.3, delay: 0.35 + i * 0.05 },
      }),
    },
    logo: {
      hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, delay: 0.85 + t, ease: EASE_OUT },
      },
    },
    date: fadeUp(1 + t),
    actions: fadeUp(1.12 + t),
  } satisfies Record<string, Variants>;
}

const VARIANTS_WITH_WORDMARK = makeVariants(true);
const VARIANTS_LOGO_ONLY = makeVariants(false);

export interface StageHeroImages {
  bgDesktop: string;
  bgTablet: string;
  bgMobile: string;
  character: string;
  logo: string;
  fog: string;
}

interface StageHeroProps {
  /** id på h1, brukes av aria-labelledby */
  headingId: string;
  /** Tekst skjermlesere leser som overskrift */
  srTitle: string;
  /** Valgfritt ordbilde over logoen (f.eks. «Audition») */
  wordmark?: string;
  dateLabel: string;
  dateTime: string;
  images: StageHeroImages;
  /** Handlinger under datoen (knapp/lenker) */
  children?: React.ReactNode;
}

export function StageHero({
  headingId,
  srTitle,
  wordmark,
  dateLabel,
  dateTime,
  images,
  children,
}: StageHeroProps) {
  const hasWordmark = Boolean(wordmark);
  const v = hasWordmark ? VARIANTS_WITH_WORDMARK : VARIANTS_LOGO_ONLY;

  // LCP: hent riktig bakgrunn tidlig (React 19 hoister til <head>)
  preload(images.bgDesktop, { as: "image", fetchPriority: "high", media: MQ_DESKTOP });
  preload(images.bgTablet, { as: "image", fetchPriority: "high", media: "(min-width: 768px) and (orientation: portrait), (min-width: 768px) and (max-width: 1023px) and (min-height: 501px)" });
  preload(images.bgMobile, { as: "image", fetchPriority: "high", media: MQ_MOBILE });

  return (
    // reducedMotion="user": ved redusert bevegelse droppes flytting/skalering, kun inntoning gjenstår
    <MotionConfig reducedMotion="user">
      <motion.section
        initial="hidden"
        animate="show"
        className="relative h-[calc(100svh-var(--header-h,4rem))] min-h-[560px] mt-(--header-h,4rem) overflow-hidden bg-cynical-950"
        aria-labelledby={headingId}
      >
        {/* Lag 1: bakgrunn */}
        <motion.div variants={v.bg} className="absolute inset-0" aria-hidden="true">
          <picture>
            <source media={MQ_DESKTOP} srcSet={images.bgDesktop} />
            <source media={MQ_TABLET} srcSet={images.bgTablet} />
            <img
              src={images.bgMobile}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </motion.div>

        {/* Lag 2: røyk som driver sakte (CSS, går utenfor JS-tråden) */}
        <motion.div
          variants={v.fog}
          className="absolute -inset-[8%] pointer-events-none mix-blend-screen"
          aria-hidden="true"
        >
          <img
            src={images.fog}
            alt=""
            className="h-full w-full object-cover opacity-35 motion-safe:animate-fog-drift"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        {/* Lag 3: demping for lesbarhet (bak prinsen) */}
        <div
          className="absolute inset-0 pointer-events-none bg-cynical-950/10
            desk:bg-linear-to-r desk:from-cynical-950/45 desk:via-cynical-950/15 desk:to-transparent"
          aria-hidden="true"
        />

        {/* Lag 4: prinsen */}
        <motion.div
          variants={v.character}
          className="absolute pointer-events-none origin-bottom
            right-[-8%] top-[2%] h-[56%]
            sm:right-[-6%] sm:h-[58%]
            md:right-[-2%] md:top-[2%] md:h-[66%]
            desk:right-[2%] desk:top-[7%] desk:h-auto desk:w-[44vw] xl:desk:right-[5%]"
          aria-hidden="true"
        >
          <div className="h-full origin-bottom motion-safe:animate-sway [animation-delay:1.6s] desk:h-auto">
            <img
              src={images.character}
              alt=""
              width={900}
              height={1335}
              className="h-full w-auto max-w-none drop-shadow-[0_24px_48px_rgba(0,0,0,0.6)] desk:h-auto desk:w-full"
              loading="eager"
              decoding="async"
            />
          </div>
        </motion.div>

        {/* Lag 5: demping nederst på mobil/nettbrett, foran prinsen */}
        <div
          className="absolute inset-x-0 bottom-0 h-[70%] pointer-events-none desk:hidden
            bg-linear-to-t from-cynical-950/95 via-cynical-950/60 to-transparent"
          aria-hidden="true"
        />

        {/* Lag 6: tekst – midtstilt trakt */}
        <div
          className="relative z-10 flex h-full flex-col justify-end
            px-5 pb-8 sm:px-8 sm:pb-10
            desk:justify-center desk:pl-[9vw] desk:pb-0"
        >
          <div className="mx-auto flex w-fit max-w-full flex-col items-center text-center desk:mx-0">
            <h1 id={headingId} className="flex flex-col items-center">
              <span className="sr-only">{srTitle}</span>
              {wordmark && (
                <span
                  aria-hidden="true"
                  className="spice-mark block whitespace-nowrap leading-none text-burgundy-700
                    -rotate-[10deg] my-[0.3em] desk:-rotate-[14deg] desk:my-[0.28em]
                    text-[clamp(3.5rem,25vw,7rem)]
                    md:text-[clamp(4rem,min(18vw,24svh),10rem)]
                    desk:text-[clamp(4.5rem,min(13vw,15svh),15rem)]
                    [-webkit-text-stroke:0.06em_var(--color-cynical-950)] [paint-order:stroke_fill]
                    [filter:drop-shadow(0_6px_14px_rgb(0_0_0/0.55))]"
                >
                  {Array.from(wordmark).map((ch, i) => (
                    <motion.span key={i} custom={i} variants={v.letter} className="inline-block origin-bottom">
                      {ch}
                    </motion.span>
                  ))}
                </span>
              )}
              <motion.img
                variants={v.logo}
                src={images.logo}
                alt=""
                width={1200}
                height={525}
                className={cn(
                  "h-auto drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]",
                  hasWordmark
                    ? "w-[min(78vw,22rem)] md:w-[min(52vw,26rem,40svh)] desk:w-[min(29vw,34svh)]"
                    : "w-[min(86vw,26rem,44svh)] md:w-[min(66vw,34rem,46svh)] desk:w-[min(42vw,60svh)]"
                )}
                loading="eager"
                decoding="async"
              />
            </h1>

            <motion.p
              variants={v.date}
              className="mt-4 font-heading text-cynical-50 leading-tight
                text-[clamp(1.5rem,7vw,2.25rem)]
                md:text-[clamp(1.5rem,min(4.5vw,6svh),2.5rem)] desk:mt-4 desk:text-[clamp(1.75rem,min(3.4vw,5svh),4.25rem)]
                drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
            >
              <time dateTime={dateTime}>{dateLabel}</time>
            </motion.p>

            {children && (
              <motion.div variants={v.actions} className="mt-5 flex w-full justify-center desk:mt-4">
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>
    </MotionConfig>
  );
}
