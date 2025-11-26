// src/components/sections/QuickInfoSection.tsx
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { OldPaper } from "../ui/OldPaper";

const quickInfoSlides = [
  {
    id: "hva",
    icon: "🎭",
    label: "Hva",
    title: "Utendørs familiemusikal",
    description:
      "En original familiemusikal under åpen himmel – med sang, dans og humor midt inne på en ekte festning. Opplev historien om Oberst Krebs og de skotske spionene som levende eventyr!",
  },
  {
    id: "hvor",
    icon: "📍",
    label: "Hvor",
    title: "Kongsvinger festning",
    description:
      "Historiske murer, borggård og utsikt over byen. Selve stedet er like mye en del av opplevelsen som forestillingen. Scenografien ligger i forgrunnen og festningsmurene danner en majestetisk bakgrunn.",
  },
  {
    id: "når",
    icon: "🗓️",
    label: "Når",
    title: "Sommeren 2025",
    description:
      "Kveldsforestillinger i sommersesongen – når lyset, luften og stemningen gjør alt litt mer magisk. Eventyrlandsbyen åpner dørene klokken 20.00 hver forestillingsdag. Forestillingene starter klokken 22.00.",
  },
  {
    id: "hvem",
    icon: "👨‍👩‍👧",
    label: "Passer for",
    title: "Hele familien",
    description:
      "Barn fra ca. 5 år, foreldre, besteforeldre og vennegjenger som vil ha en minneverdig kveld sammen. Selv om det er familieforestilling, er det veldig mye humor og sjarm for voksne også!",
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
              {/* <p className="text-xs font-semibold font-sans uppercase tracking-[0.18em] text-slate-300/80">
                Hurtiginfo
              </p> */}
              <h2 className="text-3xl font-semibold font-sans tracking-tight sm:text-4xl">
                Alt du trenger å vite på 30 sekunder
              </h2>
              <p className="text-sm leading-relaxed font-sans text-slate-200/90">
                Hva det er, hvor det skjer, når dere bør komme og hvem det passer
                for. Sveip gjennom kortene for å få oversikten – før dere går
                videre til billetter og praktisk info.
              </p>
            </div>

            <div className="space-y-3 text-sm font-sans text-slate-200/90">
              <p>Perfekt å vise når noen spør «Hva er egentlig Eventyrfestningen?»</p>
              <p>Raskt overblikk for foreldre, lærere og gruppeledere.</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1 font-display">
            <Button asChild variant="torch">
  <a href="#billetter">Se spilledatoer</a>
</Button>

<Button asChild variant="whiteghost">
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
                className="pointer-events-none absolute -inset-10 -z-10"
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
                className="h-80 lg:h-96"
              >
                {quickInfoSlides.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <OldPaper className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-linear-to-br from-amber-100 via-amber-50 to-amber-100 px-5 py-6 shadow-xl shadow-black/40 backdrop-blur">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-[11px] uppercase font-sans tracking-[0.16em] text-navy-900">
                          <span>{slide.label}</span>
                        </div>
                        <h3 className="text-xl font-display font-semibold text-navy-900">
                          {slide.title}
                        </h3>
                        <p className="text-base leading-relaxed font-sans text-navy-700">
                          {slide.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-[11px] text-navy-600 font-sans">
                        <span>Swipe for mer</span>
                      </div>
                    </OldPaper>
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
