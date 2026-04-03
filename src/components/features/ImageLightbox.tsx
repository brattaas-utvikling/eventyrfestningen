// src/components/features/ImageLightbox.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import type { SanityImage } from "@/types/sanity";

type LightboxUrlImage = {
  url: string;
  alt?: string;
  caption?: string;
};

// støtter både sanity-image og ferdig url
type LightboxImage = SanityImage | LightboxUrlImage;

interface ImageLightboxProps {
  isOpen: boolean;
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

// er dette et Sanity-image?
function isSanityImage(img: LightboxImage): img is SanityImage {
  return typeof (img as SanityImage).asset !== "undefined";
}

// url-helper
function getImageUrl(img: LightboxImage, w = 1920, h = 1080): string {
  if (isSanityImage(img)) {
    return urlFor(img).width(w).height(h).quality(90).auto("format").url();
  }
  return img.url;
}

// alt-helper uten any
function getImageAlt(img: LightboxImage, fallback: string): string {
  if (isSanityImage(img)) {
    // noen ganger ligger alt på selve image-objektet
    if ("alt" in img && typeof img.alt === "string") {
      return img.alt;
    }
    // ellers fallback
    return fallback;
  }

  return img.alt ?? fallback;
}

// caption-helper uten any
function getImageCaption(img: LightboxImage): string | undefined {
  if (isSanityImage(img)) {
    if ("caption" in img && typeof img.caption === "string") {
      return img.caption;
    }
    return undefined;
  }
  return img.caption;
}

export function ImageLightbox({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, currentIndex, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) < images.length ? prev + 1 : 0);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentIndex];
  const currentUrl = getImageUrl(currentImage, 1920, 1080);
  const currentAlt =
    getImageAlt(currentImage, `Bilde ${currentIndex + 1}`) ||
    `Bilde ${currentIndex + 1}`;
  const currentCaption = getImageCaption(currentImage);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-cynical-900/98 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            aria-label="Lukk"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div className="absolute top-4 left-4 z-10 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Forrige bilde"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                aria-label="Neste bilde"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}

          <div
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-7xl max-h-full"
            >
              <img
                src={currentUrl}
                alt={currentAlt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />

              {currentCaption ? (
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-cynical-900/80 to-transparent text-white text-center rounded-b-lg"
                >
                  <p className="ui-text">{currentCaption}</p>
                </div>
              ) : null}
            </motion.div>
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 max-w-full overflow-x-auto">
              <div className="flex gap-2 px-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all ${
                      index === currentIndex
                        ? "ring-2 ring-white scale-110"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={getImageUrl(image, 160, 160)}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
