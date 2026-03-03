// src/components/features/NewsletterForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { submitNewsletterForm } from '@/lib/appwrite'

// ── Schema matcher NewsletterSignup.tsx og Appwrite-collection ───────────────
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
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      setStatus('idle')
      await submitNewsletterForm(data)
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-torch-500/10 border border-torch-500/30 px-4 py-3 text-torch-100">
        <CheckCircle className="h-6 w-6 text-torch-400" />
        <div>
          <p className="font-medium">Du er nå påmeldt nyhetsbrevet!</p>
          <p className="text-sm text-torch-100/80">Vi sier ifra om forestillinger og nyheter.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

      {/* Fornavn */}
      <div>
        <input
          type="text"
          {...register('firstName')}
          placeholder="Fornavn"
          className="w-full rounded-lg border border-cynical-700 bg-cynical-900/40 px-4 py-3 text-white placeholder:text-cynical-500 focus:border-gold-400 focus:ring-gold-400 focus:outline-none"
        />
        {errors.firstName && (
          <p className="text-sm text-burgundy-400 mt-1">{errors.firstName.message}</p>
        )}
      </div>

      {/* E-post + knapp */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            {...register('email')}
            placeholder="din@epost.no"
            className="w-full rounded-lg border border-cynical-700 bg-cynical-900/40 px-4 py-3 text-white placeholder:text-cynical-500 focus:border-gold-400 focus:ring-gold-400 focus:outline-none"
          />
          {errors.email && (
            <p className="text-sm text-burgundy-400 mt-1">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" variant="torch" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Registrerer…
            </>
          ) : (
            <>
              <Mail className="mr-2 h-5 w-5" />
              Meld meg på
            </>
          )}
        </Button>
      </div>

      {status === 'error' && (
        <p className="text-sm text-burgundy-400">Noe gikk galt. Prøv igjen senere.</p>
      )}

      <p className="text-xs text-cynical-100/60">
        Vi sender kun nyheter om forestillinger. Ingen spam.
      </p>
    </form>
  )
}