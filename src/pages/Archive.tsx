// routes/Archive.tsx
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

import { SEOHead } from '@/components/SEOHead'

import { ArchiveBook } from '@/components/sections/ArchiveBook'
import { TrackSection } from '@/lib/Tracksection'

export function Archive() {

  return (
    <>
      <SEOHead
        title="Arkiv"
        description="Se tilbake på alle våre tidligere forestillinger på Kongsvinger Festning. Fra første produksjon til i dag."
      />

      {/* Hero */}
      <section className="py-20 sm:py-28 bg-linear-to-br from-navy-900 to-burgundy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
              Tidligere forestillinger
            </h1>
            <p className="text-xl text-gray-200">
              Dykk ned i vårt arkiv og gjenopplev magien fra tidligere 
              forestillinger på Kongsvinger Festning. Fra våre første skritt 
              til dagens storslåtte produksjoner, hver forestilling bærer 
              med seg en unik historie og minner som har formet vår reise.
            </p>
          </div>
        </Container>
      </section>
<section>

<TrackSection page="archive" section="archive_book">
  <ArchiveBook />
</TrackSection>

</section>

      {/* Legacy Section */}
      <Section background="navy">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              Vår arv
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Gjennom 5 år har vi skapt uforglemmelige øyeblikk for over 
              10,000 publikummere. Hver forestilling er et kapittel i vår historie, og hver 
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
  )
}