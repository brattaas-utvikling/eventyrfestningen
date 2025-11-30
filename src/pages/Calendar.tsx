// src/routes/Calendar.tsx
import { Container } from '@/components/layout/Container'
import { SEOHead } from '@/components/SEOHead'
import { CalendarSection } from '@/components/sections/CalendarSection'

export function Calendar() {

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
              Forestillinger 2026
            </h1>
            <p className="text-xl text-gray-200">
            Her ser du alle planlagte kveldsforestillinger på Kongsvinger
              Festning sommeren 2026. Forestillingen starter kl. 22.00, og
              portene åpner kl. 20.00.
            </p>
          </div>
        </Container>
      </section>
      <CalendarSection />
    </>
  )
}
