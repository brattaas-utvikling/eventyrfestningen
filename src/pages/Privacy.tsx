// src/pages/Privacy.tsx
import { motion } from "framer-motion";
import { ShieldCheck, Eye, UserX, Database, Lock } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SEOHead } from "@/components/SEOHead";

const fadeParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Privacy() {
  return (
    <>
      {/* SEO*/}
      <SEOHead
        title="Personvernerklæring"
        description="Les hvordan Eventyrfestningen behandler anonym brukstatistikk på nettsiden. Ingen cookies til sporing, ingen IP-lagring og ingen deling med tredjepart for markedsføring."
        type="website"
      />

      {/* HERO */}
      <Section background="navy" paddingY="tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
            {/* Tekst */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4 text-white">
                Personvernerklæring
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Vi tar personvern på alvor. Her forklarer vi hvilken informasjon vi
                samler inn på nettsiden, hvorfor vi gjør det og hvordan vi beskytter
                dataene. All analyse er anonym og brukes til å forbedre tjenesten –
                ikke til å identifisere enkeltpersoner.
              </p>
              <p className="mt-4 text-sm sm:text-base text-white/70">
                Kortversjon: Vi bruker kun anonym statistikk til å forbedre
                opplevelsen og dokumentere effekt – uten cookies til sporing og
                uten deling av data med tredjepart for markedsføring.
              </p>
            </motion.div>

            {/* Illustrasjon / kort */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-7 overflow-hidden">
                <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-gold-400/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-torch-500/10 blur-3xl" />

                <div className="relative flex flex-col gap-4">
                  <div className="inline-flex items-center gap-3 rounded-xl bg-black/20 px-4 py-2 border border-white/10">
                    <Lock className="h-5 w-5 text-gold-300" />
                    <span className="text-xs font-medium uppercase tracking-wide text-white/80">
                      Ingen cookies til sporing
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-display font-semibold text-white">
                    Bygget for trygg og moderne analyse
                  </h2>
                  <p className="text-sm text-white/70">
                    Vi bruker anonym statistikk for å forstå hva som fungerer på
                    siden – ikke for å følge enkeltpersoner. Ingen Google Analytics,
                    ingen sporing på tvers av nettsteder.
                  </p>

                  <ul className="mt-2 space-y-2 text-sm text-white/75">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold-300" />
                      <span>IP-adresser brukes kun teknisk i øyeblikket og lagres ikke.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold-300" />
                      <span>Data lagres kun som anonym og aggregert statistikk.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold-300" />
                      <span>Ingen deling med tredjepart for markedsføring.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* INNHOLD */}
      <Section background="navy">
        <Container>
          <motion.div
            variants={fadeParent}
            initial="hidden"
            animate="show"
            className="space-y-12 mt-6"
          >
            {/* Behandlingsansvarlig */}
            <motion.div
              variants={fadeItem}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <ShieldCheck className="h-6 w-6 text-gold-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-display text-white mb-2">
                    Hvem er behandlingsansvarlig?
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-3">
                    Eventyrfestningen er behandlingsansvarlig for innsamling og
                    bruk av opplysninger på denne nettsiden.
                  </p>
                  <div className="text-white/75 text-sm space-y-1">
                    <p>
                      <span className="font-semibold">Navn:</span> Eventyrfestningen
                    </p>
                    <p>
                      <span className="font-semibold">Organisasjonsnummer:</span>{" "}
                      [sett inn org.nr.]
                    </p>
                    <p>
                      <span className="font-semibold">Adresse:</span>{" "}
                      [sett inn adresse]
                    </p>
                    <p>
                      <span className="font-semibold">E-post:</span>{" "}
                      <a
                        href="mailto:kontakt@eventyrfestningen.no"
                        className="text-gold-300 underline-offset-4 hover:underline"
                      >
                        kontakt@eventyrfestningen.no
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hva vi samler inn */}
            <motion.div
              variants={fadeItem}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Eye className="h-6 w-6 text-gold-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-display text-white mb-2">
                    Hvilke opplysninger vi behandler
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    Vi samler kun inn anonym bruksstatistikk for å forstå hvordan
                    nettsiden brukes. Dette kan blant annet være:
                  </p>
                  <ul className="mt-3 space-y-2 text-white/70 list-disc list-inside">
                    <li>Hvilke sider som besøkes og i hvilken rekkefølge</li>
                    <li>Scroll-dybde og navigasjon på siden</li>
                    <li>Klikk på viktige knapper (som “Kjøp billetter”)</li>
                    <li>Klikk på sponsorlogoer</li>
                    <li>Kampanjeinformasjon (for eksempel UTM-parametere)</li>
                    <li>Grov geografisk informasjon (land, region, by/kommune)</li>
                  </ul>
                  <p className="mt-3 text-white/70 text-sm">
                    IP-adresser kan benyttes teknisk i øyeblikket for å beregne grov
                    geolokasjon (for eksempel kommune), men lagres ikke og brukes
                    ikke til å identifisere enkeltpersoner.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Formål og rettslig grunnlag */}
            <motion.div
              variants={fadeItem}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Database className="h-6 w-6 text-gold-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-display text-white mb-2">
                    Formål og rettslig grunnlag
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-3">
                    Vi bruker anonym statistikk for å:
                  </p>
                  <ul className="text-white/70 list-disc list-inside space-y-2">
                    <li>forbedre nettsiden og brukeropplevelsen</li>
                    <li>analysere trafikk og bruksmønstre</li>
                    <li>måle effekten av kampanjer og kommunikasjon</li>
                    <li>dokumentere synlighet og klikk på sponsorlogoer</li>
                  </ul>
                  <p className="mt-4 text-white/70 leading-relaxed">
                    Behandlingen skjer etter GDPR artikkel 6 nr. 1 bokstav f –
                    <span className="italic"> berettiget interesse</span>. Vår
                    berettigede interesse er å drifte, forbedre og videreutvikle
                    nettsiden, samt dokumentere sponsorverdi.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Teknisk behandling, lagring og cookies */}
            <motion.div
              variants={fadeItem}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <Lock className="h-6 w-6 text-gold-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-display text-white mb-2">
                    Teknisk behandling, lagring og cookies
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    Løsningen vår er bygget for å minimere behandling av
                    personopplysninger:
                  </p>
                  <ul className="mt-3 text-white/70 list-disc list-inside space-y-2">
                    <li>
                      IP-adresser brukes kun midlertidig for å beregne grov
                      geolokasjon og lagres ikke.
                    </li>
                    <li>
                      Opplysninger lagres kun som anonym og aggregert statistikk
                      (for eksempel per side, kampanje eller kommune).
                    </li>
                    <li>
                      Hendelser (som klikk og visninger) kan lagres i inntil{" "}
                      <span className="font-semibold">24 måneder</span> for å se
                      utvikling over tid.
                    </li>
                    <li>
                      Vi bruker ikke cookies til analyse eller sporing, og har derfor
                      ikke cookie-banner.
                    </li>
                  </ul>
                  <p className="mt-3 text-white/70 text-sm">
                    Vi bruker ikke Google Analytics, Meta Pixel eller tilsvarende
                    tredjeparts sporingsverktøy for markedsføring.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Deling og sikkerhet */}
            <motion.div
              variants={fadeItem}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <UserX className="h-6 w-6 text-gold-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-display text-white mb-2">
                    Deling av opplysninger og sikkerhet
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-3">
                    Anonym statistikk brukes internt i Eventyrfestningen for analyse
                    og rapportering. Vi deler ikke data med tredjeparter for
                    markedsføringsformål.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    Teknisk drift og lagring skjer hos leverandører som:
                  </p>
                  <ul className="mt-2 text-white/70 list-disc list-inside space-y-1.5">
                    <li>Vercel (hosting og anonym webanalyse)</li>
                    <li>Appwrite (lagring av aggregert statistikk)</li>
                  </ul>
                  <p className="mt-3 text-white/70 text-sm">
                    Tilgangen til systemene er begrenset til et fåtall autoriserte
                    personer. All kommunikasjon skjer over krypterte forbindelser
                    (HTTPS), og vi lagrer ikke data som kan identifisere
                    enkeltpersoner.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Rettigheter og kontakt */}
            <motion.div
              variants={fadeItem}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-xl">
                  <ShieldCheck className="h-6 w-6 text-gold-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-display text-white mb-2">
                    Dine rettigheter og kontakt
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-3">
                    Selv om vi ikke lagrer identifiserbare personopplysninger,
                    har du rettigheter etter personvernregelverket. Du kan blant
                    annet:
                  </p>
                  <ul className="text-white/70 list-disc list-inside space-y-2">
                    <li>be om informasjon om hvordan vi bruker anonym statistikk</li>
                    <li>protestere mot behandling basert på berettiget interesse</li>
                    <li>
                      be om at eventuelle data som kan knyttes til din bruk, slettes
                      så langt det er teknisk mulig
                    </li>
                  </ul>
                  <p className="mt-3 text-white/70 leading-relaxed">
                    Dersom du mener vår behandling av opplysninger bryter med
                    regelverket, kan du klage til{" "}
                    <a
                      href="https://www.datatilsynet.no"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gold-300 underline-offset-4 hover:underline"
                    >
                      Datatilsynet
                    </a>
                    .
                  </p>
                  <p className="mt-3 text-white/70 leading-relaxed">
                    For spørsmål om personvern eller for å utøve dine rettigheter,
                    kan du kontakte oss på{" "}
                    <a
                      href="mailto:kontakt@eventyrfestningen.no"
                      className="text-gold-300 underline-offset-4 hover:underline"
                    >
                      kontakt@eventyrfestningen.no
                    </a>
                    .
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
