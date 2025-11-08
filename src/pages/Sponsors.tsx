// src/routes/Sponsors.tsx
import { motion } from 'framer-motion'
import { useSanityQuery } from '@/hooks/useSanityQuery'
import { queries } from '@/lib/sanityQueries'
import { urlFor } from '@/lib/sanity'
import { SEOHead } from '@/components/SEOHead'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Download, Mail, Award, Star, Heart } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'
import type { Sponsor } from '@/types/sanity'

type SponsorTier = 'main' | 'gold' | 'silver' | 'partner' | string

const tierConfig: Record<
  Exclude<SponsorTier, string> | 'partner',
  {
    title: string
    icon: typeof Award
    description: string
  }
> = {
  main: {
    title: 'Hovedsponsor',
    icon: Award,
    description: 'Vår viktigste partner som gjør det mulig å skape magi',
  },
  gold: {
    title: 'Gullsponsorer',
    icon: Star,
    description: 'Gullsponsorer som bidrar betydelig til produksjonen',
  },
  silver: {
    title: 'Sølvsponsorer',
    icon: Heart,
    description: 'Verdifulle bidragsytere til vårt teater',
  },
  partner: {
    title: 'Samarbeidspartnere',
    icon: Heart,
    description: 'Lokale bedrifter som støtter kulturen',
  },
}

export function Sponsors() {
  const { data: sponsors, isLoading } = useSanityQuery<Sponsor[]>(
    'sponsors',
    queries.sponsors
  )

  // legg dem i grupper
  const sponsorsByTier: Record<string, Sponsor[]> =
    sponsors?.reduce<Record<string, Sponsor[]>>((acc, sponsor) => {
      const tier = sponsor.tier ?? 'partner'
      if (!acc[tier]) acc[tier] = []
      acc[tier].push(sponsor)
      return acc
    }, {}) ?? {}

  const orderedTiers: SponsorTier[] = ['main', 'gold', 'silver', 'partner']

  return (
    <>
      <SEOHead
        title="Sponsorer og partnere"
        description="Møt bedriftene som gjør forestillingene mulig."
      />

      <section className="py-20 sm:py-28 bg-gradient-to-br from-navy-900 to-burgundy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
              Våre sponsorer
            </h1>
            <p className="text-xl text-gray-200">
              Uten våre fantastiske sponsorer og samarbeidspartnere ville ikke
              dette vært mulig.
            </p>
          </div>
        </Container>
      </section>

      {isLoading ? (
        <Section background="white">
          <Container>
            <div className="space-y-12">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-12 w-48 mb-8" />
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((__, j) => (
                      <Skeleton key={j} className="h-28 w-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : (
        <Section background="white">
          <Container className="space-y-16">
            {orderedTiers.map((tier) => {
              const tierSponsors = sponsorsByTier[tier]
              if (!tierSponsors || tierSponsors.length === 0) return null

              const TierIcon = tierConfig[tier as keyof typeof tierConfig].icon

              return (
                <div key={tier}>
                  <div className="flex items-center gap-3 mb-6">
                    <TierIcon className="h-7 w-7 text-gold-500" />
                    <div>
                      <h2 className="text-3xl font-display font-bold text-navy-900">
                        {tierConfig[tier as keyof typeof tierConfig].title}
                      </h2>
                      <p className="text-gray-600">
                        {tierConfig[tier as keyof typeof tierConfig].description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {tierSponsors.map((sponsor) => (
                      <motion.div
                        key={sponsor._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center"
                      >
                        <Card className="w-full h-28 flex items-center justify-center p-4 hover:shadow-xl transition-shadow">
                          <CardContent className="flex items-center justify-center">
                            {sponsor.logo ? (
                              <img
                                src={urlFor(sponsor.logo).width(280).url()}
                                alt={sponsor.name}
                                className="max-h-16 object-contain"
                              />
                            ) : (
                              <span className="font-semibold text-navy-900">
                                {sponsor.name}
                              </span>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* CTA */}
            <div className="bg-navy-900 rounded-2xl p-10 text-center text-white">
              <h2 className="text-3xl font-display font-bold mb-2">
                Vil din bedrift bli sponsor?
              </h2>
              <p className="text-gray-200 mb-6">
                Vi har fleksible pakker for lokale bedrifter.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="torch" asChild>
                  <a href="mailto:post@festningsteater.no">
                    <Mail className="h-4 w-4 mr-2" />
                    Ta kontakt
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/sponsor-pakke.pdf">
                    <Download className="h-4 w-4 mr-2" />
                    Last ned sponsorinfo
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
