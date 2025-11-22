// routes/Archive.tsx
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSanityQuery } from '@/hooks/useSanityQuery'
// import { urlFor } from '@/lib/sanity'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
// import { Card, CardContent } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import type { Show } from '@/types/sanity'
import { SEOHead } from '@/components/SEOHead'
import { queries } from '@/lib/sanityQueries'
import {
  PosterSpotlightCard,
  TicketStubCard,
} from "@/components/ui/ArchiveCards";

import { ShowFlipCard } from '@/components/ui/ShowFlipCard'

export function Archive() {
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  const { data: shows, isLoading } = useSanityQuery<Show[]>(
    'archived-shows',
    queries.archivedShows
  )

  // Get unique years
  const years = useMemo(() => {
    if (!shows) return []
    const yearSet = new Set(shows.map(show => show.year.toString()))
    return ['all', ...Array.from(yearSet).sort((a, b) => Number(b) - Number(a))]
  }, [shows])

  // Filter shows
  const filteredShows = useMemo(() => {
    if (!shows) return []
    return shows.filter(show => {
      const matchesYear = selectedYear === 'all' || show.year.toString() === selectedYear
      const matchesType = selectedType === 'all' || show.type === selectedType
      return matchesYear && matchesType
    })
  }, [shows, selectedYear, selectedType])

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
              En reise gjennom våre produksjoner gjennom årene
            </p>
            <p className="mt-6 text-3xl text-gray-200">
              Under så er det et utvalg med designforslag for hvordan vi kan presentere arkivet til Eventyrfestnignen
            </p>
          </div>
        </Container>
      </section>

      {/* Filters & Content */}
      <Section background="white">
        <Container>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {/* Year filter */}
            <div className="flex flex-wrap gap-2">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedYear === year
                      ? 'bg-torch-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year === 'all' ? 'Alle år' : year}
                </button>
              ))}
            </div>

            {/* Type filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedType === 'all'
                    ? 'bg-navy-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Alle
              </button>
              <button
                onClick={() => setSelectedType('main')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedType === 'main'
                    ? 'bg-navy-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Hovedforestilling
              </button>
              <button
                onClick={() => setSelectedType('halloween')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  selectedType === 'halloween'
                    ? 'bg-navy-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Halloween
              </button>
            </div>
          </div>

          {/* Shows Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-96 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredShows.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredShows.map((show, index) => (
              <motion.div
                key={show._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="space-y-16 border-b border-gray-200 pb-16 mb-16"
              >
                {/* Kortdesign 1 */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-navy-900 mb-6">
                    Flip Card
                  </h3>
                  <div className="flex justify-center">
                    <ShowFlipCard show={show} />
                  </div>
                </div>

                {/* Kortdesign 3 */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-navy-900 mb-6">
                    Spotlight Poster Card
                  </h3>
                  <div className="flex justify-center">
                    <PosterSpotlightCard show={show} />
                  </div>
                </div>


                {/* Kortdesign 5 */}
                <div>
                  <h3 className="text-2xl font-display font-bold text-navy-900 mb-6">
                    Ticket Stub Card
                  </h3>
                  <div className="flex justify-center">
                    <TicketStubCard show={show} />
                  </div>
                </div>

              </motion.div>
            ))}

            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Ingen forestillinger funnet med valgte filtre
              </p>
            </div>
          )}
        </Container>
      </Section>

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