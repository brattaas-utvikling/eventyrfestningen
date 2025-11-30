// src/components/sections/HeroTicketLaunch.tsx
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Users, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { urlFor } from "@/lib/sanity";
import type { Show, Performance, SanityImage } from "@/types/sanity";
import { Countdown } from "@/components/ui/Countdown";
import { trackEvent } from "@/lib/analytics";

interface HeroTicketLaunchProps {
  show: Show;
  nextPerformance?: Performance;
  page?: string;
}

type ShowWithLogo = Show & {
  logoImage?: SanityImage;
};

// Fyrverkeri-partikkel komponent
// Fyrverkeri-partikkel komponent (mer subtil variant)
const Firework = ({
  delay,
  x,
  color,
}: {
  delay: number;
  x: string;
  color: string;
}) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, bottom: "32%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2.4, delay, times: [0, 0.2, 0.8, 1] }}
    >
      {/* Sentral kjerne */}
      <motion.div
        className={`w-1.5 h-1.5 rounded-full ${color}`}
        animate={{
          scale: [0, 3.5, 4.5],
          opacity: [0.9, 0.7, 0],
        }}
        transition={{ duration: 1.6, delay }}
      />

      {/* Mykere “ring” rundt eksplosjonen */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: "0 0 40px 10px rgba(255,255,255,0.08)" }}
        initial={{ scale: 0.4, opacity: 0.4 }}
        animate={{ scale: [0.4, 1.1, 1.3], opacity: [0.4, 0.2, 0] }}
        transition={{ duration: 1.8, delay: delay + 0.1 }}
      />

      {/* Partikler som går ut i myke buer */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i * 360) / 10;
        const distance = 55 + Math.random() * 25;
        const offsetX = Math.cos((angle * Math.PI) / 180) * distance;
        const offsetY = Math.sin((angle * Math.PI) / 180) * distance;

        return (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${color}`}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.9 }}
            animate={{
              x: offsetX,
              y: offsetY,
              opacity: [1, 0.8, 0],
              scale: [0.9, 0.7, 0],
            }}
            transition={{
              duration: 1.5 + Math.random() * 0.4,
              delay: delay + 0.1,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Litt diskret glitter for å holde “eventyr”-følelsen */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i * 360) / 4 + 22.5;
        const distance = 70 + Math.random() * 20;
        const offsetX = Math.cos((angle * Math.PI) / 180) * distance;
        const offsetY = Math.sin((angle * Math.PI) / 180) * distance;

        return (
          <motion.div
            key={`sparkle-${i}`}
            className={`absolute w-[3px] h-[3px] ${color}`}
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: offsetX,
              y: offsetY,
              opacity: [0, 0.9, 0],
              scale: [0, 1.1, 0],
              rotate: [0, 140, 260],
            }}
            transition={{
              duration: 1.7,
              delay: delay + 0.25 + Math.random() * 0.3,
              ease: "easeOut",
            }}
          />
        );
      })}
    </motion.div>
  );
};


// Twinkling stjerne-komponent
const Star = ({ top, left, delay }: { top: string; left: string; delay: number }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{ top, left }}
      animate={{
        opacity: [0.2, 1, 0.2],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export function HeroTicketLaunch({
  show,
  nextPerformance,
  page = "home",
}: HeroTicketLaunchProps) {
  const premiereDate = nextPerformance?.date ? new Date(nextPerformance.date) : null;
  const showWithLogo = show as ShowWithLogo;
  const logoImage = showWithLogo.logoImage;

  const [showFireworks, setShowFireworks] = useState(false);
  const logoControls = useAnimation();
  const badgeControls = useAnimation();

  useEffect(() => {
    // Sekvens:
    // 1. Start fyrverkeri etter kort delay
    // 2. Logo fader inn mellom fyrverkeri
    // 3. Badge popper inn til slutt

    const sequence = async () => {
      // Start fyrverkeri
      await new Promise((resolve) => setTimeout(resolve, 800));
      setShowFireworks(true);

      // Logo fader inn under fyrverkeri
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await logoControls.start({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });

      // Badge popper inn etter fyrverkeri
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await badgeControls.start({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          duration: 0.6,
          ease: [0.34, 1.56, 0.64, 1], // bounce
        },
      });
    };

    void sequence();
  }, [logoControls, badgeControls]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Nattehimmel bakgrunn */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800">
        {/* Stjerner */}
        {Array.from({ length: 50 }).map((_, i) => (
          <Star
            key={i}
            top={`${Math.random() * 70}%`}
            left={`${Math.random() * 100}%`}
            delay={Math.random() * 3}
          />
        ))}

        {/* Måne */}
        <motion.div
          className="absolute top-[15%] right-[10%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gold-200 to-gold-400 shadow-[0_0_60px_20px_rgba(251,191,36,0.3)]"
          animate={{
            opacity: [0.7, 0.9, 0.7],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Festning silhuett */}
<div className="absolute bottom-0 left-0 right-0 h-[32%] md:h-[40%]">
  <svg
    viewBox="0 0 1200 300"
    className="w-full h-full"
    preserveAspectRatio="xMidYMax slice"
  >
    <defs>
      {/* Bakke / fjell */}
      <linearGradient id="hillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(15,23,42,0.95)" />
        <stop offset="100%" stopColor="rgba(15,23,42,1)" />
      </linearGradient>

      {/* Festningsmur */}
      <linearGradient id="fortressWallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#111827" />
        <stop offset="100%" stopColor="#020617" />
      </linearGradient>

      {/* Bygninger inni festningen */}
      <linearGradient id="fortressRoofGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7f1d1d" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
    </defs>

    {/* Hill / fjell under festningen */}
    <path
      d="
        M 0 300
        L 0 210
        Q 120 190 260 200
        Q 420 215 600 205
        Q 780 195 940 205
        Q 1080 215 1200 200
        L 1200 300 Z
      "
      fill="url(#hillGradient)"
    />

    {/* Ytre stjerneformet festningsmur (top-down silhuett) */}
    <path
      d="
        M 360 210
        L 420 190
        L 460 165
        L 520 155
        L 560 135
        L 600 120
        L 640 135
        L 680 155
        L 740 165
        L 780 190
        L 840 210
        L 780 225
        L 740 250
        L 680 265
        L 600 270
        L 520 265
        L 460 250
        L 420 225 Z
      "
      fill="url(#fortressWallGradient)"
      stroke="rgba(15,23,42,0.9)"
      strokeWidth="3"
    />

    {/* Indre gårdsplass / platå */}
    <path
      d="
        M 450 205
        L 495 185
        L 600 170
        L 705 185
        L 750 205
        L 705 225
        L 600 238
        L 495 225 Z
      "
      fill="#020617"
      opacity="0.95"
    />

    {/* Hovedbygning midt på */}
    <path
      d="
        M 515 200
        L 560 185
        L 640 185
        L 685 200
        L 685 225
        L 640 235
        L 560 235
        L 515 225 Z
      "
      fill="url(#fortressRoofGradient)"
      opacity="0.95"
    />

    {/* Liten tårnbygning til venstre */}
    <path
      d="
        M 460 210
        L 480 200
        L 505 200
        L 525 210
        L 525 232
        L 505 238
        L 480 238
        L 460 232 Z
      "
      fill="url(#fortressRoofGradient)"
      opacity="0.9"
    />

    {/* Liten tårnbygning til høyre */}
    <path
      d="
        M 675 210
        L 695 200
        L 720 200
        L 740 210
        L 740 232
        L 720 238
        L 695 238
        L 675 232 Z
      "
      fill="url(#fortressRoofGradient)"
      opacity="0.9"
    />

    {/* Vinduer med lys – animert glød */}
    {[
      { x: 540, y: 210 },
      { x: 565, y: 214 },
      { x: 590, y: 218 },
      { x: 615, y: 214 },
      { x: 640, y: 210 },
      { x: 485, y: 218 },
      { x: 705, y: 218 },
    ].map((window, i) => (
      <motion.rect
        key={i}
        x={window.x}
        y={window.y}
        width="10"
        height="14"
        rx="2"
        fill="#fbbf24"
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2 + Math.random() * 1,
          delay: i * 0.25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}

    {/* Liten “gate” / port i front */}
    <path
      d="
        M 580 260
        L 620 260
        L 620 272
        Q 600 276 580 272 Z
      "
      fill="#020617"
    />
  </svg>
</div>


      {/* Fyrverkeri */}
      {showFireworks && (
        <>
          <Firework delay={0} x="20%" color="bg-torch-400" />
          <Firework delay={0.4} x="75%" color="bg-gold-400" />
          <Firework delay={0.8} x="40%" color="bg-burgundy-400" />
          <Firework delay={1.2} x="85%" color="bg-torch-300" />
          <Firework delay={1.6} x="15%" color="bg-gold-300" />
          <Firework delay={2} x="60%" color="bg-torch-400" />
          <Firework delay={2.4} x="50%" color="bg-gold-500" />
        </>
      )}

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* "BILLETTER TIL SALGS" Badge */}
{/* "BILLETTER TIL SALGS" Badge – skrå + parallellogram, men litt nedtonet */}
<motion.div
  initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
  animate={badgeControls}
  className="mb-6 flex justify-center"
>
  <div className="relative">
    {/* Mer subtil glow */}
    <motion.div
      className="absolute inset-0 rounded-2xl bg-torch-500/50 blur-lg"
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.15, 0.35, 0.15],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Selve “lappen” – parallellogram */}
    <div className="relative inline-block">
      <div className="transform skew-x-6 bg-gradient-to-br from-torch-500/80 via-torch-600/80 to-burgundy-600/80 border border-gold-400/60 rounded-lg shadow-lg px-7 py-3">
        <div className="-skew-x-6 flex items-center gap-2 text-white/90">
          <Sparkles className="w-4 h-4 opacity-80" />
          <span className="text-sm md:text-base font-display font-semibold uppercase tracking-[0.35em]">
            Billetter til salgs
          </span>
          <Sparkles className="w-4 h-4 opacity-80" />
        </div>
      </div>
    </div>
  </div>
</motion.div>



          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={logoControls}
            className="mb-8 flex justify-center"
          >
            {logoImage ? (
              <img
                src={urlFor(logoImage).width(900).url()}
                alt={show.title}
                className="max-h-64 md:max-h-96 w-auto drop-shadow-[0_10px_60px_rgba(251,191,36,0.4)]"
              />
            ) : (
              <h1 className="text-6xl md:text-8xl font-display font-bold text-white drop-shadow-[0_10px_60px_rgba(251,191,36,0.4)]">
                {show.title}
              </h1>
            )}
          </motion.div>

          {/* Countdown */}
          {premiereDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.5 }}
              className="mb-8 flex justify-center"
            >
              <Countdown targetDate={premiereDate} />
            </motion.div>
          )}

          {/* CTA-knapper */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="xl"
              variant="torch"
              asChild
              className="shadow-[0_0_30px_rgba(255,161,35,0.5)] hover:shadow-[0_0_40px_rgba(255,161,35,0.7)] transition-shadow"
            >
              <a
                href={show.ticketUrl || "https://eventyrfestningen.ticketco.events/no/nb"}
                target="_blank"
                rel="noopener"
                onClick={() =>
                  trackEvent("ticket_click", {
                    source: "hero_main",
                    page,
                  })
                }
              >
                <Users className="mr-2 h-5 w-5" />
                Kjøp billetter nå
              </a>
            </Button>

            <Button
              size="xl"
              variant="outline"
              asChild
              className="border-2 border-gold-400 text-white hover:bg-gold-400/10 backdrop-blur-sm"
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
              transition={{ duration: 0.6, delay: 4.5 }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-300"
            >
              {show.practicalInfo.duration && (
                <div className="flex items-center gap-2 bg-navy-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/20">
                  <span className="text-gold-400">⏱️</span>
                  <span>{show.practicalInfo.duration} minutter</span>
                </div>
              )}

              {show.practicalInfo.ageLimit && (
                <div className="flex items-center gap-2 bg-navy-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/20">
                  <Users className="h-4 w-4 text-gold-400" />
                  <span>{show.practicalInfo.ageLimit}</span>
                </div>
              )}

              {nextPerformance && (
                <div className="flex items-center gap-2 bg-navy-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gold-400/20">
                  <span className="text-gold-400">🎭</span>
                  <span>
                    Premiere{" "}
                    {new Date(nextPerformance.date).toLocaleDateString("nb-NO", {
                      day: "numeric",
                      month: "long",
                    })}
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
