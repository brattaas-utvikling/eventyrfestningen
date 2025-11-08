// src/components/show/CastGallery.tsx
import { urlFor } from '@/lib/sanity'
import type { Show } from '@/types/sanity'
import { motion } from 'framer-motion'

interface CastGalleryProps {
  show: Show
}

type CastItem = NonNullable<Show['cast']>[number]

export function CastGallery({ show }: CastGalleryProps) {
  if (!show.cast || show.cast.length === 0) {
    return null
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {show.cast.map((item: CastItem) => (
        <motion.div
          key={item.actor._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl bg-white/5 backdrop-blur border border-white/10 p-4 text-center"
        >
          <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-2 border-gold-400/60">
            {item.actor.image ? (
              <img
                src={urlFor(item.actor.image).width(300).height(300).url()}
                alt={item.actor.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-navy-900/30" />
            )}
          </div>
          <h3 className="text-white font-semibold">{item.actor.name}</h3>
          <p className="text-gold-200 text-sm mt-1">{item.role}</p>
          {item.actor.bio ? (
            <p className="text-xs text-navy-100/70 mt-3 line-clamp-3">{item.actor.bio}</p>
          ) : null}
        </motion.div>
      ))}
    </div>
  )
}


// // components/sections/CastGallery.tsx
// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { X } from 'lucide-react'
// import { Container } from '@/components/layout/Container'
// import { urlFor } from '@/lib/sanity'
// import type { Show } from '@/types/sanity'

// interface CastGalleryProps {
//   show: Show
// }

// export function CastGallery({ show }: CastGalleryProps) {
//   const [selectedPerson, setSelectedPerson] = useState<any>(null)

//   if (!show.cast || show.cast.length === 0) return null

//   return (
//     <section className="py-16 sm:py-20 lg:py-24 bg-navy-50">
//       <Container>
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4">
//             Rollebesetning
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Møt de talentfulle skuespillerne som gir liv til historien
//           </p>
//         </div>

//         {/* Cast Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
//           {show.cast.map((castMember, index) => (
//             <motion.div
//               key={castMember.actor._id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="group cursor-pointer"
//               onClick={() => setSelectedPerson(castMember)}
//             >
//               <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
//                 {/* Image */}
//                 <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-navy-900 to-burgundy-900">
//                   {castMember.actor.image ? (
//                     <img
//                       src={urlFor(castMember.actor.image)
//                         .width(400)
//                         .height(533)
//                         .quality(85)
//                         .auto('format')
//                         .url()}
//                       alt={castMember.actor.image.alt || castMember.actor.name}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <span className="text-6xl text-white font-display">
//                         {castMember.actor.name.charAt(0)}
//                       </span>
//                     </div>
//                   )}
                  
//                   {/* Overlay on hover */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
//                     <span className="text-white text-sm font-medium">
//                       Les mer →
//                     </span>
//                   </div>
//                 </div>

//                 {/* Info */}
//                 <div className="p-4 text-center">
//                   <h3 className="font-display font-bold text-lg text-navy-900 mb-1">
//                     {castMember.actor.name}
//                   </h3>
//                   <p className="text-sm text-gold-600 font-medium">
//                     {castMember.role}
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Crew Section */}
//         {show.crew && show.crew.length > 0 && (
//           <div className="mt-16">
//             <h3 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">
//               Produksjonsteam
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {show.crew.map((crewMember, index) => (
//                 <motion.div
//                   key={crewMember.person._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
//                 >
//                   {crewMember.person.image && (
//                     <img
//                       src={urlFor(crewMember.person.image)
//                         .width(80)
//                         .height(80)
//                         .quality(85)
//                         .auto('format')
//                         .url()}
//                       alt={crewMember.person.name}
//                       className="w-16 h-16 rounded-full object-cover"
//                     />
//                   )}
//                   <div>
//                     <div className="text-sm text-gray-600 mb-1">{crewMember.role}</div>
//                     <div className="font-semibold text-navy-900">
//                       {crewMember.person.name}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         )}
//       </Container>

//       {/* Modal */}
//       <AnimatePresence>
//         {selectedPerson && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm"
//             onClick={() => setSelectedPerson(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Close button */}
//               <button
//                 onClick={() => setSelectedPerson(null)}
//                 className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
//               >
//                 <X className="h-6 w-6 text-navy-900" />
//               </button>

//               <div className="md:flex">
//                 {/* Image */}
//                 {selectedPerson.actor.image && (
//                   <div className="md:w-1/2">
//                     <img
//                       src={urlFor(selectedPerson.actor.image)
//                         .width(600)
//                         .height(800)
//                         .quality(90)
//                         .auto('format')
//                         .url()}
//                       alt={selectedPerson.actor.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}

//                 {/* Content */}
//                 <div className="p-8 md:w-1/2">
//                   <div className="inline-block px-3 py-1 mb-4 bg-gold-100 text-gold-800 text-sm font-semibold rounded-full">
//                     {selectedPerson.role}
//                   </div>
                  
//                   <h3 className="text-3xl font-display font-bold text-navy-900 mb-4">
//                     {selectedPerson.actor.name}
//                   </h3>

//                   {selectedPerson.actor.bio && (
//                     <p className="text-gray-700 leading-relaxed">
//                       {selectedPerson.actor.bio}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   )
// }