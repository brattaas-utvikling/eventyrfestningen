// src/lib/appwrite.ts
import { Client, Functions, Databases, ID, Query } from 'appwrite';

// Environment variables
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

// Initialize client
let client: Client | null = null;
let functionsInstance: Functions | null = null;
let databasesInstance: Databases | null = null;

if (endpoint && projectId) {
  client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);
  
  functionsInstance = new Functions(client);
  databasesInstance = new Databases(client);
} else {
  if (import.meta.env.DEV) {
    console.warn(
      '[appwrite] VITE_APPWRITE_ENDPOINT eller VITE_APPWRITE_PROJECT_ID mangler. Appwrite-funksjonalitet vil ikke fungere.'
    );
  }
}

// Helper: Get databases instance (throws if not configured)
export function getDatabases(): Databases {
  if (!databasesInstance) {
    throw new Error(
      'Appwrite er ikke konfigurert. Sjekk at VITE_APPWRITE_ENDPOINT og VITE_APPWRITE_PROJECT_ID er satt i .env'
    );
  }
  return databasesInstance;
}

// Helper: Get functions instance (throws if not configured)
export function getFunctions(): Functions {
  if (!functionsInstance) {
    throw new Error(
      'Appwrite er ikke konfigurert. Sjekk at VITE_APPWRITE_ENDPOINT og VITE_APPWRITE_PROJECT_ID er sett i .env'
    );
  }
  return functionsInstance;
}

// Export instances (nullable for direct access if needed)
export { client, ID, Query };
export const databases = databasesInstance;
export const functions = functionsInstance;

// Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
  firstName: string;
  lastName?: string;
}

export interface NewsletterSubscriber {
  email: string;
  firstName: string;
  lastName: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  source: string;
}

// Helper: Get required env variable
function getRequiredEnv(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Miljøvariabel ${key} mangler i .env`);
  }
  return value;
}

// Contact form submission
export async function submitContactForm(data: ContactFormData) {
  const functions = getFunctions();
  const fnId = getRequiredEnv('VITE_APPWRITE_CONTACT_FUNCTION_ID');
  
  const response = await functions.createExecution(
    fnId,
    JSON.stringify(data),
    false
  );
  
  return { success: true, data: response };
}

// Newsletter subscription (legacy - for backward compatibility)
export async function submitNewsletterForm(data: NewsletterFormData) {
  const databases = getDatabases();
  const dbId = getRequiredEnv('VITE_APPWRITE_DATABASE_ID');
  const collId = getRequiredEnv('VITE_APPWRITE_NEWSLETTER_COLLECTION_ID');
  
  const doc = await databases.createDocument(
    dbId,
    collId,
    ID.unique(),
    {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName || '',
      subscribedAt: new Date().toISOString(),
      status: 'active',
      source: 'website',
    }
  );
  
  // Optional: Trigger welcome email function
  const fnId = import.meta.env.VITE_APPWRITE_NEWSLETTER_FUNCTION_ID;
  if (fnId) {
    try {
      const functions = getFunctions();
      await functions.createExecution(fnId, JSON.stringify(data), false);
    } catch (error) {
      console.warn('Newsletter welcome email failed:', error);
    }
  }
  
  return { success: true, data: doc };
}

// Newsletter: Create subscriber (direct database access)
export async function createNewsletterSubscriber(
  email: string,
  firstName: string,
  lastName: string = '',
  source: string = 'footer'
) {
  const databases = getDatabases();
  const dbId = getRequiredEnv('VITE_APPWRITE_DATABASE_ID');
  const collId = getRequiredEnv('VITE_APPWRITE_SUBSCRIBERS_COLLECTION_ID');
  
  const doc = await databases.createDocument(
    dbId,
    collId,
    ID.unique(),
    {
      email,
      firstName,
      lastName,
      subscribedAt: new Date().toISOString(),
      status: 'active',
      source,
    }
  );
  
  return doc;
}

// Newsletter: Unsubscribe
export async function unsubscribeNewsletter(email: string) {
  const databases = getDatabases();
  const dbId = getRequiredEnv('VITE_APPWRITE_DATABASE_ID');
  const collId = getRequiredEnv('VITE_APPWRITE_SUBSCRIBERS_COLLECTION_ID');
  
  // Find subscriber by email - OPPDATERT TIL NY API
  const { documents } = await databases.listDocuments(
    dbId,
    collId,
    [
      Query.equal('email', email)
    ]
  );
  
  if (documents.length === 0) {
    throw new Error('E-posten er ikke registrert i nyhetsbrevet');
  }
  
  const subscriber = documents[0];
  
  // Update status to unsubscribed
  await databases.updateDocument(
    dbId,
    collId,
    subscriber.$id,
    {
      status: 'unsubscribed',
    }
  );
  
  return { success: true };
}