// src/components/layout/CurtainSection.tsx
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/layout/Container";

interface CurtainSectionProps {
  id?: string;
  children: ReactNode;
}

export function CurtainSection({ id, children }: CurtainSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Scroll progress for hele seksjonen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Gardin-progress: åpner seg gradvis
  const curtainProgress = useTransform(
    scrollYProgress,
    [0.2, 0.6],
    [0, 1],
    { clamp: true }
  );

  // Bevegelse av gardiner
  const leftX = useTransform(curtainProgress, [0, 1], ["0%", "-100%"]);
  const rightX = useTransform(curtainProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-20 sm:py-24 bg-navy-950 overflow-hidden"
    >
      {/* Spotlight bak gardiner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,179,8,0.15),rgba(15,23,42,1)_70%)]" />
      </div>

      {/* Venstre gardin */}
      <motion.div
        style={{ x: leftX }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 z-50"
      >
        {/* Gardin-tekstur med wavy kant */}
        <div className="relative w-full h-full bg-gradient-to-r from-red-900 via-red-800 to-red-900">
          {/* Vertikale folder/plisser */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.3) 0px,
                transparent 2px,
                transparent 8px,
                rgba(255, 255, 255, 0.08) 10px,
                rgba(255, 255, 255, 0.08) 12px,
                transparent 14px,
                transparent 20px,
                rgba(0, 0, 0, 0.3) 22px,
                rgba(0, 0, 0, 0.3) 24px
              )`,
            }}
          />

          {/* Skygge for dybde */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 0% 50%, rgba(0, 0, 0, 0.4), transparent 60%)",
            }}
          />

          {/* Wavy høyre kant */}
          <svg
            className="absolute right-0 top-0 h-full w-8 text-red-900"
            preserveAspectRatio="none"
            viewBox="0 0 20 100"
            fill="currentColor"
          >
            <path
              d="M 0 0 
                 Q 10 2, 15 5
                 Q 20 8, 18 12
                 Q 16 16, 18 20
                 Q 20 24, 17 28
                 Q 14 32, 17 36
                 Q 20 40, 16 44
                 Q 12 48, 16 52
                 Q 20 56, 17 60
                 Q 14 64, 18 68
                 Q 22 72, 17 76
                 Q 12 80, 16 84
                 Q 20 88, 18 92
                 Q 16 96, 20 100
                 L 0 100 Z"
              className="drop-shadow-[2px_0_8px_rgba(0,0,0,0.5)]"
            />
          </svg>

          {/* Highlight på folder */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent 0px,
                rgba(255, 255, 255, 0.1) 10px,
                rgba(255, 255, 255, 0.15) 11px,
                transparent 12px,
                transparent 24px
              )`,
            }}
          />

          {/* Myk skygge på høyre side */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/40 to-transparent" />
        </div>
      </motion.div>

      {/* Høyre gardin */}
      <motion.div
        style={{ x: rightX }}
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 z-50"
      >
        {/* Gardin-tekstur med wavy kant */}
        <div className="relative w-full h-full bg-gradient-to-l from-red-900 via-red-800 to-red-900">
          {/* Vertikale folder/plisser */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.3) 0px,
                transparent 2px,
                transparent 8px,
                rgba(255, 255, 255, 0.08) 10px,
                rgba(255, 255, 255, 0.08) 12px,
                transparent 14px,
                transparent 20px,
                rgba(0, 0, 0, 0.3) 22px,
                rgba(0, 0, 0, 0.3) 24px
              )`,
            }}
          />

          {/* Skygge for dybde */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 100% 50%, rgba(0, 0, 0, 0.4), transparent 60%)",
            }}
          />

          {/* Wavy venstre kant */}
          <svg
            className="absolute left-0 top-0 h-full w-8 text-red-900"
            preserveAspectRatio="none"
            viewBox="0 0 20 100"
            fill="currentColor"
          >
            <path
              d="M 20 0 
                 Q 10 2, 5 5
                 Q 0 8, 2 12
                 Q 4 16, 2 20
                 Q 0 24, 3 28
                 Q 6 32, 3 36
                 Q 0 40, 4 44
                 Q 8 48, 4 52
                 Q 0 56, 3 60
                 Q 6 64, 2 68
                 Q -2 72, 3 76
                 Q 8 80, 4 84
                 Q 0 88, 2 92
                 Q 4 96, 0 100
                 L 20 100 Z"
              className="drop-shadow-[-2px_0_8px_rgba(0,0,0,0.5)]"
            />
          </svg>

          {/* Highlight på folder */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent 0px,
                rgba(255, 255, 255, 0.1) 10px,
                rgba(255, 255, 255, 0.15) 11px,
                transparent 12px,
                transparent 24px
              )`,
            }}
          />

          {/* Myk skygge på venstre side */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/40 to-transparent" />
        </div>
      </motion.div>

      {/* Gardin-stang øverst */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 z-[60]">
        <div className="relative w-full h-full">
          {/* Stang */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 shadow-lg" />
          
          {/* Metallisk glans */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.3) 100%)",
            }}
          />
          
          {/* Finials/endeknapper */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 shadow-xl border-2 border-amber-700" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 shadow-xl border-2 border-amber-700" />
        </div>
      </div>

      {/* Innhold */}
      <div className="relative z-10">
        <Container>{children}</Container>
      </div>
    </section>
  );
}

// import { useRef, type ReactNode } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { Container } from "@/components/layout/Container";

// interface CurtainSectionProps {
//   id?: string;
//   children: ReactNode;
// }

// export function CurtainSection({ id, children }: CurtainSectionProps) {
//   const ref = useRef<HTMLDivElement | null>(null);

//   // 1) Basert på hele seksjonens vei gjennom viewport
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"], // 0 = akkurat kommet inn, 1 = på vei ut
//   });

//   // 2) Eget "gardin-progress" som åpner seg kjappere midt i
//   //    0.0–0.2  → fortsatt (nesten) helt lukket
//   //    0.2–0.6  → åpner fra 0 → 1
//   //    0.6–1.0  → holder seg helt åpen
//   const curtainProgress = useTransform(
//     scrollYProgress,
//     [0.2, 0.6],
//     [0, 1],
//     { clamp: true }
//   );

//   // 3) Bruk curtainProgress til selve bevegelsen
//   const leftX = useTransform(curtainProgress, [0, 1], ["0%", "-95%"]);
//   const rightX = useTransform(curtainProgress, [0, 1], ["0%", "95%"]);

//   return (
//     <section
//       id={id}
//       ref={ref}
//       className="relative py-20 sm:py-24 bg-navy-950 overflow-hidden"
//     >
//       {/* spotlight bak */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 opacity-40"
//       >
//         <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-gold-500/15 via-navy-900 to-navy-950" />
//       </div>

//       {/* Gardiner */}
//       <motion.div
//         style={{ x: leftX }}
//         className="
//           pointer-events-none
//           absolute inset-y-0 left-0 w-1/2
//           bg-[radial-gradient(circle_at_0_50%,rgba(0,0,0,0.35),transparent_60%),repeating-linear-gradient(90deg,rgba(0,0,0,0.15)_0,rgba(0,0,0,0.15)_4px,transparent_4px,transparent_12px)]
//           bg-red-900
//           shadow-[10px_0_25px_rgba(0,0,0,0.4)]
//           origin-left
//           rounded-r-[40px]
//           z-50
//         "
//       />

//       <motion.div
//         style={{ x: rightX }}
//         className="
//           pointer-events-none
//           absolute inset-y-0 right-0 w-1/2
//           bg-[radial-gradient(circle_at_100%_50%,rgba(0,0,0,0.35),transparent_60%),repeating-linear-gradient(90deg,rgba(0,0,0,0.15)_0,rgba(0,0,0,0.15)_4px,transparent_4px,transparent_12px)]
//           bg-red-900
//           shadow-[-10px_0_25px_rgba(0,0,0,0.4)]
//           origin-right
//           rounded-l-[40px]
//           z-50
//         "
//       />

//       {/* Innhold */}
//       <div className="relative z-10">
//         <Container>{children}</Container>
//       </div>
//     </section>
//   );
// }
