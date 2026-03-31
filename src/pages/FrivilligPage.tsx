// src/pages/FrivilligPage.tsx
import { PageHero } from '@/components/layout/PageHero';
import { SEOHead } from '@/components/SEOHead';
import VolunteerWizard from '@/components/volunteer/VolunteerWizard';
// import { TrackSection } from '@/lib/Tracksection';

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Bli frivillig – Eventyrfestningen',
    description:
      'Meld deg som frivillig til Eventyrfestningen på Kongsvinger Festning. Velg blant mange spennende oppgaver og vær med å skape magi.',
    url: 'https://eventyrfestningen.no/frivillig',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Eventyrfestningen',
      url: 'https://eventyrfestningen.no',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://eventyrfestningen.no' },
      { '@type': 'ListItem', position: 2, name: 'Bli frivillig', item: 'https://eventyrfestningen.no/frivillig' },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FrivilligPage() {
  return (
    <>
      <SEOHead
        title="Bli frivillig"
        description="Meld deg som frivillig til Eventyrfestningen på Kongsvinger Festning. Velg blant oppgaver som opprigg, publikumsvert, backstage, solskinnsgruppen og mer."
        url="https://eventyrfestningen.no/frivillig"
        type="website"
        schema={schema}
      />
          <PageHero
            title="Bli frivillig"
            subtitle="Eventyrfestningen er skapt av hundrevis av frivillige hender. Enten du
            vil bygge scenografi, ta imot publikum eller bake boller til
            skuespillerne — her er det plass til deg."
            backgroundImageUrl="/assets/landing/plakat_bakgrunn.png"
            backgroundImageAlt="Publikum under tidligere forestilling"
            align="left"
          />

          {/* <TrackSection page="archive" section="archive_book">
          </TrackSection> */}

      {/* Wizard section */}
      <section className="bg-cynical-900 py-12 md:py-16 overflow-x-hidden" aria-label="Påmeldingsskjema for frivillige">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Card */}
          <div className="rounded-2xl border border-white/10 bg-cynical-800/40 p-6 shadow-2xl backdrop-blur-sm sm:p-8 md:p-10">
            <VolunteerWizard />
          </div>
        </div>
      </section>

      {/* FAQ section — good for SEO and AI snippets */}
      <section className="bg-cynical-900 py-12 md:py-16 border-t border-white/[0.05]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="h2 text-gold-400 mb-8">Ofte stilte spørsmål</h2>

          <dl className="flex flex-col gap-6">
            {[
              {
                q: 'Trenger jeg erfaring for å bli frivillig?',
                a: 'Nei, du trenger ingen spesiell erfaring. Vi setter pris på all hjelp og sørger for at du får opplæring og støtte i din rolle.',
              },
              {
                q: 'Hvor mange timer forventes det at jeg stiller opp?',
                a: 'Det varierer etter rolle. Noen oppgaver er kortvarige (f.eks. opprigg), mens andre strekker seg over hele forestillingsperioden.',
              },
              {
                q: 'Får frivillige se forestillingen?',
                a: 'Ja! Alle frivillige får tilbud om å se forestillingen. Vi setter stor pris på innsatsen din og arrangerer egen frivillighetsforestilling rett før premieren!',
              },
              {
                q: 'Når foregår forestillingen?',
                a: 'Eventyrfestningen spilles ved Kongsvinger Festning i perioden 2. - 11. juli 2026.',
              },
              {
                q: 'Hva skjer etter at jeg har meldt meg?',
                a: 'Vi går gjennom påmeldingene og kontakter deg på e-post. Det holdes et informasjonsmøte for alle frivillige i forkant av forestillingsperioden.',
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <dt className="font-heading text-lg text-white mb-2 wrap-break-word">{q}</dt>
                <dd className="font-sans text-sm text-white/65 leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
