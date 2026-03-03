// src/pages/Privacy.tsx
import { motion } from "framer-motion";
import { ShieldCheck, Eye, UserX, Database, Lock, MonitorOff } from "lucide-react";
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
      <SEOHead
        title="Personvernerklæring"
        description="Les hvordan Eventyrfestningen behandler anonym bruksstatistikk på nettsiden. Ingen cookies til sporing, ingen IP-lagring og ingen deling med tredjepart for markedsføring."
        type="website"
      />

      {/* HERO */}
      <Section background="cynical" paddingY="tight">
        <Container>
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold mb-4 text-white">
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

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative min-w-0"
            >
              <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-7 overflow-hidden">
                <div className="absolute -top-16 -right-10 h-40 w-40 rounded-full bg-gold-400/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-torch-500/10 blur-3xl" />

                <div className="relative flex flex-col gap-3 sm:gap-4">
                  <div className="inline-flex items-center gap-2 sm:gap-3 rounded-xl bg-black/20 px-3 sm:px-4 py-2 border border-white/10 self-start">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-gold-300 shrink-0" />
                    <span className="text-[0.65rem] sm:text-xs font-medium uppercase tracking-wide text-white/80">
                      Ingen cookies til sporing
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl lg:text-2xl font-sans font-semibold text-white">
                    Bygget for trygg og moderne analyse
                  </h2>
                  <p className="text-sm text-white/70">
                    Vi bruker anonym statistikk for å forstå hva som fungerer på
                    siden – ikke for å følge enkeltpersoner. Ingen Google Analytics,
                    ingen sporing på tvers av nettsteder.
                  </p>

                  <ul className="mt-1 sm:mt-2 space-y-2 text-sm text-white/75">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-300 shrink-0" />
                      <span>IP-adresser brukes kun teknisk i øyeblikket og lagres ikke.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-300 shrink-0" />
                      <span>Data lagres kun som anonym og aggregert statistikk.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-300 shrink-0" />
                      <span>Ingen deling med tredjepart for markedsføring.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-300 shrink-0" />
                      <span>Do Not Track og Global Privacy Control respekteres.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* INNHOLD */}
      <Section background="cynical">
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
              className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:block p-3 bg-white/10 rounded-xl shrink-0">
                  <ShieldCheck className="h-6 w-6 text-gold-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-sans text-white mb-2">
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
                      922 938 768
                    </p>
                    <p>
                      <span className="font-semibold">Adresse:</span>{" "}
                      Kongsvinger festning 2, 2213 Kongsvinger
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
              className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:block p-3 bg-white/10 rounded-xl shrink-0">
                  <Eye className="h-6 w-6 text-gold-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-sans text-white mb-2">
                    Hvilke opplysninger vi behandler
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    Vi samler kun inn anonym bruksstatistikk for å forstå hvordan
                    nettsiden brukes. Ingen av opplysningene kan knyttes til
                    enkeltpersoner. Dette kan blant annet være:
                  </p>
                  <ul className="mt-3 space-y-2 text-white/70 list-disc list-inside">
                    <li>Hvilke sider som besøkes og i hvilken rekkefølge</li>
                    <li>Scroll-dybde og navigasjon på siden</li>
                    <li>Klikk på viktige knapper (som «Kjøp billetter»)</li>
                    <li>Klikk på sponsorlogoer</li>
                    <li>Kampanjeinformasjon (for eksempel UTM-parametere fra lenker i sosiale medier eller e-post)</li>
                    <li>Grov geografisk informasjon (land, region, by/kommune)</li>
                    <li>Henvisningskilde (for eksempel om du kom fra Google, Facebook eller en direktelenke)</li>
                  </ul>
                  <p className="mt-3 text-white/70 text-sm">
                    Vi samler ikke inn nettleserfingeravtrykk, enhets-IDer,
                    bruker-IDer eller sesjons-IDer. Hver hendelse lagres som en
                    isolert, anonym rad uten kobling til andre hendelser fra
                    samme besøk.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Formål og rettslig grunnlag */}
            <motion.div
              variants={fadeItem}
              className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:block p-3 bg-white/10 rounded-xl shrink-0">
                  <Database className="h-6 w-6 text-gold-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-sans text-white mb-2">
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
                    <li>forstå den geografiske spredningen av publikum</li>
                  </ul>
                  <p className="mt-4 text-white/70 leading-relaxed">
                    Behandlingen skjer etter GDPR artikkel 6 nr. 1 bokstav f –{" "}
                    <span className="italic">berettiget interesse</span>. Vår
                    berettigede interesse er å drifte, forbedre og videreutvikle
                    nettsiden, samt dokumentere sponsorverdi og forstå hvor
                    publikum kommer fra. Vi har vurdert at denne interessen veier
                    tyngre enn personvernulempen, siden dataene er anonyme og
                    ikke kan spores tilbake til enkeltpersoner.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Teknisk behandling, lagring og cookies */}
            <motion.div
              variants={fadeItem}
              className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:block p-3 bg-white/10 rounded-xl shrink-0">
                  <Lock className="h-6 w-6 text-gold-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-sans text-white mb-2">
                    Teknisk behandling, lagring og cookies
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    Løsningen vår er bygget for å minimere behandling av
                    personopplysninger:
                  </p>
                  <ul className="mt-3 text-white/70 list-disc list-inside space-y-2">
                    <li>
                      IP-adresser brukes kun midlertidig i serverens arbeidsminne
                      for å beregne grov geolokasjon (land, region, by/kommune)
                      via MaxMind GeoLite2 – en lokal database som ikke sender
                      data til tredjeparter. IP-adressen lagres aldri til disk
                      eller database.
                    </li>
                    <li>
                      Geografisk informasjon lagres kun som stedsnavn (for
                      eksempel «Innlandet», «Norway»), ikke som IP-adresse.
                    </li>
                    <li>
                      Hendelser (som sidevisninger, klikk og scroll-dybde)
                      lagres i inntil{" "}
                      <span className="font-semibold">24 måneder</span> for å
                      kunne analysere utvikling over tid og sesongvariasjoner.
                    </li>
                    <li>
                      Vi bruker ikke cookies til analyse eller sporing, og har
                      derfor ikke cookie-banner.
                    </li>
                    <li>
                      Hendelser samles i nettleseren og sendes samlet (i grupper)
                      til serveren, ikke enkeltvis per handling.
                    </li>
                  </ul>
                  <p className="mt-3 text-white/70 text-sm">
                    Vi bruker ikke Google Analytics, Meta Pixel eller tilsvarende
                    tredjeparts sporingsverktøy for markedsføring.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Reservasjon (Do Not Track) */}
            <motion.div
              variants={fadeItem}
              className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:block p-3 bg-white/10 rounded-xl shrink-0">
                  <MonitorOff className="h-6 w-6 text-gold-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-sans text-white mb-2">
                    Slik reserverer du deg
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-3">
                    Du kan enkelt reservere deg mot all innsamling av
                    bruksstatistikk ved å aktivere{" "}
                    <span className="font-semibold text-white/90">
                      Do Not Track (DNT)
                    </span>{" "}
                    eller{" "}
                    <span className="font-semibold text-white/90">
                      Global Privacy Control (GPC)
                    </span>{" "}
                    i nettleseren din. Når ett av disse signalene er aktivt,
                    sender nettsiden ingen bruksdata overhodet – heller ikke
                    anonyme hendelser.
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    De fleste moderne nettlesere støtter Do Not Track. Du finner
                    innstillingen under personvern eller sikkerhet i
                    nettleserens innstillinger. Firefox, Brave og DuckDuckGo har
                    dette aktivert som standard eller tilgjengelig med ett klikk.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Deling og sikkerhet */}
            <motion.div
              variants={fadeItem}
              className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:block p-3 bg-white/10 rounded-xl shrink-0">
                  <UserX className="h-6 w-6 text-gold-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-sans text-white mb-2">
                    Deling av opplysninger og sikkerhet
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-3">
                    Anonym statistikk brukes internt i Eventyrfestningen for
                    analyse og rapportering. Vi deler ikke data med tredjeparter
                    for markedsføringsformål.
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    Teknisk drift og lagring skjer hos følgende leverandører:
                  </p>
                  <ul className="mt-2 text-white/70 list-disc list-inside space-y-1.5">
                    <li>
                      <span className="font-semibold">Vercel</span> – hosting
                      av nettsiden og anonym webanalyse (Vercel Analytics)
                    </li>
                    <li>
                      <span className="font-semibold">Appwrite Cloud</span> –
                      lagring av anonym hendelsesstatistikk og
                      skjemahåndtering
                    </li>
                    <li>
                      <span className="font-semibold">MaxMind GeoLite2</span> –
                      lokal geolokasjonsdatabase som kjører på vår egen server.
                      Ingen data sendes til MaxMind
                    </li>
                  </ul>
                  <p className="mt-3 text-white/70 text-sm">
                    Tilgangen til systemene er begrenset til et fåtall
                    autoriserte personer. All kommunikasjon skjer over krypterte
                    forbindelser (HTTPS), og vi lagrer ikke data som kan
                    identifisere enkeltpersoner.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Rettigheter og kontakt */}
            <motion.div
              variants={fadeItem}
              className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:block p-3 bg-white/10 rounded-xl shrink-0">
                  <ShieldCheck className="h-6 w-6 text-gold-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-sans text-white mb-2">
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
                      be om at eventuelle data som kan knyttes til din bruk,
                      slettes så langt det er teknisk mulig
                    </li>
                    <li>
                      reservere deg mot all innsamling ved å aktivere Do Not
                      Track eller Global Privacy Control i nettleseren
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
                    For spørsmål om personvern eller for å utøve dine
                    rettigheter, kan du kontakte oss på{" "}
                    <a
                      href="mailto:teknisk@eventyrfestningen.no"
                      className="text-gold-300 underline-offset-4 hover:underline"
                    >
                      teknisk@eventyrfestningen.no
                    </a>
                    .
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sist oppdatert */}
            <motion.div variants={fadeItem}>
              <p className="text-sm text-white/40 text-center pt-4">
                Denne personvernerklæringen ble sist oppdatert 4. mars 2026.
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}