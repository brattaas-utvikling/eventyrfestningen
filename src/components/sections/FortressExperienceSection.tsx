// src/components/sections/FortressExperienceSection.tsx
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export const FortressExperienceSection = () => {
  return (
    <Section
      id="opplevelsen"
      background="white"
      className="bg-burgundy-800 text-white"
    >
      {/* Wrapper som styrer full høyde og max-width */}
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full gap-10 lg:grid-cols-2 lg:items-center">
          {/* BILDE – mobil først */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Skrå bakplate for litt moderne vri */}
              <div className="pointer-events-none absolute -inset-4 -z-10 -skew-y-3 rounded-3xl bg-burgundy-600/80 opacity-80 hidden sm:block" />

              {/* Hovedkortet / bilde-placeholder */}
              <div className="aspect-4/3 w-full rounded-md border border-white/15 bg-burgundy-400/20 shadow-2xl shadow-black/40 flex items-center justify-center">
                 <img
                      src="/media/krebs_rock.jpeg"
                      alt="Krebs Rock band opptrer på Kongsvinger festning"
                      className="w-full h-full object-cover rounded-md"
                    />
              </div>
            </div>
          </motion.div>

          {/* TEKST */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy-100/80">
                  Opplevelsen
                </p>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Slik føles en kveld på Kongsvinger festning
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-burgundy-50/90">
                  Når dere kommer opp på festningen, går dere først inn i
                  «landsbyen» – et eget univers inspirert av Oberst Krebs. Her
                  kan dere kjøpe god mat og drikke, og barna kan boltre seg med
                  leker som stylter, ansiktsmaling og natursti før forestillingen
                  begynner.
                </p>
                <p className="max-w-xl text-sm leading-relaxed text-burgundy-50/90">
                  Derfra beveger dere dere videre inn i amfiet, finner plassene
                  deres og kan nyte forestillingen fra kl. 22 og helt til
                  midnatt, med festningsmurene som levende bakteppe.
                </p>
              </div>

              <div className="space-y-2 text-sm text-burgundy-50/90">
                <p>- «Landsbyen» med mat og drikke fra Oberst Krebs sitt univers.</p>
                <p>
                  - Leker og aktiviteter for barna: stylter, ansiktsmaling,
                  natursti m.m.
                </p>
                <p>
                  - Forestilling i amfiet fra kl. 22 til midnatt – under åpen
                  sommernattshimmel.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild variant="default">
  <a href="#billetter">Se spilledatoene</a>
</Button>

                <a
                  href="#praktisk"
                  className="inline-flex items-center text-sm font-medium text-burgundy-50/90 hover:text-white"
                >
                  Praktisk informasjon
                  <span className="ml-1 text-lg" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};
