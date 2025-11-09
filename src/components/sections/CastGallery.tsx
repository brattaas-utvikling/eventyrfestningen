// src/components/show/CastGallery.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import type { Show, SanityImage, Person } from "@/types/sanity";

interface CastGalleryProps {
  show: Show;
}

type CastItem = NonNullable<Show["cast"]>[number];

// type guard
function hasImageAsset(img: SanityImage | undefined): img is SanityImage {
  return !!img && !!img.asset && typeof img.asset._ref === "string";
}

export function CastGallery({ show }: CastGalleryProps) {
  const [selectedPerson, setSelectedPerson] = useState<{
    role: string;
    actor: Person | undefined;
  } | null>(null);

  const cast = show.cast ?? [];
  const crew = show.crew ?? [];

  if (cast.length === 0 && crew.length === 0) {
    return null;
  }

  return (
    <>
      {/* CAST */}
      {cast.length > 0 && (
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 pb-8 border-b border-white/10"
          >
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
              Rollebesetning
            </h3>
            <p className="text-navy-100/70 text-sm">
              Møt de talentfulle skuespillerne som gir liv til historien
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
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
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group rounded-xl bg-white/5 backdrop-blur border border-white/10 p-4 text-center cursor-pointer hover:bg-white/10 hover:border-gold-400/30 transition-all"
                  onClick={() =>
                    setSelectedPerson({ role: item.role, actor: item.actor })
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedPerson({ role: item.role, actor: item.actor });
                    }
                  }}
                  aria-label={`Les mer om ${actor?.name ?? "skuespiller"}`}
                >
                  <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-2 border-gold-400/60 group-hover:border-gold-400 transition-colors relative">
                    {imgUrl ? (
                      <motion.img
                        src={imgUrl}
                        alt={actor?.name ?? "Skuespiller"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      <div className="h-full w-full bg-navy-900/30 flex items-center justify-center">
                        <span className="text-gold-400/30 text-4xl font-bold">
                          {actor?.name?.charAt(0) ?? "?"}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-navy-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
                    <p className="text-xs text-navy-100/70 mt-3 line-clamp-2">
                      {actor.bio}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* CREW */}
      {crew.length > 0 && (
        <div className="mt-16 pt-12 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
              Produksjonsteam
            </h3>
            <p className="text-navy-100/70 text-sm">
              De kreative hodene bak kulissene
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {crew.map((crewMember, index) => {
              const person = crewMember.person;
              const hasImg = hasImageAsset(person?.image);
              const imgUrl = hasImg
                ? urlFor(person!.image!).width(80).height(80).url()
                : null;

              return (
                <motion.div
                  key={person?._id ?? `crew-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  whileHover={{ transition: { duration: 0.2 } }}
                  /* HER: gjør crew klikkbart på samme måte */
                  className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur border border-white/10 rounded-lg hover:bg-white/10 hover:border-gold-400/30 transition-all group cursor-pointer"
                  onClick={() =>
                    setSelectedPerson({
                      role: crewMember.role,
                      actor: crewMember.person,
                    })
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedPerson({
                        role: crewMember.role,
                        actor: crewMember.person,
                      });
                    }
                  }}
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
                      <div className="w-14 h-14 rounded-full bg-navy-900/30 border-2 border-gold-400/40 group-hover:border-gold-400 flex items-center justify-center transition-colors">
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
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL – funker nå for både cast og crew */}
      <AnimatePresence>
        {selectedPerson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/90 backdrop-blur-md"
            onClick={() => setSelectedPerson(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ delay: 0.1 }}
                onClick={() => setSelectedPerson(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-label="Lukk modal"
              >
                <X className="h-6 w-6 text-white" />
              </motion.button>

              <div className="flex flex-col md:flex-row max-h-[85vh] overflow-y-auto">
                {hasImageAsset(selectedPerson.actor?.image) && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="md:w-2/5 shrink-0"
                  >
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
                      <div className="absolute inset-0 bg-linear-to-t from-navy-900/50 to-transparent md:bg-linear-to-r" />
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 p-8 md:p-10"
                >
                  {selectedPerson.role && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="inline-block px-4 py-1.5 mb-4 bg-gold-400/20 border border-gold-400/30 text-gold-200 text-sm font-semibold rounded-full backdrop-blur"
                    >
                      {selectedPerson.role}
                    </motion.div>
                  )}

                  <motion.h3
                    id="modal-title"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="text-3xl md:text-4xl font-display font-bold text-white mb-6"
                  >
                    {selectedPerson.actor?.name ?? "Ukjent person"}
                  </motion.h3>

                  {selectedPerson.actor?.bio ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-navy-100/90 leading-relaxed space-y-4"
                    >
                      {selectedPerson.actor.bio
                        .split("\n\n")
                        .map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                    </motion.div>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-navy-100/70 italic"
                    >
                      Ingen biografi tilgjengelig.
                    </motion.p>
                  )}

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-8 h-1 w-24 bg-linear-to-r from-gold-400 to-transparent rounded-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
