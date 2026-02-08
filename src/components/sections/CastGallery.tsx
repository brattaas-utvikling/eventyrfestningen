// src/components/sections/CastGallery.tsx
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { X } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import type { Show, SanityImage, Person } from "@/types/sanity";

interface CastGalleryProps {
  show: Show;
}

type CastItem = NonNullable<Show["cast"]>[number];

// --- Animation variants (defined once, reused everywhere) ---

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 26,
      mass: 0.9,
    },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.06,
    },
  },
};

// CAST-kort – litt mer dramatisk innflyvning
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      mass: 0.8,
    },
  },
};

// CREW-kort – litt roligere
const crewCardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 26,
      mass: 0.85,
    },
  },
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.22,
      ease: "linear",
    },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      mass: 0.9,
    },
  },
};



// --- Helpers ---

function hasImageAsset(img: SanityImage | undefined): img is SanityImage {
  return !!img && !!img.asset && typeof img.asset._ref === "string";
}

export function CastGallery({ show }: CastGalleryProps) {
  const [selectedPerson, setSelectedPerson] = useState<{
    role: string;
    actor: Person | undefined;
  } | null>(null);

  const prefersReducedMotion = useReducedMotion();

  const cast = show.cast ?? [];
  const crew = show.crew ?? [];

  if (cast.length === 0 && crew.length === 0) {
    return null;
  }

  const handleOpen = (role: string, actor: Person | undefined) => {
    setSelectedPerson({ role, actor });
  };

  const handleClose = () => setSelectedPerson(null);

  return (
    <>
      {/* CAST */}
      {cast.length > 0 && (
        <div className="mb-16">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-10 pb-8 border-b border-white/10"
          >
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
              Rollebesetning
            </h3>
            <p className="text-cynical-100/70 text-sm">
              Møt de talentfulle skuespillerne som gir liv til historien
            </p>
          </motion.div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
          >
            {cast.map((item: CastItem, index) => {
              const actor: Person | undefined = item.actor;

              const key =
                actor?._id ??
                `${actor?.name ?? "ukjent"}-${item.role ?? "rolle"}-${index}`;

              const hasImg = hasImageAsset(actor?.image);
              const imgUrl = hasImg
                ? urlFor(actor!.image!).width(300).height(300).url()
                : null;

              return (
                <motion.button
                  key={key}
                  type="button"
                  variants={cardVariants}
                  className="group rounded-xl bg-white/5 backdrop-blur border border-white/10 p-4 text-center cursor-pointer hover:bg-white/10 hover:border-gold-400/30 transition-color transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cynical-900"
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -6,
                          scale: 1.02,
                        }
                  }
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onClick={() => handleOpen(item.role ?? "", item.actor)}
                  aria-label={`Les mer om ${actor?.name ?? "skuespiller"}`}
                >
                  <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-2 border-gold-400/60 group-hover:border-gold-400 transition-colors relative">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={actor?.name ?? "Skuespiller"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-cynical-900/30 flex items-center justify-center">
                        <span className="text-gold-400/30 text-4xl font-bold">
                          {actor?.name?.charAt(0) ?? "?"}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-cynical-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        Les mer →
                      </span>
                    </div>
                  </div>

                  <h3 className="text-white font-semibold group-hover:text-gold-400 transition-colors">
                    {actor?.name ?? "Ukjent skuespiller"}
                  </h3>

                  {item.role && (
                    <p className="text-gold-200 text-sm mt-1">{item.role}</p>
                  )}

                  {actor?.bio && (
                    <p className="text-xs text-cynical-100/70 mt-3 line-clamp-2">
                      {actor.bio}
                    </p>
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* CREW */}
      {crew.length > 0 && (
        <div className="mt-16 pt-12 border-t border-white/10">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-10"
          >
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
              Produksjonsteam
            </h3>
            <p className="text-cynical-100/70 text-sm">
              De kreative hodene bak kulissene
            </p>
          </motion.div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
          >
            {crew.map((crewMember, index) => {
              const person = crewMember.person;
              const hasImg = hasImageAsset(person?.image);
              const imgUrl = hasImg
                ? urlFor(person!.image!).width(80).height(80).url()
                : null;

              return (
                <motion.button
                  key={person?._id ?? `crew-${index}`}
                  type="button"
                  variants={crewCardVariants}
                  className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur border border-white/10 rounded-lg hover:bg-white/10 hover:border-gold-400/30 transition-color group cursor-pointer transform-gpu focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cynical-900"
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -3,
                        }
                  }
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  onClick={() =>
                    handleOpen(crewMember.role ?? "", crewMember.person)
                  }
                  aria-label={`Les mer om ${person?.name ?? "person"}`}
                >
                  <div className="shrink-0">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={person?.name ?? "Crew member"}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gold-400/40 group-hover:border-gold-400 transition-colors"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-cynical-900/30 border-2 border-gold-400/40 group-hover:border-gold-400 flex items-center justify-center transition-colors">
                        <span className="text-gold-400/60 text-xl font-bold">
                          {person?.name?.charAt(0) ?? "?"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gold-200/80 font-medium uppercase tracking-wider mb-1">
                      {crewMember.role}
                    </div>
                    <div className="text-white font-semibold truncate group-hover:text-gold-400 transition-colors">
                      {person?.name ?? "Ukjent"}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* MODAL – felles for cast & crew */}
      <AnimatePresence>
  {selectedPerson && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cynical-900/90 backdrop-blur-md"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl transform-gpu"
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label="Lukk modal"
          type="button"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        <div className="flex flex-col md:flex-row max-h-[85vh] overflow-y-auto">
          {hasImageAsset(selectedPerson.actor?.image) && (
            <div className="md:w-2/5 shrink-0">
              <div className="relative h-64 md:h-full">
                <img
                  src={urlFor(selectedPerson.actor!.image!)
                    .width(600)
                    .height(800)
                    .quality(90)
                    .url()}
                  alt={selectedPerson.actor?.name ?? "Skuespiller"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-cynical-900/50 to-transparent md:bg-linear-to-r" />
              </div>
            </div>
          )}

          <div className="flex-1 p-8 md:p-10">
            {selectedPerson.role && (
              <div className="inline-block px-4 py-1.5 mb-4 bg-gold-400/20 border border-gold-400/30 text-gold-200 text-sm font-semibold rounded-full backdrop-blur">
                {selectedPerson.role}
              </div>
            )}

            <h3
              id="modal-title"
              className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
            >
              {selectedPerson.actor?.name ?? "Ukjent person"}
            </h3>

            {selectedPerson.actor?.bio ? (
              <div className="text-cynical-100/90 leading-relaxed space-y-4">
                {selectedPerson.actor.bio.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="text-cynical-100/70 italic">
                Ingen biografi tilgjengelig.
              </p>
            )}

            <div className="mt-8 h-1 w-24 bg-linear-to-r from-gold-400 to-transparent rounded-full" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
}
