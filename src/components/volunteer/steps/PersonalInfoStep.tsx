// src/components/volunteer/steps/PersonalInfoStep.tsx
import { useState, useEffect, useId } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Hash, ArrowRight } from 'lucide-react';
import { useVolunteer } from '@/contexts/VolunteerContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import type { ValidationErrors, VolunteerInfo } from '@/types/volunteer';

// ─── Validation ───────────────────────────────────────────────────────────────

const NAME_RE = /^[a-zA-ZæøåÆØÅ\s'-]+$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+47)?[\s-]?[2-9]\d{7}$/;
const POSTNR_RE = /^\d{4}$/;

function validateInfo(info: VolunteerInfo): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!info.fornavn.trim())
    errors.fornavn = 'Fornavn er påkrevd';
  else if (info.fornavn.trim().length < 2)
    errors.fornavn = 'Fornavn må være minst 2 tegn';
  else if (!NAME_RE.test(info.fornavn.trim()))
    errors.fornavn = 'Fornavn kan kun inneholde bokstaver';

  if (!info.etternavn.trim())
    errors.etternavn = 'Etternavn er påkrevd';
  else if (info.etternavn.trim().length < 2)
    errors.etternavn = 'Etternavn må være minst 2 tegn';
  else if (!NAME_RE.test(info.etternavn.trim()))
    errors.etternavn = 'Etternavn kan kun inneholde bokstaver';

  if (!info.epost.trim())
    errors.epost = 'E-post er påkrevd';
  else if (!EMAIL_RE.test(info.epost.trim()))
    errors.epost = 'Skriv en gyldig e-postadresse';

  if (!info.telefon.trim())
    errors.telefon = 'Telefonnummer er påkrevd';
  else if (!PHONE_RE.test(info.telefon.replace(/\s/g, '')))
    errors.telefon = 'Skriv et gyldig norsk telefonnummer (8 siffer)';

  if (!info.adresse.trim())
    errors.adresse = 'Adresse er påkrevd';
  else if (info.adresse.trim().length < 5)
    errors.adresse = 'Skriv full gateadresse';

  if (!info.postnummer.trim())
    errors.postnummer = 'Postnummer er påkrevd';
  else if (!POSTNR_RE.test(info.postnummer.trim()))
    errors.postnummer = 'Postnummer må være 4 siffer';

  return errors;
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

interface FieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

function Field({ id, label, icon, error, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium font-sans text-white/60 tracking-wide"
      >
        {label}
      </label>

      {/* Icon + input wrapper */}
      <div className="relative">
        <span
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 transition-colors duration-150"
          aria-hidden="true"
        >
          {icon}
        </span>
        {children}
      </div>

      {/* Hint text — only when no error */}
      {hint && !error && (
        <p className="text-[11px] font-sans text-white/30 leading-relaxed">
          {hint}
        </p>
      )}

      {/* Error message */}
      {error && (
        <motion.p
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs font-sans text-burgundy-400"
        >
          <span className="inline-block h-1 w-1 rounded-full bg-burgundy-400 flex-shrink-0" aria-hidden="true" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─── Input class ──────────────────────────────────────────────────────────────

const inputClass = (hasError?: string) =>
  cn(
    // Base
    'w-full rounded-lg border bg-cynical-800/50 pl-10 pr-4 py-3',
    'font-sans text-[0.9375rem] text-white',
    'placeholder:text-white/20',
    // Transition
    'transition-all duration-150',
    // Focus
    'focus:outline-none focus:ring-2',
    // State-dependent border + ring
    hasError
      ? 'border-burgundy-500/50 focus:border-burgundy-500/80 focus:ring-burgundy-500/15'
      : 'border-white/8 focus:border-torch-500/60 focus:ring-torch-500/10 hover:border-white/15'
  );

// ─── Section divider ──────────────────────────────────────────────────────────

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-1" aria-hidden="true">
      <div className="h-px flex-1 bg-white/5" />
      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white/20">
        {label}
      </span>
      <div className="h-px flex-1 bg-white/5" />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PersonalInfoStep() {
  const uid = useId();
  const { state, setInfo, goToNextStep } = useVolunteer();

  const [form, setForm] = useState<VolunteerInfo>({
    fornavn: state.data.info.fornavn,
    etternavn: state.data.info.etternavn,
    epost: state.data.info.epost,
    telefon: state.data.info.telefon,
    adresse: state.data.info.adresse,
    postnummer: state.data.info.postnummer,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof VolunteerInfo, boolean>>
  >({});

  useEffect(() => {
    const hasBeenTouched = Object.values(touched).some(Boolean);
    if (hasBeenTouched) setErrors(validateInfo(form));
  }, [form, touched]);

  const handleChange =
    (field: keyof VolunteerInfo) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleBlur = (field: keyof VolunteerInfo) => () =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      (Object.keys(form) as (keyof VolunteerInfo)[]).map((k) => [k, true])
    ) as Record<keyof VolunteerInfo, boolean>;
    setTouched(allTouched);

    const validationErrors = validateInfo(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setInfo(form);
      goToNextStep();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="eyebrow text-torch-500 mb-2 text-xs">Steg 1 av 4</p>
        <h2 className="h2 text-gold-400 mb-2">Hvem er du?</h2>
        <p className="font-sans text-sm text-white/50 leading-relaxed">
          Kontaktinformasjonen brukes kun til å nå deg angående frivilligarbeid.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

        {/* ── Navn ── */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id={`${uid}-fornavn`}
            label="Fornavn"
            icon={<User className="h-4 w-4" />}
            error={touched.fornavn ? errors.fornavn : undefined}
          >
            <input
              id={`${uid}-fornavn`}
              type="text"
              autoComplete="given-name"
              value={form.fornavn}
              onChange={handleChange('fornavn')}
              onBlur={handleBlur('fornavn')}
              placeholder="Ola"
              className={inputClass(touched.fornavn ? errors.fornavn : undefined)}
              aria-invalid={touched.fornavn && !!errors.fornavn}
            />
          </Field>

          <Field
            id={`${uid}-etternavn`}
            label="Etternavn"
            icon={<User className="h-4 w-4" />}
            error={touched.etternavn ? errors.etternavn : undefined}
          >
            <input
              id={`${uid}-etternavn`}
              type="text"
              autoComplete="family-name"
              value={form.etternavn}
              onChange={handleChange('etternavn')}
              onBlur={handleBlur('etternavn')}
              placeholder="Nordmann"
              className={inputClass(touched.etternavn ? errors.etternavn : undefined)}
              aria-invalid={touched.etternavn && !!errors.etternavn}
            />
          </Field>
        </div>

        {/* ── Kontakt ── */}
        <Field
          id={`${uid}-epost`}
          label="E-postadresse"
          icon={<Mail className="h-4 w-4" />}
          error={touched.epost ? errors.epost : undefined}
          hint="Vi sender deg en bekreftelse og holder deg oppdatert om forestillingen."
        >
          <input
            id={`${uid}-epost`}
            type="email"
            autoComplete="email"
            inputMode="email"
            value={form.epost}
            onChange={handleChange('epost')}
            onBlur={handleBlur('epost')}
            placeholder="ola@eventyr.no"
            className={inputClass(touched.epost ? errors.epost : undefined)}
            aria-invalid={touched.epost && !!errors.epost}
          />
        </Field>

        <Field
          id={`${uid}-telefon`}
          label="Telefonnummer"
          icon={<Phone className="h-4 w-4" />}
          error={touched.telefon ? errors.telefon : undefined}
        >
          <input
            id={`${uid}-telefon`}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={form.telefon}
            onChange={handleChange('telefon')}
            onBlur={handleBlur('telefon')}
            placeholder="400 00 000"
            className={inputClass(touched.telefon ? errors.telefon : undefined)}
            aria-invalid={touched.telefon && !!errors.telefon}
          />
        </Field>

        {/* ── Adresse-seksjon ── */}
        <SectionDivider label="Adresse" />

        <Field
          id={`${uid}-adresse`}
          label="Gateadresse"
          icon={<MapPin className="h-4 w-4" />}
          error={touched.adresse ? errors.adresse : undefined}
        >
          <input
            id={`${uid}-adresse`}
            type="text"
            autoComplete="street-address"
            value={form.adresse}
            onChange={handleChange('adresse')}
            onBlur={handleBlur('adresse')}
            placeholder="Storgata 1"
            className={inputClass(touched.adresse ? errors.adresse : undefined)}
            aria-invalid={touched.adresse && !!errors.adresse}
          />
        </Field>

        <Field
          id={`${uid}-postnummer`}
          label="Postnummer"
          icon={<Hash className="h-4 w-4" />}
          error={touched.postnummer ? errors.postnummer : undefined}
        >
          <input
            id={`${uid}-postnummer`}
            type="text"
            autoComplete="postal-code"
            inputMode="numeric"
            maxLength={4}
            value={form.postnummer}
            onChange={handleChange('postnummer')}
            onBlur={handleBlur('postnummer')}
            placeholder="2212"
            className={cn(
              inputClass(touched.postnummer ? errors.postnummer : undefined),
              'max-w-[9rem]'
            )}
            aria-invalid={touched.postnummer && !!errors.postnummer}
          />
        </Field>

        {/* ── Submit ── */}
        <div className="mt-4 flex justify-end">
          <Button type="submit" variant="torch" withShine size="lg">
            Neste steg
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </form>
    </div>
  );
}
