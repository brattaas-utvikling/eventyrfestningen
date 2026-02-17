// src/components/ui/BackCoverPage.tsx
import { forwardRef } from "react";
import { OldPaper } from "@/components/ui/OldPaper";

export const BackCoverPage = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="w-full h-full">
    {/* Ytre bok – lær + gullramme (samme som CoverPage) */}
    <div className="w-full h-full bg-linear-to-br from-[#2b1810] via-[#1e120c] to-[#2b1810] border-8 border-double border-gold-400/70 shadow-2xl shadow-black/60 relative overflow-hidden">
      {/* “Rygg” på høyre side (speil av forsiden) */}
      <div className="absolute inset-y-0 right-0 w-6 bg-linear-to-b from-black/40 via-black/10 to-black/50 opacity-70 pointer-events-none" />

      {/* Inner panel med OldPaper for subtil tekstur */}
      <div className="absolute inset-[18px] rounded-lg border border-gold-400/50 shadow-[inset_0_0_25px_rgba(0,0,0,0.8)] overflow-hidden">
        <OldPaper className="w-full h-full bg-linear-to-br from-cynical-900 via-cynical-800 to-cynical-900 text-gold-100 flex items-center justify-center">
          <div className="px-8 md:px-12 py-10 text-center space-y-6">
            <p className="text-2xl md:text-3xl italic text-gold-50 font-sans">
              "Historiene lever videre..."
            </p>

            <div className="w-24 md:w-32 h-0.5 bg-linear-to-r from-transparent via-gold-400 to-transparent mx-auto" />

            <div className="space-y-1">
              <p className="text-base md:text-lg text-gold-200 font-sans">
                Kongsvinger Festning
              </p>
              <p className="text-sm md:text-base text-gold-300/80 tracking-[0.18em] uppercase font-spice">
                eventyrfestningen
              </p>
            </div>
          </div>
        </OldPaper>
      </div>
    </div>
  </div>
));

BackCoverPage.displayName = "BackCoverPage";


// // src/components/ui/BackCoverPage.tsx
// import { forwardRef } from "react";
// import { OldPaper } from "@/components/ui/OldPaper";

// export const BackCoverPage = forwardRef<HTMLDivElement>((_, ref) => (
//   <div ref={ref} className="w-full h-full bg-leather-cover text-yellow-100 flex items-center justify-center bg-cynical-900 border-amber-200 border-2">
//     <OldPaper className="p-10 text-center space-y-4">
//       <p className="text-xl italic">"Historiene lever videre..."</p>
//       <hr className="border-yellow-100 w-1/2 mx-auto" />
//       <p className="text-sm">Eventyrfestningen.no</p>
//     </OldPaper>
//   </div>
// ));

// BackCoverPage.displayName = "BackCoverPage";
