// src/pages/Avmeld.tsx

import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getFunctions } from '@/lib/appwrite';
import { ExecutionMethod } from 'appwrite';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { SEOHead } from '@/components/SEOHead';
import { Home, Mail } from 'lucide-react';

const UNSUB_FUNCTION_ID = import.meta.env.VITE_APPWRITE_UNSUB_FUNCTION_ID;

export default function Avmeld() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const id    = searchParams.get('id');
    const token = searchParams.get('token');

    if (!id || !token) {
      setStatus('error');
      setErrorMessage('Ugyldig avmeldingslenke. Kontroller at du brukte hele lenken fra e-posten.');
      return;
    }

    const unsubscribe = async () => {
      try {
        const execution = await getFunctions().createExecution(
          UNSUB_FUNCTION_ID,
          JSON.stringify({ id, token }),
          false,
          '/',
          ExecutionMethod.POST,
          { 'Content-Type': 'application/json' }
        );

        let result: { success: boolean; message?: string; error?: string };
        try {
          result = JSON.parse(execution.responseBody);
        } catch {
          throw new Error('Ugyldig svar fra server');
        }

        if (!result.success) {
          setStatus('error');
          setErrorMessage(
            execution.responseStatusCode === 403
              ? 'Ugyldig avmeldingslenke. Bruk lenken direkte fra e-posten.'
              : result.error || 'Noe gikk galt. Prøv igjen senere.'
          );
          return;
        }

        setStatus(result.message === 'Allerede avmeldt' ? 'already' : 'success');
      } catch {
        setStatus('error');
        setErrorMessage('Noe gikk galt. Prøv igjen senere eller kontakt oss.');
      }
    };

    unsubscribe();
  }, [searchParams]);

  return (
    <>
      <SEOHead
        title="Avmelding fra nyhetsbrev"
        description="Avmeld deg fra Eventyrfestningens nyhetsbrev."
      />

      <section className="relative overflow-hidden bg-linear-to-br from-cynical-900 to-cynical-800 text-white min-h-[70vh] flex items-center">
        <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-torch-500/20 blur-3xl pointer-events-none" aria-hidden />
        <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-gold-400/15 blur-3xl pointer-events-none" aria-hidden />

        <Container className="relative z-10 py-20 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            {status === 'loading' && <LoadingState />}
            {status === 'success' && <SuccessState />}
            {status === 'already' && <AlreadyState />}
            {status === 'error'   && <ErrorState message={errorMessage} />}
          </div>
        </Container>
      </section>
    </>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-6" aria-hidden>
      <div className="h-px w-12 bg-linear-to-r from-transparent to-gold-400/50" />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 0L6.12 3.88L10 5L6.12 6.12L5 10L3.88 6.12L0 5L3.88 3.88L5 0Z" fill="#fbbf24" opacity="0.6"/>
      </svg>
      <div className="h-px w-12 bg-linear-to-l from-transparent to-gold-400/50" />
    </div>
  );
}

function LoadingState() {
  return (
    <div>
      <p className="uppercase tracking-[0.2em] text-gold-400/70 text-xs mb-6">Eventyrfestningen</p>
      <div className="w-8 h-8 border-2 border-gold-400/20 border-t-gold-400 rounded-full animate-spin mx-auto mb-6" />
      <p className="text-cynical-100/70 text-lg">Behandler avmelding…</p>
    </div>
  );
}

function SuccessState() {
  return (
    <div>
      <p className="uppercase tracking-[0.2em] text-gold-400/70 text-xs mb-8">Eventyrfestningen</p>
      <h1 className="text-4xl sm:text-5xl font-sans font-black tracking-wide mb-4">Teppet faller</h1>
      <p className="text-xl font-serif italic text-gold-200/80 mb-2">Du er nå avmeldt nyhetsbrevet.</p>
      <Ornament />
      <p className="text-cynical-100/70 max-w-md mx-auto leading-relaxed mb-10">
        Vi er lei oss for å se deg dra, men vi respekterer ditt valg.
        Kulissene er alltid åpne hvis du ombestemmer deg.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button asChild variant="torch">
          <Link to="/"><Home className="mr-2 h-4 w-4" />Til forsiden</Link>
        </Button>
        <Button asChild variant="default">
          <Link to="/kalender">Se forestillinger</Link>
        </Button>
      </div>
    </div>
  );
}

function AlreadyState() {
  return (
    <div>
      <p className="uppercase tracking-[0.2em] text-gold-400/70 text-xs mb-8">Eventyrfestningen</p>
      <h1 className="text-4xl sm:text-5xl font-sans font-black tracking-wide mb-4">Allerede avmeldt</h1>
      <p className="text-xl font-serif italic text-gold-200/80 mb-2">Denne e-postadressen er ikke lenger på listen.</p>
      <Ornament />
      <p className="text-cynical-100/70 max-w-md mx-auto leading-relaxed mb-10">
        Hvis du fortsatt mottar e-poster fra oss, vennligst ta kontakt — vi ordner det.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button asChild variant="torch">
          <Link to="/"><Home className="mr-2 h-4 w-4" />Til forsiden</Link>
        </Button>
        <Button asChild variant="default">
          <a href="mailto:kontakt@eventyrfestningen.no"><Mail className="mr-2 h-4 w-4" />Kontakt oss</a>
        </Button>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div>
      <p className="uppercase tracking-[0.2em] text-gold-400/70 text-xs mb-8">Eventyrfestningen</p>
      <h1 className="text-4xl sm:text-5xl font-sans font-black tracking-wide mb-4">Noe gikk galt</h1>
      <p className="text-xl font-serif italic text-gold-200/80 mb-2">Vi kunne ikke behandle avmeldingen din.</p>
      <Ornament />
      <p className="text-cynical-100/70 max-w-md mx-auto leading-relaxed mb-10">
        {message || 'Prøv igjen senere, eller kontakt oss direkte så hjelper vi deg.'}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button asChild variant="torch">
          <Link to="/"><Home className="mr-2 h-4 w-4" />Til forsiden</Link>
        </Button>
        <Button asChild variant="default">
          <a href="mailto:kontakt@eventyrfestningen.no?subject=Problem med avmelding">
            <Mail className="mr-2 h-4 w-4" />Kontakt support
          </a>
        </Button>
      </div>
    </div>
  );
}