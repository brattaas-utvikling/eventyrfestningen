// src/types/volunteer.ts

// ─── Role definitions ────────────────────────────────────────────────────────

export type VolunteerRole =
  | 'opprigg-nedrigg'
  | 'snekring-scenografi'
  | 'kjore-henteoppdrag'
  | 'solskinnsgruppe'
  | 'publikumsvert'
  | 'parkeringsvakt'
  | 'backstage'
  | 'rydding-vasking'
  | 'salg-merch-mat'
  | 'maling'
  | 'soldat-for-en-dag'
  | 'vasking-kostymer'
  | 'annet';

export interface VolunteerRoleOption {
  id: VolunteerRole;
  label: string;
  description: string;
}

export const VOLUNTEER_ROLES: VolunteerRoleOption[] = [
  {
    id: 'opprigg-nedrigg',
    label: 'Opprigg/nedrigg',
    description: 'Hjelp til å sette opp og rive ned scenen',
  },
  {
    id: 'snekring-scenografi',
    label: 'Snekring av scenografi',
    description: 'Bygging og konstruksjon av scenografi og rekvisitter',
  },
  {
    id: 'kjore-henteoppdrag',
    label: 'Kjøre- og henteoppdrag',
    description: 'Transport av utstyr, materiell og folk',
  },
  {
    id: 'solskinnsgruppe',
    label: 'Solskinnsgruppen',
    description:
      'Bake boller og koke kaffe for skuespillere og produksjon',
  },
  {
    id: 'publikumsvert',
    label: 'Publikumsvert',
    description: 'Ta imot og veilede publikum i forkant og under forestillingene',
  },
  {
    id: 'parkeringsvakt',
    label: 'Parkeringsvakt',
    description: 'Veilede og hjelpe publikum til riktig parkering',
  },
  {
    id: 'backstage',
    label: 'Backstage under forestilling',
    description: 'Praktisk støtte og hjelp backstage når det spilles',
  },
  {
    id: 'rydding-vasking',
    label: 'Rydding, vasking og sjauing',
    description: 'Renhold og rydding før, under og etter forestillingsperioden',
  },
  {
    id: 'salg-merch-mat',
    label: 'Salg av merch og mat',
    description: 'Kiosk- og butikksalg under forestillingene',
  },
  {
    id: 'soldat-for-en-dag',
    label: 'Publikumsvert – «Soldat for en dag»',
    description: 'Spesiell publikumsvert for «Soldat for en dag»',
  },
  {
    id: 'vasking-kostymer',
    label: 'Vasking av kostymer',
    description: 'Vask, stell og vedlikehold av kostymer',
  },
  {
    id: 'maling',
    label: 'Maling',
    description: 'Både scenografi, kiosk og skilt',
  },
  {
    id: 'annet',
    label: 'Annet',
    description: 'Noe annet du brenner for og ønsker å bidra med',
  },
];

// ─── Data model ──────────────────────────────────────────────────────────────

export interface VolunteerInfo {
  fornavn: string;
  etternavn: string;
  epost: string;
  telefon: string;
  adresse: string;
  postnummer: string;
}

export interface VolunteerData {
  info: VolunteerInfo;
  selectedRoles: VolunteerRole[];
  annetBeskrivelse: string;
  notat: string;
  vilkaarAkseptert: boolean;
  vilkaarAkseptertTidspunkt: string | null;
}

// ─── Wizard step ─────────────────────────────────────────────────────────────

export type VolunteerStep =
  | 'personlig-info'
  | 'roller'
  | 'oppsummering'
  | 'bekreftelse';

export const VOLUNTEER_STEPS: { id: VolunteerStep; label: string }[] = [
  { id: 'personlig-info', label: 'Personlig info' },
  { id: 'roller', label: 'Dine roller' },
  { id: 'oppsummering', label: 'Oppsummering' },
  { id: 'bekreftelse', label: 'Bekreftet' },
];

// ─── State / Actions ─────────────────────────────────────────────────────────

export interface VolunteerState {
  currentStep: VolunteerStep;
  data: VolunteerData;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  submittedDocumentId: string | null;
}

export type VolunteerAction =
  | { type: 'SET_STEP'; payload: VolunteerStep }
  | { type: 'SET_INFO'; payload: VolunteerInfo }
  | { type: 'SET_ROLES'; payload: VolunteerRole[] }
  | { type: 'SET_ANNET_BESKRIVELSE'; payload: string }
  | { type: 'SET_NOTAT'; payload: string }
  | { type: 'SET_VILKAAR'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_SUBMIT_ERROR'; payload: string | null }
  | { type: 'SET_SUBMIT_SUCCESS'; payload: string };

// ─── Validation ──────────────────────────────────────────────────────────────

export interface ValidationErrors {
  [key: string]: string | undefined;
}
