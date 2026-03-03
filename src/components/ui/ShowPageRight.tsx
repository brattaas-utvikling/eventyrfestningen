// src/components/ui/ShowPageRight.tsx
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import type { Show, PortableTextBlock } from "@/types/sanity";
import { OldPaper } from "./OldPaper";

interface ShowPageRightProps {
  show: Show;
}

function getExcerpt(story?: PortableTextBlock[]) {
  if (!story || story.length === 0) {
    return "Et magisk eventyr på Kongsvinger festning.";
  }

  const text = story
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map((block) =>
      (block.children ?? [])
        .map((child) => ("text" in child ? child.text : ""))
        .join(" ")
    )
    .join(" ")
    .trim();

  if (!text) return "Et magisk eventyr på Kongsvinger festning.";

  // Show more text but not everything
  return text.length > 600 ? text.slice(0, 600) + "..." : text;
}

export const ShowPageRight = forwardRef<HTMLDivElement, ShowPageRightProps>(
  ({ show }, ref) => {
    const excerpt = getExcerpt(show.story);

    return (
      <div ref={ref} className="w-full h-full">
        <OldPaper className="w-full h-full bg-linear-to-bl from-amber-50 via-yellow-50 to-amber-100 flex flex-col justify-between p-6 md:p-10">
          <div className="space-y-4 flex-1 overflow-y-auto">
            {show.type && (
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700 block">
                {show.type === "main" ? "Hovedforestilling" : show.type}
              </span>
            )}
            
            <h2 className="text-xl md:text-2xl font-bold text-amber-900 leading-snug font-sans">
              {show.title}{" "}
              <span className="text-sm md:text-base font-normal text-amber-700">
                ({show.year})
              </span>
            </h2>

            <div className="w-16 h-px bg-amber-900/30" />

            <p className="text-sm md:text-base text-amber-900/90 leading-relaxed whitespace-pre-line">
              {excerpt}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-900/10 flex justify-start">
          <Link
            to={`/arkiv/${show.slug.current}`}
            className="inline-flex items-center text-sm md:text-base font-semibold text-torch-600 hover:text-torch-500 transition-colors group"
          >
            Les mer om forestillingen
            <span aria-hidden className="ml-2 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
          </div>
        </OldPaper>
      </div>
    );
  }
);

ShowPageRight.displayName = "ShowPageRight";

// // src/components/flipbook/ShowPageRight.tsx
// import { forwardRef } from "react";
// import { Link } from "react-router-dom";
// import type { Show, PortableTextBlock } from "@/types/sanity";
// import { OldPaper } from "./OldPaper";

// interface Props {
//   show: Show;
// }

// function getExcerpt(story?: PortableTextBlock[]) {
//   if (!story || story.length === 0) {
//     return "Et magisk eventyr på Kongsvinger festning.";
//   }

//   const text = story
//     .filter((block) => block._type === "block" && Array.isArray(block.children))
//     .map((block) =>
//       (block.children ?? [])
//         .map((child) => ("text" in child ? child.text : ""))
//         .join(" ")
//     )
//     .join(" ")
//     .trim();

//   if (!text) return "Et magisk eventyr på Kongsvinger festning.";

//   // Vis mer tekst, men ikke ALT (for ikke å sprenge layout)
//   return text.length > 600 ? text.slice(0, 600) + " ..." : text;
// }

// export const ShowPageRight = forwardRef<HTMLDivElement, Props>(
//   ({ show }, ref) => {
//     const excerpt = getExcerpt(show.story);

//     return (
//       <OldPaper
//         ref={ref}
//         className="w-full h-full bg-linear-to-bl from-amber-50 via-yellow-50 to-amber-100  flex flex-col justify-between p-6 md:p-8"
//       >
        
//         <div className="space-y-3">
//           {show.type && (
//             <span className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
//               {show.type === "main" ? "Hovedforestilling" : show.type}
//             </span>
//           )}

//           <h2 className="text-xl md:text-2xl font-bold text-amber-900 leading-snug">
//             {show.title}{" "}
//             <span className="text-sm md:text-base font-normal text-amber-700">
//               ({show.year})
//             </span>
//           </h2>

//           <p className="text-sm md:text-base text-amber-900/90 leading-relaxed">
//             {excerpt}
//           </p>
//         </div>

//         <div className="mt-6 flex justify-end">
//           <Link
//             to={`/arkiv/${show.slug.current}`}
//             className="inline-flex items-center text-sm md:text-base font-semibold text-torch-600 underline underline-offset-4 hover:text-torch-500 transition-colors"
//           >
//             Les mer
//             <span aria-hidden className="ml-1">
//               ↗
//             </span>
//           </Link>
//         </div>
//       </OldPaper>
//     );
//   }
// );

// ShowPageRight.displayName = "ShowPageRight";
