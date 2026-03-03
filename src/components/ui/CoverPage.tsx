// src/components/ui/CoverPage.tsx
import { forwardRef } from "react";
import { BookOpen } from "lucide-react";
import { OldPaper } from "@/components/ui/OldPaper";

export const CoverPage = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="w-full h-full">
    {/* Ytre bok – lær + gullramme */}
    <div className="w-full h-full bg-linear-to-br from-[#2b1810] via-[#1e120c] to-[#2b1810] border-8 border-double border-gold-400/70 shadow-2xl shadow-black/60 relative overflow-hidden">
      {/* “Rygg” på venstre side */}
      <div className="absolute inset-y-0 left-0 w-6 bg-linear-to-b from-black/40 via-black/10 to-black/50 opacity-70 pointer-events-none" />

      {/* Inner panel med OldPaper for subtil tekstur */}
      <div className="absolute inset-[18px] rounded-lg border border-gold-400/90 shadow-[inset_0_0_25px_rgba(0,0,0,0.8)] overflow-hidden">
        <OldPaper className="w-full h-full bg-linear-to-br from-cynical-900 via-cynical-800 to-cynical-900 text-gold-100 flex items-center justify-center">
          <div className="px-8 md:px-12 py-10 text-center space-y-6">
            <BookOpen className="mx-auto w-14 h-14 md:w-16 md:h-16 text-gold-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
            
            <h1 className="
                font-spice
                whitespace-nowrap
                text-center
                mx-auto
                text-gold-50
                tracking-[0.18em]
                font-bold
                max-w-[90%]
                text-[clamp(1.2rem,3vw,2.5rem)]
                -translate-x-3.5
    ">
              EVENTYRFESTNINGEN
            </h1>
            <svg className="w-48 md:w-80 mx-auto mt-4 opacity-70" viewBox="0 0 400 60" fill="none">
  <path d="M0 30 Q100 0 200 30 T400 30" stroke="currentColor" strokeWidth="2" className="text-yellow-500"/>
  <path d="M0 30 Q100 60 200 30 T400 30" stroke="currentColor" strokeWidth="2" className="text-yellow-500"/>
</svg>

            {/* <div className="w-24 md:w-32 h-px md:h-[2px] bg-linear-to-r from-transparent via-gold-400 to-transparent mx-auto" /> */}

            <p className="italic text-gold-100/80 text-base md:text-xl font-sans">
              Arkiv over magiske forestillinger
            </p>

            <p className="text-[11px] md:text-xs text-gold-200/70 tracking-[0.3em] uppercase font-sans">
              EST · ANNO DOMINI · 2019
            </p>
          </div>
        </OldPaper>
      </div>
    </div>
  </div>
));

CoverPage.displayName = "CoverPage";


// // src/components/ui/CoverPage.tsx
// import { forwardRef } from "react";
// import { BookOpen } from "lucide-react";
// import { OldPaper } from "@/components/ui/OldPaper";

// export const CoverPage = forwardRef<HTMLDivElement>((_, ref) => (
//   <OldPaper ref={ref} className="w-full h-full bg-leather-cover text-yellow-100 flex items-center justify-center bg-cynical-900/90 border-amber-300 border-2">
//     <div className="p-10 text-center space-y-6">
//       <BookOpen className="mx-auto w-16 h-16 text-yellow-300" />
//       <h1 className="text-4xl font-sans tracking-wider uppercase">Eventyrfestningen</h1>
//       <p className="italic text-yellow-200 text-lg">Bla i våre tidligere forestillinger</p>
//     </div>
//   </OldPaper>
// ));

// CoverPage.displayName = "CoverPage";
