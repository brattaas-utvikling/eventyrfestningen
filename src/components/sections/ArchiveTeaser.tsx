import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

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

export default function ArchiveTeaser({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "40%"]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.15]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "-18%"]
  );

  const sortedYears = useMemo(
    () => [...data.highlightYears].sort((a, b) => parseInt(a) - parseInt(b)),
    [data.highlightYears]
  );

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <motion.img
          src={data.previewImage}
          alt="" // dekorativ bakgrunn
          className="w-full h-full object-cover"
          style={{ scale: imageScale }}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cynical-950/70 via-cynical-950/85 to-cynical-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_55%,rgba(3,7,18,0.85)_100%)]" />
        
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 min-h-[100svh] flex flex-col justify-between py-16 sm:py-20 px-4"
        style={{ y: contentY }}
      >
        <div className="text-center max-w-5xl mx-auto">
        <span className="text-torch-400 font-sans text-xs sm:text-sm uppercase tracking-widest">
            {data.subtitle}
          </span>

          {/* <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-gold-400 mb-4 sm:mb-6 leading-tight drop-shadow-[0_0_30px_rgba(251,191,36,0.35)]">
            {data.title}
          </h2> */}
          <h2
            className="
              font-display text-5xl sm:text-6xl md:text-7xl
              bg-gradient-to-b from-gold-200 via-gold-400 to-gold-600
              bg-clip-text text-transparent
              drop-shadow-[0_10px_35px_rgba(0,0,0,0.55)]
              mt-4
            "
            style={{
              WebkitTextStroke: "1px rgba(20,14,8,0.35)",
            }}
          >
            {data.title}
          </h2>
        </div>

        <div className="max-w-6xl mx-auto w-full">
        <div className="prose prose-lg prose-invert max-w-none prose-p:text-white/80 prose-p:leading-relaxed text-center mx-auto mb-8">
            <p>
            {data.description}
            </p>
            </div>
        {/* <p className="mb-8 text-white text-center text-base sm:text-lg md:text-xl font-sans font-light max-w-2xl mx-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
            {data.description}
          </p> */}
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10 sm:mb-12"
          >
            <div className="relative pb-14 sm:pb-16">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
              <div className="relative flex justify-between items-start px-2 sm:px-4">
                {sortedYears.map((year, idx) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, scale: 0.85, y: 16 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.15 + idx * 0.06,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="relative flex flex-col items-center"
                  >
                    <div
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-gold-500 rounded-full border-4 border-cynical-900
                                 shadow-[0_0_18px_rgba(251,191,36,0.7)] mb-3"
                      aria-hidden="true"
                    />
                    <div className="text-gold-400 font-display font-bold text-base sm:text-lg md:text-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
                      {year}
                    </div>

                    {!prefersReducedMotion && (
                      <motion.div
                        className="absolute top-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gold-500/25 blur-xl pointer-events-none"
                        animate={{ scale: [1, 1.45, 1], opacity: [0.25, 0.55, 0.25] }}
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-center"
          >
            <Link
              to={data.ctaLink}
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "group relative overflow-hidden text-lg sm:text-xl px-10 sm:px-12 py-5 sm:py-6"
              )}
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"
                aria-hidden="true"
              />
              <span className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                {data.ctaText}
              </span>
              <ArrowRight className="relative w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative corners */}
      <div className="absolute inset-0 pointer-events-none z-20" aria-hidden="true">
        <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 border-t-4 border-l-4 border-gold-500/35" />
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 border-t-4 border-r-4 border-gold-500/35" />
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 border-b-4 border-l-4 border-gold-500/35" />
        <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 border-b-4 border-r-4 border-gold-500/35" />
      </div>
    </section>
  );
}
