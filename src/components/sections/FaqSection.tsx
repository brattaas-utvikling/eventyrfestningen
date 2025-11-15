// src/components/sections/FaqSection.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/layout/Section";

const faqs = [
  {
    question: "Hva skjer hvis det regner?",
    answer:
      "Forestillingen spilles utendørs, og vi gjennomfører så lenge det er forsvarlig. Ta gjerne med regnjakke og evt. regnponcho. Ved kraftig uvær kan forestillingen bli forsinket, avbrutt eller flyttet – informasjon gis da via e-post/SMS og i våre kanaler.",
  },
  {
    question: "Hvor lenge varer forestillingen?",
    answer:
      "Forestillingen varer ca. 2 timer inkludert pause. Vi anbefaler å være på plass i god tid før start slik at dere rekker å finne sitteplasser og komme i stemning.",
  },
  {
    question: "Er det pause?",
    answer:
      "Ja, det er én pause midt i forestillingen. Da er det mulig å strekke på beina, kjøpe noe å drikke eller bare nyte utsikten fra festningen.",
  },
  {
    question: "Trenger vi å ta med stol eller sitteunderlag?",
    answer:
      "Det er benker/sitteplasser i området, men vi anbefaler et enkelt sitteunderlag for ekstra komfort – spesielt for barn. Egen campingstol anbefales ikke på grunn av sikt for andre publikummere.",
  },
  {
    question: "Hvordan er det med parkering?",
    answer:
      "Det finnes parkeringsmuligheter i nærheten av festningen. Vi anbefaler å beregne litt ekstra tid da det kan bli kø ved ankomst og avreise. Følg skilting og anvisning fra parkeringsvakter der det finnes.",
  },
  {
    question: "Kan vi kjøpe mat og drikke?",
    answer:
      "Ja, det vil være enkel servering av mat og drikke i tilknytning til forestillingen. Du kan også ta med egen drikkeflaske. Alkohol er ikke tillatt inne på publikumsområdet.",
  },
  {
    question: "Er det tilrettelagt for rullestol?",
    answer:
      "Store deler av området er tilgjengelig for rullestol, men det er noe stigning opp til festningen og ujevnt underlag enkelte steder. Ta gjerne kontakt på forhånd, så kan vi veilede og tilrettelegge så godt som mulig.",
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="praktisk">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Praktisk informasjon
          </h2>
          <p className="text-sm text-slate-200">
            De vanligste spørsmålene før dere tar turen til festningen.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-white/8 bg-black/40"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                  onClick={() =>
                    setOpenIndex((prev) => (prev === index ? null : index))
                  }
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-white">
                    {item.question}
                  </span>
                  <span
                    className="text-lg text-slate-300"
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-4 pb-4 text-sm text-slate-200"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
