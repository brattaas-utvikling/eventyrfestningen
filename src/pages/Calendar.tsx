// src/routes/Calendar.tsx
import { useSanityQuery } from '@/hooks/useSanityQuery'
import { queries } from '@/lib/sanityQueries'
import { Container } from '@/components/layout/Container'
import { CalendarGrid } from '@/components/sections/CalendarGrid'
import { Skeleton } from '@/components/ui/Skeleton'
import type { Performance } from '@/types/sanity'
import { SEOHead } from '@/components/SEOHead'

export function Calendar() {
  const { data: performances, isLoading } = useSanityQuery<Performance[]>(
    'all-performances',
    queries.upcomingPerformances
  )

  return (
    <>
      <SEOHead
        title="Forestillingskalender"
        description="Se alle datoer for kommende forestillinger på Kongsvinger Festning."
      />

      <section className="py-16 sm:py-20 bg-gradient-to-br from-navy-900 to-burgundy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
              Forestillingskalender
            </h1>
            <p className="text-xl text-gray-200">
              Velg din dato og sikre plasser til en uforglemmelig kveld
            </p>
          </div>
        </Container>
      </section>

      {isLoading ? (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-96 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : performances && performances.length > 0 ? (
        <CalendarGrid performances={performances} />
      ) : (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Ingen forestillinger er planlagt ennå.
              </p>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
