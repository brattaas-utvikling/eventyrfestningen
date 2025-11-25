// src/components/ui/ShowPageLeft.tsx
import { forwardRef } from 'react';
import { OldPaper } from '@/components/ui/OldPaper';
import { urlFor } from '@/lib/sanity';
import type { Show } from '@/types/sanity';

interface ShowPageLeftProps {
  show: Show;
}

export const ShowPageLeft = forwardRef<HTMLDivElement, ShowPageLeftProps>(
  ({ show }, ref) => {
    const imageUrl = show.posterImage
      ? urlFor(show.posterImage).width(600).height(900).quality(90).url()
      : null;

    return (
      <div ref={ref} className="w-full h-full">
        <OldPaper className="w-full h-full bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100 p-6 md:p-10 flex flex-col">
          {/* Year */}
          <div className="text-xs text-amber-900/40 mb-4 text-center font-serif">
            ~ {show.year} ~
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
            {/* Image with decorative frame */}
            <div className="relative border-4 border-amber-900/20 border-double p-2 bg-amber-100/50 shadow-lg">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={show.posterImage?.alt || show.title}
                  className="w-full aspect-3/4 object-cover sepia-50 brightness-95"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-3/4 bg-linear-to-br from-amber-200 to-amber-300 flex items-center justify-center">
                  <div className="text-center text-amber-900/60">
                    <div className="text-6xl mb-2">🎭</div>
                    <p className="text-sm italic">Plakat</p>
                  </div>
                </div>
              )}
            </div>

            {/* Title and category */}
            {/* <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-px bg-amber-900/30" />
                <span className="text-xs text-amber-900/50 uppercase tracking-wider">
                  {show.type === 'main' ? 'Hovedforestilling' : 'Halloween'}
                </span>
                <div className="w-8 h-px bg-amber-900/30" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-amber-950 font-display">
                {show.title}
              </h2>
            </div> */}
          </div>

          {/* Decorative bottom element */}
          <div className="mt-4 text-center">
            <div className="inline-block w-16 h-px bg-amber-900/20" />
          </div>
        </OldPaper>
      </div>
    );
  }
);

ShowPageLeft.displayName = 'ShowPageLeft';

// // src/components/sections/ShowPageLeft.tsx
// // src/components/sections/ShowPageLeft.tsx
// import { forwardRef } from 'react';
// import { OldPaper } from '@/components/ui/OldPaper';
// import { urlFor } from '@/lib/sanity';
// import type { Show } from '@/types/sanity';

// interface ShowPageLeftProps {
//   show: Show;
// }

// export const ShowPageLeft = forwardRef<HTMLDivElement, ShowPageLeftProps>(
//   ({ show }, ref) => {
//     const imageUrl = show.posterImage
//       ? urlFor(show.posterImage).width(400).height(600).url()
//       : null;

//     return (
//       <div
//         ref={ref}
//         className="w-full h-full bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100 shadow-xl"
//       >
//         <OldPaper className="w-full h-full p-6 md:p-10 flex flex-col">
//           {/* Årstall */}
//           <div className="text-xs text-amber-900/40 mb-4 text-center">
//             ~ {show.year} ~
//           </div>

//           {/* Hovedinnhold: bilde og tittel */}
//           <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
//             {/* Bilde med dekorativ ramme */}
//             <div className="relative border-4 border-amber-900/20 border-double p-2 bg-amber-100/50">
//               {imageUrl ? (
//                 <img
//                   src={imageUrl}
//                   alt={show.posterImage?.alt || show.title}
//                   className="w-full aspect-[3/4] object-cover"
//                   loading="lazy"
//                 />
//               ) : (
//                 <div className="aspect-[3/4] bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
//                   <div className="text-center text-amber-900/60">
//                     <div className="text-6xl mb-2">🎭</div>
//                     <p className="text-sm italic">Plakat</p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Tittel og kategori */}
//             <div className="text-center space-y-2">
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-8 h-px bg-amber-900/30" />
//                 <span className="text-xs text-amber-900/50">
//                   {show.type === 'main' ? 'Hovedforestilling' : 'Halloween'}
//                 </span>
//                 <div className="w-8 h-px bg-amber-900/30" />
//               </div>
//               <h2 className="text-2xl md:text-3xl font-bold text-amber-950 font-display">
//                 {show.title}
//               </h2>
//             </div>
//           </div>

//           {/* Dekorativ bunnelement */}
//           <div className="mt-4 text-center">
//             <div className="inline-block w-16 h-px bg-amber-900/20" />
//           </div>
//         </OldPaper>
//       </div>
//     );
//   }
// );

// ShowPageLeft.displayName = 'ShowPageLeft';





// // src/components/flipbook/ShowPageLeft.tsx
// import { forwardRef } from "react";
// import { urlFor } from "@/lib/sanity";

// interface Props {
//   posterImage: {
//     _id: string;
//     asset: {
//       url: string;
//     };
//   } | null; // Assuming posterImage can be null
//   title: string;
// }

// export const ShowPageLeft = forwardRef<HTMLDivElement, Props>(({ posterImage, title }, ref) => {
//   const imageUrl = posterImage ? urlFor(posterImage).width(400).height(600).url() : null;
//   return (
//     <div ref={ref} className="w-full h-full bg-old-paper bg-cover bg-center flex items-center justify-center p-6">
//       {imageUrl ? (
//         <img src={imageUrl} alt={title} className="max-h-full rounded border border-amber-700 shadow-md" />
//       ) : (
//         <div className="text-center text-amber-800">Ingen plakat tilgjengelig</div>
//       )}
//     </div>
//   );
// });

// ShowPageLeft.displayName = "ShowPageLeft";