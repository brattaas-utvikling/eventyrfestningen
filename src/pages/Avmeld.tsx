// src/pages/Avmeld.tsx
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getDatabases } from '@/lib/appwrite';
import { Container } from '@/components/layout/Container';

export default function Avmeld() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    const email = searchParams.get('email');
    const id = searchParams.get('id');
    
    if (!email || !id) {
      setStatus('error');
      setErrorMessage('Ugyldig avmeldingslenke. Mangler nødvendig informasjon.');
      return;
    }
    
    const unsubscribe = async () => {
      try {
        const databases = getDatabases();
        
        // Hent subscriber for å sjekke status
        const subscriber = await databases.getDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_SUBSCRIBERS_COLLECTION_ID,
          id
        );
        
        // Sjekk at e-post matcher (sikkerhet)
        if (subscriber.email.toLowerCase() !== email.toLowerCase()) {
          setStatus('error');
          setErrorMessage('Ugyldig avmeldingslenke.');
          return;
        }
        
        // Sjekk om allerede avmeldt
        if (subscriber.status === 'unsubscribed') {
          setStatus('already');
          return;
        }
        
        // Oppdater status til unsubscribed
        await databases.updateDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_SUBSCRIBERS_COLLECTION_ID,
          id,
          { 
            status: 'unsubscribed',
            unsubscribedAt: new Date().toISOString()
          }
        );
        
        setStatus('success');
      } catch (error) {
        console.error('Unsubscribe failed:', error);
        setStatus('error');
        
        const appwriteError = error as { code?: number; message?: string };
        
        if (appwriteError.code === 404) {
          setErrorMessage('Fant ikke abonnementet. Det kan allerede være slettet.');
        } else {
          setErrorMessage('Noe gikk galt. Prøv igjen senere eller kontakt oss.');
        }
      }
    };
    
    unsubscribe();
  }, [searchParams]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-cynical-50 to-white py-16">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {status === 'loading' && (
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-torch-600 mx-auto mb-6"></div>
              <p className="text-lg text-cynical-700">Behandler avmelding...</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-cynical-900 mb-4">
                Du er nå avmeldt
              </h1>
              <p className="text-lg text-cynical-600 mb-8">
                Du vil ikke lenger motta nyhetsbrev fra Eventyrfestningen.
              </p>
              <p className="text-sm text-cynical-500 mb-8">
                Vi er lei oss for å se deg dra, men vi respekterer ditt valg. 
                Du kan melde deg på igjen når som helst.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-torch-600 text-white font-semibold rounded-lg hover:bg-torch-700 transition-colors"
                >
                  Gå til forsiden
                </Link>
                <Link
                  to="/kalender"
                  className="inline-flex items-center justify-center px-6 py-3 bg-cynical-100 text-cynical-900 font-semibold rounded-lg hover:bg-cynical-200 transition-colors"
                >
                  Se forestillinger
                </Link>
              </div>
            </div>
          )}
          
          {status === 'already' && (
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-cynical-900 mb-4">
                Allerede avmeldt
              </h1>
              <p className="text-lg text-cynical-600 mb-8">
                Denne e-postadressen er allerede avmeldt fra vårt nyhetsbrev.
              </p>
              <p className="text-sm text-cynical-500 mb-8">
                Hvis du fortsatt mottar e-poster fra oss, vennligst kontakt oss.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-torch-600 text-white font-semibold rounded-lg hover:bg-torch-700 transition-colors"
                >
                  Gå til forsiden
                </Link>
                <a
                  href="mailto:kontakt@eventyrfestningen.no"
                  className="inline-flex items-center justify-center px-6 py-3 bg-cynical-100 text-cynical-900 font-semibold rounded-lg hover:bg-cynical-200 transition-colors"
                >
                  Kontakt oss
                </a>
              </div>
            </div>
          )}
          
          {status === 'error' && (
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-cynical-900 mb-4">
                Noe gikk galt
              </h1>
              <p className="text-lg text-cynical-600 mb-8">
                {errorMessage || 'Vi kunne ikke behandle avmeldingen din.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-torch-600 text-white font-semibold rounded-lg hover:bg-torch-700 transition-colors"
                >
                  Gå til forsiden
                </Link>
                <a
                  href="mailto:kontakt@eventyrfestningen.no?subject=Problem med avmelding"
                  className="inline-flex items-center justify-center px-6 py-3 bg-cynical-100 text-cynical-900 font-semibold rounded-lg hover:bg-cynical-200 transition-colors"
                >
                  Kontakt support
                </a>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}