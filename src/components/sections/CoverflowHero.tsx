// src/components/sections/CoverflowHero.tsx
//
// Fullskjerm hero med coverflow-karusell — sirkulær, uendelig.
// Desktop: blurred bakgrunn per slide, tekst til venstre (40%) + 3D coverflow til høyre (60%).
// Mobil: Swiper coverflow med gradient-overlay, tittel + "mer info"-panel som glir opp.

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Slide {
  id: number;
  heading: string;
  body: string;
  image: string;
  backgroundImage: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    heading: "Krebs",
    body: "Med høye tanker om seg selv, en godtroende, høy hatt, og lite frykt for det uvisse, er Oberst Krebs den ultimate kommandant. Åpenhjertig slår han opp festningsmurene og byr gjerne på både fest og show – han har til og med laget en helt egen rutine. Han er, og blir helten fra Lier og Matrand.",
    image: "/media/krebs.webp",
    backgroundImage: "/media/bg-krebs.webp",
  },
  {
    id: 2,
    heading: "Duff",
    body: "Hva har De under kilten, frue? Duff skjuler en av verdens største hemmeligheter og er villig til å gjøre hva som helst for å oppnå det hun ønsker. I det ene øyeblikket er hun verdens søteste – i det andre smeller det så alvorlig at haggisen mister både lukt og smak.",
    image: "/media/duff.webp",
    backgroundImage: "/media/bg-skottene.webp",
  },
  {
    id: 3,
    heading: "Sado",
    body: "Uten å egentlig være redd for noe særlig, bekymrer Kaptein Sadolin seg for relativt mye. Bak den store hatten til Krebs lurer både engstelse, mistillit, vantro, ulykke og svømmeføtter. Utover det blir det både tysk ordbok og miniskjørt – og til og med en tur på dass.",
    image: "/media/sadolin.webp",
    backgroundImage: "/media/bg-sado.webp",
  },
  {
    id: 4,
    heading: "Aggie",
    body: "Aggie har vokst opp i tidenes gøyeste univers: et omreisende teater med dansere, buktalere, artisteri og mor og far som de største gjøglerne av alle. Hun er leken og åpen – men hva skjer når hun må velge mellom familien og hjertet sitt?",
    image: "/media/aggie.webp",
    backgroundImage: "/media/bg-skottene.webp",
  },
  {
    id: 5,
    heading: "Klara",
    body: "Med stort hjerte og evig pågangsmot går Klara på med alt hun har! Hun tør å skille seg ut, stå opp mot makta, og trosse det vonde og vanskelige. Frekk, noen ganger litt i overkant – men heldigvis får hun Fyllingen ut av nettingstrømpene og redder dagen.",
    image: "/media/klara.webp",
    backgroundImage: "/media/bg-klara.webp",
  },
  {
    id: 6,
    heading: "Duncan",
    body: "Moromann, entertainer, ulv i fåreklær? Duncan er en levende fest, enten det er som musikalartist, onkel i barnebursdag eller sirkusdirektør. Men under skjegget og bak flosshatten skjules en beinhard, kynisk og målrettet mann som overlever på å lure andre.",
    image: "/media/duncan.webp",
    backgroundImage: "/media/bg-skottene.webp",
  },
  
];

const TOTAL = SLIDES.length;

// ─── Sirkulær offset ──────────────────────────────────────────────────────────

function circularOffset(i: number, active: number): number {
  let offset = i - active;
  if (offset > Math.floor(TOTAL / 2)) offset -= TOTAL;
  if (offset < -Math.floor(TOTAL / 2)) offset += TOTAL;
  return offset;
}

// ─── 3D-transformasjon per offset ────────────────────────────────────────────

interface CardTransform {
  x: number;
  scale: number;
  rotateY: number;
  opacity: number;
  zIndex: number;
  overlayOpacity: number;
}

function getCardTransform(
  offset: number,
  reduced: boolean,
  spread = 250
): CardTransform {
  const abs = Math.abs(offset);
  if (abs > 2)
    return { x: 0, scale: 0, rotateY: 0, opacity: 0, zIndex: 0, overlayOpacity: 0 };

  const configs = {
    0: { scale: 1,    rotateY: 0,                          opacity: 1,    overlayOpacity: 0    },
    1: { scale: 0.8,  rotateY: reduced ? 0 : offset * 16,  opacity: 0.88, overlayOpacity: 0.5  },
    2: { scale: 0.65, rotateY: reduced ? 0 : offset * 24,  opacity: 0.4,  overlayOpacity: 0.75 },
  } as const;

  const cfg = configs[abs as 0 | 1 | 2];
  return { ...cfg, x: offset * spread, zIndex: 10 - abs };
}

// ─── Spring-konfig ────────────────────────────────────────────────────────────

const CARD_SPRING: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.85,
};

// ─── Komponent ────────────────────────────────────────────────────────────────

export function CoverflowHero() {
  const [active, setActive] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const reduced = useReducedMotion();
  const swiperRef = useRef<SwiperType | null>(null);

  const prev = useCallback(() => setActive((i) => (i - 1 + TOTAL) % TOTAL), []);
  const next = useCallback(() => setActive((i) => (i + 1) % TOTAL), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        if (e.key === "ArrowLeft") prev();
        else next();
      }
      if (e.key === "Escape" && infoOpen) setInfoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, infoOpen]);

  const slide = SLIDES[active] ?? SLIDES[0];

  return (
    <section
      className="relative bg-cynical-900 overflow-hidden h-svh"
      aria-label="Karakterbeskrivelser"
    >
      {/* ── Blurred bakgrunn per slide ─────────────────────────────────── */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${active}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <img
            src={slide.backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            style={{
              filter: "blur(8px) brightness(0.45) saturate(1.1)",
              transform: "scale(1.03)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient-overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(10,8,7,0.88) 0%, rgba(10,8,7,0.55) 40%, rgba(10,8,7,0.15) 70%, rgba(10,8,7,0.05) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════
          DESKTOP (md+)
          ══════════════════════════════════════════════════════ */}
      <div className="relative z-[2] hidden md:flex flex-col h-svh">
        <div className="flex flex-1 items-center pt-[72px]">

          {/* ── Venstre panel ───────────────────────────────── */}
          <div className="w-[40%] shrink-0 flex flex-col justify-center px-10 lg:px-14 xl:px-20">
            <div className="overflow-hidden mb-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h2
                  key={`h-${active}`}
                  className="h2 text-cynical-50"
                  initial={reduced ? {} : { y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduced ? {} : { y: -30, opacity: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  {slide.heading}
                </motion.h2>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`b-${active}`}
                className="lead text-cynical-200/90"
                initial={reduced ? {} : { y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduced ? {} : { y: -18, opacity: 0 }}
                transition={{ duration: 0.32, ease: "easeOut", delay: 0.06 }}
              >
                {slide.body}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* ── Høyre panel — coverflow ─────────────────────── */}
          <div className="w-[60%] flex flex-col items-center justify-center gap-6 overflow-hidden">
            <div
              className="flex items-center justify-center w-full"
              style={{ perspective: "1100px" }}
              aria-hidden="true"
            >
              <div className="relative flex items-center justify-center w-full h-[480px] lg:h-[520px] xl:h-[560px]">
                {SLIDES.map((s, i) => {
                  const offset = circularOffset(i, active);
                  if (Math.abs(offset) > 2) return null;
                  const { x, scale, rotateY, opacity, zIndex, overlayOpacity } =
                    getCardTransform(offset, reduced);

                  return (
                    <motion.div
                      key={s.id}
                      className="absolute"
                      style={{ zIndex }}
                      animate={{ x, scale, rotateY, opacity }}
                      transition={{
                        ...CARD_SPRING,
                        opacity: { duration: 0.25, ease: "easeOut" },
                      }}
                      whileHover={
                        reduced ? {} : { y: offset === 0 ? -10 : -5, transition: { duration: 0.2 } }
                      }
                      onClick={() => offset !== 0 && setActive(i)}
                      role={offset !== 0 ? "button" : undefined}
                      aria-label={offset !== 0 ? `Gå til ${s.heading}` : undefined}
                      tabIndex={offset !== 0 ? 0 : undefined}
                      onKeyDown={(e) => {
                        if (offset !== 0 && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          setActive(i);
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "relative overflow-hidden rounded-2xl",
                          "w-[220px] md:w-[260px] lg:w-[280px] xl:w-[300px] aspect-[3/4]",
                          offset !== 0 ? "cursor-pointer" : "cursor-default",
                          offset === 0 && "ring-2 ring-white/70"
                        )}
                        style={{
                          boxShadow:
                            offset === 0
                              ? "0 30px 70px rgba(0,0,0,0.8), 0 0 50px rgba(255,161,35,0.06)"
                              : "0 16px 40px rgba(0,0,0,0.5)",
                        }}
                      >
                        <img
                          src={s.image}
                          alt={s.heading}
                          className="w-full h-full object-cover"
                          draggable={false}
                          loading={Math.abs(offset) <= 1 ? "eager" : "lazy"}
                        />
                        <motion.div
                          className="absolute inset-0 bg-cynical-900 pointer-events-none"
                          animate={{ opacity: overlayOpacity }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        />
                        {offset === 0 && (
                          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-cynical-900/50 to-transparent pointer-events-none" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <DotIndicators count={TOTAL} active={active} onSelect={setActive} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBIL (< md) — Swiper coverflow, gradient-overlay med tittel + info-panel
          ══════════════════════════════════════════════════════ */}
      <div className="relative z-[3] flex md:hidden flex-col h-svh pt-[72px] pb-6">

        {/* Swiper fyller tilgjengelig høyde */}
        <div className="flex-1 min-h-0 flex items-center">
          <Swiper
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 28,
              stretch: 0,
              depth: 110,
              modifier: 1,
              slideShadows: false,
            }}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => {
              setActive(swiper.realIndex ?? 0);
              setInfoOpen(false);
            }}
            className="w-full"
          >
            {SLIDES.map((s) => (
              <SwiperSlide
                key={s.id}
                style={{ width: "82vw", maxWidth: 380 }}
              >
                {({ isActive }) => (
                  <MobileCard
                    slide={s}
                    isActive={isActive}
                    infoOpen={isActive && infoOpen}
                    onInfoOpen={() => setInfoOpen(true)}
                    onInfoClose={() => setInfoOpen(false)}
                    reduced={reduced}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Prikker */}
        <div className="shrink-0 flex justify-center pt-4">
          <DotIndicators
            count={TOTAL}
            active={active}
            onSelect={(i) => swiperRef.current?.slideToLoop(i)}
          />
        </div>
      </div>
    </section>
  );
}

// ─── MobileCard ───────────────────────────────────────────────────────────────

interface MobileCardProps {
  slide: Slide;
  isActive: boolean;
  infoOpen: boolean;
  onInfoOpen: () => void;
  onInfoClose: () => void;
  reduced: boolean;
}

function MobileCard({ slide, isActive, infoOpen, onInfoOpen, onInfoClose, reduced }: MobileCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl w-full"
      style={{
        height: "min(75svh, 580px)",        
        boxShadow: isActive
          ? "0 30px 70px rgba(0,0,0,0.85), 0 0 40px rgba(255,161,35,0.05)"
          : "0 10px 30px rgba(0,0,0,0.5)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translateZ(0)",
      }}
    >
      <img
        src={slide.image}
        alt={slide.heading}
        className="w-full h-full object-cover"
        draggable={false}
        loading="eager"
      />

      {/* ── Gradient + tittel + knapp (Lag A) ─────────────────── */}
      {isActive && (
        <>
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none transition-opacity duration-200"
            style={{
              height: "52%",
              background:
                "linear-gradient(to top, rgba(10,8,7,0.95) 0%, rgba(10,8,7,0.65) 48%, transparent 100%)",
              opacity: infoOpen ? 0 : 1,
            }}
          />

          <div
            className="absolute inset-x-0 bottom-0 flex flex-col justify-end px-5 pb-5 transition-opacity duration-200"
            style={{ height: "52%", pointerEvents: infoOpen ? "none" : "auto", opacity: infoOpen ? 0 : 1 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={`mob-h-${slide.id}`}
                className="h3 text-white mb-3 leading-tight"
                initial={reduced ? {} : { y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduced ? {} : { y: -8, opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] as const }}
              >
                {slide.heading}
              </motion.h2>
            </AnimatePresence>

            <button
              onClick={(e) => { e.stopPropagation(); onInfoOpen(); }}
              aria-label={`Les mer om ${slide.heading}`}
              className={cn(
                "w-full py-2.5 rounded-xl text-sm font-medium text-white",
                "bg-white/10 border border-white/20 backdrop-blur-sm",
                "transition-transform duration-150 active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torch-500"
              )}
            >
              Mer info
            </button>
          </div>

          {/* ── Info-panel — glir opp fra bunn (Lag B) ─────────── */}
          <motion.div
            className="absolute inset-0 flex flex-col px-5 pt-5 pb-5"
            style={{ background: "rgba(10,8,7,0.96)" }}
            initial={{ y: "100%" }}
            animate={{ y: infoOpen ? "0%" : "100%" }}
            transition={
              infoOpen
                ? { type: "spring", duration: 0.48, bounce: 0.08 }
                : { type: "spring", duration: 0.3,  bounce: 0    }
            }
          >
            {/* Drag-handle */}
            <div className="shrink-0 self-center w-8 h-1 mb-5 rounded-full bg-white/20" />

            <h2 className="shrink-0 h3 text-white leading-tight mb-4">
              {slide.heading}
            </h2>

            <div className="flex-1 min-h-0 overflow-y-auto">
              <p className="text-sm leading-relaxed text-white/70">
                {slide.body}
              </p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); onInfoClose(); }}
              aria-label="Lukk informasjon"
              className="shrink-0 mt-4 w-full py-2 text-xs font-semibold tracking-[0.14em] uppercase text-white/35 hover:text-white/65 transition-colors active:scale-[0.97]"
            >
              Lukk
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
}

// ─── DotIndicators ────────────────────────────────────────────────────────────

function DotIndicators({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Slide-indikatorer">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === active}
          aria-label={`Slide ${i + 1} av ${count}`}
          onClick={() => onSelect(i)}
          className={cn(
            "rounded-full transition-all duration-300",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torch-500",
            i === active
              ? "w-6 h-2 bg-white"
              : "w-2 h-2 bg-white/30 hover:bg-white/50"
          )}
        />
      ))}
    </div>
  );
}
