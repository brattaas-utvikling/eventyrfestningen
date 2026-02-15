// src/components/sections/StorySection.tsx
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";

export const StorySection = () => {
  return (
    <Section
      id="historien"
      background="cynical"
      className="min-h-screen flex items-center"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Bilde / illustrasjon – VENSTRE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-1"
          >
            <div className="relative">
              {/* Skrå bakplate for moderne look */}
              {/* <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 -z-10 -skew-y-3 rounded-3xl bg-burgundy-500/40 opacity-80"
              /> */}
              <div className="aspect-4/5 w-full overflow-hidden rounded-3xl border border-white/15 bg-linear-to-tr from-burgundy-500/60 via-indigo-500/40 to-sky-500/30 shadow-2xl shadow-black/70">
              <img
                      src="/media/skottene.jpeg"
                      alt="Krebs Rock band opptrer på Kongsvinger festning"
                      className="w-full h-full object-cover rounded-md"
                    />
              </div>
            </div>
          </motion.div>

          {/* Tekst – HØYRE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 space-y-4"
          >
            <p className="text-xs font-semibold font-sans uppercase tracking-[0.18em] text-slate-300/80">
              Historien
            </p>
            <h2 className="text-3xl font-semibold font-display tracking-tight sm:text-4xl">
              De skotske spionene og jakten på Mattesonskatten
            </h2>

            <p className="text-sm leading-relaxed font-sans  text-slate-200">
              En gruppe skotske spioner sniker seg inn på Kongsvinger festning.
              I generasjoner har det gått rykter om Mattesonskatten – en
              forsvunnet skatt som skal være gjemt et sted mellom murene. Nå har
              de endelig funnet et spor som kan lede dem rett til den.
            </p>

            <p className="text-sm leading-relaxed font-sans text-slate-200">
              Men for å finne skatten må de først skaffe seg Den magiske masken
              – en gjenstand som sies å kunne avsløre sannheten og låse opp den
              skjulte skatten. Problemet? Masken er i Oberst Krebs sine hender, og tiden er i
              ferd med å renne ut. Bare en etterkommer av Gyldenløve kan aktivere
              magien som viser veien videre.
            </p>

            <ul className="mt-3 space-y-2 text-sm text-slate-200 font-sans ">
              <li className="flex gap-2">
                <span className="mt-1 text-amber-300">•</span>
                <span>
                  Dramatisk historie: Jakten på Mattesonskatten setter både
                  festningens skjebne og gamle løfter på spill.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-amber-300">•</span>
                <span>
                  Familiedramatikk: Aggie må velge mellom lojalitet til familien
                  og sannheten som skjuler seg bak legenden.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-amber-300">•</span>
                <span>
                  Magi og mystikk: Den magiske masken og Gyldenløve-arven
                  knytter fortid og nåtid sammen – på godt og vondt.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 text-amber-300">•</span>
                <span>
                  Vil Aggie være lojal, eller finner hun en helt annen vei enn
                  familien hadde sett for seg?
                </span>
              </li>
            </ul>

            <p className="mt-4 text-sm font-normal text-amber-300 font-sans ">
              Hva skjer når en etterkommer av Gyldenløve låser opp magien – og
              hele Kongsvinger festning må leve med konsekvensene?
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
