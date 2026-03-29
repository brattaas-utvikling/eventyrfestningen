// src/routes/Calendar.tsx
import { SEOHead } from '@/components/SEOHead'
import { CalendarSection } from '@/components/sections/CalendarSection'
import { PageHero } from '@/components/layout/PageHero'

export function Calendar() {

  return (
    <>
      <SEOHead
        title="Program"
        description="Se alle datoer for kommende forestillinger på Kongsvinger Festning."
      />

      <PageHero
        title="Program"
        subtitle="Her ser du alle planlagte kveldsforestillinger på Kongsvinger Festning sommeren 2026. Forestillingen starter kl. 22.00, og portene åpner kl. 20.00."
        backgroundImageUrl="/assets/landing/plakat_bakgrunn.png"
        backgroundImageAlt="Flyfoto av festningen 1814-ish"
        align="left"
      />

      <CalendarSection />
    </>
  )
}
