// src/routes/AboutShow.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { queries } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { ShowOverview } from "@/components/sections/ShowOverview";
import { CastGallery } from "@/components/sections/CastGallery";
import { ImageLightbox } from "@/components/features/ImageLightbox";
import { HeroSkeleton } from "@/components/ui/Skeleton";
import type { Show } from "@/types/sanity";
import { SEOHead } from "@/components/SEOHead";


export function AboutShow() {
  const { slug } = useParams<{ slug?: string }>();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // 👇 Dynamisk query: hvis vi har slug ( /arkiv/:slug ), bruk showBySlug
  // ellers bruk currentShow ( /om-forestillingen )
  const queryKey = slug ? `show-${slug}` : "current-show";
  const query = slug ? queries.showBySlug(slug) : queries.currentShow;

  const { data: show, isLoading } = useSanityQuery<Show | null>(
    queryKey,
    query
  );

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (!show) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-900">
        <p className="text-xl text-gray-200">
          Ingen forestilling funnet
          {slug ? ` for slug "${slug}"` : ""}.
        </p>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // 🔁 Sanity-images → lightbox-format (URL-baserte bilder)
  const lightboxImages = (show.galleryImages ?? []).map((img) => ({
    url: urlFor(img).width(1400).url(),
    alt: img.alt ?? show.title,
    caption: "Bak kulissene",
  }));

  return (
    <div className="mb-16 bg-navy-900 min-h-screen">
      <SEOHead
        title={`Om ${show.title}`}
        description={
          show.seo?.description ||
          `Les alt om ${show.title} - rollebesetning, historien, og praktisk informasjon.`
        }
        image={
          show.seo?.ogImage
            ? urlFor(show.seo.ogImage).width(1200).height(630).url()
            : undefined
        }
      />

      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {show.heroImage && (
          <>
            <img
              src={urlFor(show.heroImage)
                .width(1920)
                .height(1080)
                .quality(85)
                .url()}
              alt={show.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/50 to-transparent" />

            <Container className="absolute bottom-0 left-0 right-0 pb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-4">
                  {show.title}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-200">
                  {show.type === "halloween"
                    ? "Halloween-forestilling"
                    : "Hovedforestilling"}{" "}
                  {show.year}
                </p>
              </motion.div>
            </Container>
          </>
        )}
      </section>

      {/* Show Overview – nå gjenbrukt både for årets og arkiv-forestilling */}
      <ShowOverview show={show} onImageClick={openLightbox} />

      {/* Cast & Crew */}
      <CastGallery show={show} />

      {/* Lightbox */}
      {lightboxImages.length > 0 && (
        <ImageLightbox
          isOpen={lightboxOpen}
          images={lightboxImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}

export default AboutShow;


// // src/routes/AboutShow.tsx
// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { useSanityQuery } from '@/hooks/useSanityQuery'
// import { queries } from '@/lib/sanityQueries'
// import { urlFor } from '@/lib/sanity'
// import { Container } from '@/components/layout/Container'
// import { ShowOverview } from '@/components/sections/ShowOverview'
// import { CastGallery } from '@/components/sections/CastGallery'
// import { ImageLightbox } from '@/components/features/ImageLightbox'
// import { HeroSkeleton } from '@/components/ui/Skeleton'
// import type { Show } from '@/types/sanity'
// import { SEOHead } from '@/components/SEOHead'

// export function AboutShow() {
//   const [lightboxOpen, setLightboxOpen] = useState(false)
//   const [lightboxIndex, setLightboxIndex] = useState(0)

//   const { data: show, isLoading } = useSanityQuery<Show>(
//     'current-show',
//     queries.currentShow
//   )

//   if (isLoading) {
//     return <HeroSkeleton />
//   }

//   if (!show) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-xl text-gray-600">Ingen forestilling funnet</p>
//       </div>
//     )
//   }

//   const openLightbox = (index: number) => {
//     setLightboxIndex(index)
//     setLightboxOpen(true)
//   }

//   // 🔁 gjør om Sanity-images → lightbox-format
//   const lightboxImages = (show.galleryImages ?? []).map((img) => ({
//     url: urlFor(img).width(1400).url(),
//     alt: img.alt ?? show.title,
//     caption: 'Bak kulissene'
//   }))

//   return (
//     <div className='mb-16'>
//       <SEOHead
//         title={`Om ${show.title}`}
//         description={
//           show.seo?.description ||
//           `Les alt om ${show.title} - rollebesetning, historien, og praktisk informasjon.`
//         }
//         image={
//           show.seo?.ogImage
//             ? urlFor(show.seo.ogImage).width(1200).height(630).url()
//             : undefined
//         }
//       />

//       {/* Hero Image */}
//       <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
//         {show.heroImage && (
//           <>
//             <img
//               src={urlFor(show.heroImage)
//                 .width(1920)
//                 .height(1080)
//                 .quality(85)
//                 .url()}
//               alt={show.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-linear-to-t from-navy-900 via-navy-900/50 to-transparent" />

//             <Container className="absolute bottom-0 left-0 right-0 pb-12">
//               <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-4">
//                   {show.title}
//                 </h1>
//                 <p className="text-xl sm:text-2xl text-gray-200">
//                 {show.type === 'halloween' ? 'Halloween-forestilling' : 'Hovedforestilling'} {show.year}
//                 </p>

//               </motion.div>
//             </Container>
//           </>
//         )}
//       </section>

//       {/* Show Overview – nå med onImageClick */}
//       <ShowOverview show={show} onImageClick={openLightbox} />

//       {/* Cast & Crew */}
//       <CastGallery show={show} />

//       {/* Lightbox */}
//       {lightboxImages.length > 0 && (
//         <ImageLightbox
//           isOpen={lightboxOpen}
//           images={lightboxImages}
//           initialIndex={lightboxIndex}
//           onClose={() => setLightboxOpen(false)}
//         />
//       )}
//     </div>
//   )
// }
