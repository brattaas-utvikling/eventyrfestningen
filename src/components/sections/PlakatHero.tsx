// src/components/sections/PlakatHero.tsx

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { ChevronDown, Ticket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { urlFor } from "@/lib/sanity";
import type { Show, Performance, SanityImage } from "@/types/sanity";
import { trackTicketClick } from "@/lib/analytics";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { useLocation } from "react-router-dom";

type ShowWithLogo = Show & { logoImage?: SanityImage };

interface PlakatHeroProps {
  show: Show;
  nextPerformance?: Performance;
  portraitSrc: string;
  landscapeSrc: string;
}

function fadeUp(delay: number, reduced: boolean) {
  const transition: Transition = { duration: 0.75, delay, ease: "easeOut" };
  return {
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition,
  };
}


export function PlakatHero({
  show,
  portraitSrc,
  landscapeSrc,
}: PlakatHeroProps) {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const logoImage = (show as ShowWithLogo).logoImage;

  return (
    <section
      className="relative h-[95svh] flex flex-col overflow-hidden mt-14"
      aria-label={show.title}
    >

      <div className="absolute inset-0 bg-cynical-950">

        <img
          src={portraitSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full object-cover object-center md:hidden"
          loading="eager"
          decoding="async"
        />


        <img
          src={landscapeSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full max-w-[1920px] mx-auto object-cover object-center hidden md:block"
          loading="eager"
          decoding="async"
        />

        <div
          className="absolute inset-0 bg-linear-to-b
            from-cynical-950/40 via-transparent to-cynical-950/88
            md:from-cynical-950/25 md:via-cynical-950/30 md:to-cynical-950/65"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 flex flex-col h-full">

        <div className="grow" />

        <div className="shrink-0 px-4 sm:px-6 md:px-8 pb-2 sm:pb-3">

          {logoImage && (
            <motion.img
              {...fadeUp(0.3, reduced)}
              src={urlFor(logoImage).width(1400).quality(90).url()}
              alt={show.title}
              className="w-full h-auto
                max-w-[92%]
                sm:max-w-lg
                md:max-w-2xl
                max-h-[36vh] sm:max-h-[42vh] md:max-h-[46vh] lg:max-h-[52vh] xl:max-h-[56vh]
                object-contain object-center mx-auto
                drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                filter brightness-105"
            />
          )}

          <motion.p
            {...fadeUp(0.5, reduced)}
            className="spice-mark text-center text-white
              text-[clamp(1.35rem,5.5vw,2.25rem)]
              drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]
              -mt-6 sm:-mt-5 md:-mt-6 pr-1 sm:pr-2"
          >
            2.–11. Juli 2026
          </motion.p>
        </div>

        <motion.div
          {...fadeUp(0.65, reduced)}
          className="shrink-0 w-full flex justify-center px-5 pb-10 sm:pb-12 md:pb-14"
        >
          <Button
            size="xl"
            variant="torch"
            withShine
            asChild
            className="w-full
              sm:w-auto sm:min-w-[280px]
              md:min-w-[300px]
              lg:min-w-[320px]
              active:scale-95"
          >
            <a
              href={show.ticketUrl || "https://eventyrfestningen.ticketco.events/no/nb"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTicketClick("hero_main", pathname)}
            >
              <Ticket className="mr-4 h-5 w-5 lg:h-6 lg:w-6" />
              Kjøp billetter
            </a>
          </Button>
        </motion.div>
      </div>

      {!reduced && (
        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/35" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
