// src/components/volunteer/steps/VolunteerConfirmationStep.tsx
import { motion } from 'framer-motion';
import { CheckCircle2, Heart, Mail, ArrowRight } from 'lucide-react';
import { useVolunteer } from '@/contexts/VolunteerContext';
import { Button } from '@/components/ui/Button';

// ─── Stagger helpers ──────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const stagger = (delay: number) => ({
  transition: { delay, duration: 0.35, ease: 'easeOut' as const },
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function VolunteerConfirmationStep() {
  const { state } = useVolunteer();
  const { fornavn, epost } = state.data.info;
  const refId = state.submittedDocumentId
    ? state.submittedDocumentId.slice(-8).toUpperCase()
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center"
    >
      {/* ── Success icon ── */}
      <div className="relative mx-auto mb-8 h-24 w-24">
        <motion.div
          aria-hidden="true"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border border-torch-500/15"
        />
        <motion.div
          aria-hidden="true"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.45, ease: 'easeOut' }}
          className="absolute inset-2 rounded-full border border-torch-500/25"
        />
        <motion.div
          aria-hidden="true"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 280, damping: 18 }}
          className="absolute inset-4 flex items-center justify-center rounded-full bg-torch-500/10"
        >
          <CheckCircle2
            className="h-9 w-9 text-torch-400"
            strokeWidth={1.5}
          />
        </motion.div>
      </div>

      {/* ── Heading ── */}
      <motion.div {...fadeUp} {...stagger(0.2)} className="mb-8">
        <h2 className="h2 text-gold-400 mb-3">
          Tusen takk, {fornavn}!
        </h2>
        <p className="mx-auto max-w-sm font-sans text-sm leading-relaxed text-white/65">
          Vi har mottatt påmeldingen din og gleder oss til å høre fra deg.
          Vi sender en bekreftelse til{' '}
          <span className="font-semibold text-white/85">{epost}</span>{' '}
          når vi har behandlet påmeldingen.
        </p>
        {refId && (
          <p className="mt-3 text-sm font-sans text-white/80 font-bold tracking-wide">
            Referanse: #{refId}
          </p>
        )}
      </motion.div>

      {/* ── Info sections ── */}
      <motion.div
        {...fadeUp}
        {...stagger(0.35)}
        className="text-left flex flex-col gap-6"
      >
        {/* What happens next */}
        <div>
          <p className="eyebrow text-[10px] text-torch-500/70 mb-3">
            Hva skjer nå?
          </p>
          <ul className="flex flex-col gap-2.5">
            {[
              'Vi gjennomgår alle påmeldinger og setter opp grupper',
              'Du mottar en e-post med mer informasjon om din rolle',
              'Det arrangeres et informasjonsmøte for alle frivillige',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-sans text-white/70">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-torch-500/60"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/6" aria-hidden="true" />

        {/* Contact */}
        <div>
          <p className="eyebrow text-[10px] text-torch-500/70 mb-3">
            Spørsmål?
          </p>
          <a
            href="mailto:frivillig@eventyrfestningen.no"
            className="group inline-flex items-center gap-2.5 text-sm font-sans text-white/65 transition-colors hover:text-torch-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torch-500 rounded"
          >
            <Mail
              className="h-4 w-4 shrink-0 text-torch-500/40 transition-colors group-hover:text-torch-400"
              aria-hidden="true"
            />
            frivillig@eventyrfestningen.no
          </a>
        </div>
      </motion.div>

      {/* ── Footer ── */}
      <motion.div {...fadeUp} {...stagger(0.5)} className="mt-8 flex flex-col items-center gap-4">
        <p className="flex items-center gap-1.5 text-xs font-sans text-white/40">
          <Heart className="h-3 w-3 text-burgundy-500/70" aria-hidden="true" />
          Takk for at du bidrar til magien på Kongsvinger Festning
        </p>

        <Button asChild variant="ghost" size="sm">
          <a href="/">
            Tilbake til forsiden
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
}
