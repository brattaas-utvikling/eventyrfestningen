// src/components/sections/Hero.tsx
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { urlFor } from "@/lib/sanity";
import type { Show, Performance, SanityImage } from "@/types/sanity";
import { Countdown } from "@/components/ui/Countdown";
import { trackEvent } from "@/lib/analytics";
import { useState } from "react";

interface HeroProps {
  show: Show;
  nextPerformance?: Performance;
  page?: string;
}

type ShowWithLogo = Show & {
  logoImage?: SanityImage;
};

export function Hero({ show, nextPerformance, page = "home" }: HeroProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const premiereDate = nextPerformance?.date
    ? new Date(nextPerformance.date)
    : null;

  const showWithLogo = show as ShowWithLogo;
  const logoImage = showWithLogo.logoImage;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pb-16">
      {/* Background Video - Optimized for all devices */}
      <div className="absolute inset-0 bg-navy-950">
        {/* Single video with smart object-fit */}
        <video
          src="/media/heroVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />

        {/* Fallback gradient while video loads */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-950/60 to-navy-950/80" />

        {/* Fakkel-glow effects */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 bg-torch-500/20 blur-3xl rounded-full"
          animate={{ 
            opacity: [0.3, 0.6, 0.3], 
            scale: [1, 1.2, 1] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-torch-500/20 blur-3xl rounded-full"
          animate={{ 
            opacity: [0.6, 0.3, 0.6], 
            scale: [1.2, 1, 1.2] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Bottom vignette for better separation */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-navy-950/80 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mb-8 flex justify-center"
          >
            {logoImage ? (
              <img
                src={urlFor(logoImage).width(900).quality(90).url()}
                alt={show.title}
                className="max-h-72 md:max-h-[600px] sm:max-h-80 md:max-h-96 w-auto 
                         drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                         filter brightness-105"
              />
            ) : (
              <div className="h-16" />
            )}
          </motion.div>

          {/* Countdown */}
          {premiereDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="mb-8 flex justify-center"
            >
              <Countdown targetDate={premiereDate} />
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="xl"
              variant="torch"
              asChild
              className="shadow-[0_0_20px_rgba(255,161,35,0.4)] hover:shadow-[0_0_30px_rgba(255,161,35,0.6)]
                       transition-shadow duration-300"
            >
              <a
                href={show.ticketUrl || "https://eventyrfestningen.ticketco.events/no/nb"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("ticket_click", {
                    source: "hero_main",
                    page,
                  })
                }
              >
                <Users className="mr-2 h-5 w-5" />
                Kjøp billetter
              </a>
            </Button>
          </motion.div>

          {/* Praktisk info */}
          {/* {show.practicalInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm"
            >
              {show.practicalInfo.duration && (
                <div className="flex items-center gap-2 px-4 py-2 bg-navy-900/40 backdrop-blur-sm 
                              rounded-full border border-gold-500/20">
                  <Clock className="h-4 w-4 text-gold-400" />
                  <span className="text-gray-200">{show.practicalInfo.duration} minutter</span>
                </div>
              )}
              {show.practicalInfo.ageLimit && (
                <div className="flex items-center gap-2 px-4 py-2 bg-navy-900/40 backdrop-blur-sm 
                              rounded-full border border-gold-500/20">
                  <Users className="h-4 w-4 text-gold-400" />
                  <span className="text-gray-200">{show.practicalInfo.ageLimit}</span>
                </div>
              )}
              {nextPerformance && (
                <div className="flex items-center gap-2 px-4 py-2 bg-navy-900/40 backdrop-blur-sm 
                              rounded-full border border-gold-500/20">
                  <Calendar className="h-4 w-4 text-gold-400" />
                  <span className="text-gray-200">
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
          )} */}
        </div>
      </Container>
    </section>
  );
}