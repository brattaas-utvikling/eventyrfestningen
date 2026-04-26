// src/components/sections/CoverflowHero.tsx
//
// Fullskjerm hero med coverflow-karusell — sirkulær, uendelig.
// Desktop: blurred bakgrunn per slide, tekst til venstre (40%) + 3D coverflow til høyre (60%).
// Mobil: mini coverflow med tittel + infoknapp som åpner modal.

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { Info } from "lucide-react";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { Modal } from "@/components/ui/Modal";
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
    image: "/media/oberst.jpg",
    backgroundImage: "/media/bg-krebs.jpg",
  },
  {
    id: 2,
    heading: "Duncan",
    body: "Moromann, entertainer, ulv i fåreklær? Duncan er en levende fest, enten det er som musikalartist, onkel i barnebursdag eller sirkusdirektør. Men under skjegget og bak flosshatten skjules en beinhard, kynisk og målrettet mann som overlever på å lure andre.",
    image: "/media/duncan.jpg",
    backgroundImage: "/media/bg-scottish.jpg",
  },
  {
    id: 2,
    heading: "Sado",
    body: "Uten å egentlig være redd for noe særlig, bekymrer Kaptein Sadolin seg for relativt mye. Bak den store hatten til Krebs lurer både engstelse, mistillit, vantro, ulykke og svømmeføtter. Utover det blir det både tysk ordbok og miniskjørt – og til og med en tur på dass.",
    image: "/media/sadolin.jpg",
    backgroundImage: "/media/bg-sadolin.jpg",
  },
  {
    id: 4,
    heading: "Aggie",
    body: "Aggie har vokst opp i tidenes gøyeste univers: et omreisende teater med dansere, buktalere, artisteri og mor og far som de største gjøglerne av alle. Hun er leken og åpen – men hva skjer når hun må velge mellom familien og hjertet sitt?",
    image: "/media/aggie.jpg",
    backgroundImage: "/media/bg-aggie.jpg",
  },
  {
    id: 5,
    heading: "Klara",
    body: "Med stort hjerte og evig pågangsmot går Klara på med alt hun har! Hun tør å skille seg ut, stå opp mot makta, og trosse det vonde og vanskelige. Frekk, noen ganger litt i overkant – men heldigvis får hun Fyllingen ut av nettingstrømpene og redder dagen.",
    image: "/media/klara.jpg",
    backgroundImage: "/media/bg-klara.jpg",
  },
  {
    id: 6,
    heading: "Duff",
    body: "Hva har De under kilten, frue? Duff skjuler en av verdens største hemmeligheter og er villig til å gjøre hva som helst for å oppnå det hun ønsker. I det ene øyeblikket er hun verdens søteste – i det andre smeller det så alvorlig at haggisen mister både lukt og smak.",
    image: "/media/duff.jpg",
    backgroundImage: "/media/bg-scottish.jpg",
  },
];

const TOTAL = SLIDES.length;

// ─── Sirkulær offset ──────────────────────────────────────────────────────────
// Beregner kortets posisjon relativt til aktivt kort, med wrap-around.
// Eks: aktivt=5, i=0 → offset=+1 (neste kort, ikke -5)

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
  spread = 300
): CardTransform {
  const abs = Math.abs(offset);
  if (abs > 2)
    return { x: 0, scale: 0, rotateY: 0, opacity: 0, zIndex: 0, overlayOpacity: 0 };

  const configs = {
    0: { scale: 1,    rotateY: 0,              opacity: 1,    overlayOpacity: 0    },
    1: { scale: 0.8,  rotateY: reduced ? 0 : offset * 16, opacity: 0.88, overlayOpacity: 0.5  },
    2: { scale: 0.65, rotateY: reduced ? 0 : offset * 24, opacity: 0.4,  overlayOpacity: 0.75 },
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
  const [modalOpen, setModalOpen] = useState(false);
  const reduced = useReducedMotion();
  const touchStartX = useRef(0);

  const prev = useCallback(
    () => setActive((i) => (i - 1 + TOTAL) % TOTAL),
    []
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % TOTAL),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalOpen) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        if (e.key === "ArrowLeft") prev();
        else next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, modalOpen]);

  const slide = SLIDES[active];

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
              filter: "blur(2px) brightness(0.38) saturate(1.1)",
              transform: "scale(1)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient-overlay */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(10,8,7,0.88) 0%, rgba(10,8,7,0.55) 40%, rgba(10,8,7,0.15) 70%, rgba(10,8,7,0.05) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════
          DESKTOP (md+)
          ══════════════════════════════════════════════════════ */}
      <div className="relative z-2 hidden md:flex flex-col h-svh">
        <div className="flex flex-1 items-center pt-[72px]">

          {/* ── Venstre panel ───────────────────────────────── */}
          <div className="w-[45%] shrink-0 flex flex-col justify-center px-10 lg:px-14 xl:px-20">
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
              <div className="relative flex items-center justify-center w-full h-[00px] lg:h-[460px] xl:h-[600px]">
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
                      transition={CARD_SPRING}
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
                          "relative overflow-hidden rounded-xl",
                          "w-[210px] lg:w-[245px] xl:w-[400px] aspect-3/4",
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
                          transition={CARD_SPRING}
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
          MOBIL (< md) — fullskjerm coverflow, overlay-tittel
          ══════════════════════════════════════════════════════ */}
      {/* Mobil-bakgrunn — samme slide-skifte som desktop */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`mob-bg-${active}`}
          className="absolute inset-0 z-[2] md:hidden pointer-events-none"
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
              filter: "blur(8px) brightness(0.38) saturate(1.1)",
              transform: "scale(1.03)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-[3] flex md:hidden flex-col h-svh">

        {/* Coverflow — tar nesten hele skjermhøyden */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{ perspective: "800px" }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (dx < -40) next();
            else if (dx > 40) prev();
          }}
        >
          {/* Kort — absolutt sentrert i containeren */}
          <div className="absolute inset-0 flex items-center justify-center">
            {SLIDES.map((s, i) => {
              const offset = circularOffset(i, active);
              if (Math.abs(offset) > 2) return null;

              // Bredt aktivt kort (85vw), naboer stikker ut på sidene
              const cardW = 85; // vw for aktivt kort
              const spread = Math.round(window.innerWidth * 0.78);
              const { scale, rotateY, opacity, zIndex, overlayOpacity } =
                getCardTransform(offset, reduced, spread);

              return (
                <motion.div
                  key={s.id}
                  className="absolute"
                  style={{ zIndex }}
                  animate={{
                    x: offset * spread,
                    scale,
                    rotateY,
                    opacity,
                  }}
                  transition={CARD_SPRING}
                  onClick={() => offset !== 0 && setActive(i)}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-2xl",
                      offset !== 0 ? "cursor-pointer" : "cursor-default",
                      offset === 0 && "ring-2 ring-white/60"
                    )}
                    style={{
                      width: `${cardW}vw`,
                      aspectRatio: "3/4",
                      boxShadow:
                        offset === 0
                          ? "0 30px 70px rgba(0,0,0,0.85)"
                          : "0 10px 30px rgba(0,0,0,0.5)",
                    }}
                  >
                    <img
                      src={s.image}
                      alt={s.heading}
                      className="w-full h-full object-cover"
                      draggable={false}
                      loading={Math.abs(offset) <= 1 ? "eager" : "lazy"}
                    />

                    {/* Overlay på ikke-aktive */}
                    <motion.div
                      className="absolute inset-0 bg-cynical-900 pointer-events-none"
                      animate={{ opacity: overlayOpacity }}
                      transition={CARD_SPRING}
                    />

                    {/* Gradient i bunn av aktivt kort — for tittel-lesbarhet */}
                    {offset === 0 && (
                      <div
                        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, #0A0807 0%, rgba(10,8,7,0.75) 45%, transparent 100%)",
                        }}
                      />
                    )}

                    {/* Tittel + infoknapp — kun på aktivt kort */}
                    {offset === 0 && (
                      <div className="absolute bottom-0 inset-x-0 px-5 pb-5 flex items-end justify-between">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.h2
                            key={`mob-h-${active}`}
                            className="h3 text-white"
                            initial={reduced ? {} : { y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={reduced ? {} : { y: -12, opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                          >
                            {s.heading}
                          </motion.h2>
                        </AnimatePresence>

                        <button
                          onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
                          aria-label={`Les mer om ${s.heading}`}
                          className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-sm shrink-0 ml-3",
                            "bg-white/15 backdrop-blur-sm border border-white/30 text-white",
                            "hover:bg-white/25 hover:border-white/50",
                            "transition-colors duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torch-500"
                          )}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Prikker */}
        <div className="shrink-0 flex justify-center py-4">
          <DotIndicators count={TOTAL} active={active} onSelect={setActive} />
        </div>
      </div>

      {/* ── Modal — karakter-info (mobil) ──────────────────────────────── */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={slide.heading}
      >
        <p className="lead text-cynical-200/90">{slide.body}</p>
      </Modal>
    </section>
  );
}

// ─── Hjelpkomponenter ─────────────────────────────────────────────────────────


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
