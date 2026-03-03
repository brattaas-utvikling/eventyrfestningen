// routes/landing/sections/HistoryScene.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── CountUpPlain ─────────────────────────────────────────────────────────────
// Beholdt 100% uendret — DOM-direkte oppdatering uten React state per frame.
// Starter kun når startSignal > 0 (etter fade + inView).

function CountUpPlain({
  end,
  suffix = "",
  duration = 1200,
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

    el.textContent = `0${suffix}`;
    if (startSignal === 0) return;

    const startTime = performance.now();
    let raf = 0;

    const tick = (t: number) => {
      const p = Math.min((t - startTime) / duration, 1);
      const value = Math.round(end * p);
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function HistoryScene({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // ── Parallax på bilde (beholdt uendret) ──────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const imageScale   = useTransform(smoothProgress, [0, 1], reduced ? [1, 1]             : [1.02, 1.12]);
  const imageY       = useTransform(smoothProgress, [0, 1], reduced ? ["0%", "0%"]       : ["-2%", "2%"]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.5, 1], reduced ? [1, 1, 1]     : [0.92, 1, 0.92]);

  // ── Stats parsing (beholdt uendret) ──────────────────────────────────────
  const parsedStats = useMemo(() =>
    data.stats.map((s) => {
      const raw = s.number ?? "";
      const numValue = parseInt(raw.replace(/\D/g, ""), 10) || 0;
      const hasPlus = raw.includes("+");
      return { ...s, numValue, hasPlus };
    }),
  [data.stats]);

  // ── CountUp-gating (beholdt uendret) ─────────────────────────────────────
  const statsWrapRef    = useRef<HTMLDivElement>(null);
  const [fadeDone,      setFadeDone]      = useState(reduced);
  const [statsInView,   setStatsInView]   = useState(false);
  const [startSignal,   setStartSignal]   = useState(0);

  useEffect(() => {
    const el = statsWrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsInView(true); io.disconnect(); } },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !fadeDone || !statsInView) return;
    setStartSignal(1);
  }, [fadeDone, statsInView, reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cynical-900 py-16 sm:py-20 lg:py-24 overflow-hidden"
      aria-labelledby="history-heading"
    >
      {/* Papirtekstur-overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-[url('/textures/old-paper.png')] bg-repeat" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Venstre: innhold ─────────────────────────────────────────── */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onAnimationComplete={() => setFadeDone(true)}
            className="space-y-6 lg:space-y-7 lg:pt-6"
          >
            {/* Eyebrow + "årstall" — bruker .eyebrow utility fra global.css */}
            <div>
              <p className="eyebrow text-torch-300/90 text-[0.7rem] sm:text-xs mb-2">
                {data.title}
              </p>

              {/*
                yearsActive (f.eks. "15 år") — dette er det visuelle ankeret i seksjonen.
                Hvit med subtil gull-glow, konsistent med h2 i de foregående seksjonene.
                font-heading = DM Serif Display fra global.css.
              */}
              <h2
                id="history-heading"
                className={[
                  "font-heading",
                  "text-4xl sm:text-5xl lg:text-6xl",
                  "text-white",
                  "leading-[1.05] tracking-[-0.01em]",
                  "drop-shadow-[0_0_22px_rgba(251,191,36,0.2)]",
                ].join(" ")}
              >
                {data.yearsActive}
              </h2>
            </div>

            {/* Sammendrag */}
            <p className="text-cynical-100/85 text-[0.9375rem] lg:text-base leading-relaxed max-w-prose">
              {data.summary}
            </p>

            {/* Stats-grid — CountUp beholdt 100% */}
            <div
              ref={statsWrapRef}
              className="grid grid-cols-2 gap-3 sm:gap-4 pt-1"
            >
              {parsedStats.map((stat, idx) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className={[
                    "flex flex-col items-center justify-center text-center",
                    "p-4 sm:p-5",
                    "bg-cynical-800/60 rounded-lg",
                    "border border-gold-500/18",
                    "hover:border-gold-500/35 hover:bg-cynical-800/75",
                    "motion-safe:transition-colors motion-safe:duration-200",
                  ].join(" ")}
                >
                  {/* Tall */}
                  <div className="font-heading tabular-nums leading-none text-3xl sm:text-4xl lg:text-5xl text-gold-400 mb-1.5">
                    {reduced ? (
                      <span className="inline-block">
                        {stat.numValue}{stat.hasPlus ? "+" : ""}
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

                  {/* Label */}
                  <div className="eyebrow text-cynical-400 text-[0.625rem] sm:text-[0.6875rem]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA — tekstlenke med pil */}
            <div className="flex justify-end pt-1">
              <Link
                to={data.ctaLink}
                className={[
                  "group inline-flex items-center gap-2",
                  "text-gold-300 hover:text-gold-200",
                  "font-body font-medium text-base",
                  "motion-safe:transition-colors motion-safe:duration-200",
                  // Focus-ring konsistent med design system
                  "focus:outline-none focus-visible:ring-2",
                  "focus-visible:ring-gold-400 focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-cynical-900 rounded-sm",
                ].join(" ")}
              >
                <span className="border-b-2 border-gold-500/30 group-hover:border-gold-400/60 motion-safe:transition-colors motion-safe:duration-200">
                  {data.ctaText}
                </span>
                <ArrowRight
                  className="w-4 h-4 motion-safe:group-hover:translate-x-1 motion-safe:transition-transform motion-safe:duration-200"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>

          {/* ── Høyre: sticky bilde med parallax ─────────────────────────── */}
          <div className="relative lg:sticky lg:top-24">
            <div className="relative">
              <div
                className={[
                  "relative aspect-square max-w-lg mx-auto",
                  "rounded-xl overflow-hidden",
                  "border-4 border-gold-500/40",
                  "shadow-[0_0_60px_rgba(251,191,36,0.22)]",
                  "hover:border-gold-500/60 hover:shadow-[0_0_80px_rgba(251,191,36,0.30)]",
                  "motion-safe:transition-all motion-safe:duration-500",
                ].join(" ")}
                style={{ transform: "translateZ(0)", willChange: "transform" }}
              >
                <motion.img
                  src={data.vintageImage}
                  alt="Et glimt fra Eventyrfestningens historie"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={600}
                  style={{
                    scale: imageScale,
                    y: imageY,
                    opacity: imageOpacity,
                    // Sepia + kontrast — vintage-preg
                    filter: "sepia(0.6) contrast(1.1)",
                    transform: "translateZ(0)",
                    willChange: "transform, opacity",
                  }}
                />

                {/* Vignett-overlay */}
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_55%,rgba(15,23,42,0.45)_100%)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Dekorative hjørner — gjenspeiler UpcomingShowScene */}
                <div
                  className="absolute top-0 left-0 w-14 h-14 border-t-[3px] border-l-[3px] border-gold-400/70 rounded-tl-lg"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 right-0 w-14 h-14 border-b-[3px] border-r-[3px] border-gold-400/70 rounded-br-lg"
                  aria-hidden="true"
                />
              </div>

              {/* Ambient glow bak bildet */}
              {!reduced && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.22, 0.42, 0.22] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 -z-10 bg-gold-500/16 blur-3xl rounded-xl"
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop-scrollpuffer for sticky-kolonne */}
      <div className="hidden lg:block h-16" aria-hidden="true" />
    </section>
  );
}