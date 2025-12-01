// src/routes/Calendar.tsx
import { SEOHead } from '@/components/SEOHead'
import { CalendarSection } from '@/components/sections/CalendarSection'
import { PageHero } from '@/components/layout/PageHero'

export function Calendar() {

  return (
    <>
      <SEOHead
        title="Forestillingskalender"
        description="Se alle datoer for kommende forestillinger på Kongsvinger Festning."
      />

      <PageHero
        title="Forestillingskalender"
        subtitle="Her ser du alle planlagte kveldsforestillinger på Kongsvinger Festning sommeren 2026. Forestillingen starter kl. 22.00, og portene åpner kl. 20.00."
        backgroundImageUrl="/media/bakgrunn.jpg"
        backgroundImageAlt="Scene og publikum ved Kongsvinger Festning"
        align="left"
      />

      <CalendarSection />
    </>
  )
}
