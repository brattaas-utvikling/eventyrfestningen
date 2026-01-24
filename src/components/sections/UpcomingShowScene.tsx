// routes/landing/sections/UpcomingShowScene.tsx
import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { useReducedMotion } from "@/hooks/useRedusedMotion";

// Embedded data
const upcomingShowData = {
  title: "Oberst Krebs og de Skotske spionene",
  genre: "Familiemusikal",
  ageRating: "5+",
  description:
    "En skotsk teatertrupp står utenfor festningsmurene, men de har ikke bare kommet den lange veien til Kongsvinger for å underholde… Du kan forvente en forestilling stappfull av av magi, spenning, humor, dans og fengende musikk når «Oberst Krebs og de skotske spionene» spilles 2. til 11. juli på Kongsvinger festning.",
  poster: "/assets/landing/show-poster.jpg",
  backgroundImage: "/assets/landing/festningskuliss.webp",
  dates: "Juli 2026",
  ctaLink: "https://eventyrfestningen.ticketco.events/no/nb",
  highlights: [
    "Kveld med gåsehud",
    "30+ skuespillere og dansere",
    "Spektakulær scenografi",
    "Humor for alle",
  ],
} as const;

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.9,
    },
  },
};

const posterReveal: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 26,
      mass: 0.95,
    },
  },
};

const infoReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.9,
      delay: 0.08, // ✅ “timing riktig” etter poster
    },
  },
};

export default function UpcomingShowScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden py-20 bg-navy-950"
      aria-label="Kommende forestilling"
    >
      {/* Background (statisk, stabil) */}
      <div className="absolute inset-0 z-0">
        <img
          src={upcomingShowData.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* Dark overlays for readability */}
        <div className="absolute inset-0 bg-navy-900/85" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_60%,rgba(3,7,18,0.75)_100%)]"
          aria-hidden="true"
        />
      </div>

      {/* Content wrapper – one stable reveal */}
      <motion.div
        variants={sectionReveal}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Poster – separate reveal (optional) */}
          <motion.div
            variants={posterReveal}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.25 }}
            className="relative"
          >
            <div
              className="relative aspect-[2/3] max-w-md mx-auto lg:mx-0 rounded-xl overflow-hidden 
                         border-4 border-gold-500/40 shadow-[0_0_60px_rgba(251,191,36,0.25)]
                         hover:border-gold-500/60 hover:shadow-[0_0_80px_rgba(251,191,36,0.35)]
                         transition-all duration-500 transform-gpu"
            >
              <img
                src={upcomingShowData.poster}
                alt={`${upcomingShowData.title} plakat`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div
                className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold-500 rounded-tl-lg"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold-500 rounded-br-lg"
                aria-hidden="true"
              />
            </div>

            {/* Glow (disable for reduced motion / perf) */}
            {!prefersReducedMotion && (
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.22, 0.38, 0.22] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -z-10 bg-gold-500/16 blur-3xl rounded-xl"
                aria-hidden="true"
              />
            )}
          </motion.div>

          {/* Right: Info – one reveal, no per-item animations */}
          <motion.div
            variants={infoReveal}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block text-torch-300/90 font-sans text-sm uppercase tracking-widest">
                Kommende forestilling
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold-400 leading-tight
                        drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]"
            >
              {upcomingShowData.title}
            </h2>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-white/80 font-sans text-sm">
              <span>
                {upcomingShowData.genre}
              </span>
              <span>
                {upcomingShowData.ageRating}
              </span>
              <span>{upcomingShowData.dates}</span>
            </div>

            {/* Description */}
            <div className="prose lg:prose-lg xl:prose-xl prose-invert max-w-2xl prose-p:text-white/80 prose-p:leading-relaxed">
              <p>{upcomingShowData.description}</p>
            </div>

            {/* Highlights – NO animation */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {upcomingShowData.highlights.map((highlight, idx) => (
                <div
                  key={`${highlight}-${idx}`}
                  className="flex items-center gap-3 text-gold-300 font-sans font-medium text-sm sm:text-base
                             p-3 bg-navy-800/50 md:backdrop-blur-sm rounded-lg border border-gold-500/20
                             hover:bg-navy-800/70 hover:border-gold-500/30 transition-all"
                >
                  <div className="w-2 h-2 bg-gold-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={upcomingShowData.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "torch", size: "xl" }),
                  "group relative overflow-hidden inline-flex w-full sm:w-auto"
                )}
              >
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                             translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"
                  aria-hidden="true"
                />
                <span className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                  Kjøp billetter
                </span>
              </a>

              <a
                href="/om-forestillingen"
                className={cn(
                  buttonVariants({ variant: "outline", size: "xl" }),
                  "border-2 border-gold-400/60 text-white hover:bg-gold-400/10 hover:border-gold-400 transition-all md:backdrop-blur-sm bg-navy-900/20 w-full sm:w-auto"
                )}
              >
                Les mer om forestillingen
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
