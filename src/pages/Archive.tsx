// src/pages/Archive.tsx
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SEOHead } from '@/components/SEOHead';
import { ArchiveBook } from '@/components/sections/ArchiveBook';
import { MobileArchiveCarousel } from '@/components/sections/MobileArchiveCarousel';
import { TrackSection } from '@/lib/Tracksection';
import { PageHero } from '@/components/layout/PageHero';
import { useSanityQuery } from '@/hooks/useSanityQuery';
import { queries } from '@/lib/sanityQueries';
import type { Show } from '@/types/sanity';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function Archive() {
  // Fetch shows data
  const { data: shows, isLoading, error } = useSanityQuery<Show[]>(
    'archived-shows',
    queries.archivedShows
  );

  // Media query for responsive layout
  // Show carousel on mobile (< 768px), book on tablet/desktop
  const isMobile = useMediaQuery('(max-width: 767px)');

  // Loading state
  if (isLoading) {
    return (
      <>
        <SEOHead
          title="Arkiv"
          description="Se tilbake på alle våre tidligere forestillinger på Kongsvinger Festning."
        />
        <div className="min-h-screen flex items-center justify-center bg-[#0b0a09]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold-400/30 border-t-gold-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-amber-100 text-lg">Laster inn arkivet...</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <SEOHead title="Arkiv - Feil" />
        <div className="min-h-screen flex items-center justify-center bg-[#0b0a09]">
          <div className="text-center px-4">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-amber-100 text-lg mb-2">
              Kunne ikke laste arkivet
            </p>
            <p className="text-amber-100/60 text-sm">
              Prøv å laste siden på nytt
            </p>
          </div>
        </div>
      </>
    );
  }

  // No shows state
  if (!shows || shows.length === 0) {
    return (
      <>
        <SEOHead title="Arkiv" />
        <div className="min-h-screen flex items-center justify-center bg-[#0b0a09]">
          <div className="text-center px-4">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-amber-100 text-lg">
              Ingen forestillinger funnet i arkivet ennå
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Arkiv"
        description="Se tilbake på alle våre tidligere forestillinger på Kongsvinger Festning. Fra første produksjon til i dag."
      />

      {/* Desktop/Tablet: Show Hero + Book */}
      {!isMobile && (
        <>
          <PageHero
            title="Tidligere forestillinger"
            subtitle="Dykk ned i vårt arkiv og gjenopplev magien fra tidligere forestillinger på Kongsvinger Festning. Fra våre første skritt til dagens storslåtte produksjoner, hver forestilling bærer med seg en unik historie og minner som har formet vår reise."
            backgroundImageUrl="/media/bakgrunn.jpg"
            backgroundImageAlt="Publikum under tidligere forestilling"
            align="left"
          />

          <TrackSection page="archive" section="archive_book">
            <ArchiveBook />
          </TrackSection>

          {/* Legacy Section */}
          <Section background="cynical">
            <Container>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
                  Vår arv
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Gjennom 5 år har vi skapt uforglemmelige øyeblikk for over
                  11,000 publikummere. Hver forestilling er et kapittel i vår historie, og hver
                  opplevelse er et minne som varer livet ut.
                </p>
                <p className="text-lg text-gray-300">
                  Takk til alle skuespillere, crew, frivillige og publikummere som har vært med
                  på reisen. Sammen har vi gjort Kongsvinger Festning til et levende teater.
                </p>
              </div>
            </Container>
          </Section>
        </>
      )}

      {/* Mobile: Show Carousel */}
      {isMobile && (
        <TrackSection page="archive" section="mobile_carousel">
          <MobileArchiveCarousel shows={shows} />
        </TrackSection>
      )}
    </>
  );
}

// // routes/Archive.tsx
// import { Container } from '@/components/layout/Container'
// import { Section } from '@/components/layout/Section'
// import { SEOHead } from '@/components/SEOHead'
// import { ArchiveBook } from '@/components/sections/ArchiveBook'
// import { TrackSection } from '@/lib/Tracksection'
// import { PageHero } from '@/components/layout/PageHero'

// export function Archive() {

//   return (
//     <>
//       <SEOHead
//         title="Arkiv"
//         description="Se tilbake på alle våre tidligere forestillinger på Kongsvinger Festning. Fra første produksjon til i dag."
//       />
//       <PageHero
//         title="Tidligere forestillinger"
//         subtitle="Dykk ned i vårt arkiv og gjenopplev magien fra tidligere forestillinger på Kongsvinger Festning. Fra våre første skritt til dagens storslåtte produksjoner, hver forestilling bærer med seg en unik historie og minner som har formet vår reise."
//         backgroundImageUrl="/media/bakgrunn.jpg"
//         backgroundImageAlt="Publikum under tidligere forestilling"
//         align="left"
//       />

//         <section>

//         <TrackSection page="archive" section="archive_book">
//           <ArchiveBook />
//         </TrackSection>

//         </section>

//       {/* Legacy Section */}
//       <Section background="cynical">
//         <Container>
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
//               Vår arv
//             </h2>
//             <p className="text-xl text-gray-200 mb-8">
//               Gjennom 5 år har vi skapt uforglemmelige øyeblikk for over 
//               11,000 publikummere. Hver forestilling er et kapittel i vår historie, og hver 
//               opplevelse er et minne som varer livet ut.
//             </p>
//             <p className="text-lg text-gray-300">
//               Takk til alle skuespillere, crew, frivillige og publikummere som har vært med 
//               på reisen. Sammen har vi gjort Kongsvinger Festning til et levende teater.
//             </p>
//           </div>
//         </Container>
//       </Section>
//     </>
//   )
// }