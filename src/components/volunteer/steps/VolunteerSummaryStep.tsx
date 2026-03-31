// src/components/volunteer/steps/VolunteerSummaryStep.tsx
import { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, User, Mail, Phone, MapPin, Tag, MessageSquare, Loader2, WifiOff, AlertCircle } from 'lucide-react';
import { useVolunteer } from '@/contexts/VolunteerContext';
import {
  submitVolunteer,
  VolunteerAlreadyExistsError,
  VolunteerNetworkError,
  VolunteerRateLimitError,
  VolunteerServerError,
} from '@/services/volunteerService';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { PrivacyPolicyContent } from '@/components/privacy/PrivacyPolicyContent';
import { VOLUNTEER_ROLES, type VolunteerRole } from '@/types/volunteer';


// ─── Summary row ──────────────────────────────────────────────────────────────

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-white/6 last:border-0">
      <span className="mt-0.5 text-torch-500/70" aria-hidden="true">
        {icon}
      </span>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs font-sans font-medium uppercase tracking-wider text-white/35">
          {label}
        </span>
        <span className="font-sans text-sm text-white/85 break-words">{value}</span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function VolunteerSummaryStep() {
  const { state, dispatch, goToPrevStep } = useVolunteer();
  const { data } = state;

  const [isPending, startTransition] = useTransition();
  const [vilkaarError, setVilkaarError] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [errorType, setErrorType] = useState<'network' | 'ratelimit' | 'server' | 'generic' | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Resolve role labels
  const roleLabels = data.selectedRoles
    .map((id: VolunteerRole) => VOLUNTEER_ROLES.find((r) => r.id === id)?.label ?? id)
    .join(', ');

  const handleVilkaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_VILKAAR', payload: e.target.checked });
    if (e.target.checked) setVilkaarError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.vilkaarAkseptert) {
      setVilkaarError(true);
      return;
    }

    // useTransition (React 19) setter isPending=true synkront og umiddelbart,
    // slik at loading-state garantert rendres før nettverkskallet starter
    startTransition(async () => {
      setAlreadyExists(false);
      setErrorType(null);
      dispatch({ type: 'SET_SUBMIT_ERROR', payload: null });

      try {
        const result = await submitVolunteer(data);
        dispatch({ type: 'SET_SUBMIT_SUCCESS', payload: result.documentId });
        dispatch({ type: 'SET_STEP', payload: 'bekreftelse' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        if (err instanceof VolunteerAlreadyExistsError) {
          setAlreadyExists(true);
          return;
        }
        if (err instanceof VolunteerNetworkError) {
          setErrorType('network');
        } else if (err instanceof VolunteerRateLimitError) {
          setErrorType('ratelimit');
        } else if (err instanceof VolunteerServerError) {
          setErrorType('server');
        } else {
          setErrorType('generic');
        }
        const message =
          err instanceof Error
            ? err.message
            : 'Noe gikk galt. Prøv igjen eller ta kontakt med oss.';
        dispatch({ type: 'SET_SUBMIT_ERROR', payload: message });
      }
    });
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-8">
        <p className="eyebrow text-torch-500 mb-2">Steg 3 av 4</p>
        <h2 className="h2 text-gold-400">Se over og bekreft</h2>
        <p className="font-sans text-sm text-white/50 leading-relaxed mt-2">
          Kontroller at informasjonen stemmer før du sender inn påmeldingen.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className={isPending ? 'opacity-40 pointer-events-none transition-opacity duration-300' : 'transition-opacity duration-300'}
      >
        {/* Personal info summary */}
        <section
          aria-labelledby="summary-kontakt"
          className="mb-4 overflow-hidden rounded-xl border border-white/8 bg-cynical-800/30"
        >
          <div className="border-b border-white/6 px-5 py-3.5">
            <h3
              id="summary-kontakt"
              className="eyebrow text-[10px] text-torch-500/70 flex items-center gap-2"
            >
              <User className="h-3.5 w-3.5" aria-hidden="true" />
              Kontaktinformasjon
            </h3>
          </div>
          <div className="px-5 py-1">
            <SummaryRow
              icon={<User className="h-4 w-4" />}
              label="Navn"
              value={`${data.info.fornavn} ${data.info.etternavn}`}
            />
            <SummaryRow
              icon={<Mail className="h-4 w-4" />}
              label="E-post"
              value={data.info.epost}
            />
            <SummaryRow
              icon={<Phone className="h-4 w-4" />}
              label="Telefon"
              value={data.info.telefon}
            />
            <SummaryRow
              icon={<MapPin className="h-4 w-4" />}
              label="Adresse"
              value={`${data.info.adresse}, ${data.info.postnummer}`}
            />
          </div>
        </section>

        {/* Roles summary */}
        <section
          aria-labelledby="summary-roller"
          className="mb-4 overflow-hidden rounded-xl border border-white/8 bg-cynical-800/30"
        >
          <div className="border-b border-white/6 px-5 py-3.5">
            <h3
              id="summary-roller"
              className="eyebrow text-[10px] text-torch-500/70 flex items-center gap-2"
            >
              <Tag className="h-3.5 w-3.5" aria-hidden="true" />
              Valgte roller
            </h3>
          </div>
          <div className="px-5 py-1">
            <SummaryRow
              icon={<Tag className="h-4 w-4" />}
              label="Roller"
              value={roleLabels}
            />
            {data.annetBeskrivelse && (
              <SummaryRow
                icon={<MessageSquare className="h-4 w-4" />}
                label="Annet — beskrivelse"
                value={data.annetBeskrivelse}
              />
            )}
            {data.notat && (
              <SummaryRow
                icon={<MessageSquare className="h-4 w-4" />}
                label="Kommentar"
                value={data.notat}
              />
            )}
          </div>
        </section>

        {/* Terms */}
        <div
          className={cn(
            'mb-6 rounded-xl border p-5 transition-colors',
            vilkaarError
              ? 'border-burgundy-500/50 bg-burgundy-500/5'
              : 'border-white/10 bg-white/2'
          )}
        >
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={data.vilkaarAkseptert}
              onChange={handleVilkaarChange}
              className="mt-0.5 h-4 w-4 rounded border-white/25 bg-cynical-900 accent-torch-500 cursor-pointer"
              aria-describedby={vilkaarError ? 'vilkaar-error' : undefined}
              aria-invalid={vilkaarError}
            />
            <span className="text-sm font-sans text-white/70 leading-relaxed">
              Jeg samtykker til at Eventyrfestningen lagrer mine kontaktopplysninger
              for å kunne ta kontakt angående frivilligarbeid. Opplysningene brukes
              kun til dette formålet og deles ikke med tredjepart.{' '}
              <button
                type="button"
                onClick={() => setShowPrivacy(true)}
                className="text-torch-400 underline underline-offset-2 hover:text-torch-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torch-500 rounded cursor-pointer"
              >
                Les personvernerklæringen
              </button>
              .
            </span>
          </label>
          {vilkaarError && (
            <p
              id="vilkaar-error"
              role="alert"
              className="mt-2 ml-7 text-xs font-sans text-burgundy-400"
            >
              Du må godta vilkårene for å sende inn påmeldingen.
            </p>
          )}
        </div>

        {/* Already exists error */}
        {alreadyExists && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-lg border border-gold-500/30 bg-gold-500/8 px-4 py-4"
          >
            <p className="text-sm font-sans font-semibold text-gold-300 mb-1">
              E-postadressen er allerede registrert
            </p>
            <p className="text-sm font-sans text-white/60 mb-3">
              <strong className="text-white/80">{data.info.epost}</strong> er allerede
              meldt på som frivillig. Har du glemt det, eller ønsker du å bruke en
              annen e-postadresse?
            </p>
            <button
              type="button"
              onClick={() => dispatch({ type: 'SET_STEP', payload: 'personlig-info' })}
              className="text-sm font-sans font-medium text-gold-400 underline underline-offset-2 hover:text-gold-300"
            >
              Endre e-postadresse
            </button>
          </motion.div>
        )}

        {/* Submit error */}
        {state.submitError && errorType && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-lg border border-burgundy-500/40 bg-burgundy-500/10 px-4 py-4"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-burgundy-400" aria-hidden="true">
                {errorType === 'network'
                  ? <WifiOff className="h-4 w-4" />
                  : <AlertCircle className="h-4 w-4" />}
              </span>
              <div>
                <p className="text-sm font-sans font-semibold text-burgundy-300 mb-0.5">
                  {errorType === 'network' && 'Ingen nettilkobling'}
                  {errorType === 'ratelimit' && 'For mange forsøk'}
                  {errorType === 'server' && 'Tjenesten er utilgjengelig'}
                  {errorType === 'generic' && 'Noe gikk galt'}
                </p>
                <p className="text-sm font-sans text-white/55">
                  {state.submitError}
                  {(errorType === 'network' || errorType === 'server') && (
                    <> Påmeldingen din er <strong className="text-white/70">ikke</strong> sendt inn.</>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={goToPrevStep}
            disabled={isPending}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Button>

          <Button
            type="submit"
            variant="torch"
            withShine
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sender inn…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" aria-hidden="true" />
                Send inn påmelding
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Inline loading state */}
      {isPending && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mt-6 flex items-center justify-center gap-2.5"
          aria-live="polite"
        >
          <Loader2 className="h-4 w-4 animate-spin text-torch-400" aria-hidden="true" />
          <span className="text-sm font-sans text-white/50">Sender inn påmeldingen din…</span>
        </motion.div>
      )}

      {/* Privacy policy modal */}
      <Modal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Personvernerklæring"
      >
        <PrivacyPolicyContent />
      </Modal>
    </div>
  );
}
