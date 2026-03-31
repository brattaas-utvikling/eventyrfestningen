// src/services/volunteerService.ts
import { ID, AppwriteException } from 'appwrite';
import { getDatabases, getFunctions } from '@/lib/appwrite';
import type { VolunteerData } from '@/types/volunteer';

export class VolunteerAlreadyExistsError extends Error {
  constructor() {
    super('Denne e-postadressen er allerede registrert som frivillig.');
    this.name = 'VolunteerAlreadyExistsError';
  }
}

export class VolunteerNetworkError extends Error {
  constructor() {
    super('Det ser ut som du er uten nett. Sjekk tilkoblingen og prøv igjen.');
    this.name = 'VolunteerNetworkError';
  }
}

export class VolunteerRateLimitError extends Error {
  constructor() {
    super('For mange forsøk. Vent litt og prøv igjen.');
    this.name = 'VolunteerRateLimitError';
  }
}

export class VolunteerServerError extends Error {
  constructor() {
    super('Tjenesten er midlertidig utilgjengelig. Prøv igjen om litt.');
    this.name = 'VolunteerServerError';
  }
}

const DATABASE_ID = import.meta.env.VITE_APPWRITE_FRIVILLIG_DATABASE_ID as string;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_FRIVILLIG_COLLECTION_ID as string;
const EMAIL_FUNCTION_ID = import.meta.env
  .VITE_APPWRITE_VOLUNTEER_EMAIL_FUNCTION as string;

export interface VolunteerSubmitResult {
  documentId: string;
}

// ─── Submit volunteer to Appwrite ────────────────────────────────────────────
export async function submitVolunteer(
  data: VolunteerData
): Promise<VolunteerSubmitResult> {
  // 1. Lagre i Appwrite-database
  let doc;
  try {
    doc = await getDatabases().createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        fornavn: data.info.fornavn.trim(),
        etternavn: data.info.etternavn.trim(),
        epost: data.info.epost.trim().toLowerCase(),
        telefon: data.info.telefon.trim(),
        adresse: data.info.adresse.trim(),
        postnummer: data.info.postnummer.trim(),
        roller: data.selectedRoles,
        annet_beskrivelse: data.annetBeskrivelse.trim() || null,
        notat: data.notat.trim() || null,
        vilkaar_akseptert: data.vilkaarAkseptert,
        vilkaar_akseptert_tidspunkt: data.vilkaarAkseptertTidspunkt,
        status: 'ny',
      }
    );
  } catch (err) {
    if (err instanceof AppwriteException) {
      if (err.code === 409) throw new VolunteerAlreadyExistsError();
      if (err.code === 429) throw new VolunteerRateLimitError();
      if (err.code >= 500) throw new VolunteerServerError();
      throw new VolunteerServerError();
    }
    // Nettverksfeil: fetch feilet uten HTTP-respons
    if (err instanceof TypeError && err.message.includes('fetch')) {
      throw new VolunteerNetworkError();
    }
    throw err;
  }

  // 2. Send e-postvarsling via Cloud Function (blokkerer IKKE innsending ved feil)
  if (EMAIL_FUNCTION_ID) {
    try {
      await getFunctions().createExecution(
        EMAIL_FUNCTION_ID,
        JSON.stringify({
          documentId: doc.$id,
          navn: `${data.info.fornavn} ${data.info.etternavn}`,
          epost: data.info.epost,
          telefon: data.info.telefon,
          adresse: `${data.info.adresse}, ${data.info.postnummer}`,
          roller: data.selectedRoles,
          annetBeskrivelse: data.annetBeskrivelse || null,
          notat: data.notat || null,
        })
      );
    } catch (emailError) {
      // E-postfeil skal ALDRI hindre lagring av påmeldingen
      console.warn('[volunteerService] E-postvarsling feilet:', emailError);
    }
  }

  return { documentId: doc.$id };
}

// ─── Appwrite Collection Schema (frivillig) ──────────────────────────────────
//
// Opprett manuelt i Appwrite Console → Database → frivillig:
//
// Attributt                   | Type      | Størrelse | Påkrevd | Notat
// --------------------------- | --------- | --------- | ------- | ─────────────────────────────────
// fornavn                     | varchar   | 50        | ✓       | fullt indekserbart
// etternavn                   | varchar   | 50        | ✓       | fullt indekserbart
// epost                       | varchar   | 254       | ✓       | RFC 5321 maks; fullt indekserbart
// telefon                     | varchar   | 20        | ✓       | fullt indekserbart
// adresse                     | varchar   | 150       | ✓       | fullt indekserbart
// postnummer                  | varchar   | 10        | ✓       | fullt indekserbart
// roller                      | varchar[] | 50        | ✗       | array, maks 14 elementer; required valideres i skjemaet (Appwrite kan ikke håndheve ikke-tom array)
// annet_beskrivelse           | text      | –         | ✗       | off-page; prefiks-indeks hvis nødvendig
// notat                       | text      | –         | ✗       | off-page; prefiks-indeks hvis nødvendig
// vilkaar_akseptert           | Boolean   | –         | ✓       |
// vilkaar_akseptert_tidspunkt | varchar   | 50        | ✗       | ISO 8601 datostreng
// status                      | varchar   | 20        | ✗       | default: 'ny'; fullt indekserbart