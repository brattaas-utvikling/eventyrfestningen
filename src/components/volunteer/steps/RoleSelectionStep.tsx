// src/components/volunteer/steps/RoleSelectionStep.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useVolunteer } from '@/contexts/VolunteerContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { VOLUNTEER_ROLES, type VolunteerRole } from '@/types/volunteer';

// ─── Role Card ────────────────────────────────────────────────────────────────

interface RoleCardProps {
  id: VolunteerRole;
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}

function RoleCard({ id, label, description, checked, onToggle }: RoleCardProps) {
  return (
    <motion.label
      htmlFor={`role-${id}`}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      className={cn(
        'relative flex cursor-pointer select-none flex-col gap-2 rounded-xl border p-4 transition-all duration-200',
        checked
          ? [
              'border-torch-500/50 bg-torch-500/5',
              'shadow-[0_0_0_1px_rgba(255,161,35,0.15),0_4px_20px_rgba(255,161,35,0.06)]',
            ]
          : [
              'border-white/8 bg-cynical-800/30',
              'hover:border-white/15 hover:bg-cynical-800/50',
            ]
      )}
    >
      {/* Hidden checkbox */}
      <input
        id={`role-${id}`}
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="sr-only"
        aria-label={label}
      />

      {/* Header row: label + checkbox */}
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'text-sm font-semibold font-sans leading-snug transition-colors duration-150',
            checked ? 'text-torch-300' : 'text-white/80'
          )}
        >
          {label}
        </span>

        {/* Visual checkbox */}
        <span
          aria-hidden="true"
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-150',
            checked
              ? 'border-torch-500 bg-torch-500'
              : 'border-white/20 bg-transparent'
          )}
        >
          <AnimatePresence initial={false}>
            {checked && (
              <motion.svg
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15, ease: 'backOut' }}
                className="h-3 w-3 text-cynical-900"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="2,6 5,9 10,3" />
              </motion.svg>
            )}
          </AnimatePresence>
        </span>
      </div>

      {/* Description */}
      <p className="text-xs font-sans leading-relaxed text-white/35">
        {description}
      </p>
    </motion.label>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RoleSelectionStep() {
  const {
    state,
    setRoles,
    setAnnetBeskrivelse,
    setNotat,
    goToNextStep,
    goToPrevStep,
  } = useVolunteer();

  const [selected, setSelected] = useState<Set<VolunteerRole>>(
    new Set(state.data.selectedRoles)
  );
  const [annetText, setAnnetText] = useState(state.data.annetBeskrivelse);
  const [notatText, setNotatText] = useState(state.data.notat);
  const [showRoleError, setShowRoleError] = useState(false);
  const [showAnnetError, setShowAnnetError] = useState(false);

  const hasAnnet = selected.has('annet');

  useEffect(() => {
    if (selected.size > 0) setShowRoleError(false);
  }, [selected]);

  useEffect(() => {
    if (annetText.trim()) setShowAnnetError(false);
  }, [annetText]);

  const toggleRole = (roleId: VolunteerRole) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(roleId)) {
        next.delete(roleId);
      } else {
        next.add(roleId);
      }
      return next;
    });
  };

  const handleNext = () => {
    let valid = true;
    if (selected.size === 0) { setShowRoleError(true); valid = false; }
    if (hasAnnet && !annetText.trim()) { setShowAnnetError(true); valid = false; }
    if (!valid) return;

    setRoles(Array.from(selected));
    setAnnetBeskrivelse(annetText.trim());
    setNotat(notatText.trim());
    goToNextStep();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="eyebrow text-torch-500 mb-2 text-xs">Steg 2 av 4</p>
        <h2 className="h2 text-gold-400 mb-2">Hva vil du hjelpe med?</h2>
        <p className="font-sans text-sm text-white/50 leading-relaxed">
          Velg én eller flere oppgaver. Du er ikke bundet til valget ditt — vi
          finner den beste rollen for deg.
        </p>
      </div>

      {/* Role error */}
      <AnimatePresence>
        {showRoleError && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 overflow-hidden rounded-lg border border-burgundy-500/30 bg-burgundy-500/8 px-4 py-3"
          >
            <p className="text-sm font-sans text-burgundy-300">
              Velg minst én rolle for å gå videre.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role grid */}
      <fieldset>
        <legend className="sr-only">Frivillig-roller — velg én eller flere</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {VOLUNTEER_ROLES.map((role) => (
            <RoleCard
              key={role.id}
              id={role.id}
              label={role.label}
              description={role.description}
              checked={selected.has(role.id)}
              onToggle={() => toggleRole(role.id)}
            />
          ))}
        </div>
      </fieldset>

      {/* "Annet" free text */}
      <AnimatePresence>
        {hasAnnet && (
          <motion.div
            key="annet-field"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-5 overflow-hidden"
          >
            <label
              htmlFor="annet-beskrivelse"
              className="mb-1.5 block text-sm font-medium font-sans text-white/80"
            >
              Hva ønsker du å hjelpe til med?{' '}
              <span className="text-torch-500">*</span>
            </label>
            <textarea
              id="annet-beskrivelse"
              rows={3}
              value={annetText}
              onChange={(e) => setAnnetText(e.target.value)}
              placeholder="Fortell oss hva du tenker på…"
              className={cn(
                'w-full resize-none rounded-lg border bg-cynical-700 px-4 py-3',
                'font-sans text-sm text-white placeholder:text-cynical-400',
                'transition-all duration-150 focus:outline-none focus:ring-2',
                showAnnetError
                  ? 'border-burgundy-500/50 focus:border-burgundy-500/80 focus:ring-burgundy-500/30'
                  : 'border-cynical-600 focus:border-torch-500 focus:ring-torch-500/30 hover:border-cynical-500'
              )}
              aria-required="true"
              aria-invalid={showAnnetError}
            />
            {showAnnetError && (
              <motion.p
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs font-sans text-burgundy-400"
              >
                Beskriv hva du ønsker å hjelpe med.
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notat — always visible */}
      <div className="mt-6">
        <div className="flex items-baseline justify-between mb-1.5">
          <label
            htmlFor="notat"
            className="text-sm font-medium font-sans text-white/80"
          >
            Noe vi bør vite om?
          </label>
          <span className="text-[11px] font-sans text-white/25">Valgfritt</span>
        </div>
        <p className="mb-2 text-[11px] font-sans text-white/30 leading-relaxed">
          Allergier, begrensninger, erfaring — hva som helst du tenker er
          relevant.
        </p>
        <textarea
          id="notat"
          rows={3}
          value={notatText}
          onChange={(e) => setNotatText(e.target.value)}
          placeholder="F.eks. «Har god erfaring med snekring» eller «Kan ikke jobbe etter kl. 22»…"
          className={cn(
            'w-full resize-none rounded-lg border border-cynical-600 bg-cynical-700 px-4 py-3',
            'font-sans text-sm text-white placeholder:text-cynical-400',
            'transition-all duration-150 focus:outline-none focus:ring-2',
            'focus:border-torch-500 focus:ring-torch-500/30 hover:border-cynical-500'
          )}
        />
      </div>

      {/* Navigation */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={goToPrevStep}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Tilbake
        </Button>

        <div className="flex items-center gap-3">
          {/* Selection count badge */}
          {selected.size > 0 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hidden sm:inline-flex items-center rounded-full bg-torch-500/12 px-2.5 py-1 text-xs font-semibold font-sans text-torch-400"
            >
              {selected.size} valgt
            </motion.span>
          )}
          <Button variant="torch" withShine onClick={handleNext}>
            Se oppsummering
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
