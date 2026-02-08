// src/components/sections/MobileArchiveCarousel.tsx
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { urlFor } from '@/lib/sanity';
import type { Show } from '@/types/sanity';

interface MobileArchiveCarouselProps {
  shows: Show[];
}

export function MobileArchiveCarousel({ shows }: MobileArchiveCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const navigate = useNavigate();

  const currentShow = shows[currentIndex];
  const totalShows = shows.length;

  // Navigation functions
  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalShows);
  }, [totalShows]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalShows) % totalShows);
  }, [totalShows]);

  const goToIndex = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Handle drag end
  const handleDragEnd = useCallback(
    (_event: unknown, info: PanInfo) => {
      const swipeThreshold = 50;
      const swipeVelocityThreshold = 500;

      if (
        info.offset.x < -swipeThreshold ||
        info.velocity.x < -swipeVelocityThreshold
      ) {
        goToNext();
      } else if (
        info.offset.x > swipeThreshold ||
        info.velocity.x > swipeVelocityThreshold
      ) {
        goToPrevious();
      }
    },
    [goToNext, goToPrevious]
  );

  // Handle tap on card - navigate to show detail page
  const handleTap = useCallback(() => {
    if (currentShow?.slug?.current) {
      navigate(`/arkiv/${currentShow.slug.current}`);
    }
  }, [currentShow, navigate]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTap();
      }
    },
    [goToNext, goToPrevious, handleTap]
  );

  if (!shows || shows.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-amber-100 text-lg">Ingen forestillinger funnet...</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-linear-to-br from-[#0b0a09] via-[#1a120f] to-[#0b0a09]"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Arkiv karusell"
    >
      {/* Atmospheric background glow */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,180,60,0.08),transparent_60%)]"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 pt-6 pb-4 px-4 text-center bg-linear-to-b from-cynical-900/95 to-transparent">
        <h2 className="font-display text-2xl text-gold-400 tracking-[0.15em] mb-2 uppercase">
          Arkiv
        </h2>
        <p className="text-sm text-amber-100/70 italic">
          Swipe eller tap for å utforske
        </p>
      </div>

      {/* Card Stack */}
      <div className="relative h-[calc(100vh-200px)] flex items-center justify-center px-4">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onTap={handleTap}
            className="absolute w-full max-w-sm cursor-pointer"
            whileTap={{ scale: 0.98 }}
          >
            <ShowCard show={currentShow} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows (desktop/tablet) */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-amber-100/10 backdrop-blur-sm border-2 border-gold-400/30 rounded-full text-gold-400 hover:bg-amber-100/20 hover:border-gold-400/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed md:flex hidden"
          aria-label="Forrige forestilling"
          disabled={totalShows <= 1}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-amber-100/10 backdrop-blur-sm border-2 border-gold-400/30 rounded-full text-gold-400 hover:bg-amber-100/20 hover:border-gold-400/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed md:flex hidden"
          aria-label="Neste forestilling"
          disabled={totalShows <= 1}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {shows.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-torch-500'
                : 'w-2 bg-gold-400/30 hover:bg-gold-400/50'
            }`}
            aria-label={`Gå til forestilling ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>

      {/* Swipe hint (fades out after first interaction) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-24 left-0 right-0 text-center pointer-events-none z-10"
      >
        <p className="text-sm text-amber-100/50 flex items-center justify-center gap-2">
          <span>←</span>
          <span>Swipe for å bla</span>
          <span>→</span>
        </p>
      </motion.div>
    </div>
  );
}

// Card variants for enter/exit animations
const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 45 : -45,
  }),
};

// Individual Show Card Component
interface ShowCardProps {
  show: Show;
}

function ShowCard({ show }: ShowCardProps) {
  const imageUrl = show.posterImage
    ? urlFor(show.posterImage).width(800).height(1200).quality(90).url()
    : null;

  // Extract excerpt from Portable Text
  const getExcerpt = () => {
    if (!show.story || show.story.length === 0) {
      return 'Et magisk eventyr på Kongsvinger festning.';
    }

    const text = show.story
      .filter((block) => block._type === 'block' && Array.isArray(block.children))
      .map((block) =>
        (block.children ?? [])
          .map((child) => ('text' in child ? child.text : ''))
          .join(' ')
      )
      .join(' ')
      .trim();

    return text.length > 180 ? text.slice(0, 180) + '...' : text;
  };

  const excerpt = getExcerpt();

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={show.posterImage?.alt || show.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-linear-to-t from-cynical-900 via-cynical-900/60 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-linear-to-br from-amber-200 via-amber-300 to-gold-400 flex items-center justify-center">
            <div className="text-center text-amber-900/60">
              <div className="text-6xl mb-2">🎭</div>
              <p className="text-sm italic">Plakat</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
        {/* Type Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-torch-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-cynical-900 uppercase tracking-wider">
            {show.type === 'main' ? 'Hovedforestilling' : 'Halloween'}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-3xl sm:text-4xl font-bold text-gold-400 mb-2 leading-tight drop-shadow-lg">
          {show.title}
        </h3>

        {/* Year */}
        <p className="text-lg text-amber-100/80 mb-4 font-semibold">
          {show.year}
        </p>

        {/* Excerpt */}
        <p className="text-base sm:text-lg text-amber-50/90 leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>

        {/* Tap to read more hint */}
        <div className="flex items-center justify-center gap-2 py-3 px-4 bg-gold-400/10 backdrop-blur-sm border border-gold-400/30 rounded-lg">
          <span className="text-gold-400 text-sm font-semibold">
            Tap for mer info
          </span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gold-400"
          >
            →
          </motion.span>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-gold-400/40 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-gold-400/40 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-gold-400/40 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-gold-400/40 rounded-br-lg" />
    </div>
  );
}