// src/components/privacy/PrivacyPolicyContent.tsx
// Gjenbrukbar komponent — brukes i modal og på /personvern-siden

interface Section {
  title: string;
  content: React.ReactNode;
}

function PolicySection({ title, content }: Section) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-sans text-sm font-semibold text-white/80">{title}</h3>
      <div className="font-sans text-sm leading-relaxed text-white/50">{content}</div>
    </section>
  );
}

function Divider() {
  return <div className="h-px bg-white/6" aria-hidden="true" />;
}

export function PrivacyPolicyContent() {
  return (
    <div className="flex flex-col gap-5">

      <div>
        <p className="eyebrow mb-1 text-[10px] text-torch-500/70">Frivilligpåmelding</p>
        <p className="font-sans text-xs leading-relaxed text-white/40">
          Sist oppdatert: 2026
        </p>
      </div>

      <Divider />

      <PolicySection
        title="Behandlingsansvarlig"
        content={
          <p>
            Eventyrfestningen er behandlingsansvarlig for
            opplysningene du oppgir ved påmelding som frivillig.
            Kontakt oss på{' '}
            <a
              href="mailto:frivillig@eventyrfestningen.no"
              className="text-torch-400 underline underline-offset-2 hover:text-torch-300 hover:pointer"
            >
              frivillig@eventyrfestningen.no
            </a>{' '}
            ved spørsmål.
          </p>
        }
      />

      <Divider />

      <PolicySection
        title="Hvilke opplysninger samles inn"
        content={
          <ul className="flex flex-col gap-1 pl-3">
            {[
              'Fornavn og etternavn',
              'E-postadresse',
              'Telefonnummer',
              'Gateadresse og postnummer',
              'Valgte frivilligroller og eventuelle kommentarer du oppgir',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-torch-500/50"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        }
      />

      <Divider />

      <PolicySection
        title="Formål"
        content={
          <p>
            Opplysningene brukes utelukkende til å koordinere frivilligarbeid under
            Eventyrfestningen — herunder å ta kontakt om rolle, oppmøtetidspunkt
            og praktisk informasjon knyttet til forestillingen.
          </p>
        }
      />

      <Divider />

      <PolicySection
        title="Rettslig grunnlag"
        content={
          <p>
            Behandlingen er basert på ditt samtykke, jf. GDPR artikkel 6 nr. 1
            bokstav a. Du kan trekke tilbake samtykket ditt når som helst ved å
            kontakte oss — dette påvirker ikke lovligheten av behandlingen som
            har skjedd forut for tilbaketrekkingen.
          </p>
        }
      />

      <Divider />

      <PolicySection
        title="Lagringstid"
        content={
          <p>
            Opplysningene lagres så lenge de er nødvendige for å gjennomføre
            frivilligarbeidet, og slettes senest <strong className="text-white/65">3 måneder
            etter at forestillingen er avsluttet</strong>.
          </p>
        }
      />

      <Divider />

      <PolicySection
        title="Deling med tredjepart"
        content={
          <p>
            Opplysningene deles ikke med tredjepart. De er kun tilgjengelige
            for arrangøren internt.
          </p>
        }
      />


      <Divider />

      <PolicySection
        title="Kontakt"
        content={
          <p>
            For henvendelser om personvern, innsyn eller sletting — send e-post til{' '}
            <a
              href="mailto:frivillig@eventyrfestningen.no"
              className="text-torch-400 underline underline-offset-2 hover:text-torch-300"
            >
              frivillig@eventyrfestningen.no
            </a>
            .
          </p>
        }
      />

    </div>
  );
}
