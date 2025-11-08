// src/pages/Sponsors.tsx
import React from 'react'
import { Handshake, Medal, Gem, Star } from 'lucide-react'
import { useSanityQuery } from '@/hooks/useSanityQuery'
import { queries } from '@/lib/sanityQueries'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { urlFor } from '@/lib/sanity'
import type { Sponsor } from '@/types/sanity'

// 1) definer hvilke tiers vi støtter
const TIERS = ['main', 'gold', 'silver', 'partner'] as const
type SponsorTier = (typeof TIERS)[number]

// 2) metadata for hver tier
const TIER_META: Record<
  SponsorTier,
  {
    title: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    description: string
  }
> = {
  main: {
    title: 'Hovedsponsor',
    icon: Star,
    description: 'Våre viktigste støttespillere.',
  },
  gold: {
    title: 'Gullpartnere',
    icon: Gem,
    description: 'Bidrar til å løfte produksjonen.',
  },
  silver: {
    title: 'Sølvpartnere',
    icon: Medal,
    description: 'Støtter kultur i regionen.',
  },
  partner: {
    title: 'Partnere',
    icon: Handshake,
    description: 'Samarbeid og lokal støtte.',
  },
}

// 3) liten hjelper: tar en ukjent string (eller undefined) og gir oss en trygg tier
function normalizeTier(value: string | undefined): SponsorTier {
  if (value && TIERS.includes(value as SponsorTier)) {
    return value as SponsorTier
  }
  return 'partner'
}

export function Sponsors() {
  const { data: sponsors } = useSanityQuery<Sponsor[]>(
    'sponsors',
    queries.sponsors
  )

  // 4) grupper per tier – nå med typesikker key
  const grouped: Partial<Record<SponsorTier, Sponsor[]>> = {}

  sponsors?.forEach((sponsor) => {
    const tier = normalizeTier(sponsor.tier)
    if (!grouped[tier]) {
      grouped[tier] = []
    }
    grouped[tier]!.push(sponsor)
  })

  return (
    <Section background="white">
      <Container>
        <h1 className="text-4xl font-display mb-10 text-navy-900">
          Sponsorer
        </h1>

        {TIERS.map((tierKey) => {
          const tierSponsors = grouped[tierKey]
          if (!tierSponsors || tierSponsors.length === 0) {
            return null
          }

          const meta = TIER_META[tierKey]
          const Icon = meta.icon

          return (
            <div key={tierKey} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Icon className="h-6 w-6 text-gold-500" />
                <div>
                  <h2 className="text-2xl font-display text-navy-900">
                    {meta.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{meta.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                {tierSponsors.map((sponsor) => (
                  <div
                    key={sponsor._id}
                    className="bg-white border border-gray-200 rounded-lg p-4 w-48 flex items-center justify-center"
                  >
                    {sponsor.logo ? (
                      <img
                        src={urlFor(sponsor.logo).width(220).url()}
                        alt={sponsor.name}
                        className="max-h-16 object-contain"
                      />
                    ) : (
                      <span className="text-navy-900 font-medium">
                        {sponsor.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </Container>
    </Section>
  )
}
