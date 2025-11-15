// src/components/sections/TestimonialsSection.tsx
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";

const testimonials = [
  {
    quote: "Magisk opplevelse for hele familien! Barna nektet å dra hjem.",
    author: "Publikummer 2024",
    role: "Familie på fire",
  },
  {
    quote:
      "Ungene snakket om forestillingen i flere uker etterpå. Vi kommer tilbake.",
    author: "Forelder",
    role: "Mamma til to",
  },
  {
    quote:
      "Fantastisk bruk av festningen som scene. Føltes som å være midt i historien.",
    author: "Publikummer",
    role: "Teaterinteressert",
  },
];

export const TestimonialsSection = () => {
  return (
    <Section id="sitater">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Dette sier publikum
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.figure
              key={t.quote}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: 0.03 * index }}
              className="flex h-full flex-col rounded-2xl border border-white/8 bg-black/40 p-4"
            >
              <p className="text-sm leading-relaxed text-slate-100">
                “{t.quote}”
              </p>
              <figcaption className="mt-3 text-xs text-slate-300">
                <span className="font-medium">{t.author}</span>
                {t.role && (
                  <span className="ml-1 text-slate-400">– {t.role}</span>
                )}
              </figcaption>
              <div className="mt-2 flex gap-1 text-[11px] text-amber-300">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </motion.figure>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};
