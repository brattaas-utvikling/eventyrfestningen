// src/components/NewsletterSignup.tsx
import { useState } from 'react';
import { getDatabases, ID } from '@/lib/appwrite';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';

type NewsletterSignupProps = {
  variant?: 'dark' | 'contrast';
};

// Konstanter
const AUTO_CLEAR_TIMEOUT = 5000;
const ERROR_MESSAGES = {
  DUPLICATE: 'Denne e-posten er allerede registrert.',
  CONFIG: 'Systemfeil. Kontakt administrator.',
  GENERIC: 'Noe gikk galt. Prøv igjen.',
} as const;
const SUCCESS_MESSAGE = 'Takk! Du er nå påmeldt nyhetsbrevet!';

// Zod schema for validering
const newsletterSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Fornavn må være minst 2 tegn')
    .max(50, 'Fornavn kan ikke være mer enn 50 tegn')
    .regex(/^[a-zA-ZæøåÆØÅ\s-]+$/, 'Fornavn kan kun inneholde bokstaver'),
  email: z
    .string()
    .email('Ugyldig e-postadresse')
    .toLowerCase()
    .trim(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterSignup({ variant = 'dark' }: NewsletterSignupProps) {
  const [formData, setFormData] = useState<NewsletterFormData>({
    firstName: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof NewsletterFormData, string>>>({});

  const isDark = variant === 'dark';

  // Theme styling - TILPASSET TIL FARGEPALETT
  const heading = isDark ? 'text-gold-400' : 'text-torch-600';
  const subtext = isDark ? 'text-gray-300' : 'text-cynical-700';
  
  // Input styling
  const inputBg = isDark 
    ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500' 
    : 'bg-cynical-50 border-cynical-200 text-cynical-900 placeholder:text-cynical-400';
  
  const inputFocus = isDark 
    ? 'focus:border-gold-400/50 focus:ring-gold-400/20' 
    : 'focus:border-torch-500 focus:ring-torch-500/20';
  
  // ERROR STYLING - BURGUNDY (fra fargepaletten)
  const inputError = isDark 
    ? 'border-burgundy-400/60' // Wine Rose 400 med opacity
    : 'border-burgundy-500';    // Wine Rose 500
  
  const errorText = isDark 
    ? 'text-burgundy-400' // Wine Rose 400
    : 'text-burgundy-600'; // Wine Rose 600

  // SUCCESS STYLING - TORCH (fra fargepaletten, eller gold)
  const successText = isDark 
    ? 'text-torch-300' // Brand Flame 300
    : 'text-torch-600'; // Brand Flame 600

  // Helper for input styling
  const getInputClasses = (hasError: boolean) => cn(
    "w-full px-3 py-3 sm:py-2 text-sm rounded-lg border",
    inputBg,
    hasError ? inputError : inputFocus,
    "focus:outline-none focus:ring-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "transition-colors"
  );

  const handleChange = (field: keyof NewsletterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    // Validering
    const result = newsletterSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof NewsletterFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof NewsletterFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const databases = getDatabases();
      
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_SUBSCRIBERS_COLLECTION_ID,
        ID.unique(),
        {
          email: result.data.email,
          firstName: result.data.firstName,
          lastName: '',
          subscribedAt: new Date().toISOString(),
          status: 'active',
          source: 'footer',
        }
      );

      setStatus('success');
      setMessage(SUCCESS_MESSAGE);
      setFormData({ firstName: '', email: '' });

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, AUTO_CLEAR_TIMEOUT);
    } catch (error) {
      setStatus('error');
      console.error('Newsletter signup error:', error);
      
      const appwriteError = error as { code?: number; message?: string };
      
      if (appwriteError.code === 409 || appwriteError.message?.includes('unique')) {
        setMessage(ERROR_MESSAGES.DUPLICATE);
      } else if (appwriteError.message?.includes('ikke konfigurert')) {
        setMessage(ERROR_MESSAGES.CONFIG);
      } else {
        setMessage(ERROR_MESSAGES.GENERIC);
      }
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, AUTO_CLEAR_TIMEOUT);
    }
  };

  return (
    <section aria-labelledby="footer-newsletter" className="text-left">
      <h3
        id="footer-newsletter"
        className={`text-lg font-sans font-semibold mb-3 ${heading}`}
      >
        Nyhetsbrev
      </h3>
      <p className={`text-sm mb-4 ${subtext}`}>
        Få nyheter om forestillinger rett i innboksen
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Fornavn input */}
        <div>
          <label htmlFor="newsletter-firstName" className="sr-only">
            Fornavn
          </label>
          <input
            type="text"
            id="newsletter-firstName"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Fornavn"
            disabled={status === 'loading'}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            className={getInputClasses(!!errors.firstName)}
          />
          {errors.firstName && (
            <p
              id="firstName-error"
              className={`mt-1 text-xs ${errorText}`}
              role="alert"
            >
              {errors.firstName}
            </p>
          )}
        </div>

        {/* E-post input */}
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            E-post
          </label>
          <input
            type="email"
            id="newsletter-email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="din@epost.no"
            disabled={status === 'loading'}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={getInputClasses(!!errors.email)}
          />
          {errors.email && (
            <p
              id="email-error"
              className={`mt-1 text-xs ${errorText}`}
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className={cn(
            buttonVariants({ 
              variant: status === 'success' ? 'default' : 'outline', 
              size: 'md' 
            }),
            "w-full h-12 sm:h-10 cursor-pointer",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            // SUCCESS STATE - Torch-farge (brand primary) i stedet for generisk grønn
            status === 'success' && "bg-torch-600 hover:bg-torch-600 border-torch-600 text-white"
          )}
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <svg 
                className="animate-spin h-4 w-4" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Melder på...</span>
            </span>
          ) : status === 'success' ? (
            <span className="flex items-center justify-center gap-2">
              <svg 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <span>Påmeldt!</span>
            </span>
          ) : (
            'Meld meg på'
          )}
        </button>

        {/* Status message */}
        {message && (
          <p
            className={cn(
              "text-xs",
              status === 'success' ? successText : errorText
            )}
            role={status === 'error' ? 'alert' : 'status'}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}