// src/components/sections/ArchiveBook.tsx
import { useRef, useState, useEffect, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { queries } from "@/lib/sanityQueries";
import { Container } from "@/components/layout/Container";
import { CoverPage } from "@/components/ui/CoverPage";
import { BackCoverPage } from "@/components/ui/BackCoverPage";
import { ShowPageLeft } from "@/components/ui/ShowPageLeft";
import { ShowPageRight } from "@/components/ui/ShowPageRight";
import type { Show } from "@/types/sanity";

export function ArchiveBook() {
  const bookRef = useRef<{
    pageFlip: () => { flipNext: () => void; flipPrev: () => void };
  }>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 500, height: 700 });

  const { data: shows, isLoading } = useSanityQuery<Show[]>(
    "archived-shows",
    queries.archivedShows
  );

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) setDimensions({ width: 350, height: 500 });
      else if (width < 1024) setDimensions({ width: 400, height: 600 });
      else setDimensions({ width: 500, height: 700 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const nextPage = () => bookRef.current?.pageFlip().flipNext();
  const prevPage = () => bookRef.current?.pageFlip().flipPrev();

  // const getExcerpt = (story: PortableTextBlock[] = []) => {
  //   const block = story.find((b) => b._type === "block" && b.children);
  //   if (!block || !Array.isArray(block.children)) return "";
  //   return (
  //     block.children
  //       .map((c) => ("text" in c ? c.text : ""))
  //       .join(" ")
  //       .slice(0, 200) + "..."
  //   );
  // };

  if (isLoading || !shows) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-amber-100 text-lg">Laster inn arkivet...</p>
      </div>
    );
  }

  const pages = [
    // Forside
    <div key="cover" className="page">
      <CoverPage />
    </div>,

    // En venstreside (plakat) + en høyreside (tekst) per forestilling
    ...shows.flatMap((show) => [
      <div key={show._id + "-left"} className="page">
        <ShowPageLeft show={show} />
      </div>,
      <div key={show._id + "-right"} className="page">
        <ShowPageRight show={show} />
      </div>,
    ]),

    // Bakside
    <div key="back" className="page">
      <BackCoverPage />
    </div>,
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <Container size="xl">
        {/* <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-amber-50 font-display">
            Arkivet
          </h1>
          <p className="text-amber-200 mt-2 text-base">
            Bla gjennom våre tidligere forestillinger
          </p>
        </div> */}

        <div className="flex flex-col items-center gap-6">
          <HTMLFlipBook
            ref={bookRef}
            width={dimensions.width}
            height={dimensions.height}
            size="stretch"
            drawShadow={false}
            flippingTime={800}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onFlip}
            usePortrait={true}
            className="archive-book shadow-2xl"
            startPage={0}
            minWidth={300}
            maxWidth={500}
            minHeight={400}
            maxHeight={700}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            style={{}}
            startZIndex={1}
            autoSize={true}
            maxShadowOpacity={0.5}
          >
            {pages}
          </HTMLFlipBook>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="p-3 bg-amber-100 text-amber-900 rounded-full shadow hover:bg-amber-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-amber-50 text-base">
              Side {currentPage + 1} av {pages.length}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage >= pages.length - 1}
              className="p-3 bg-amber-100 text-amber-900 rounded-full shadow hover:bg-amber-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-base text-amber-200/70 text-center mt-2">
            Klikk eller sveip for å bla. Trykk på en side for mer info.
          </p>
        </div>
      </Container>
    </div>
  );
}


// // src/components/sections/ArchiveBook.tsx
// import { useRef, useState, useCallback, useEffect } from 'react';
// import HTMLFlipBook from 'react-pageflip';
// import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
// import { useSanityQuery } from '@/hooks/useSanityQuery';
// import { queries } from '@/lib/sanityQueries';
// import type { Show } from '@/types/sanity';
// import { Container } from '@/components/layout/Container';
// import { CoverPage } from './BookPage';
// import { OldPaper } from '@/components/ui/OldPaper';
// import { urlFor } from '@/lib/sanity';
// import { Link } from 'react-router-dom';

// interface PageFlipRef {
//   pageFlip: () => {
//     flipNext: () => void;
//     flipPrev: () => void;
//   };
// }

// interface FlipEvent {
//   data: number;
// }

// export function ArchiveBook() {
//   const bookRef = useRef<PageFlipRef>(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [dimensions, setDimensions] = useState({ width: 500, height: 700 });

//   const { data: shows, isLoading, error } = useSanityQuery<Show[]>(
//     'archived-shows',
//     queries.archivedShows
//   );

//   useEffect(() => {
//     const updateDimensions = () => {
//       const width = window.innerWidth;
//       if (width < 640) {
//         setDimensions({ width: Math.min(width - 40, 350), height: 500 });
//       } else if (width < 1024) {
//         setDimensions({ width: 400, height: 600 });
//       } else {
//         setDimensions({ width: 500, height: 700 });
//       }
//     };
//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   const onFlip = useCallback((e: FlipEvent) => {
//     setCurrentPage(e.data);
//   }, []);

//   const nextPage = () => {
//     bookRef.current?.pageFlip().flipNext();
//   };

//   const prevPage = () => {
//     bookRef.current?.pageFlip().flipPrev();
//   };

//   useEffect(() => {
//     if (shows) {
//       const pageCount = 2 + Math.ceil(shows.length / 2);
//       setTotalPages(pageCount);
//     }
//   }, [shows]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-amber-200 animate-spin mx-auto mb-4" />
//           <p className="text-amber-200">Laster arkivet...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center">
//         <Container>
//           <div className="bg-amber-100 border-2 border-amber-900/40 p-8 rounded-lg text-center max-w-md mx-auto">
//             <p className="text-amber-900 mb-4">
//               Kunne ikke laste arkivet. Vennligst prøv igjen senere.
//             </p>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   if (!shows || shows.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center">
//         <Container>
//           <div className="bg-amber-100 border-2 border-amber-900/40 p-8 rounded-lg text-center max-w-md mx-auto">
//             <p className="text-amber-900">
//               Ingen forestillinger funnet i arkivet.
//             </p>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   const pairedPages = [];
//   for (let i = 0; i < shows.length; i += 2) {
//     pairedPages.push([shows[i], shows[i + 1]]);
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 py-12 px-4">
//       <Container size="xl">
//         <div className="text-center mb-8 md:mb-12">
//           <h1 className="text-3xl md:text-5xl font-bold text-amber-50 mb-4 font-display">
//             Arkivet
//           </h1>
//           <p className="text-amber-200 text-sm md:text-base">
//             Bla gjennom våre tidligere forestillinger
//           </p>
//         </div>

//         <div className="flex flex-col items-center gap-6">
//           <div className="relative">
//             <HTMLFlipBook
//               ref={bookRef}
//               width={dimensions.width}
//               height={dimensions.height}
//               size="fixed"
//               minWidth={300}
//               maxWidth={600}
//               minHeight={400}
//               maxHeight={800}
//               drawShadow
//               flippingTime={1000}
//               usePortrait
//               startZIndex={0}
//               autoSize={false}
//               maxShadowOpacity={0.5}
//               showCover
//               mobileScrollSupport
//               onFlip={onFlip}
//               className="shadow-2xl"
//               startPage={0}
//               clickEventForward
//               useMouseEvents
//               swipeDistance={30}
//               showPageCorners
//               disableFlipByClick={false}
//             >
//               <CoverPage type="front" />
//               {pairedPages.map(([left, right], i) => (
//                 <div key={i} className="flex w-full h-full">
//                   <div className="w-1/2 h-full bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 shadow-inner p-4 flex items-center">
//                     {left?.posterImage?.asset ? (
//                       <img
//                         src={urlFor(left.posterImage).width(350).height(500).url()}
//                         alt={left.posterImage.alt || left.title}
//                         className="w-full object-cover rounded shadow border border-amber-300"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-amber-200 flex items-center justify-center">🎭</div>
//                     )}
//                   </div>
//                   <div className="w-1/2 h-full bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 shadow-inner p-4 flex flex-col justify-between">
//                     <div>
//                       <h2 className="text-xl font-bold text-amber-900 mb-2">
//                         {left?.title} <span className="text-sm text-amber-700">({left?.year})</span>
//                       </h2>
//                       <p className="text-sm text-amber-800 line-clamp-5">
//                         {left?.story?.[0]?.children?.[0]?.text || 'Et magisk eventyr på Kongsvinger festning.'}
//                       </p>
//                     </div>
//                     <Link
//                       to={`/arkiv/${left?.slug?.current}`}
//                       className="mt-4 text-sm font-medium text-torch-600 underline hover:text-torch-400 transition"
//                     >
//                       Les mer →
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//               <CoverPage type="back" />
//             </HTMLFlipBook>
//           </div>

//           <div className="flex items-center gap-4 md:gap-6">
//             <button
//               onClick={prevPage}
//               disabled={currentPage === 0}
//               className="p-3 md:p-4 bg-amber-100 text-amber-900 rounded-full shadow-lg hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
//               aria-label="Forrige side"
//             >
//               <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
//             </button>

//             <div className="text-amber-50 text-sm md:text-base font-medium min-w-[100px] text-center">
//               Side {currentPage + 1} av {totalPages}
//             </div>

//             <button
//               onClick={nextPage}
//               disabled={currentPage >= totalPages - 1}
//               className="p-3 md:p-4 bg-amber-100 text-amber-900 rounded-full shadow-lg hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
//               aria-label="Neste side"
//             >
//               <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
//             </button>
//           </div>

//           <p className="text-amber-200/70 text-xs md:text-sm text-center max-w-md">
//             <span className="hidden md:inline">Klikk på sidene eller bruk pilene for å bla. </span>
//             <span className="md:hidden">Sveip eller bruk pilene for å bla. </span>
//             Trykk på en side for å lese mer.
//           </p>
//         </div>
//       </Container>
//     </div>
//   );
// }


// src/components/sections/ArchiveBook.tsx
// import { useRef, useState, useCallback, useEffect } from 'react';
// import HTMLFlipBook from 'react-pageflip';
// import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
// import { useSanityQuery } from '@/hooks/useSanityQuery';
// import { queries } from '@/lib/sanityQueries';
// import type { Show } from '@/types/sanity';
// import { ShowPage, CoverPage } from './BookPage';
// import { Container } from '@/components/layout/Container';

// interface PageFlipRef {
//   pageFlip: () => {
//     flipNext: () => void;
//     flipPrev: () => void;
//   };
// }

// interface FlipEvent {
//   data: number;
// }

// export function ArchiveBook() {
//   const bookRef = useRef<PageFlipRef>(null);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [dimensions, setDimensions] = useState({ width: 500, height: 700 });

//   const { data: shows, isLoading, error } = useSanityQuery<Show[]>(
//     'archived-shows',
//     queries.archivedShows
//   );

//   Calculate responsive dimensions
//   useEffect(() => {
//     const updateDimensions = () => {
//       const width = window.innerWidth;
//       if (width < 640) {
//         Mobile
//         setDimensions({ width: Math.min(width - 40, 350), height: 500 });
//       } else if (width < 1024) {
//         Tablet
//         setDimensions({ width: 400, height: 600 });
//       } else {
//         Desktop
//         setDimensions({ width: 500, height: 700 });
//       }
//     };

//     updateDimensions();
//     window.addEventListener('resize', updateDimensions);
//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   const onFlip = useCallback((e: FlipEvent) => {
//     setCurrentPage(e.data);
//   }, []);

//   const nextPage = () => {
//     bookRef.current?.pageFlip().flipNext();
//   };

//   const prevPage = () => {
//     bookRef.current?.pageFlip().flipPrev();
//   };

//   Update total pages when shows load
//   useEffect(() => {
//     if (shows) {
//       setTotalPages(2 + shows.length); // front + shows + back
//     }
//   }, [shows]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-amber-200 animate-spin mx-auto mb-4" />
//           <p className="text-amber-200">Laster arkivet...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center">
//         <Container>
//           <div className="bg-amber-100 border-2 border-amber-900/40 p-8 rounded-lg text-center max-w-md mx-auto">
//             <p className="text-amber-900 mb-4">
//               Kunne ikke laste arkivet. Vennligst prøv igjen senere.
//             </p>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   if (!shows || shows.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 flex items-center justify-center">
//         <Container>
//           <div className="bg-amber-100 border-2 border-amber-900/40 p-8 rounded-lg text-center max-w-md mx-auto">
//             <p className="text-amber-900">
//               Ingen forestillinger funnet i arkivet.
//             </p>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900 py-12 px-4">
//       <Container size="xl">
//         {/* Header */}
//         <div className="text-center mb-8 md:mb-12">
//           <h1 className="text-3xl md:text-5xl font-bold text-amber-50 mb-4 font-display">
//             Arkivet
//           </h1>
//           <p className="text-amber-200 text-sm md:text-base">
//             Bla gjennom våre tidligere forestillinger
//           </p>
//         </div>

//         {/* Book container */}
//         <div className="flex flex-col items-center gap-6">
//           {/* The Book */}
//           <div className="relative">
//             <HTMLFlipBook
//               ref={bookRef}
//               width={dimensions.width}
//               height={dimensions.height}
//               size="fixed"
//               minWidth={300}
//               maxWidth={600}
//               minHeight={400}
//               maxHeight={800}
//               drawShadow={true}
//               flippingTime={1000}
//               usePortrait={true}
//               startZIndex={0}
//               autoSize={false}
//               maxShadowOpacity={0.5}
//               showCover={true}
//               mobileScrollSupport={true}
//               onFlip={onFlip}
//               className="shadow-2xl"
//               style={{}}
//               startPage={0}
//               clickEventForward={true}
//               useMouseEvents={true}
//               swipeDistance={30}
//               showPageCorners={true}
//               disableFlipByClick={false}
//             >
// <CoverPage type="front" />

// {shows.map((show) => (
//   <ShowPage key={show._id} show={show} />
// ))}

// <CoverPage type="back" />

//             </HTMLFlipBook>
//           </div>

//           {/* Controls */}
//           <div className="flex items-center gap-4 md:gap-6">
//             <button
//               onClick={prevPage}
//               disabled={currentPage === 0}
//               className="p-3 md:p-4 bg-amber-100 text-amber-900 rounded-full shadow-lg hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
//               aria-label="Forrige side"
//             >
//               <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
//             </button>

//             <div className="text-amber-50 text-sm md:text-base font-medium min-w-[100px] text-center">
//               Side {currentPage + 1} av {totalPages}
//             </div>

//             <button
//               onClick={nextPage}
//               disabled={currentPage >= totalPages - 1}
//               className="p-3 md:p-4 bg-amber-100 text-amber-900 rounded-full shadow-lg hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
//               aria-label="Neste side"
//             >
//               <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
//             </button>
//           </div>

//           {/* Instructions */}
//           <p className="text-amber-200/70 text-xs md:text-sm text-center max-w-md">
//             <span className="hidden md:inline">Klikk på sidene eller bruk pilene for å bla. </span>
//             <span className="md:hidden">Sveip eller bruk pilene for å bla. </span>
//             Trykk på en side for å lese mer.
//           </p>
//         </div>
//       </Container>
//     </div>
//   );
// }