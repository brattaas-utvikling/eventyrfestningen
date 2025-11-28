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

  if (isLoading || !shows) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0a09]">
        <p className="text-amber-100 text-lg">Laster inn arkivet...</p>
      </div>
    );
  }

  const pages = [
    <div key="cover" className="page">
      <CoverPage />
    </div>,
    ...shows.flatMap((show) => [
      <div key={show._id + "-left"} className="page">
        <ShowPageLeft show={show} />
      </div>,
      <div key={show._id + "-right"} className="page">
        <ShowPageRight show={show} />
      </div>,
    ]),
    <div key="back" className="page">
      <BackCoverPage />
    </div>,
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Bakgrunn: IMPORTANT -> pointer-events-none */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#0b0a09] via-[#1a120f] to-[#0b0a09]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,180,60,0.08),transparent_60%)]" />

      {/* Innholdslag – ligger over bakgrunnen */}
      <div className="relative z-10 py-12 px-4">
        <Container size="xl">
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
                className="p-3 bg-amber-100 text-amber-900 rounded-full shadow hover:bg-amber-200 disabled:opacity-40"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-amber-50 text-base">
                Side {currentPage + 1} av {pages.length}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage >= pages.length - 1}
                className="p-3 bg-amber-100 text-amber-900 rounded-full shadow hover:bg-amber-200 disabled:opacity-40"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-base text-amber-200/70 text-center mt-2">
              Klikk eller sveip for å bla. Trykk på "Les mer om forestillingen" for mer info.
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}