// src/components/sections/Hero.tsx (MINIMAL TOP SPACE)
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
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 bg-navy-950">
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

        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900" />
        )}
        
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

        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-navy-950/80 to-transparent" />
      </div>

      {/* Content */}
      <Container className="relative z-10 w-full h-full">
        <div className="flex flex-col h-full">
          
          {/* Top spacer - MYE MINDRE! Header er 72px ≈ 9vh på 800px */}
          <div className="flex-shrink-0 
                        h-[10vh]
                        sm:h-[11vh] 
                        md:h-[12vh] 
                        lg:h-[13vh] 
                        xl:h-[14vh]" 
          />
          
          {/* Logo - Stor og nærmere toppen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full flex justify-center px-4 flex-shrink-0"
          >
            {logoImage ? (
              <img
                src={urlFor(logoImage).width(1400).quality(90).url()}
                alt={show.title}
                className="w-full h-auto
                          max-w-[95%]
                          sm:max-w-2xl
                          
                          xs:max-w-[80%]
                          
                          
                          md:max-w-2xl
                          lg:max-w-3xl
                          xl:max-w-5xl
                          2xl:max-w-6xl
                          max-h-[42vh] sm:max-h-[46vh] md:max-h-[44vh] lg:max-h-[50vh] xl:max-h-[54vh]
                          object-contain
                          drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
                          filter brightness-105"
              />
            ) : (
              <div className="h-16" />
            )}
          </motion.div>

          {/* Middle spacer */}
          <div className="flex-grow min-h-[2vh]" />

          {/* Countdown + CTA */}
          <div className="flex flex-col items-center flex-shrink-0
                        gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
            
            {premiereDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="w-full flex justify-center px-4"
              >
                <Countdown targetDate={premiereDate} />
              </motion.div>
            )}

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
  className="w-full flex justify-center px-4"
>
  <Button
    size="xl"
    variant="torch"
    asChild
    className="w-full max-w-xs sm:w-auto
              sm:min-w-[280px]
              md:min-w-[300px]
              lg:min-w-[320px]
              lg:text-lg
              lg:py-5
              active:scale-95"
  >
    <a
      href={show.ticketUrl || "https://eventyrfestningen.ticketco.events/no/nb"}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden inline-flex items-center justify-center"
      onClick={() =>
        trackEvent("ticket_click", {
          source: "hero_main",
          page,
        })
      }
    >
      {/* Shine effect direkte i <a> */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                     translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
      
      {/* Content med drop shadow */}
      <span className="relative inline-flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
        <Users className="mr-2 h-5 w-5 lg:h-6 lg:w-6" />
        Kjøp billetter
      </span>
    </a>
  </Button>
</motion.div>
          </div>

          {/* Bottom spacer */}
          <div className="flex-shrink-0 
                        h-[8vh] 
                        sm:h-[10vh] 
                        md:h-[10vh] 
                        lg:h-[12vh] 
                        xl:h-[14vh]" 
          />
        </div>
      </Container>
    </section>
  );
}