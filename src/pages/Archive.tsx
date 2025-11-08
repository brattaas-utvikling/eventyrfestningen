// routes/Archive.tsx
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSanityQuery } from '@/hooks/useSanityQuery'
import { urlFor } from '@/lib/sanity'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { Calendar } from 'lucide-react'
import type { Show } from '@/types/sanity'
import { SEOHead } from '@/components/SEOHead'
import { queries } from '@/lib/sanityQueries'

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
                >
                  <Link to={`/forestilling/${show.slug}`}>
                    <Card className="h-full overflow-hidden group hover:shadow-2xl transition-all duration-300">
                      {/* Year Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-gold-500 text-white px-3 py-1 rounded-lg shadow-lg">
                          <span className="font-display font-bold">{show.year}</span>
                        </div>
                      </div>

                      {/* Poster */}
                      {show.posterImage && (
                        <div className="aspect-3/4 overflow-hidden bg-linear-to-br from-navy-900 to-burgundy-900">
                          <img
                            src={urlFor(show.posterImage)
                              .width(600)
                              .height(800)
                              .quality(85)
                              .auto('format')
                              .url()}
                            alt={show.posterImage.alt || show.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      )}

                      <CardContent className="p-6">
                        {/* Type Badge */}
                        <div className="mb-3">
                          <Badge variant={show.type === 'main' ? 'default' : 'torch'}>
                            {show.type === 'main' ? 'Hovedforestilling' : 'Halloween'}
                          </Badge>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-display font-bold text-navy-900 mb-3 group-hover:text-torch-600 transition-colors">
                          {show.title}
                        </h3>

                        {/* Story excerpt */}
                        {show.story && show.story[0]?.children?.[0]?.text && (
                          <p className="text-gray-700 line-clamp-3 mb-4">
                            {show.story[0].children[0].text}
                          </p>
                        )}

                        {/* Meta */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{show.year}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
              Gjennom {years.length - 1} år har vi skapt uforglemmelige øyeblikk for over 
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