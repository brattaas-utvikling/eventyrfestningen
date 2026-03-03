// routes/landing/sections/UpcomingShowScene.tsx
import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useRedusedMotion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const d = {
  eyebrow: "Kommende forestilling",
  title: "Oberst Krebs og de Skotske spionene",
  genre: "Familiemusikal",
  ageRating: "5+",
  dates: "Juli 2026",
  description:
    "En skotsk teatertrupp står utenfor festningsmurene, men de har ikke bare kommet den lange veien til Kongsvinger for å underholde… Du kan forvente en forestilling stappfull av magi, spenning, humor, dans og fengende musikk når «Oberst Krebs og de skotske spionene» spilles 2. til 11. juli på Kongsvinger festning.",
  poster: "/assets/landing/show-poster.jpg",
  backgroundImage: "/assets/landing/festningskuliss.webp",
  ctaLink: "https://eventyrfestningen.ticketco.events/no/nb",
  highlights: [
    "Kveld med gåsehud",
    "30+ skuespillere og dansere",
    "Spektakulær scenografi",
    "Humor for alle",
  ],
} as const;

// ─── Motion ───────────────────────────────────────────────────────────────────

const spring = { type: "spring", stiffness: 220, damping: 26, mass: 0.9 } as const;

const v = {
  section: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: spring },
  } satisfies Variants,
  poster: {
    hidden: { opacity: 0, y: 22, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { ...spring, stiffness: 240, mass: 0.95 } },
  } satisfies Variants,
  content: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.08 } },
  } satisfies Variants,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function UpcomingShowScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const mv = (variants: Variants, amount = 0.2) =>
    reduced
      ? {}
      : { variants, initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount } };

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center overflow-hidden py-16 sm:py-20"
      aria-labelledby="show-heading"
    >
      {/* ── Bakgrunn ─────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={d.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-cynical-900/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_60%,rgba(3,7,18,0.75)_100%)]" />
      </div>

      {/* ── Innhold ───────────────────────────────────────────────────────── */}
      <motion.div
        {...mv(v.section, 0.15)}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/*
          Mobil:  poster øverst, tekst under  (stack)
          Desktop: poster venstre, tekst høyre  (grid)
          NB: ingen lg:order-reverse-triks her — rekkefølgen i markup-en
          er poster → tekst, som er riktig for skjermlesere og mobil.
        */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Poster ───────────────────────────────────────────────────── */}
          <motion.div {...mv(v.poster, 0.15)} className="relative">
            <div
              className={[
                // Mobil: litt smalere enn full bredde, sentrert
                // Desktop: venstrejustert
                "relative aspect-[2/3] max-w-[320px] sm:max-w-sm mx-auto lg:mx-0",
                "rounded-xl overflow-hidden",
                // Gull-border — forestillingens "farge" (vs torch for Jonas-seksjonen)
                "border-4 border-gold-500/40",
                "shadow-[0_0_60px_rgba(251,191,36,0.22)]",
                "hover:border-gold-500/60 hover:shadow-[0_0_80px_rgba(251,191,36,0.32)]",
                "motion-safe:transition-all motion-safe:duration-500",
                "transform-gpu",
              ].join(" ")}
            >
              <img
                src={d.poster}
                alt={`${d.title} — plakat`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={480}
                height={720}
              />

              {/* Gull-glow nedover */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Dekorative hjørner — teatralsk plakatpreg */}
              <div
                className="absolute top-0 left-0 w-14 h-14 border-t-[3px] border-l-[3px] border-gold-400/70 rounded-tl-lg"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 right-0 w-14 h-14 border-b-[3px] border-r-[3px] border-gold-400/70 rounded-br-lg"
                aria-hidden="true"
              />
            </div>

            {/* Ambient glow bak posteren */}
            {!reduced && (
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.18, 0.32, 0.18] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -z-10 bg-gold-500/12 blur-3xl rounded-xl"
                aria-hidden="true"
              />
            )}
          </motion.div>

          {/* ── Tekst ────────────────────────────────────────────────────── */}
          <motion.div
            {...mv(v.content, 0.15)}
            className="space-y-5 lg:space-y-6"
          >
            {/* Eyebrow */}
            <p className="eyebrow text-gold-400/80 text-[0.7rem] sm:text-xs">
              {d.eyebrow}
            </p>

            <h2
              id="show-heading"
              className={[
                "h2 xl:text-[clamp(2.375rem,1.8rem+1.5vw,3rem)]",
                "uppercase tracking-[0.05em]",
                "text-white",
                // Subtil gull-glow — antyder forestillingens farge uten å overdrive
                "drop-shadow-[0_0_22px_rgba(251,191,36,0.18)]",
              ].join(" ")}
            >
              {d.title}
            </h2>

            {/* Meta — genre, aldersgrense, datoer */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Genre-badge */}
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gold-500/12 border border-gold-500/25 text-gold-300 text-xs font-medium tracking-wide">
                {d.genre}
              </span>
              {/* Aldersgrense */}
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/6 border border-white/12 text-cynical-200 text-xs font-medium tracking-wide">
                {d.ageRating}
              </span>
              {/* Separator */}
              <span className="text-cynical-600 text-xs" aria-hidden="true">·</span>
              {/* Datoer */}
              <span className="text-cynical-300 text-sm font-medium">{d.dates}</span>
            </div>

            {/* Beskrivelse */}
            <p className="text-cynical-100/85 text-[0.9375rem] lg:text-base leading-relaxed max-w-prose">
              {d.description}
            </p>

            {/* Highlights-grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {d.highlights.map((highlight, idx) => (
                <div
                  key={`${highlight}-${idx}`}
                  className={[
                    "flex items-center gap-3",
                    "px-3 py-2.5 sm:p-3",
                    "rounded-lg",
                    "bg-cynical-800/50 border border-gold-500/15",
                    "hover:bg-cynical-800/70 hover:border-gold-500/28",
                    "motion-safe:transition-colors motion-safe:duration-200",
                    "md:backdrop-blur-sm",
                  ].join(" ")}
                >
                  {/* Gull-dot */}
                  <div
                    className="shrink-0 w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_6px_rgba(251,191,36,0.55)]"
                    aria-hidden="true"
                  />
                  <span className="text-gold-200 text-sm font-medium leading-snug">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3">
              {/* <Button
                asChild
                variant="torch"
                size="lg"
                withShine
                withPulse={!reduced}
                className="w-full sm:w-auto justify-center"
              >
                <a href={d.ctaLink} target="_blank" rel="noopener noreferrer">
                  Kjøp billetter
                </a>
              </Button> */}

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto justify-center bg-cynical-900/20"
              >
                <a href="/om-forestillingen">
                  Les mer om forestillingen
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}