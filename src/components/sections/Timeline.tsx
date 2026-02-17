// src/components/sections/Timeline.tsx
import { useRef, type MouseEvent } from "react";
import {
  motion,
  useScroll,
  useInView,
  useSpring,
  useTransform,
} from "framer-motion";


import { Container } from "@/components/layout/Container";
import { urlFor } from "@/lib/sanity";
import type { Milestone } from "@/types/sanity";
import { OldPaper } from "../ui/OldPaper";

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

// Sorterings-hjelper
function getTime(m: Milestone): number {
  const y = getProp<number | string>(m, "year");
  if (typeof y === "number") return new Date(y, 0, 1).getTime();
  if (typeof y === "string" && /^\d{4}$/.test(y)) {
    return new Date(parseInt(y, 10), 0, 1).getTime();
  }

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

interface TimelineProps {
  milestones: Milestone[];
}

export function Timeline({ milestones }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sorted = [...milestones].sort((a, b) => getTime(a) - getTime(b));

  return (
    <OldPaper ref={containerRef} className="relative">
      <Container size="lg">
        {/* Heading */}
        <div className="text-center py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-sans font-bold text-cynical-900 mb-4"
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
            Fra første forestilling til i dag – historien om Kongsvinger
            Festningsteater
          </motion.p>
        </div>

        <div className="relative pb-16">
          {/* Hovedlinje */}
          <div className="absolute top-0 bottom-0 w-px bg-amber-900/10 left-8 sm:left-1/2 sm:-translate-x-1/2" />

          {/* Progress-linje */}
          <motion.div
            className="absolute top-0 w-px bg-linear-to-b from-gold-400 to-torch-500 origin-top left-8 sm:left-1/2 sm:-translate-x-1/2"
            style={{ scaleY: scrollYProgress }}
          />

          <ol className="space-y-14 sm:space-y-20">
            {sorted.map((m, i) => {
              const isRight = i % 2 === 0;
              const year = getYear(m);
              const title = (m as { title?: string }).title ?? "";
              const desc = getDesc(m);
              const image = getImage(m);

              return (
                <li
                  key={getId(m, String(i))}
                  className="relative grid grid-cols-1 sm:grid-cols-2 sm:gap-12"
                >
                  {/* Års-badge på linja */}
                  <div className="absolute -top-1 left-8 sm:left-1/2 sm:-translate-x-1/2 -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0, rotate: -8 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ amount: 0.6, once: false }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      className="relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#FAF7F1] shadow-xl bg-linear-to-br from-gold-400 to-gold-600"
                    >
                      <span className="text-white font-sans font-bold text-sm leading-none">
                        {year}
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-gold-400/30 blur-xl -z-10"
                      />
                    </motion.div>
                  </div>

                  {/* VENSTRE sidekort (>= sm) */}
                  <div className="hidden sm:block sm:col-start-1 pb-16">
                    {!isRight && (
                      <TimelineCard
                        side="left"
                        title={title}
                        desc={desc}
                        image={image}
                        index={i}
                      />
                    )}
                  </div>

                  {/* HØYRE sidekort (>= sm) */}
                  <div className="hidden sm:block sm:col-start-2 pb-16">
                    {isRight && (
                      <TimelineCard
                        side="right"
                        title={title}
                        desc={desc}
                        image={image}
                        index={i}
                      />
                    )}
                  </div>

                  {/* MOBIL: én kolonne */}
                  <div className="sm:hidden col-span-1 pb-16">
                    <TimelineCard
                      side="mobile"
                      title={title}
                      desc={desc}
                      image={image}
                      index={i}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </OldPaper>
  );
}
function TimelineCard({
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

  /** 1) POP-IN ANIMASJON (samme feeling som du hadde før) */
  const inView = useInView(ref, {
    amount: 0.5,
    margin: "0px 0px -10% 0px",
  });

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

  /** 2) FLOATING-PARALLAX PÅ SCROLL */
  const { scrollYProgress: cardScroll } = useScroll({
    target: ref,
    offset: ["start 90%", "end 10%"],
  });

  const floatY = useTransform(cardScroll, [0, 1], [15, -15]);
  const floatRotate = useTransform(cardScroll, [0, 1], [-0.4, 0.4]);

  /** 3) 3D HOVER TILT (smooth spring) */
  const rotateX = useSpring(0, { stiffness: 220, damping: 20, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 20, mass: 0.4 });
  const maxTilt = 6; // prøv 4–8 for mer eller mindre vipp

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const tiltY = ((x - midX) / midX) * maxTilt; // venstre/høyre
    const tiltX = -((y - midY) / midY) * maxTilt; // opp/ned

    rotateX.set(tiltX);
    rotateY.set(tiltY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  /** 4) Litt skeiv rotasjon som før */
  const rotationClass =
    side === "left"
      ? "md:-rotate-[0.6deg]"
      : side === "right"
      ? "md:rotate-[0.6deg]"
      : "";

  return (
    <motion.article
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: 0.5 + index * 0.02,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={side === "mobile" ? "relative ml-20" : "relative"}
      style={{
        y: floatY,
        rotate: floatRotate,
        perspective: 1000,
        willChange: "transform, opacity",
        contain: "layout paint",
      }}
    >
      {/* connector mot midtlinja (kun ≥ sm) */}
      {side !== "mobile" && (
        <span
          aria-hidden
          className={[
            "hidden sm:block absolute top-10 h-0.5 w-10 bg-amber-900/15",
            side === "left" ? "-right-10" : "-left-10",
          ].join(" ")}
        />
      )}

      {/* SELVE KORTET – dette får hover tilt */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={[
          "group relative overflow-hidden rounded-[18px]",
          "bg-[#FAF7F1]",
          "border border-amber-100/70 rounded-2xl",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1",
          "hover:border-amber-200",
          rotationClass,
        ].join(" ")}
      >
        {/* Papirtekstur */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Vignette / innramming */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)",
            boxShadow: "inset 0 0 18px rgba(15,23,42,0.25)",
          }}
        />

        {/* Top light / teaterlys */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.95), transparent)",
          }}
        />

        {/* Dekorativ gullinje øverst */}
        <div className="absolute top-0 inset-x-6 h-[3px] rounded-full bg-linear-to-r from-amber-400 via-amber-300 to-amber-500 opacity-80" />

        {/* Valgfritt bilde */}
        {image ? (
          <div className="relative aspect-video overflow-hidden bg-linear-to-br from-cynical-900 to-burgundy-900">
            <img
              src={urlFor(image)
                .width(640)
                .height(360)
                .quality(85)
                .auto("format")
                .url()}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-10 opacity-60"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
              }}
            />
          </div>
        ) : null}

        {/* Innhold */}
        <div className="relative p-6 sm:p-7">
          <h3 className="text-2xl font-sans font-bold text-cynical-900 mb-3 tracking-[0.03em]">
            {title}
          </h3>
          {desc ? (
            <p className="text-[15px] leading-relaxed text-gray-800">
              {desc}
            </p>
          ) : null}
        </div>

        {/* Dekor-hjørner */}
        <div className="pointer-events-none absolute top-4 right-5 w-10 h-10 border-t border-r border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="pointer-events-none absolute bottom-4 left-5 w-10 h-10 border-b border-l border-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </motion.article>
  );
}





// // src/components/sections/Timeline.tsx
// import { useRef } from "react";
// import { motion, useScroll, useInView } from "framer-motion";
// import { Container } from "@/components/layout/Container";
// import { urlFor } from "@/lib/sanity";
// import type { Milestone } from "@/types/sanity";
// import { OldPaper } from "../ui/OldPaper";

// /** Minimal bilde-type for Sanity uten å bruke any */
// type SanityImageLike =
//   | string
//   | {
//       asset?: { _ref?: string; _id?: string };
//       [key: string]: unknown;
//     };

// /** Trygg lesing av vilkårlige felter uten å kaste direkte til Record<string, unknown> */
// function getProp<T = unknown>(obj: unknown, key: string): T | undefined {
//   if (obj && typeof obj === "object" && key in (obj as Record<string, unknown>)) {
//     return (obj as Record<string, unknown>)[key] as T;
//   }
//   return undefined;
// }

// function getYear(m: Milestone): string {
//   const y = getProp<number | string>(m, "year");
//   if (typeof y === "number" || typeof y === "string") return String(y);
//   const d = getProp<string>(m, "date");
//   return typeof d === "string" ? d.slice(0, 4) : "";
// }

// function getDesc(m: Milestone): string {
//   const d = getProp<string>(m, "description");
//   if (typeof d === "string" && d.length) return d;
//   const ex = getProp<string>(m, "excerpt");
//   return typeof ex === "string" ? ex : "";
// }

// function getId(m: Milestone, fallback: string): string {
//   const id = getProp<string>(m, "_id");
//   return id ?? fallback;
// }

// function getImage(m: Milestone): SanityImageLike | undefined {
//   return getProp<SanityImageLike>(m, "image");
// }

// // Sorterings-hjelper
// function getTime(m: Milestone): number {
//   const y = getProp<number | string>(m, "year");
//   if (typeof y === "number") return new Date(y, 0, 1).getTime();
//   if (typeof y === "string" && /^\d{4}$/.test(y)) {
//     return new Date(parseInt(y, 10), 0, 1).getTime();
//   }

//   const d = getProp<string>(m, "date");
//   if (typeof d === "string") {
//     const t = Date.parse(d);
//     if (!Number.isNaN(t)) return t;
//     const ym = d.match(/\d{4}/);
//     if (ym) return new Date(parseInt(ym[0], 10), 0, 1).getTime();
//   }

//   const created = getProp<string>(m, "_createdAt");
//   if (typeof created === "string") {
//     const t = Date.parse(created);
//     if (!Number.isNaN(t)) return t;
//   }

//   return 0;
// }

// interface TimelineProps {
//   milestones: Milestone[];
// }

// export function Timeline({ milestones }: TimelineProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"],
//   });

//   const sorted = [...milestones].sort((a, b) => getTime(a) - getTime(b));

//   return (
//     <OldPaper ref={containerRef} className="relative">
//       <Container size="lg">
//         {/* Heading */}
//         <div className="text-center py-16">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl sm:text-5xl font-sans font-bold text-cynical-900 mb-4"
//           >
//             Vår reise gjennom tid
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.15 }}
//             className="text-lg text-gray-600 max-w-2xl mx-auto"
//           >
//             Fra første forestilling til i dag – historien om Kongsvinger
//             Festningsteater
//           </motion.p>
//         </div>

//         <div className="relative pb-16">
//           {/* Hovedlinje */}
//           <div className="absolute top-0 bottom-0 w-px bg-amber-900/10 left-8 sm:left-1/2 sm:-translate-x-1/2" />

//           {/* Progress-linje */}
//           <motion.div
//             className="absolute top-0 w-px bg-linear-to-b from-gold-400 to-torch-500 origin-top left-8 sm:left-1/2 sm:-translate-x-1/2"
//             style={{ scaleY: scrollYProgress }}
//           />

//           <ol className="space-y-14 sm:space-y-20">
//             {sorted.map((m, i) => {
//               const isRight = i % 2 === 0;
//               const year = getYear(m);
//               const title = (m as { title?: string }).title ?? "";
//               const desc = getDesc(m);
//               const image = getImage(m);

//               return (
//                 <li
//                   key={getId(m, String(i))}
//                   className="relative grid grid-cols-1 sm:grid-cols-2 sm:gap-12"
//                 >
//                   {/* Års-badge på linja */}
//                   <div className="absolute -top-1 left-8 sm:left-1/2 sm:-translate-x-1/2 -translate-x-1/2">
//                     <motion.div
//                       initial={{ scale: 0, rotate: -8 }}
//                       whileInView={{ scale: 1, rotate: 0 }}
//                       viewport={{ amount: 0.6, once: false }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 260,
//                         damping: 18,
//                       }}
//                       className="relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-[#FAF7F1] shadow-xl bg-linear-to-br from-gold-400 to-gold-600"
//                     >
//                       <span className="text-white font-sans font-bold text-sm leading-none">
//                         {year}
//                       </span>
//                       <span
//                         aria-hidden
//                         className="absolute inset-0 rounded-full bg-gold-400/30 blur-xl -z-10"
//                       />
//                     </motion.div>
//                   </div>

//                   {/* VENSTRE sidekort (>= sm) */}
//                   <div className="hidden sm:block sm:col-start-1 pb-16">
//                     {!isRight && (
//                       <Card
//                         side="left"
//                         title={title}
//                         desc={desc}
//                         image={image}
//                         index={i}
//                       />
//                     )}
//                   </div>

//                   {/* HØYRE sidekort (>= sm) */}
//                   <div className="hidden sm:block sm:col-start-2 pb-16">
//                     {isRight && (
//                       <Card
//                         side="right"
//                         title={title}
//                         desc={desc}
//                         image={image}
//                         index={i}
//                       />
//                     )}
//                   </div>

//                   {/* MOBIL: én kolonne */}
//                   <div className="sm:hidden col-span-1 pb-16">
//                     <Card
//                       side="mobile"
//                       title={title}
//                       desc={desc}
//                       image={image}
//                       index={i}
//                     />
//                   </div>
//                 </li>
//               );
//             })}
//           </ol>
//         </div>
//       </Container>
//     </OldPaper>
//   );
// }

// function Card({
//   side,
//   title,
//   desc,
//   image,
//   index,
// }: {
//   side: "left" | "right" | "mobile";
//   title: string;
//   desc: string;
//   image?: SanityImageLike;
//   index: number;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { amount: 0.5, margin: "0px 0px -10% 0px" });

//   const variants = {
//     hidden: {
//       opacity: 0,
//       x: side === "left" ? -50 : side === "right" ? 50 : 16,
//       scale: 0.98,
//       filter: "blur(3px)",
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       scale: 1,
//       filter: "blur(0px)",
//     },
//   } as const;

//   const rotationClass =
//     side === "left"
//       ? "md:-rotate-[0.6deg]"
//       : side === "right"
//       ? "md:rotate-[0.6deg]"
//       : "";

//   return (
//     <motion.article
//       ref={ref}
//       variants={variants}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       transition={{
//         duration: 0.5 + index * 0.02,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className={side === "mobile" ? "relative ml-20" : "relative"}
//       style={{ willChange: "transform, opacity", contain: "layout paint" }}
//     >
//       {/* connector mot midtlinja (kun ≥ sm) */}
//       {side !== "mobile" && (
//         <span
//           aria-hidden
//           className={[
//             "hidden sm:block absolute top-10 h-0.5 w-10 bg-amber-900/15",
//             side === "left" ? "-right-10" : "-left-10",
//           ].join(" ")}
//         />
//       )}

//       {/* SELVE KORTET */}
//       <div
//         className={[
//           "group relative overflow-hidden rounded-[18px]",
//           "bg-[#FAF7F1]",
//           "border border-amber-100/70",
//           "shadow-[0_20px_60px_rgba(15,23,42,0.45)]",
//           "transition-all duration-300 ease-out",
//           "hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.65)]",
//           "hover:border-amber-200",
//           rotationClass,
//         ].join(" ")}
//       >
//         {/* Papirtekstur (lav opasitet) */}
//         <div
//           className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
//           style={{
//             backgroundImage:
//               "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
//           }}
//         />

//         {/* Vignette / innramming */}
//         <div
//           className="pointer-events-none absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)",
//             boxShadow: "inset 0 0 18px rgba(15,23,42,0.25)",
//           }}
//         />

//         {/* Top light / teaterlys */}
//         <div
//           className="pointer-events-none absolute inset-x-0 top-0 h-16"
//           style={{
//             background:
//               "linear-gradient(to bottom, rgba(255,255,255,0.95), transparent)",
//           }}
//         />

//         {/* Dekorativ gullinje øverst */}
//         <div className="absolute top-0 inset-x-6 h-[3px] rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 opacity-80" />

//         {/* Valgfritt bilde */}
//         {image ? (
//           <div className="relative aspect-[16/9] overflow-hidden bg-linear-to-br from-cynical-900 to-burgundy-900">
//             <img
//               src={urlFor(image)
//                 .width(640)
//                 .height(360)
//                 .quality(85)
//                 .auto("format")
//                 .url()}
//               alt={title}
//               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//               loading="lazy"
//             />

//             {/* Lysstrek over bildet */}
//             <div
//               className="pointer-events-none absolute inset-x-0 top-0 h-10 opacity-60"
//               style={{
//                 background:
//                   "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
//               }}
//             />
//           </div>
//         ) : null}

//         {/* Innhold */}
//         <div className="relative p-6 sm:p-7">
//           <h3 className="text-2xl font-sans font-bold text-cynical-900 mb-3 tracking-[0.03em]">
//             {title}
//           </h3>
//           {desc ? (
//             <p className="text-[15px] leading-relaxed text-gray-800">
//               {desc}
//             </p>
//           ) : null}
//         </div>

//         {/* Dekor-hjørner */}
//         <div className="pointer-events-none absolute top-4 right-5 w-10 h-10 border-t border-r border-amber-400/40 opacity-0 group-hover:opacity-100 transition-opacity" />
//         <div className="pointer-events-none absolute bottom-4 left-5 w-10 h-10 border-b border-l border-amber-400/40 opacity-0 group-hover:opacity-100 transition-opacity" />
//       </div>
//     </motion.article>
//   );
// }
