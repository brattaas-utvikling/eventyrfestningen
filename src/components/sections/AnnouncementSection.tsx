// src/components/sections/AnnouncementSection.tsx
import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { trackTicketClick } from "@/lib/analytics";
// ─── Data ─────────────────────────────────────────────────────────────────────

const d = {
  eyebrow: "Kunngjøring",
  title: "Årets Oberst Krebs!",
  intro:
    "I juli er Oberst Krebs tilbake på Kongsvinger festning, hvor en skotsk teatertrupp igjen lager trøbbel for våre venner ved festningsmurene. Nå er vi skikkelig begeistret for å kunne dele en nyhet vi har gledet oss til å fortelle dere:",
  highlight: "Jonas Strand Gravli er årets Oberst Krebs!",
  paragraphs: [
    "Jonas (34) fra Nord-Odal har vært fast ansatt på Nationaltheatret i flere år, og han har spilt alt fra Shakespeare til Thorbjørn Egner. Som Bakergutten i Dyrene i Hakkebakkeskogen hadde han barna i sin hule hånd. Som Ole i Reisen til julestjernen skapte han julefølelse selv midt på sommeren. Sist vi så han var Jonas aktuell som Audun i NRK-serien «Ølhunden Berit».",
    "Jonas har stor kapasitet med sterke lokale røtter. Han har evnen til å være både morsom og gripende, ofte i samme scene! Sommeren 2025 ble han kjent med Oberst Krebs univers, og sommeren 2026 skal han spille selveste Obersten selv!",
    "Nesten 11.000 har allerede sett Oberst Krebs-forestillingene de siste årene. Mange har vært der flere ganger - og det med god grunn!",
  ],
  image: "/assets/landing/jonas.webp",
  imageAlt: "Jonas Strand Gravli som Oberst Krebs",
  bgImage: "/assets/landing/plakat_bakgrunn.png",
  cta: { href: "https://eventyrfestningen.ticketco.events/no/nb", label: "Kjøp billetter" },
  secondary: { href: "/om-forestillingen", label: "Les mer om forestillingen" },
} as const;

// ─── Motion ───────────────────────────────────────────────────────────────────

const spring = { type: "spring", stiffness: 220, damping: 26, mass: 0.9 } as const;

const v = {
  section:  { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: spring } } satisfies Variants,
  image:    { hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1, transition: { ...spring, stiffness: 200 } } } satisfies Variants,
  content:  { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.06 } } } satisfies Variants,
  stagger:  { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { ...spring, delay: 0.18 } } } satisfies Variants,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function AnnouncementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const mv = (variants: Variants, amount = 0.15) =>
    reduced
      ? {}
      : { variants, initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount } };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden mt-3 lg:mt-6"
      aria-labelledby="announcement-heading"
    >

      <div className="lg:hidden">

        {/* ── Plakatbilde med overlappende tittel ──────────────────────── */}
        <motion.div {...mv(v.image, 0.1)} className="relative">

          {/* Bilde */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4]">
            <img
              src={d.image}
              alt={d.imageAlt}
              className="w-full h-full object-cover object-top"
              loading="eager"
              decoding="async"
              width={600}
              height={750}
            />

            {/* Gradient-fade: transparent øverst → solid cynical-900 nederst */}
            <div
              className="absolute inset-0 bg-gradient-to-t
                from-cynical-900 via-[rgba(23,23,23,0.5)_55%] to-transparent"
              aria-hidden="true"
            />

            {/* Sidegradienter — "trykker" bildet inn i mørket */}
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,23,23,0.35)_0%,transparent_18%,transparent_82%,rgba(23,23,23,0.35)_100%)]"
              aria-hidden="true"
            />

            {/* Subtil torch-tint — varmer opp */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-torch-600/10 via-transparent to-transparent mix-blend-screen"
              aria-hidden="true"
            />
          </div>

          {/* Tittelblokk — overlapper bildet nedenfra (plakat-stil) */}
          <motion.div
            {...mv(v.content, 0.2)}
            className="absolute bottom-0 left-0 right-0 px-5 pb-6 pt-24"
          >
            <p className="eyebrow text-torch-400/80 text-[0.65rem] mb-2 tracking-[0.18em]">
              {d.eyebrow}
            </p>
            <h2
              id="announcement-heading"
              className={[
                "font-heading uppercase",
                "text-[clamp(2rem,8vw,2.75rem)]",
                "tracking-[0.06em] leading-[0.97]",
                "text-white",
                "drop-shadow-[0_2px_32px_rgba(251,191,36,0.3)]",
              ].join(" ")}
            >
              {d.title}
            </h2>
          </motion.div>

          {/* Torch-skillelinje med glow */}
          <div className="relative h-[2px]" aria-hidden="true">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-torch-500/75 to-transparent" />
            <div className="absolute inset-x-[20%] top-0 h-[8px] bg-torch-500/25 blur-md" />
          </div>
        </motion.div>

        {/* ── Tekstinnhold — "programlapp" under plakaten ──────────────── */}
        <motion.div
          {...mv(v.stagger, 0.1)}
          className="relative bg-cynical-900 px-5 pt-7 pb-14"
        >
          {/* Ambient torch-glow øverst */}
          <div
            className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-torch-500/8 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative space-y-5 max-w-prose">

            {/* Highlight — primær nyhet, gull og stor */}
            <p className={[
              "font-heading text-gold-300",
              "text-[clamp(1.375rem,5.5vw,1.875rem)]",
              "leading-[1.1] tracking-[-0.01em]",
              "drop-shadow-[0_0_14px_rgba(251,191,36,0.22)]",
            ].join(" ")}>
              {d.highlight}
            </p>

            {/* Intro */}
            <p className="text-cynical-100/85 text-[0.9375rem] leading-relaxed">
              {d.intro}
            </p>

            {/* Avsnitt — nedtonet */}
            <div className="space-y-3 pt-1">
              {d.paragraphs.map((p, i) => (
                <p key={i} className="text-cynical-300/80 text-sm leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative flex flex-col gap-3 pt-7">
            <Button
              asChild
              variant="torch"
              size="lg"
              caps
              withShine
              withPulse={!reduced}
              className="w-full justify-center text-base"
            >
              <a href={d.cta.href} target="_blank" rel="noopener noreferrer" onClick={() => trackTicketClick("hero_main", "home")}>
                {d.cta.label}
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full justify-center"
            >
              <a href={d.secondary.href}>{d.secondary.label}</a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          DESKTOP  (lg+)  — Side-ved-side grid (uendret)
          ════════════════════════════════════════════════════════════════ */}

      <div className="absolute inset-0 z-0 hidden lg:block" aria-hidden="true">
        <img
          src={d.bgImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-cynical-900/88" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,transparent_0%,transparent_55%,rgba(3,7,18,0.8)_100%)]" />
      </div>

      <motion.div
        {...mv(v.section)}
        className="hidden lg:block relative z-20 w-full max-w-7xl mx-auto px-8 py-20"
      >
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 xl:gap-20 items-center">

          {/* Tekst */}
          <motion.div {...mv(v.content)} className="space-y-7">
            <p className="eyebrow text-torch-300/90 text-[0.7rem] sm:text-xs">{d.eyebrow}</p>

            <h2
              id="announcement-heading"
              className="h2 xl:text-[clamp(2.375rem,1.9rem+1.5vw,3.25rem)] uppercase tracking-[0.06em] text-white drop-shadow-[0_0_24px_rgba(251,191,36,0.25)]"
            >
              {d.title}
            </h2>

            <div className="space-y-5 max-w-prose">
              <p className="lead text-white/90">{d.intro}</p>

              <p className="font-heading text-gold-300 text-[clamp(1.75rem,1.4rem+1vw,2.5rem)] leading-[1.08] tracking-[-0.01em] drop-shadow-[0_0_18px_rgba(251,191,36,0.22)]">
                {d.highlight}
              </p>

              {d.paragraphs.map((p, i) => (
                <p key={i} className="text-white/85 text-base lg:text-[1.0625rem] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <Button asChild variant="torch" size="xl" caps withShine withPulse={!reduced}>
                <a href={d.cta.href} target="_blank" rel="noopener noreferrer" onClick={() => trackTicketClick("hero_main", "home")}>
                  {d.cta.label}
                </a>
              </Button>

              <Button asChild variant="outline" size="xl" className="bg-cynical-900/20">
                <a href={d.secondary.href}>{d.secondary.label}</a>
              </Button>
            </div>
          </motion.div>

          {/* Bilde */}
          <motion.div {...mv(v.image)} className="relative">
            <div className="relative aspect-[4/5] max-w-md ml-auto rounded-xl overflow-hidden border-4 border-torch-500/40 shadow-[0_0_60px_rgba(255,161,35,0.25)] hover:border-torch-500/60 hover:shadow-[0_0_80px_rgba(255,161,35,0.35)] motion-safe:transition-all motion-safe:duration-500 transform-gpu">
              <img
                src={d.image}
                alt={d.imageAlt}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                width={480}
                height={600}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-torch-500/10 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {!reduced && (
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.22, 0.38, 0.22] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -z-10 bg-torch-500/16 blur-3xl rounded-xl"
                aria-hidden="true"
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}