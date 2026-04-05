// src/pages/Calendar.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  Ticket,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { SEOHead } from "@/components/SEOHead";
import { trackTicketClick } from "@/lib/analytics";

const performances = [
  {
    date: "2026-07-02",
    day: "Torsdag",
    dayNum: 2,
    time: "22:00",
    ticketUrl:
      "https://eventyrfestningen.ticketco.events/no/nb/e/oberst_krebs_og_de_skotske_spionene_2_juli",
  },
  {
    date: "2026-07-03",
    day: "Fredag",
    dayNum: 3,
    time: "22:00",
    ticketUrl:
      "https://eventyrfestningen.ticketco.events/no/nb/e/oberst_krebs_og_de_skotske_spionene_3_juli_2026",
  },
  {
    date: "2026-07-04",
    day: "Lørdag",
    dayNum: 4,
    time: "22:00",
    ticketUrl:
      "https://eventyrfestningen.ticketco.events/no/nb/e/oberst_krebs_og_de_skotske_spionene_4_juli_2026",
  },
  {
    date: "2026-07-08",
    day: "Onsdag",
    dayNum: 8,
    time: "22:00",
    ticketUrl:
      "https://eventyrfestningen.ticketco.events/no/nb/e/oberst_krebs_og_de_skotske_spionene_8_juli_2026",
  },
  {
    date: "2026-07-09",
    day: "Torsdag",
    dayNum: 9,
    time: "22:00",
    ticketUrl:
      "https://eventyrfestningen.ticketco.events/no/nb/e/oberst_krebs_og_de_skotske_spionene_9_juli_2026",
  },
  {
    date: "2026-07-10",
    day: "Fredag",
    dayNum: 10,
    time: "22:00",
    ticketUrl:
      "https://eventyrfestningen.ticketco.events/no/nb/e/oberst_krebs_og_de_skotske_spionene_10_juli_2026",
  },
  {
    date: "2026-07-11",
    day: "Lørdag",
    dayNum: 11,
    time: "22:00",
    ticketUrl:
      "https://eventyrfestningen.ticketco.events/no/nb/e/oberst_krebs_og_de_skotske_spionene_11juli_2026",
  },
];

const performanceDates = performances.map((p) => p.dayNum);

const parentFade = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const itemFade = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function CalendarSection() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);

  // Juli 2026 kalender
  const daysInMonth = 31;
  const startDay = 2; // 0=Mandag, 2=Onsdag
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = Array(startDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const isPerformanceDate = (day: number | null) =>
    day !== null && performanceDates.includes(day);

  const handleSelect = (dayNum: number) => {
    setSelectedDate((prev) => (prev === dayNum ? null : dayNum));
  };

  const getPerformanceByDay = (dayNum: number | null) =>
    dayNum == null ? undefined : performances.find((p) => p.dayNum === dayNum);

  return (
    <>
      <SEOHead
        title="Program"
        description="Se alle forestillingsdatoer og kjøp billetter til sommerens store familieforestilling på Kongsvinger Festning."
      />

      <Section background="cynical" className="py-16 sm:py-20 lg:py-24">
        <Container>
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-16 max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-torch-300" />
              <span className="eyebrow text-torch-300/80 text-xs">
                7 magiske sommerkvelder
              </span>
            </div>
            <h2 className="h2 text-white mb-4">
              Forestillingskvelder i juli
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-2">
              Alle forestillinger starter kl. 22.00. Portene åpner kl. 20.00 (2
              timer før).
            </p>
          </motion.header>

          {/* Layout */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-stretch">
            {/* VENSTRE: Liste */}
            <motion.div
              variants={parentFade}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {performances.map((performance) => {
                const isActive =
                  selectedDate === performance.dayNum ||
                  hoveredDate === performance.dayNum;

                return (
                  <motion.button
                    key={performance.date}
                    type="button"
                    variants={itemFade}
                    onClick={() => handleSelect(performance.dayNum)}
                    onMouseEnter={() => setHoveredDate(performance.dayNum)}
                    onMouseLeave={() => setHoveredDate(null)}
                    className="group w-full text-left focus:outline-none"
                    aria-pressed={isActive}
                  >
                    <div
                      className={`
                        relative rounded-2xl border px-4 sm:px-5 py-4 sm:py-5
                        transition-all duration-200
                        flex items-center gap-4 sm:gap-5
                        bg-cynical-900/60 backdrop-blur-md
                        ${
                          isActive
                            ? "border-torch-500 shadow-[0_0_40px_rgba(248,187,109,0.25)]"
                            : "border-white/10 hover:border-gold-400/50 hover:bg-cynical-800/70"
                        }
                      `}
                    >
                      {/* Dato-badge */}
                      <div
                        className={`
                          flex-shrink-0 flex flex-col items-center justify-center rounded-2xl border-2 px-3 py-2
                          font-sans font-semibold
                          transition-all duration-200
                          ${
                            isActive
                              ? "bg-gradient-to-br from-torch-500 to-burgundy-600 text-white border-torch-300 shadow-lg shadow-torch-500/40 scale-105"
                              : "bg-cynical-950 text-gold-300 border-gold-500/40"
                          }
                        `}
                      >
                        <span className="text-xl leading-none">
                          {performance.dayNum}
                        </span>
                        <span className="text-[10px] tracking-wide uppercase">
                          Jul
                        </span>
                      </div>

                      {/* Tekst */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h3 className="text-base sm:text-lg font-semibold text-white">
                            {performance.day}
                          </h3>
                          <span className="text-xs uppercase tracking-wide text-gold-300/80 bg-gold-300/10 rounded-full px-2 py-0.5">
                            Forestilling
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs sm:text-sm text-white/80">
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gold-300" />
                            Kl. {performance.time}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-gold-300" />
                            Kongsvinger Festning
                          </span>
                        </div>
                      </div>

                      {/* Kjøp-knapp med tracking */}
                      <div className="flex-shrink-0">
                        <Button
                          variant={isActive ? "gold" : "torch"}
                          size="sm"
                          asChild
                          className="whitespace-nowrap"
                        >
                          <a
                            href={
                              performance.ticketUrl ??
                              "https://eventyrfestningen.ticketco.events/no/nb"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackTicketClick(
                                `program_${performance.date}`,
                                "program"
                              )
                            }
                          >
                            <Ticket className="w-4 h-4 mr-1.5" />
                            Kjøp billetter
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* HØYRE: Kalender + praktisk info */}
            <motion.aside
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col gap-6"
            >
              <div className="rounded-3xl border border-white/10 bg-cynical-950/80 backdrop-blur-xl p-6 sm:p-7 shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="eyebrow text-gold-300/80 text-xs">
                      KALENDER
                    </p>
                    <h3 className="h3 text-white">
                      Juli 2026
                    </h3>
                  </div>
                  <div className="hidden sm:flex flex-col items-end text-xs text-white/60">
                    <span>Markerte datoer er</span>
                    <span className="font-medium text-gold-300">
                      forestillingskvelder
                    </span>
                  </div>
                </div>

                {/* Ukedager */}
                <div className="grid grid-cols-7 gap-1.5 mb-3">
                  {["M", "T", "O", "T", "F", "L", "S"].map((day, i) => (
                    <div
                      key={i}
                      className="py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-white/60"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Datoer */}
                <div className="space-y-1.5">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-7 gap-1.5">
                      {week.map((day, dayIndex) => {
                        if (!day) {
                          return (
                            <div
                              key={`${weekIndex}-${dayIndex}`}
                              className="aspect-square rounded-lg bg-transparent"
                            />
                          );
                        }

                        const isPerformance = isPerformanceDate(day);
                        const perf = getPerformanceByDay(day);
                        const isActive =
                          selectedDate === day || hoveredDate === day;

                        const title =
                          isPerformance && perf
                            ? `${perf.day} ${day}. juli – forestilling kl. ${perf.time}`
                            : `Juli ${day}`;

                        return (
                          <button
                            key={`${weekIndex}-${dayIndex}`}
                            type="button"
                            onClick={() =>
                              isPerformance ? handleSelect(day) : undefined
                            }
                            onMouseEnter={() =>
                              isPerformance && setHoveredDate(day)
                            }
                            onMouseLeave={() =>
                              isPerformance && setHoveredDate(null)
                            }
                            className="aspect-square w-full"
                            title={title}
                          >
                            <motion.div
                              whileHover={
                                isPerformance ? { scale: 1.06 } : { scale: 1.02 }
                              }
                              className={`
                                flex h-full w-full items-center justify-center rounded-xl text-sm font-semibold
                                transition-all duration-200 relative
                                ${
                                  isPerformance
                                    ? isActive
                                      ? "bg-gradient-to-br from-torch-500 to-burgundy-600 text-white shadow-lg shadow-torch-500/50"
                                      : "bg-gradient-to-br from-torch-500/90 to-burgundy-600/90 text-white shadow-md hover:shadow-lg"
                                    : "bg-cynical-800/50 text-white/40"
                                }
                              `}
                            >
                              {day}
                              {isPerformance && isActive && (
                                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-gold-300 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                              )}
                            </motion.div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Legend mobil */}
                <div className="mt-5 border-t border-white/10 pt-4 text-xs text-white/70 sm:hidden">
                  Markerte datoer er forestillingskvelder. Trykk på en av datoene
                  for å markere riktig billett i oversikten.
                </div>
              </div>

              {/* Praktisk info under kalenderen */}
              <motion.div
                variants={itemFade}
                className="rounded-2xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 via-torch-500/5 to-burgundy-500/10 p-5 sm:p-6"
              >
                <h3 className="ui-text font-semibold text-white flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-gold-300" />
                  Praktisk info i kortversjon
                </h3>
                <ul className="space-y-1.5 text-sm text-white/80">
                  <li>• Festningslandsbyen åpner kl. 20.00 (2 timer før forestilling).</li>
                  <li>• Forestillingen starter kl. 22.00.</li>
                  <li>• Ta med sitteunderlag og kanskje et teppe.</li>
                  <li>• Utendørsarrangement – kle dere godt etter været.</li>
                </ul>
              </motion.div>
            </motion.aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
