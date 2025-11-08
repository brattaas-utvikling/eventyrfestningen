// src/lib/appwrite.ts
import { Client, Functions, Databases, ID } from 'appwrite'

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID

// vi lager disse som let, så vi kan la dem være undefined hvis env mangler
let client: Client | null = null
let functions: Functions | null = null
let databases: Databases | null = null

if (endpoint && projectId) {
  // bare sett opp Appwrite hvis vi faktisk har env-variabler
  client = new Client().setEndpoint(endpoint).setProject(projectId)
  functions = new Functions(client)
  databases = new Databases(client)
} else {
  // valgfritt: logg i dev
  if (import.meta.env.DEV) {
    console.warn(
      '[appwrite] VITE_APPWRITE_ENDPOINT eller VITE_APPWRITE_PROJECT_ID mangler. Skjema vil ikke funke.'
    )
  }
}

// typer
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface NewsletterFormData {
  email: string
  name?: string
}

// kontakt-skjema
export async function submitContactForm(data: ContactFormData) {
  if (!functions) {
    throw new Error('Appwrite er ikke konfigurert i miljøvariabler.')
  }

  const fnId = import.meta.env.VITE_APPWRITE_CONTACT_FUNCTION_ID
  if (!fnId) {
    throw new Error('Mangler VITE_APPWRITE_CONTACT_FUNCTION_ID')
  }

  const response = await functions.createExecution(
    fnId,
    JSON.stringify(data),
    false
  )

  return { success: true, data: response }
}

// interesseliste
export async function submitNewsletterForm(data: NewsletterFormData) {
  if (!databases || !functions) {
    throw new Error('Appwrite er ikke konfigurert i miljøvariabler.')
  }

  const dbId = import.meta.env.VITE_APPWRITE_DATABASE_ID
  const collId = import.meta.env.VITE_APPWRITE_NEWSLETTER_COLLECTION_ID
  const fnId = import.meta.env.VITE_APPWRITE_NEWSLETTER_FUNCTION_ID

  if (!dbId || !collId) {
    throw new Error('Mangler database/collection-id for interesseliste.')
  }

  const doc = await databases.createDocument(
    dbId,
    collId,
    ID.unique(),
    {
      email: data.email,
      name: data.name || '',
      subscribedAt: new Date().toISOString(),
      source: 'website',
    }
  )

  // valgfritt: trigge e-post-funksjon
  if (fnId) {
    await functions.createExecution(fnId, JSON.stringify(data), false)
  }

  return { success: true, data: doc }
}
