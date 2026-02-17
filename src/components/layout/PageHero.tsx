// src/components/layout/PageHero.tsx
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useReducedMotion } from "@/hooks/useRedusedMotion";

// ─── Types ────────────────────────────────────────────────────────────────────

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  align?: "left" | "center";
  backgroundImageUrl?: string;
  /** Tom streng ("") er OK for rent dekorative bilder */
  backgroundImageAlt?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

export function PageHero({
  eyebrow,
  title,
  subtitle,
  align = "left",
  backgroundImageUrl,
  backgroundImageAlt = "",
}: PageHeroProps) {
  const isCentered = align === "center";
  const reduced = useReducedMotion();

  const textMotion = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  } satisfies Variants;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 text-white">

      {/* ── Bakgrunn ──────────────────────────────────────────────────────── */}
      {backgroundImageUrl ? (
        <>
          <img
            src={backgroundImageUrl}
            alt={backgroundImageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            // Hero-bilder er above-the-fold — eager loading
            loading="eager"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-cynical-900/40 to-cynical-900" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-cynical-900 to-burgundy-900" />

          {/* Aurora-spotlight — deaktiveres ved reduced motion */}
          {!reduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0.15 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
              style={{
                background:
                  "radial-gradient(60% 60% at 85% 10%, rgba(251,146,60,0.45), transparent 60%), radial-gradient(50% 50% at 20% 90%, rgba(245,158,11,0.40), transparent 60%)",
              }}
            />
          )}
        </>
      )}

      {/* ── Innhold ───────────────────────────────────────────────────────── */}
      <Container>
        <motion.div
          initial={reduced ? false : "hidden"}
          animate={reduced ? false : "show"}
          variants={textMotion}
          className={
            isCentered
              ? "relative max-w-3xl mx-auto text-center space-y-4"
              : "relative max-w-3xl space-y-4"
          }
        >
          {/* Eyebrow */}
          {eyebrow && (
            <p className="eyebrow text-torch-300/90 text-[0.7rem] sm:text-xs">
              {eyebrow}
            </p>
          )}

          {/*
            H1:
            - Bruker .h1-utility fra global.css (clamp 3rem–3.75rem, DM Serif 400)
            - Ingen font-bold — DM Serif finnes bare i weight 400,
              bold syntetiseres stygt av nettleseren
            - Fluid scaling via clamp() i .h1 løser mobil-wrapping
            - xl-override for ekstra drama på store skjermer
          */}
          <h1
            className={[
              // Overstyrer .h1 sin clamp — 3rem minimum er for stort
              // for lange titler som "Forestillingskalender" på smal mobil.
              // clamp(1.75rem, 1.2rem + 2.8vw, 3.75rem):
              //   320px → ~2.65rem  |  768px → ~3.34rem  |  1280px → ~3.75rem
              "font-heading leading-[1.05] tracking-[-0.02em]",
              "text-[clamp(1.75rem,1.2rem+2.8vw,3.75rem)]",
              "text-white",
            ].join(" ")}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-cynical-100/80 text-lg sm:text-xl leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}