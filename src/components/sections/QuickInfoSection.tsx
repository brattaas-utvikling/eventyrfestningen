// src/components/sections/QuickInfoSection.tsx
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const quickInfoSlides = [
  {
    id: "hva",
    icon: "🎭",
    label: "Hva",
    title: "Utendørs familiemusikal",
    description:
      "En original familiemusikal under åpen himmel – med sang, dans og humor midt inne på en ekte festning.",
  },
  {
    id: "hvor",
    icon: "📍",
    label: "Hvor",
    title: "Kongsvinger festning",
    description:
      "Historiske murer, borggård og utsikt over byen. Selve stedet er like mye en del av opplevelsen som forestillingen.",
  },
  {
    id: "når",
    icon: "🗓️",
    label: "Når",
    title: "Sommeren 2025",
    description:
      "Kveldsforestillinger i sommersesongen – når lyset, luften og stemningen gjør alt litt mer magisk.",
  },
  {
    id: "hvem",
    icon: "👨‍👩‍👧",
    label: "Passer for",
    title: "Hele familien",
    description:
      "Barn fra ca. 5 år, foreldre, besteforeldre og vennegjenger som vil gjøre noe annerledes sammen.",
  },
];

export function QuickInfoSection() {
  return (
    <Section
      id="info"
      background="navy"
      className="min-h-screen flex items-center"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[60vh] grid-cols-1 gap-10 lg:grid-cols-3 lg:items-center">
          {/* 1/3 – Tekst / intro */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300/80">
                Hurtiginfo
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Alt du trenger å vite på 30 sekunder
              </h2>
              <p className="text-sm leading-relaxed text-slate-200/90">
                Hva det er, hvor det skjer, når dere bør komme og hvem det passer
                for. Sveip gjennom kortene for å få oversikten – før dere går
                videre til billetter og praktisk info.
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-200/90">
              <p>Perfekt å vise når noen spør «Hva er egentlig Eventyrfestningen?»</p>
              <p>Raskt overblikk for foreldre, lærere og gruppeledere.</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
            <Button asChild variant="torch">
  <a href="#billetter">Se spilledatoer</a>
</Button>

<Button asChild variant="link">
  <a href="#prakrisk-info">Praktisk informasjonr</a>
</Button>

            </div>
          </motion.div>

          {/* 2/3 – Swiper “flow” kortkarusell */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <div className="relative">
              {/* Glow / bakgrunn bak slideren */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.16),transparent_60%),_radial-gradient(circle_at_bottom,_rgba(251,191,36,0.22),transparent_60%)]"
              />

              <Swiper
                modules={[EffectCoverflow, Pagination]}
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView={1.05}
                spaceBetween={24}
                pagination={{ clickable: true }}
                coverflowEffect={{
                  rotate: 8,
                  stretch: 0,
                  depth: 120,
                  modifier: 1,
                  slideShadows: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1.2,
                  },
                  1024: {
                    slidesPerView: 1.5,
                  },
                }}
                className="h-full"
              >
                {quickInfoSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <article className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 px-5 py-6 shadow-xl shadow-black/40 backdrop-blur">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-300/80">
                          <span className="text-lg">{slide.icon}</span>
                          <span>{slide.label}</span>
                        </div>
                        <h3 className="text-base font-semibold text-white">
                          {slide.title}
                        </h3>
                        <p className="text-xs leading-relaxed text-slate-200">
                          {slide.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-300/80">
                        <span>Swipe for mer</span>
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                        </span>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
