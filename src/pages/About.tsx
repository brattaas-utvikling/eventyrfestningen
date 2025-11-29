// src/pages/About.tsx
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { queries } from "@/lib/sanityQueries";
import { urlFor } from "@/lib/sanity";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Timeline } from "@/components/sections/Timeline";
import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import type { Milestone, Person, PortableText as PortableTextValue } from "@/types/sanity";
import { SEOHead } from "@/components/SEOHead";
import type { PortableText as PortableTextType } from '@/types/sanity'

type Organization = {
  _id: string;
  title?: string;
  body?: PortableTextValue;
  volunteering?: PortableTextValue;
};

// liten, lokal renderer for Sanity Portable Text
function RenderPortableText({ value }: { value?: PortableTextType }) {
  if (!value) return null

  return (
    <>
      {value.map((block) => {
        if (block._type !== 'block') return null

        const text =
          block.children?.map((child) => child.text).join('') ?? ''

        switch (block.style) {
          case 'h2':
            return (
              <h2 key={block._key} className="mt-6 mb-3 text-3xl font-display">
                {text}
              </h2>
            )
          case 'h3':
            return (
              <h3 key={block._key} className="mt-5 mb-2 text-2xl font-display">
                {text}
              </h3>
            )
          default:
            return (
              <p key={block._key} className="mb-4 leading-relaxed text-gray-700">
                {text}
              </p>
            )
        }
      })}
    </>
  )
}

export function About() {
  const { data: milestones, isLoading: milestonesLoading } =
    useSanityQuery<Milestone[]>("milestones", queries.milestones);

  const { data: boardMembers, isLoading: boardLoading } =
    useSanityQuery<Person[]>("board-members", queries.boardMembers);

  const { data: organization, isLoading: organizationLoading } =
    useSanityQuery<Organization>("organization", queries.organization);

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
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
              Vår historie
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed">
              Fra en liten gruppe entusiaster samlet i Kongsvinger til å øke
              ambisjonene og skape store familieforestillinger for hele
              Kongsvingerregionen. Dette er historien om hvordan vi bringer liv
              til Kongsvinger Festning.
            </p>
          </div>
        </Container>
      </section>

      {/* Om foreningen / frivillighet – fra Sanity: organization */}
      <Section background="white">
        <Container>
          {organizationLoading ? (
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-5/6" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-4/5" />
              </div>
            </div>
          ) : organization ? (
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {/* Om foreningen */}
              <div>
                <h2 className="text-3xl font-display font-bold text-navy-900 mb-4">
                  {organization.title ?? "Om Eventyrfestningen"}
                </h2>

                {organization.body ? (
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <RenderPortableText value={organization.body} />
                  </div>
                ) : (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Eventyrfestningen er en frivillig teaterforening som skaper
                    familieforestillinger på Kongsvinger Festning.
                  </p>
                )}
              </div>

              {/* Frivillighet */}
              <div>
                <h2 className="text-3xl font-display font-bold text-navy-900 mb-4">
                  Frivillighet
                </h2>

                {organization.volunteering ? (
                  <div className="prose prose-lg max-w-none text-gray-700">
                    <RenderPortableText value={organization.volunteering} />
                  </div>
                ) : (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Vi er avhengige av frivillige for å skape magiske
                    teateropplevelser. Enten du vil stå på scenen, jobbe bak
                    kulissene eller bidra praktisk, finnes det en plass til deg.
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* Timeline */}
      {milestonesLoading ? (
        <Section background="white">
          <Container>
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </Container>
        </Section>
      ) : milestones && milestones.length > 0 ? (
        <Section background="white">
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
                          src={urlFor(member.image)
                            .width(400)
                            .height(533)
                            .url()}
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
                        <p className="text-sm text-gray-500">
                          {member.role}
                        </p>
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
  );
}
