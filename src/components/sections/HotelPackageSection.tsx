// src/components/sections/HotelPackageSection.tsx
//
// Opplevelsespakke — brand-aligned versjon.
// Farger: gold-*/burgundy-* tokens. Font: h2 + font-spice (Mallica Fairytale) + eyebrow + lead.
// Én CTA-knapp: Button variant="gold".

import { motion } from "framer-motion";
import {
  Ticket,
  Coffee,
  Moon,
  Wifi,
  Car,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useRedusedMotion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

interface PackageItem {
  icon:   LucideIcon;
  label:  string;
  ticket?: boolean;
}

const PACKAGE_ITEMS: PackageItem[] = [
  { icon: Ticket, label: "Billett — Oberst Krebs og de skotske spionene", ticket: true },
  { icon: Coffee, label: "Hotellfrokost" },
  { icon: Moon,   label: "En god natts søvn" },
  { icon: Wifi,   label: "Wi-Fi" },
  { icon: Car,    label: "Fri parkering" },
];

// ─── Komponent ────────────────────────────────────────────────────────────────

export function HotelPackageSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="hotellpakke" background="cynical" paddingY="default">
      <Container size="lg">

        {/* Kort: cynical-950 (#0a0807) base + subtil varm gradient */}
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-gold-500/25"
          style={{
            background:
              "linear-gradient(160deg, #0a0807 0%, #170e06 50%, #0a0807 100%)",
          }}
          initial={reduced ? false : { opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
        >
          {/* Topp-ornament */}
          <div
            aria-hidden
            className="absolute top-0 inset-x-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.35) 30%, rgba(251,191,36,0.65) 50%, rgba(251,191,36,0.35) 70%, transparent 100%)",
            }}
          />

          {/* Bakgrunns-glows */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                "radial-gradient(ellipse 70% 50% at 80% 20%, rgba(245,158,11,0.06) 0%, transparent 70%)",
                "radial-gradient(ellipse 50% 40% at 10% 80%, rgba(136,19,55,0.12) 0%, transparent 60%)",
              ].join(", "),
            }}
          />

          {/* ── Innhold ─────────────────────────────────────────────────── */}
          <div className="relative z-10 p-8 sm:p-10 lg:p-12">

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-2.5 mb-3"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
              aria-hidden
            >
              <span className="block h-px w-6 shrink-0 bg-gold-500/35" />
              <span className="eyebrow text-[11px] text-gold-500/80 whitespace-nowrap">
                Opplevelsespakke
              </span>
              <span className="block h-px w-14 shrink-0 bg-gold-500/35" />
            </motion.div>

            {/* Overskrift: linje 1 (DM Serif) + linje 2 (Mallica Fairytale) */}
            <motion.h2
              className="font-heading text-[clamp(1.55rem,1.1rem+2vw,2.1rem)] leading-[1.2] text-white mb-3"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.07 }}
            >
              En kveld på festningen
              <br />
              {/* font-spice = Mallica Fairytale — prosjektets dekor-font for korte aksenter */}
              <span className="font-spice text-gold-500">En natt du husker</span>
            </motion.h2>

            {/* Ingress */}
            <motion.p
              className="lead text-white/60 mb-10 max-w-[480px]"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.13 }}
            >
              Kom en dag tidligere, eller bli natten over. Alt du trenger er samlet i én pakke.
            </motion.p>

            {/* ── Tokolonne ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">

              {/* Venstre: pakkens innhold */}
              <div>
                <motion.p
                  className="eyebrow text-[11px] text-gold-500/65 mb-3"
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.18 }}
                >
                  Pakken inkluderer
                </motion.p>

                <div>
                  {PACKAGE_ITEMS.map((item, i) => (
                    <motion.div
                      key={item.label}
                      className={cn(
                        "flex items-center gap-3 py-[0.7rem]",
                        i < PACKAGE_ITEMS.length - 1 &&
                          "border-b border-gold-500/[0.1]",
                      )}
                      initial={reduced ? false : { opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.42,
                        ease: EASE_OUT,
                        delay: 0.22 + i * 0.08,
                      }}
                    >
                      {/* Ikonboks */}
                      <div
                        className={cn(
                          "shrink-0 flex items-center justify-center",
                          "w-[30px] h-[30px] rounded-[6px]",
                          item.ticket
                            ? "bg-burgundy-900/40 border border-burgundy-700/40 text-burgundy-300"
                            : "bg-gold-500/10 border border-gold-500/20 text-gold-500/80",
                        )}
                      >
                        <item.icon className="w-3.5 h-3.5" aria-hidden />
                      </div>

                      {/* Tekst */}
                      <span
                        className={cn(
                          "text-sm leading-snug",
                          item.ticket
                            ? "font-medium text-white"
                            : "font-normal text-white/80",
                        )}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Høyre: pris + CTA */}
              <motion.div
                className={cn(
                  "flex flex-col gap-4",
                  "border-t border-gold-500/20 pt-6",
                  "sm:border-t-0 sm:border-l sm:border-gold-500/20 sm:pt-0 sm:pl-6",
                )}
                initial={reduced ? false : { opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.3 }}
              >
                {/* Merke: begrenset tilgjengelighet */}
                <div className="inline-flex items-center gap-1.5 w-fit rounded-[3px] px-2.5 py-1 text-[11px] font-medium tracking-[0.05em] bg-burgundy-900/35 border border-burgundy-700/35 text-burgundy-300">
                  <Clock className="w-3 h-3 shrink-0" aria-hidden />
                  Begrenset tilgjengelighet
                </div>

                {/* Pris */}
                <div>
                  <p className="text-[12px] font-light tracking-[0.06em] uppercase mb-1 text-white/50">
                    Fra
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-heading text-[2.4rem] leading-none text-white">
                      2 138
                    </span>
                    <span className="text-[13px] font-light text-white/50">
                      kr / rom
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button variant="gold" size="lg" asChild>
                  <a
                    href="https://booking.kongsvingerfestning.festningshotellene.no/package/package-details?channelid=3952bc6c-9b20-4213-a713-5fc4f433c8bf&packageid=712bea37-bef1-4ddd-8734-7b01f0316497"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Les mer om hotellpakken (åpnes i ny fane)"
                  >
                    Les mer om pakken
                  </a>
                </Button>

                {/* Skillelinje */}
                <div className="h-px bg-gold-500/[0.1]" />

                {/* Datoer */}
                <div className="text-xs font-light leading-[1.7] text-white/50">
                  <span className="font-medium text-white/70">Forestillingen spilles</span>
                  <br />
                  2., 3., 4. juli
                  <br />
                  8., 9., 10., 11. juli 2026
                  <br />
                  Kongsvinger Festning · Kl. 22:00
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>

      </Container>
    </Section>
  );
}
