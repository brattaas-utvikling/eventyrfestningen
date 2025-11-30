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
  // Raskere på mobil for bedre UX
  const curtainProgress = useTransform(
    scrollYProgress,
    [0.15, 0.55], // Litt raskere åpning
    [0, 1],
    { clamp: true }
  );

  // Bevegelse av gardiner
  const leftX = useTransform(curtainProgress, [0, 1], ["0%", "-102%"]);
  const rightX = useTransform(curtainProgress, [0, 1], ["0%", "102%"]);

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-16 sm:py-20 md:py-24 bg-navy-950 overflow-hidden"
    >
      {/* Dramatisk spotlight bak med ekstra stråler */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
      >
        {/* Hoved spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(234,179,8,0.25),rgba(15,23,42,0.9)_50%,rgba(15,23,42,1)_80%)]" />
        
        {/* Ekstra lys-stråler fra toppen */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              conic-gradient(
                from 180deg at 50% 0%, 
                transparent 0deg,
                rgba(234,179,8,0.08) 30deg,
                transparent 60deg,
                rgba(234,179,8,0.08) 90deg,
                transparent 120deg,
                rgba(234,179,8,0.08) 150deg,
                transparent 180deg
              )
            `
          }}
        />
      </div>

      {/* VENSTRE GARDIN */}
      <motion.div
        style={{ x: leftX }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 md:w-[52%] z-50 will-change-transform"
      >
        {/* Hovedgardin med forbedret tekstur */}
        <div className="relative w-full h-full bg-gradient-to-r from-red-950 via-red-900 to-red-800">
          
          {/* FORBEDRET: Mer realistiske vertikale plisser */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.4) 0px,
                  rgba(0, 0, 0, 0.3) 1px,
                  transparent 2px,
                  transparent 6px,
                  rgba(255, 255, 255, 0.06) 8px,
                  rgba(255, 255, 255, 0.1) 9px,
                  rgba(255, 255, 255, 0.06) 10px,
                  transparent 12px,
                  transparent 18px,
                  rgba(0, 0, 0, 0.35) 20px,
                  rgba(0, 0, 0, 0.4) 22px
                )
              `,
            }}
          />

          {/* NYTT: Ekstra dybde med subtil gradient overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.3) 0%,
                  transparent 20%,
                  transparent 80%,
                  rgba(0, 0, 0, 0.2) 100%
                )
              `
            }}
          />

          {/* Hovedskygge fra kanten */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 150% 100% at 0% 50%, rgba(0, 0, 0, 0.5), transparent 50%)",
            }}
          />

          {/* OPTIMALISERT: Enklere SVG for bedre mobilytelse */}
          <svg
            className="absolute right-0 top-0 h-full w-6 md:w-10 text-red-900 drop-shadow-[3px_0_10px_rgba(0,0,0,0.6)]"
            preserveAspectRatio="none"
            viewBox="0 0 20 100"
            fill="currentColor"
          >
            <path
              d="M 0,0 
                 Q 12,3 16,8
                 Q 19,12 17,16
                 Q 15,20 17,24
                 Q 19,28 16,32
                 Q 13,36 16,40
                 Q 19,44 15,48
                 Q 11,52 15,56
                 Q 19,60 16,64
                 Q 13,68 17,72
                 Q 20,76 16,80
                 Q 12,84 16,88
                 Q 19,92 17,96
                 Q 15,99 20,100
                 L 0,100 Z"
            />
          </svg>

          {/* FORBEDRET: Highlight med mer variasjon */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  rgba(255, 255, 255, 0.08) 8px,
                  rgba(255, 255, 255, 0.15) 9px,
                  rgba(255, 255, 255, 0.08) 10px,
                  transparent 12px,
                  transparent 22px
                )
              `,
            }}
          />

          {/* NYTT: Ekstra skygge på høyre kant for dybde */}
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-black/50 via-black/20 to-transparent" />
          
          {/* NYTT: Subtil ambient occlusion øverst og nederst */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </motion.div>

      {/* HØYRE GARDIN */}
      <motion.div
        style={{ x: rightX }}
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 md:w-[52%] z-50 will-change-transform"
      >
        {/* Hovedgardin med forbedret tekstur */}
        <div className="relative w-full h-full bg-gradient-to-l from-red-950 via-red-900 to-red-800">
          
          {/* FORBEDRET: Mer realistiske vertikale plisser */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.4) 0px,
                  rgba(0, 0, 0, 0.3) 1px,
                  transparent 2px,
                  transparent 6px,
                  rgba(255, 255, 255, 0.06) 8px,
                  rgba(255, 255, 255, 0.1) 9px,
                  rgba(255, 255, 255, 0.06) 10px,
                  transparent 12px,
                  transparent 18px,
                  rgba(0, 0, 0, 0.35) 20px,
                  rgba(0, 0, 0, 0.4) 22px
                )
              `,
            }}
          />

          {/* NYTT: Ekstra dybde med subtil gradient overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `
                linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.2) 0%,
                  transparent 20%,
                  transparent 80%,
                  rgba(0, 0, 0, 0.3) 100%
                )
              `
            }}
          />

          {/* Hovedskygge fra kanten */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 150% 100% at 100% 50%, rgba(0, 0, 0, 0.5), transparent 50%)",
            }}
          />

          {/* OPTIMALISERT: Enklere SVG for bedre mobilytelse */}
          <svg
            className="absolute left-0 top-0 h-full w-6 md:w-10 text-red-900 drop-shadow-[-3px_0_10px_rgba(0,0,0,0.6)]"
            preserveAspectRatio="none"
            viewBox="0 0 20 100"
            fill="currentColor"
          >
            <path
              d="M 20,0 
                 Q 8,3 4,8
                 Q 1,12 3,16
                 Q 5,20 3,24
                 Q 1,28 4,32
                 Q 7,36 4,40
                 Q 1,44 5,48
                 Q 9,52 5,56
                 Q 1,60 4,64
                 Q 7,68 3,72
                 Q 0,76 4,80
                 Q 8,84 4,88
                 Q 1,92 3,96
                 Q 5,99 0,100
                 L 20,100 Z"
            />
          </svg>

          {/* FORBEDRET: Highlight med mer variasjon */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent 0px,
                  rgba(255, 255, 255, 0.08) 8px,
                  rgba(255, 255, 255, 0.15) 9px,
                  rgba(255, 255, 255, 0.08) 10px,
                  transparent 12px,
                  transparent 22px
                )
              `,
            }}
          />

          {/* NYTT: Ekstra skygge på venstre kant for dybde */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
          
          {/* NYTT: Subtil ambient occlusion øverst og nederst */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </motion.div>

      {/* FORBEDRET: Gardin-stang med mer detaljer */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-4 md:h-6 z-[60]">
        <div className="relative w-full h-full">
          {/* Stang med bedre gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 shadow-2xl" />
          
          {/* Metallisk glans med mer kontrast */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 20%, transparent 40%, transparent 60%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.5) 100%)",
            }}
          />

          {/* NYTT: Dekorativ textur på stangen */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 15px,
                rgba(0,0,0,0.4) 15px,
                rgba(0,0,0,0.4) 17px,
                transparent 17px,
                transparent 30px
              )`,
            }}
          />

          {/* FORBEDRET: Større, mer detaljerte finials */}
          <div className="absolute -left-2 md:-left-3 top-1/2 -translate-y-1/2 w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-amber-500 via-amber-700 to-amber-950 shadow-2xl border-2 border-amber-600/50">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-transparent to-black/30" />
          </div>
          <div className="absolute -right-2 md:-right-3 top-1/2 -translate-y-1/2 w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-amber-500 via-amber-700 to-amber-950 shadow-2xl border-2 border-amber-600/50">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-transparent to-black/30" />
          </div>

          {/* NYTT: Ekstra skygge under stangen */}
          <div className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-b from-black/40 to-transparent blur-sm" />
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
