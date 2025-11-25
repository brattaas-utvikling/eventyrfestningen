// // src/components/sections/BookPage.tsx
// import { forwardRef } from 'react';
// import { BookOpen } from 'lucide-react';
// import { OldPaper } from '@/components/ui/OldPaper';
// import { urlFor } from '@/lib/sanity';
// import type { Show } from '@/types/sanity';
// import { Link } from 'react-router-dom';

// interface CoverPageProps {
//   type: 'front' | 'back';
// }

// export const CoverPage = forwardRef<HTMLDivElement, CoverPageProps>(
//   ({ type }, ref) => {
//     return (
//       <div 
//         ref={ref}
//         className="w-full h-full bg-linear-to-br from-amber-100 via-amber-50 to-yellow-100 shadow-2xl"
//       >
//         <OldPaper className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12">
//           {type === 'front' ? (
//             <div className="text-center space-y-6 max-w-md">
//               <div className="border-4 border-amber-900/30 border-double p-6 md:p-8">
//                 <BookOpen className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-amber-900" />
//                 <h1 
//                   className="text-4xl md:text-6xl font-bold text-amber-950 mb-4 font-display"
//                 >
//                   Eventyrfestningen
//                 </h1>
//                 <div className="w-24 h-1 bg-amber-900/40 mx-auto mb-4" />
//                 <p className="text-lg md:text-xl text-amber-900/80 italic">
//                   Les eventyrene om våre forestillinger
//                 </p>
//               </div>
//               <p className="text-sm text-amber-900/60 mt-8">
//                 Est. Anno Domini 2019
//               </p>
//             </div>
//           ) : (
//             <div className="text-center space-y-6">
//               <div className="border-4 border-amber-900/30 border-double p-8">
//                 <p className="text-2xl md:text-3xl text-amber-900 italic mb-4">
//                   "Historiene lever videre"
//                 </p>
//                 <div className="w-32 h-1 bg-amber-900/40 mx-auto my-6" />
//                 <p className="text-base md:text-lg text-amber-900/70">
//                   Kongsvinger Festning
//                 </p>
//                 <p className="text-sm text-amber-900/60 mt-4">
//                   eventyrfestningen.no
//                 </p>
//               </div>
//             </div>
//           )}
//         </OldPaper>
//       </div>
//     );
//   }
// );

// CoverPage.displayName = 'CoverPage';

// interface ShowPageProps {
//   show: Show;
// }

// export const ShowPage = forwardRef<HTMLDivElement, ShowPageProps>(
//   ({ show }, ref) => {
//     const getExcerpt = () => {
//       if (!Array.isArray(show.story)) return 'Et magisk eventyr på Kongsvinger festning.';
//       const block = show.story.find((b) => b._type === 'block' && b.children);
//       if (!block || !block.children) return '';
//       const text = block.children.map((child: { text: string }) => child.text).join(' ');
//       return text.split('.')[0] + '.';
//     };

//     const excerpt = getExcerpt();
//     const imageUrl = show.posterImage 
//       ? urlFor(show.posterImage).width(400).height(600).url()
//       : null;

//     return (
//       <div 
//         ref={ref}
//         className="w-full h-full bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100 shadow-xl"
//       >
//         <OldPaper className="w-full h-full p-6 md:p-10 flex flex-col">
//           <div className="text-xs text-amber-900/40 mb-4 text-center">
//             ~ {show.year} ~
//           </div>

//           <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
//             <div className="relative border-4 border-amber-900/20 border-double p-2 bg-amber-100/50">
//               {imageUrl ? (
//                 <img 
//                   src={imageUrl}
//                   alt={show.posterImage?.alt || show.title}
//                   className="w-full aspect-3/4 object-cover"
//                   loading="lazy"
//                 />
//               ) : (
//                 <div className="aspect-3/4 bg-linear-to-br from-amber-200 to-amber-300 flex items-center justify-center">
//                   <div className="text-center text-amber-900/60">
//                     <div className="text-6xl mb-2">🎭</div>
//                     <p className="text-sm italic">Plakat</p>
//                   </div>
//                 </div>
//               )}
//             </div>

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

//             <div className="flex-1 overflow-y-auto">
//               <p className="text-sm md:text-base text-amber-900/80 leading-relaxed line-clamp-5">
//                 {excerpt}
//               </p>
//             </div>

//             <Link
//               to={`/arkiv/${show.slug.current}`}
//               className="w-full py-2 px-4 border-2 border-amber-900/40 bg-amber-100/50 text-amber-900 font-medium text-sm hover:bg-amber-200/50 transition-colors text-center block"
//             >
//               Les mer om forestillingen →
//             </Link>
//           </div>

//           <div className="mt-4 text-center">
//             <div className="inline-block w-16 h-px bg-amber-900/20" />
//           </div>
//         </OldPaper>
//       </div>
//     );
//   }
// );

// ShowPage.displayName = 'ShowPage';


// src/components/sections/BookPage.tsx
import { forwardRef } from 'react';
import { BookOpen } from 'lucide-react';
import { OldPaper } from '@/components/ui/OldPaper';
import { urlFor } from '@/lib/sanity';
import type { Show } from '@/types/sanity';
import { Link } from 'react-router-dom';

interface CoverPageProps {
  type: 'front' | 'back';
}

export const CoverPage = forwardRef<HTMLDivElement, CoverPageProps>(
  ({ type }, ref) => {
    return (
      <div 
        ref={ref}
        className="w-full h-full bg-linear-to-br from-amber-100 via-amber-50 to-yellow-100 shadow-2xl"
      >
        <OldPaper className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12">
          {type === 'front' ? (
            <div className="text-center space-y-6 max-w-md">
              <div className="border-4 border-amber-900/30 border-double p-6 md:p-8">
                <BookOpen className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-amber-900" />
                <h1 
                  className="text-4xl md:text-6xl font-bold text-amber-950 mb-4 font-display"
                >
                  Eventyrfestningen
                </h1>
                <div className="w-24 h-1 bg-amber-900/40 mx-auto mb-4" />
                <p className="text-lg md:text-xl text-amber-900/80 italic">
                  Les eventyrene om våre forestillinger
                </p>
              </div>
              <p className="text-sm text-amber-900/60 mt-8">
                Est. Anno Domini 2019
              </p>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="border-4 border-amber-900/30 border-double p-8">
                <p className="text-2xl md:text-3xl text-amber-900 italic mb-4">
                  "Historiene lever videre"
                </p>
                <div className="w-32 h-1 bg-amber-900/40 mx-auto my-6" />
                <p className="text-base md:text-lg text-amber-900/70">
                  Kongsvinger Festning
                </p>
                <p className="text-sm text-amber-900/60 mt-4">
                  eventyrfestningen.no
                </p>
              </div>
            </div>
          )}
        </OldPaper>
      </div>
    );
  }
);

CoverPage.displayName = 'CoverPage';

interface ShowPageProps {
  show: Show;
}

interface PortableTextBlock {
  _type: string;
  children?: Array<{ text: string }>;
}

export const ShowPage = forwardRef<HTMLDivElement, ShowPageProps>(
  ({ show }, ref) => {
    // Extract text from Portable Text array
    const getExcerpt = () => {
      if (Array.isArray(show.story)) {
        const text = show.story
          .map((block: PortableTextBlock) => 
            block._type === 'block' && block.children
              ? block.children.map((child) => child.text).join('')
              : ''
          )
          .join(' ');
        return text.substring(0, 150) + '...';
      }
      return 'Les mer om denne forestillingen...';
    };

    const excerpt = getExcerpt();
    const imageUrl = show.posterImage 
      ? urlFor(show.posterImage).width(400).height(600).url()
      : null;

    return (
      <div 
        ref={ref}
        className="w-full h-full bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100 shadow-xl"
      >
        <OldPaper className="w-full h-full p-6 md:p-10 flex flex-col">
          {/* Page number */}
          <div className="text-xs text-amber-900/40 mb-4 text-center">
            ~ {show.year} ~
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col space-y-4 overflow-hidden">
            {/* Image with decorative frame */}
            <div className="relative border-4 border-amber-900/20 border-double p-2 bg-amber-100/50">
              {imageUrl ? (
                <img 
                  src={imageUrl}
                  alt={show.posterImage?.alt || show.title}
                  className="w-full aspect-3/4 object-cover"
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

            {/* Title with decorative elements */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-px bg-amber-900/30" />
                <span className="text-xs text-amber-900/50">
                  {show.type === 'main' ? 'Hovedforestilling' : 'Halloween'}
                </span>
                <div className="w-8 h-px bg-amber-900/30" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-amber-950 font-display">
                {show.title}
              </h2>
            </div>

            {/* Excerpt */}
            <div className="flex-1 overflow-y-auto">
              <p className="text-sm md:text-base text-amber-900/80 leading-relaxed">
                {excerpt}
              </p>
            </div>

            {/* CTA Button */}
            <Link
              to={`/forestilling/${show.slug.current}`}
              className="w-full py-2 px-4 border-2 border-amber-900/40 bg-amber-100/50 text-amber-900 font-medium text-sm hover:bg-amber-200/50 transition-colors text-center block"
            >
              Les mer om forestillingen →
            </Link>
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

ShowPage.displayName = 'ShowPage';