// routes/landing/sections/ArchiveTeaser.tsx
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ArchiveData {
  title: string;
  subtitle: string;
  description: string;
  previewImage: string;
  ctaText: string;
  ctaLink: string;
  highlightYears: readonly string[];
}

interface Props {
  data: ArchiveData;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ArchiveTeaser({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // ── Parallax ──────────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY     = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"]   : ["0%", "40%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1]         : [1, 1.15]);
  // Innholdet "flyter opp" mot bildet som scroller ned — dramatisk avslutning
  const contentY   = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"]   : ["0%", "-18%"]);

  // ── Årstall sortert stigende ───────────────────────────────────────────────
  const sortedYears = useMemo(
    () => [...data.highlightYears].sort((a, b) => parseInt(a) - parseInt(b)),
    [data.highlightYears]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden"
      aria-labelledby="archive-heading"
    >
      {/* ── Parallax-bakgrunn ──────────────────────────────────────────────── */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <motion.img
          src={data.previewImage}
          alt=""
          className="w-full h-full object-cover"
          style={{ scale: imageScale }}
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
        />
        {/* Gradient mot bunn — innholdet fader inn fra mørket */}
        <div className="absolute inset-0 bg-gradient-to-b from-cynical-950/70 via-cynical-950/85 to-cynical-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_55%,rgba(3,7,18,0.85)_100%)]" />
      </motion.div>

      {/* ── Innhold ───────────────────────────────────────────────────────────
          justify-between: tittel øverst, tidslinje + CTA nederst.
          contentY counter-parallax gir "curtain call"-effekt.
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 min-h-[100svh] flex flex-col justify-between py-16 sm:py-20 px-4"
        style={{ y: contentY }}
      >
        {/* ── Tittelblokk ─────────────────────────────────────────────────── */}
        <div className="text-center max-w-5xl mx-auto space-y-4">
          <p className="eyebrow text-torch-400 text-[0.7rem] sm:text-xs">
            {data.subtitle}
          </p>

          {/*
            H2: gull-gradient med WebkitTextStroke for dybde.
            Dette er sidens siste seksjon — et visuelt klimaks.
            Gull-gradient er riktig her; det er et bevisst brudd
            fra hvit h2 i de foregående seksjonene.
          */}
          <h2
            id="archive-heading"
            className={[
              "font-heading uppercase",
              "text-[clamp(2.5rem,7vw,5rem)]",
              "tracking-[0.05em] leading-[1.0]",
              // Gull-gradient — klimaks-effekt på siste seksjon
              "bg-gradient-to-b from-gold-200 via-gold-400 to-gold-600",
              "bg-clip-text text-transparent",
              "drop-shadow-[0_10px_35px_rgba(0,0,0,0.55)]",
            ].join(" ")}
            style={{ WebkitTextStroke: "1px rgba(20,14,8,0.35)" }}
          >
            {data.title}
          </h2>
        </div>

        {/* ── Nedre blokk: beskrivelse + tidslinje + CTA ──────────────────── */}
        <div className="max-w-4xl mx-auto w-full space-y-10 sm:space-y-12">

          {/* Beskrivelse */}
          <p className="text-white/80 text-base sm:text-lg text-center leading-relaxed max-w-2xl mx-auto">
            {data.description}
          </p>

          {/* ── Tidslinje ─────────────────────────────────────────────────── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative pb-12 sm:pb-14">
              {/* Horisontal linje */}
              <div
                className="absolute top-[6px] sm:top-[7px] left-0 right-0 h-px
                  bg-gradient-to-r from-transparent via-gold-500/70 to-transparent"
                aria-hidden="true"
              />

              {/* Årstall */}
              <div className="relative flex justify-between items-start px-2 sm:px-4">
                {sortedYears.map((year, idx) => (
                  <motion.div
                    key={year}
                    initial={reduced ? false : { opacity: 0, scale: 0.85, y: 16 }}
                    whileInView={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.15 + idx * 0.06,
                      duration: 0.45,
                      ease: "easeOut",
                    }}
                    className="relative flex flex-col items-center gap-2.5"
                  >
                    {/* Dot */}
                    <div
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full
                        bg-gold-500 border-[3px] border-cynical-900
                        shadow-[0_0_14px_rgba(251,191,36,0.65)]"
                      aria-hidden="true"
                    />

                    {/* Årstall-tekst */}
                    <span className="font-heading text-gold-400 text-sm sm:text-base md:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
                      {year}
                    </span>

                    {/* Pulserende glow bak dot */}
                    {!reduced && (
                      <motion.div
                        className="absolute top-0 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gold-500/30 blur-lg pointer-events-none"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.25, 0.55, 0.25] }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: idx * 0.2,
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── CTA ──────────────────────────────────────────────────────── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
            className="flex justify-center"
          >
            <Button
              asChild
              variant="outline"
              size="xl"
              withShine
              className="text-base sm:text-lg px-10 sm:px-12"
            >
              <Link to={data.ctaLink}>
                {data.ctaText}
                <ArrowRight
                  className="w-5 h-5 sm:w-6 sm:h-6 motion-safe:group-hover:translate-x-1 motion-safe:transition-transform motion-safe:duration-200"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Dekorative hjørner — "teaterramme" rundt hele seksjonen ─────────── */}
      <div className="absolute inset-0 pointer-events-none z-20" aria-hidden="true">
        <div className="absolute top-0    left-0  w-20 h-20 sm:w-28 sm:h-28 border-t-[3px] border-l-[3px] border-gold-500/30" />
        <div className="absolute top-0    right-0 w-20 h-20 sm:w-28 sm:h-28 border-t-[3px] border-r-[3px] border-gold-500/30" />
        <div className="absolute bottom-0 left-0  w-20 h-20 sm:w-28 sm:h-28 border-b-[3px] border-l-[3px] border-gold-500/30" />
        <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-28 sm:h-28 border-b-[3px] border-r-[3px] border-gold-500/30" />
      </div>
    </section>
  );
}