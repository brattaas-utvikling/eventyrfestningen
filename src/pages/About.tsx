// src/routes/About.tsx
import { useSanityQuery } from '@/hooks/useSanityQuery'
import { queries } from '@/lib/sanityQueries'
import { urlFor } from '@/lib/sanity'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Timeline } from '@/components/sections/Timeline'
import { Button } from '@/components/ui/Button'
import { Mail, Users, Heart } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'
import type { Milestone, Person } from '@/types/sanity'
import { SEOHead } from '@/components/SEOHead'

export function About() {
  const { data: milestones, isLoading: milestonesLoading } =
    useSanityQuery<Milestone[]>('milestones', queries.milestones)

  const { data: boardMembers, isLoading: boardLoading } =
    useSanityQuery<Person[]>('board-members', queries.boardMembers)

  return (
    <>
      <SEOHead
        title="Om oss"
        description="Lær om Kongsvinger Festningsteater - vår historie, visjon og de menneskene som gjør magien mulig."
      />

      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-linear-to-br from-navy-900 to-burgundy-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
              Vår historie
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed">
              Fra en liten gruppe entusiaster til Norges mest ambisiøse lokale
              teaterforening. Dette er historien om hvordan vi bringer liv til
              Kongsvinger Festning.
            </p>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <Section background="white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="w-16 h-16 bg-gold-100 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-gold-600" />
              </div>
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-4">
                Vår visjon
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Vi ønsker å bli Norges fremste lokale teaterforening, kjent for
                storslåtte familieforestillinger som kombinerer historisk
                autentisitet med moderne teaterkunst. Målet er å nå Kaptein
                Sabeltann-nivå i kvalitet og publikumsoppslutning.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-torch-100 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-torch-600" />
              </div>
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-4">
                Vårt oppdrag
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Å skape uforglemmelige kulturopplevelser for hele familien ved å
                bringe Kongsvinger Festnings rike historie til live. Vi engasjerer
                lokalsamfunnet, utvikler lokale talenter, og gjør teater
                tilgjengelig for alle.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      {milestonesLoading ? (
        <Section background="paper">
          <Container>
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </Container>
        </Section>
      ) : milestones && milestones.length > 0 ? (
        <Section background="paper">
          <Timeline milestones={milestones} />
        </Section>
      ) : null}

      {/* Board Members */}
      {boardLoading ? (
        <Section background="white">
          <Container>
            <Skeleton className="h-12 w-64 mb-12 mx-auto" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full" />
              ))}
            </div>
          </Container>
        </Section>
      ) : boardMembers && boardMembers.length > 0 ? (
        <Section background="white">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4">
                Styret og nøkkelpersoner
              </h2>
              <p className="text-lg text-gray-600">
                Møt menneskene som driver foreningen fremover
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {boardMembers.map((member) => (
                <div key={member._id} className="group">
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                    <div className="aspect-3/4 overflow-hidden bg-linear-to-br from-navy-900 to-burgundy-900">
                      {member.image ? (
                        <img
                          src={urlFor(member.image).width(400).height(533).url()}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : null}
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-navy-900">
                        {member.name}
                      </h3>
                      {member.role ? (
                        <p className="text-sm text-gray-500">{member.role}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* CTA */}
      <Section background="navy">
        <Container className="text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Vil du være med?
          </h2>
          <p className="text-gray-200 mb-6">
            Vi trenger alltid frivillige, sponsorer og medspillere.
          </p>
          <Button variant="torch" asChild>
            <a href="/kontakt">
              <Mail className="h-4 w-4 mr-2" />
              Ta kontakt
            </a>
          </Button>
        </Container>
      </Section>
    </>
  )
}
