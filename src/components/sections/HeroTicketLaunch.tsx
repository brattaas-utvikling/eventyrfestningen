// src/components/sections/HeroTicketLaunch.tsx
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Users,
  Sparkles,
  DramaIcon,
  Clock10,
  Ticket,
  GiftIcon,
  Snowflake,
} from "lucide-react";
import Confetti from "react-confetti";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { urlFor } from "@/lib/sanity";
import type { Show, Performance, SanityImage } from "@/types/sanity";
// import { Countdown } from "@/components/ui/Countdown";
import { trackEvent } from "@/lib/analytics";
import heroBg from "@/assets/plakat_oberst.jpg";

interface HeroTicketLaunchProps {
  show: Show;
  nextPerformance?: Performance;
  page?: string;
}

type ShowWithLogo = Show & {
  logoImage?: SanityImage;
};

export function HeroTicketLaunch({
  show,
  nextPerformance,
  page = "home",
}: HeroTicketLaunchProps) {
  const premiereDate = nextPerformance?.date ? new Date(nextPerformance.date) : null;
  const showWithLogo = show as ShowWithLogo;
  const logoImage = showWithLogo.logoImage;

  const logoControls = useAnimation();
  const badgeControls = useAnimation();

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Window size til konfetti
  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== "undefined") {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Sekvens: konfettismell → logo + badge mens konfetti fortsatt holder på
  useEffect(() => {
    const sequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setShowConfetti(true);

      await new Promise((resolve) => setTimeout(resolve, 300));

      logoControls
        .start({
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.9, ease: "easeOut" },
        })
        .catch(() => {});

      await new Promise((resolve) => setTimeout(resolve, 400));
      badgeControls
        .start({
          opacity: 1,
          scale: 1,
          rotate: -8,
          transition: {
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
          },
        })
        .catch(() => {});

      await new Promise((resolve) => setTimeout(resolve, 2200));
      setShowConfetti(false);
    };

    void sequence();
  }, [badgeControls, logoControls]);

  const confettiColors = [
    "#ffa123", // torch-500
    "#fb923c", // torch-400
    "#f59e0b", // gold-500
    "#fde68a", // gold-200
    "#e11d48", // burgundy-600
    "#9f1239", // burgundy-800
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-28 lg:pt-32 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* gradient for kontrast, men lar plakaten leve */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-navy-950/85" />

      {/* Konfetti-overlay – skyter opp fra bunnen og svever */}
      {showConfetti && windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={windowSize.width < 768 ? 220 : 420}
          gravity={-0.18}
          wind={0}
          confettiSource={{
            x: 0,
            y: windowSize.height - 10,
            w: windowSize.width,
            h: 10,
          }}
          recycle={false}
          colors={confettiColors}
          className="pointer-events-none fixed inset-0 z-20"
        />
      )}

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center gap-5 md:gap-8">
          {/* Logo / tittel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={logoControls}
            className="flex justify-center"
          >
            {logoImage ? (
              <img
                src={urlFor(logoImage).width(900).url()}
                alt={show.title}
                className="max-h-64 md:max-h-72 lg:max-h-96 w-auto drop-shadow-[0_10px_60px_rgba(0,0,0,0.7)]"
              />
            ) : (
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-torch-100 drop-shadow-[0_6px_40px_rgba(0,0,0,0.9)]">
                {show.title}
              </h1>
            )}
          </motion.div>

          {/* Skrå jule-banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
            animate={badgeControls}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-2xl bg-torch-500/30 blur-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative inline-block">
                <div className="transform skew-x-6 bg-linear-to-br from-amber-600 via-gold-500 to-amber-700 border border-gold-400 rounded-lg shadow-lg px-5 py-2 md:px-7 md:py-3 max-w-[95vw]">
                  <div className="-skew-x-6 flex items-center gap-2 text-white">
                    <GiftIcon className="w-4 h-4 opacity-80 shrink-0" />
                    <span className="text-[10px] leading-snug md:text-xs md:leading-snug lg:text-sm font-sans font-semibold uppercase tracking-[0.20em]">
                      Kjøp årets beste julegave! En opplevelse for hele familien!
                    </span>
                    <Sparkles className="w-4 h-4 opacity-80 shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Juletilbud-kort (erstatter nedtelling) */}
          {premiereDate && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="w-full flex justify-center"
  >
    <div className="relative max-w-xl w-full px-4 sm:px-0">
      {/* Tynn, subtil gradient-border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      />

      <div className="relative ">
        {/* snøfnugg – mindre og svakere */}
        <Snowflake className="absolute top-20 -left-2 h-5 w-5 text-burgundy-100/70" />
        <Snowflake className="absolute -bottom-5 -right-2 h-6 w-6 text-gold-200/70" />

        <div className="text-center">
          {/* hovedtekst */}
          <div>
            <h2 className="text-3xl sm:text-[2.1rem] lg:text-6xl font-display font-bold text-white leading-tight">
              2025-pris
              <br />
              <span className="text-white">
                ut året!
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
)}


          {/* CTA-knapper */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="xl"
              variant="torch"
              asChild
              className="shadow-[0_0_40px_rgba(255,161,35,0.8)] hover:shadow-[0_0_55px_rgba(255,161,35,1)] transition-shadow duration-300"
            >
              <a
                href={
                  show.ticketUrl ||
                  "https://eventyrfestningen.ticketco.events/no/nb"
                }
                target="_blank"
                rel="noopener"
                onClick={() =>
                  trackEvent("ticket_click", {
                    source: "hero_main",
                    page,
                  })
                }
              >
                <Ticket className="mr-2 h-5 w-5" />
                Biletter ute nå!
              </a>
            </Button>

            <Button
              size="xl"
              variant="outline"
              asChild
              className="border-2 border-gold-400/80 text-white hover:bg-gold-400/10 backdrop-blur-sm"
            >
              <a
                href="/om-forestillingen"
                onClick={() =>
                  trackEvent("ticket_click", {
                    source: "hero_more_info",
                    page,
                  })
                }
              >
                Les mer om forestillingen
              </a>
            </Button>
          </motion.div>

          {/* Praktisk info */}
          {show.practicalInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-2 md:mt-4 flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-gray-200"
            >
              {show.practicalInfo.duration && (
                <div className="flex items-center gap-2 bg-navy-900/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/20">
                  <Clock10 className="text-gold-400" />
                  <span>{show.practicalInfo.duration}</span>
                </div>
              )}

              {show.practicalInfo.ageLimit && (
                <div className="flex items-center gap-2 bg-navy-900/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/20">
                  <Users className="h-4 w-4 text-gold-400" />
                  <span>{show.practicalInfo.ageLimit}</span>
                </div>
              )}

              {nextPerformance && (
                <div className="flex items-center gap-2 bg-navy-900/70 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/20">
                  <DramaIcon className="text-gold-400" />
                  <span>
                    Premiere{" "}
                    {new Date(nextPerformance.date).toLocaleDateString(
                      "nb-NO",
                      {
                        day: "numeric",
                        month: "long",
                      }
                    )}
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
