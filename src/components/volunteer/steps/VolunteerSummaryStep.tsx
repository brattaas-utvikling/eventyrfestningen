// src/components/volunteer/steps/VolunteerSummaryStep.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, User, Mail, Phone, MapPin, Tag, MessageSquare, Loader2 } from 'lucide-react';
import { useVolunteer } from '@/contexts/VolunteerContext';
import { submitVolunteer } from '@/services/volunteerService';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
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
        <span className="font-sans text-sm text-white/85 wrap-break-word">{value}</span>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function VolunteerSummaryStep() {
  const { state, dispatch, goToPrevStep } = useVolunteer();
  const { data } = state;

  const [vilkaarError, setVilkaarError] = useState(false);

  // Resolve role labels
  const roleLabels = data.selectedRoles
    .map((id: VolunteerRole) => VOLUNTEER_ROLES.find((r) => r.id === id)?.label ?? id)
    .join(', ');

  const handleVilkaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_VILKAAR', payload: e.target.checked });
    if (e.target.checked) setVilkaarError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.vilkaarAkseptert) {
      setVilkaarError(true);
      return;
    }

    dispatch({ type: 'SET_SUBMITTING', payload: true });
    dispatch({ type: 'SET_SUBMIT_ERROR', payload: null });

    try {
      const result = await submitVolunteer(data);
      dispatch({ type: 'SET_SUBMIT_SUCCESS', payload: result.documentId });
      // Navigate to confirmation step
      dispatch({ type: 'SET_STEP', payload: 'bekreftelse' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Noe gikk galt. Prøv igjen eller ta kontakt med oss.';
      dispatch({ type: 'SET_SUBMIT_ERROR', payload: message });
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="eyebrow text-torch-500 mb-2">Steg 3 av 4</p>
        <h2 className="h2 text-gold-400">Se over og bekreft</h2>
        <p className="font-sans text-sm text-white/50 leading-relaxed mt-2">
          Kontroller at informasjonen stemmer før du sender inn påmeldingen.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
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
              <a
                href="/personvern"
                target="_blank"
                rel="noopener noreferrer"
                className="text-torch-400 underline underline-offset-2 hover:text-torch-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torch-500 rounded"
              >
                Les personvernerklæringen
              </a>
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

        {/* Submit error */}
        {state.submitError && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-lg border border-burgundy-500/40 bg-burgundy-500/10 px-4 py-3 text-sm font-sans text-burgundy-300"
          >
            <strong className="font-semibold">Feil ved innsending:</strong>{' '}
            {state.submitError}
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={goToPrevStep}
            disabled={state.isSubmitting}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Tilbake
          </Button>

          <Button
            type="submit"
            variant="torch"
            withShine
            disabled={state.isSubmitting}
          >
            {state.isSubmitting ? (
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
    </div>
  );
}
