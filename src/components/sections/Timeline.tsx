// src/components/sections/Timeline.tsx
import { useRef } from "react";
import { motion, useScroll, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { urlFor } from "@/lib/sanity";
import type { Milestone } from "@/types/sanity";

/** Minimal bilde-type for Sanity uten å bruke any */
type SanityImageLike =
  | string
  | {
      asset?: { _ref?: string; _id?: string };
      [key: string]: unknown;
    };

/** Trygg lesing av vilkårlige felter uten å kaste direkte til Record<string, unknown> */
function getProp<T = unknown>(obj: unknown, key: string): T | undefined {
  if (obj && typeof obj === "object" && key in (obj as Record<string, unknown>)) {
    return (obj as Record<string, unknown>)[key] as T;
  }
  return undefined;
}

function getYear(m: Milestone): string {
  const y = getProp<number | string>(m, "year");
  if (typeof y === "number" || typeof y === "string") return String(y);
  const d = getProp<string>(m, "date");
  return typeof d === "string" ? d.slice(0, 4) : "";
}

function getDesc(m: Milestone): string {
  const d = getProp<string>(m, "description");
  if (typeof d === "string" && d.length) return d;
  const ex = getProp<string>(m, "excerpt");
  return typeof ex === "string" ? ex : "";
}

function getId(m: Milestone, fallback: string): string {
  const id = getProp<string>(m, "_id");
  return id ?? fallback;
}

function getImage(m: Milestone): SanityImageLike | undefined {
  return getProp<SanityImageLike>(m, "image");
}

interface TimelineProps {
  milestones: Milestone[];
}

// 1) Legg til sammen med helperne dine:
function getTime(m: Milestone): number {
  const y = getProp<number | string>(m, "year");
  if (typeof y === "number") return new Date(y, 0, 1).getTime();
  if (typeof y === "string" && /^\d{4}$/.test(y)) return new Date(parseInt(y, 10), 0, 1).getTime();

  const d = getProp<string>(m, "date");
  if (typeof d === "string") {
    const t = Date.parse(d);
    if (!Number.isNaN(t)) return t;
    const ym = d.match(/\d{4}/);
    if (ym) return new Date(parseInt(ym[0], 10), 0, 1).getTime();
  }

  const created = getProp<string>(m, "_createdAt");
  if (typeof created === "string") {
    const t = Date.parse(created);
    if (!Number.isNaN(t)) return t;
  }
  return 0;
}


export function Timeline({ milestones }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const sorted = [...milestones].sort((a, b) => getTime(a) - getTime(b)); 

  return (
    <div ref={containerRef} className="relative">
      <Container size="lg">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4"
          >
            Vår reise gjennom tid
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Fra første forestilling til i dag – historien om Kongsvinger Festningsteater
          </motion.p>
        </div>

        <div className="relative">
          {/* Hovedlinje */}
          <div className="absolute top-0 bottom-0 w-px bg-gray-200 left-8 sm:left-1/2 sm:-translate-x-1/2" />
          {/* Progress-linje */}
          <motion.div
            className="absolute top-0 w-px bg-linear-to-b from-gold-400 to-torch-500 origin-top left-8 sm:left-1/2 sm:-translate-x-1/2"
            style={{ scaleY: scrollYProgress }}
          />

          <ol className="space-y-14 sm:space-y-20">
            
            {sorted.map((m, i) => {
              const isRight = i % 2 === 0; // annenhver side (>= sm)
              const year = getYear(m);
              const title = (m as { title?: string }).title ?? ""; // hvis Milestone har title kan du bruke m.title direkte
              const desc = getDesc(m);
              const image = getImage(m);

              return (
                <li key={getId(m, String(i))} className="relative grid grid-cols-1 sm:grid-cols-2 sm:gap-12">
                  {/* Års-badge på linja */}
                  <div className="absolute -top-1 left-8 sm:left-1/2 sm:-translate-x-1/2 -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0, rotate: -8 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ amount: 0.6, once: false }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-white shadow-xl bg-linear-to-br from-gold-400 to-gold-600"
                    >
                      <span className="text-white font-display font-bold text-sm leading-none">
                        {year}
                      </span>
                      <span aria-hidden className="absolute inset-0 rounded-full bg-gold-400/30 blur-xl -z-10" />
                    </motion.div>
                  </div>

                  {/* VENSTRE sidekort (skjult på mobil) */}
                  <div className="hidden sm:block sm:col-start-1">
                    {!isRight && (
                      <Card side="left" title={title} desc={desc} image={image} index={i} />
                    )}
                  </div>

                  {/* HØYRE sidekort (skjult på mobil) */}
                  <div className="hidden sm:block sm:col-start-2">
                    {isRight && (
                      <Card side="right" title={title} desc={desc} image={image} index={i} />
                    )}
                  </div>

                  {/* MOBIL: én kolonne med innrykk fra venstre linje */}
                  <div className="sm:hidden col-span-1">
                    <Card side="mobile" title={title} desc={desc} image={image} index={i} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </div>
  );
}

function Card({
  side,
  title,
  desc,
  image,
  index,
}: {
  side: "left" | "right" | "mobile";
  title: string;
  desc: string;
  image?: SanityImageLike;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, margin: "0px 0px -10% 0px" });

  const variants = {
    hidden: {
      opacity: 0,
      x: side === "left" ? -50 : side === "right" ? 50 : 16,
      scale: 0.98,
      filter: "blur(3px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
    },
  } as const;

  return (
    <motion.article
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5 + index * 0.02, ease: [0.22, 1, 0.36, 1] }}
      className={side === "mobile" ? "relative ml-20" : "relative"}
      style={{ willChange: "transform, opacity", contain: "layout paint" }}
    >
      {/* connector mot midtlinja (kun ≥ sm) */}
      {side !== "mobile" && (
        <span
          aria-hidden
          className={[
            "hidden sm:block absolute top-8 h-0.5 w-8 bg-gray-200",
            side === "left" ? "-right-8" : "-left-8",
          ].join(" ")}
        />
      )}

      <div className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gold-200 shadow-xl transition-all duration-300 hover:border-gold-400 hover:shadow-2xl hover:-translate-y-0.5">
        {image ? (
          <div className="aspect-video overflow-hidden bg-linear-to-br from-navy-900 to-burgundy-900">
            <img
              src={urlFor(image).width(640).height(360).quality(85).auto("format").url()}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : null}

        <div className="p-6">
          <h3 className="text-2xl font-display font-bold text-navy-900 mb-3">{title}</h3>
          {desc ? <p className="text-gray-700 leading-relaxed">{desc}</p> : null}
        </div>

        {/* dekorhjørner */}
        <div className="pointer-events-none absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="pointer-events-none absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold-400/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.article>
  );
}
