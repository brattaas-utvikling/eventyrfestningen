import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity";
import type { SanityImage } from "@/types/sanity";

interface BentoGalleryProps {
  images: SanityImage[];
  title?: string;
  onImageClick?: (index: number) => void;
}

export function BentoGallery({ 
  images, 
  title,
  onImageClick 
}: BentoGalleryProps) {
  if (!images || images.length === 0) return null;

  // Bento pattern: repeating 6-image pattern for variety
  const getGridClass = (index: number) => {
    const position = index % 6;
    
    switch (position) {
      case 0:
        // Large hero - 2x2
        return "col-span-2 row-span-2";
      case 1:
        // Tall - 1x2
        return "col-span-1 row-span-2";
      case 2:
        // Square - 1x1
        return "col-span-1 row-span-1";
      case 3:
        // Square - 1x1
        return "col-span-1 row-span-1";
      case 4:
        // Wide - 2x1
        return "col-span-2 row-span-1";
      case 5:
        // Square - 1x1
        return "col-span-1 row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  };

  const getImageSize = (index: number) => {
    const position = index % 6;
    
    switch (position) {
      case 0:
        return { width: 800, height: 800 }; // Large square
      case 1:
        return { width: 400, height: 800 }; // Tall
      case 4:
        return { width: 800, height: 400 }; // Wide
      default:
        return { width: 400, height: 400 }; // Small square
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h3 className="text-3xl sm:text-4xl font-sans font-bold text-white mb-2">
          {title}
        </h3>
        <p className="text-cynical-100/70 text-sm">
          Klikk på bildene for større visning
        </p>
      </motion.div>

      {/* Bento Grid - Fixed height rows for proper layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px] gap-3 md:gap-4 max-w-7xl mx-auto">
      {images.map((img, index) => {
  const { width, height } = getImageSize(index);
  const gridClass = getGridClass(index);

  const label =
    img.caption ||
    img.alt ||
    `Galleri bilde ${index + 1}`;

  return (
    <motion.button
      key={img._key ?? index}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.5),
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onImageClick?.(index)}
      className={`
        ${gridClass}
        group relative overflow-hidden rounded-xl
        bg-cynical-800/20 border border-white/10
        hover:border-gold-400/60 hover:shadow-2xl
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-gold-400
      `}
      aria-label={label}
    >
      {/* Image */}
      <img
        src={urlFor(img)
          .width(width)
          .height(height)
          .quality(85)
          .auto("format")
          .url()}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading={index < 6 ? "eager" : "lazy"}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-cynical-900/90 via-cynical-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Hover icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </div>
      </div>

      {/* Caption på hover */}
      {img.caption && (
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-xs md:text-sm font-medium line-clamp-2 drop-shadow-lg">
            {img.caption}
          </p>
        </div>
      )}

      {/* Index number */}
      <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-cynical-900/80 backdrop-blur-sm flex items-center justify-center text-white/70 text-xs font-bold opacity-60 group-hover:opacity-100 transition-opacity">
        {index + 1}
      </div>
    </motion.button>
  );
})}

      </div>

      {/* Image count */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-cynical-100/60">
          {images.length} {images.length === 1 ? "bilde" : "bilder"} totalt
        </p>
      </motion.div>
    </div>
  );
}