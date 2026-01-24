import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface Stat {
  number: string;
  label: string;
}

export interface HistoryData {
  yearsActive: string;
  title: string;
  summary: string;
  vintageImage: string;
  stats: readonly Stat[];
  ctaText: string;
  ctaLink: string;
}

interface Props {
  data: HistoryData;
}

/**
 * CountUpPlain:
 * - No Framer Motion
 * - No React state updates per frame
 * - Updates textContent only (fast)
 * - Starts when startSignal flips > 0
 */
function CountUpPlain({
  end,
  suffix = "",
  duration = 1200, // ms
  startSignal,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  startSignal: number;
}) {
  const elRef = useRef<HTMLSpanElement>(null);

  const reservedCh = useMemo(() => {
    const endDigits = String(Math.max(0, Math.trunc(end))).length;
    return endDigits + suffix.length;
  }, [end, suffix]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Initial paint
    el.textContent = `0${suffix}`;

    if (startSignal === 0) return;

    const start = 0;
    const startTime = performance.now();
    let raf = 0;

    const tick = (t: number) => {
      const p = Math.min((t - startTime) / duration, 1);
      const value = Math.round(start + (end - start) * p);
      el.textContent = `${value}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startSignal, end, suffix, duration]);

  return (
    <span
      ref={elRef}
      className="inline-block text-center"
      style={{ minWidth: `${reservedCh}ch` }}
    />
  );
}

export default function HistoryScene({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // ---- Sticky image parallax (kept, but smooth + disabled on reduced motion) ----
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const imageScale = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.02, 1.12]
  );

  const imageY = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-2%", "2%"]
  );

  const imageOpacity = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [0.92, 1, 0.92]
  );

  const parsedStats = useMemo(() => {
    return data.stats.map((s) => {
      const raw = s.number ?? "";
      const numValue = parseInt(raw.replace(/\D/g, ""), 10) || 0;
      const hasPlus = raw.includes("+");
      return { ...s, numValue, hasPlus };
    });
  }, [data.stats]);

  // ---- Fade-in + inView gating for countups ----
  const statsWrapRef = useRef<HTMLDivElement>(null);
  const [fadeDone, setFadeDone] = useState(prefersReducedMotion);
  const [statsInViewOnce, setStatsInViewOnce] = useState(false);
  const [startSignal, setStartSignal] = useState(0);

  // Observe stats wrapper (native IntersectionObserver, stable)
  useEffect(() => {
    const el = statsWrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInViewOnce(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Start countups only when:
  // 1) content fade has finished
  // 2) stats block is in view
  // 3) reduced motion is off
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!fadeDone) return;
    if (!statsInViewOnce) return;

    setStartSignal(1); // fire once
  }, [fadeDone, statsInViewOnce, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-900 py-16 sm:py-20 overflow-hidden"
      aria-label="Historie"
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[url('/textures/old-paper.png')] bg-repeat opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Content: one fade only (no y translate) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onAnimationComplete={() => setFadeDone(true)}
            className="space-y-7 lg:pt-6"
          >
            <div>
              <span className="text-torch-300/90 font-sans text-xs sm:text-sm uppercase tracking-widest">
                {data.title}
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-gold-400 mt-2 drop-shadow-[0_0_18px_rgba(251,191,36,0.25)]">
                {data.yearsActive}
              </h2>
            </div>

            <div className="prose lg:prose-lg xl:prose-xl prose-invert max-w-2xl prose-p:text-white/80 prose-p:leading-relaxed">
              <p>{data.summary}</p>
            </div>

            {/* Stats: NO motion, NO blur (perf). Starts after fade + inView */}
            <div ref={statsWrapRef} className="grid grid-cols-2 gap-4 sm:gap-6 pt-2">
              {parsedStats.map((stat, idx) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className="text-center p-4 sm:p-6 bg-navy-800/60 rounded-lg border border-gold-500/20
                             hover:border-gold-500/35 hover:bg-navy-800/70 transition-all duration-300"
                >
                  <div className="font-display tabular-nums leading-none min-h-[1.1em] text-3xl sm:text-4xl lg:text-5xl text-gold-400 mb-2">
                    {prefersReducedMotion ? (
                      <span className="inline-block">
                        {stat.numValue}
                        {stat.hasPlus ? "+" : ""}
                      </span>
                    ) : (
                      <CountUpPlain
                        end={stat.numValue}
                        suffix={stat.hasPlus ? "+" : ""}
                        duration={1200}
                        startSignal={startSignal}
                      />
                    )}
                  </div>

                  <div className="text-white/60 text-[11px] sm:text-xs font-sans uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex justify-end pt-2">
              <Link
                to={data.ctaLink}
                className="group inline-flex items-center gap-2 text-gold-300 hover:text-gold-200 font-sans font-medium text-base transition-colors
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 rounded-sm"
              >
                <span className="border-b-2 border-gold-500/30 group-hover:border-gold-400/60 transition-colors">
                  {data.ctaText}
                </span>
                <ArrowRight
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>

          {/* Sticky Image Column */}
          <div className="relative lg:sticky lg:top-24">
            <div className="relative">
              <div
                className="relative aspect-square max-w-lg mx-auto rounded-xl overflow-hidden
                           border-4 border-gold-500/40 shadow-[0_0_60px_rgba(251,191,36,0.22)]
                           hover:border-gold-500/60 hover:shadow-[0_0_80px_rgba(251,191,36,0.3)]
                           transition-all duration-500"
                style={{ transform: "translateZ(0)", willChange: "transform" }}
              >
                <motion.img
                  src={data.vintageImage}
                  alt="Et glimt fra Eventyrfestningens historie"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  style={{
                    scale: imageScale,
                    y: imageY,
                    opacity: imageOpacity,
                    filter: "sepia(0.6) contrast(1.1)",
                    transform: "translateZ(0)",
                    willChange: "transform, opacity",
                  }}
                />

                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_55%,rgba(15,23,42,0.45)_100%)] pointer-events-none"
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

              {!prefersReducedMotion && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.22, 0.42, 0.22] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 -z-10 bg-gold-500/18 blur-3xl rounded-xl"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block h-16" aria-hidden="true" />
    </section>
  );
}
