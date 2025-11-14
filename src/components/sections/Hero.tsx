// src/components/sections/Hero.tsx
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { urlFor } from "@/lib/sanity";
import type { Show, Performance, SanityImage } from "@/types/sanity";
import { Countdown } from "@/components/ui/Countdown";

interface HeroProps {
  show: Show;
  nextPerformance?: Performance;
}

type ShowWithLogo = Show & {
  logoImage?: SanityImage;
};

export function Hero({ show, nextPerformance }: HeroProps) {
  const premiereDate = nextPerformance?.date
    ? new Date(nextPerformance.date)
    : null;

  const showWithLogo = show as ShowWithLogo;
  const logoImage = showWithLogo.logoImage;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pb-16">
      {/* Background */}
      <div className="absolute inset-0">
             {/* VIDEO I STEDENFOR BILDE */}
             <video
          src="/media/heroVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-fortress-overlay" />

        {/* fakkel-glow */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 bg-torch-500/20 blur-3xl rounded-full"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-torch-500/20 blur-3xl rounded-full"
          animate={{ opacity: [0.6, 0.3, 0.6], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* KUN logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 flex justify-center"
          >
            {logoImage ? (
              <img
                src={urlFor(logoImage).width(900).url()}
                alt={show.title}
                className="max-h-96 w-auto drop-shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              />
            ) : (
              // hvis ingen logo er lagt inn enda, behold litt plass så layouten ikke hopper
              <div className="h-16" />
            )}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl text-gray-200 mb-8 font-light"
          >
            En storslått familieforestilling på Kongsvinger Festning
          </motion.p>

          {/* Countdown */}
          {premiereDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8 flex justify-center"
            >
              <Countdown targetDate={premiereDate} />
            </motion.div>
          )}

          {/* CTA */}
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
              className="shadow-torch"
            >
              <a href={show.ticketUrl || "#"} target="_blank" rel="noopener">
                <Users className="mr-2 h-5 w-5" />
                Kjøp billetter
              </a>
            </Button>
            <Button
              size="xl"
              variant="outline"
              asChild
              className="border-gold-400 text-white hover:bg-gold-400/10"
            >
              <a href="#om-forestillingen">Les mer om forestillingen</a>
            </Button>
          </motion.div>

          {/* Praktisk info */}
          {show.practicalInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-300"
            >
              {show.practicalInfo.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gold-400" />
                  <span>{show.practicalInfo.duration} minutter</span>
                </div>
              )}
              {show.practicalInfo.ageLimit && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gold-400" />
                  <span>{show.practicalInfo.ageLimit}</span>
                </div>
              )}
              {nextPerformance && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gold-400" />
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

      {/* Scroll indicator
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gold-400/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-gold-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div> */}
    </section>
  );
}
