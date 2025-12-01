// src/components/layout/PageHero.tsx
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;

  /** Justering av tekst */
  align?: "left" | "center";

  /** Bakgrunnsbilde (valgfritt) */
  backgroundImageUrl?: string;
  /** Alt-tekst for bakgrunnsbildet (kan være "" hvis det er rent dekor) */
  backgroundImageAlt?: string;
};

export function PageHero({
  title,
  subtitle,
  align = "left",
  backgroundImageUrl,
  backgroundImageAlt = "",
}: PageHeroProps) {
  const isCentered = align === "center";

  const textMotion = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 text-white">
      {/* Bakgrunn: bilde hvis satt, ellers gradient/aurora som før */}
      {backgroundImageUrl ? (
        <>
          <img
            src={backgroundImageUrl}
            alt={backgroundImageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Mørk overlay for lesbarhet */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-navy-900/40 to-navy-900" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-linear-to-br from-navy-900 to-burgundy-900" />
          {/* subtile aurora/spotlight – behold den visuelle stilen */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            style={{
              background:
                "radial-gradient(60% 60% at 85% 10%, rgba(251,146,60,0.45), transparent 60%), radial-gradient(50% 50% at 20% 90%, rgba(245,158,11,0.40), transparent 60%)",
            }}
            
          />
        </>
      )}



      <Container>
        <motion.div
          initial="hidden"
          animate="show"
          variants={textMotion}
          className={
            isCentered ? "relative max-w-3xl mx-auto text-center" : "relative max-w-3xl"
          }
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
            {title}
          </h1>

          {subtitle ? (
            <p className="text-xl text-gray-200 max-w-2xl">
              {subtitle}
            </p>
          ) : null}

        </motion.div>
      </Container>
    </section>
  );
}
