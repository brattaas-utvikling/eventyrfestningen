// src/components/sections/HighlightsSection.tsx
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";

const highlights = [
  {
    icon: "🎶",
    title: "Live musikk og sang",
    description:
      "Originalmusikk fremført live – med store ensemble-nummer og nære øyeblikk.",
  },
  {
    icon: "✨",
    title: "Magi og effekter",
    description:
      "Lys, projeksjoner og scenetriks som får murene til å leve og hemmeligheter til å dukke opp.",
  },
  {
    icon: "😂",
    title: "Humor for alle",
    description:
      "Små overraskelser og replikkvekslinger som treffer både barn og voksne.",
  },
  {
    icon: "🏰",
    title: "Unik kulisse",
    description:
      "Forestillingen spilles midt i festningen – du kjenner historien rundt deg hele kvelden.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Perfekt for familien",
    description:
      "En felles opplevelse dere snakker om på veien hjem – og antagelig dagen etter.",
  },
  {
    icon: "🌅",
    title: "Sommerkveld ute",
    description:
      "Frisk luft, gyllent kveldslys og stemningen av å være på et sommerarrangement litt utenom det vanlige.",
  },
];

export const HighlightsSection = () => {
  return (
    <Section id="hvorfor">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Hvorfor dere må dra
          </h2>
          <p className="text-sm text-slate-200">
            De viktigste grunnene – samlet i én rask oversikt.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: 0.03 * index }}
              className="flex flex-col rounded-2xl border border-white/8 bg-black/40 p-5 shadow-sm shadow-black/50"
            >
              <div className="mb-2 text-2xl">{item.icon}</div>
              <h3 className="text-sm font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};
