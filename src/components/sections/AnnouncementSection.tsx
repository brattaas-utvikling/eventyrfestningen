// src/components/sections/AnnouncementSection.tsx (BREDERE TEKST PÅ DESKTOP)
import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { useReducedMotion } from "@/hooks/useRedusedMotion";

// Embedded data
const announcementData = {
  title: "Årets Oberst Krebs!",
  intro: "I juli er Oberst Krebs tilbake på Kongsvinger festning, hvor en skotsk teatertrupp igjen lager trøbbel for våre venner ved festningsmurene. Nå er vi skikkelig begeistret for å kunne dele en nyhet vi har gledet oss til å fortelle dere:",
  highlight: "Jonas Strand Gravli er årets Oberst Krebs!",
  sections: [
    {
      paragraphs: [
        "Jonas (34) fra Nord-Odal har vært fast ansatt på Nationaltheatret i flere år, og han har spilt alt fra Shakespeare til Thorbjørn Egner. Som Bakergutten i Dyrene i Hakkebakkeskogen hadde han barna i sin hule hånd. Som Ole i Reisen til julestjernen skapte han julefølelse selv midt på sommeren. Sist vi så han var Jonas aktuell som Audun i NRK-serien «Ølhunden Berit».",
        "Jonas har stor kapasitet med sterke lokale røtter. Han har evnen til å være både morsom og gripende, ofte i samme scene! Sommeren 2025 ble han kjent med Oberst Krebs univers, og sommeren 2026 skal han spille selveste Obersten selv!",
        "Nesten 11.000 har allerede sett Oberst Krebs-forestillingene de siste årene. Mange har vært der flere ganger - og det med god grunn!"
      ]
    }
  ],
  image: "/assets/landing/jonas.webp",
  backgroundImage: "/assets/landing/plakat_bakgrunn.png",
  ctaLink: "https://eventyrfestningen.ticketco.events/no/nb",
  ctaText: "Kjøp billetter",
  secondaryLink: "/om-forestillingen",
  secondaryText: "Les mer om forestillingen",
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

const imageReveal: Variants = {
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

const contentReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.9,
      delay: 0.08,
    },
  },
};

export default function AnnouncementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden mt-3 lg:mt-6 py-20 bg-navy-950"
      aria-label="Jonas Strand Gravli kunngjøring"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={announcementData.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-navy-900/85" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_60%,rgba(3,7,18,0.75)_100%)]"
          aria-hidden="true"
        />
      </div>

      {/* Content wrapper */}
      <motion.div
        variants={sectionReveal}
        initial={prefersReducedMotion ? false : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4"
      >
        {/* Grid - ASYMMETRISK: 60% tekst / 40% bilde på desktop */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Left på desktop: Tekst (60% bredde) */}
          <motion.div
            variants={contentReveal}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-5 lg:space-y-6 order-2 lg:order-1"
          >
            {/* Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block text-torch-300/90 font-sans text-sm uppercase tracking-widest">
                Kunngjøring
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-whiteleading-tight
                        drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]"
            >
              {announcementData.title}
            </h2>

            {/* Content */}
            <div className="space-y-4 lg:space-y-5 text-base lg:text-lg text-navy-50 leading-relaxed">
              {/* Intro */}
              <p className="text-navy-50/90">
                {announcementData.intro}
              </p>

              {/* Highlight */}
              <p className="text-xl lg:text-4xl font-medium font-display   text-gold-400 leading-tight
                        drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                {announcementData.highlight}
              </p>

              {/* Sections */}
              {announcementData.sections.map((section, idx) => (
                <div key={idx} className="space-y-3 lg:space-y-4">
                  {/* Section paragraphs */}
                  {section.paragraphs.map((paragraph, pIdx) => (
                    <p key={pIdx} className="text-navy-50/90">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={announcementData.ctaLink}
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
                  {announcementData.ctaText}
                </span>
              </a>

              <a
                href={announcementData.secondaryLink}
                className={cn(
                  buttonVariants({ variant: "outline", size: "xl" }),
                  "border-2 border-gold-400/60 text-white hover:bg-gold-400/10 hover:border-gold-400 transition-all md:backdrop-blur-sm bg-navy-900/20 w-full sm:w-auto"
                )}
              >
                {announcementData.secondaryText}
              </a>
            </div>
          </motion.div>

          {/* Right på desktop / Top på mobil: Bilde (40% bredde) */}
          <motion.div
            variants={imageReveal}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.25 }}
            className="relative order-1 lg:order-2"
          >
            <div
              className="relative aspect-[4/5] max-w-md mx-auto lg:ml-auto lg:mr-0 rounded-xl overflow-hidden 
                         border-4 border-torch-500/40 shadow-[0_0_60px_rgba(255,161,35,0.25)]
                         hover:border-torch-500/60 hover:shadow-[0_0_80px_rgba(255,161,35,0.35)]
                         transition-all duration-500 transform-gpu"
            >
              <img
                src={announcementData.image}
                alt="Jonas Strand Gravli som Oberst Krebs"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-torch-500/10 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

            </div>

            {/* Glow effect */}
            {!prefersReducedMotion && (
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