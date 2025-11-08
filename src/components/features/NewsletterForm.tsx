// src/components/features/NewsletterForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { submitNewsletterForm, type NewsletterFormData } from '@/lib/appwrite'

const newsletterSchema = z.object({
  email: z.string().email('Ugyldig e-postadresse'),
  name: z.string().optional(),
})

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
      <div className="flex items-center gap-3 rounded-lg bg-green-500/10 border border-green-500/30 px-4 py-3 text-green-100">
        <CheckCircle className="h-6 w-6" />
        <div>
          <p className="font-medium">Du er nå på interesselisten!</p>
          <p className="text-sm text-green-50/80">Vi sier ifra når billetter slippes.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="email"
            {...register('email')}
            placeholder="din@epost.no"
            className="w-full rounded-lg border border-navy-700 bg-navy-900/40 px-4 py-3 text-white focus:border-gold-400 focus:ring-gold-400"
          />
          {errors.email && <p className="text-sm text-red-300 mt-1">{errors.email.message}</p>}
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
              Bli varslet
            </>
          )}
        </Button>
      </div>
      {status === 'error' && (
        <p className="text-sm text-red-300">Noe gikk galt. Prøv igjen senere.</p>
      )}
      <p className="text-xs text-navy-100/60">
        Vi sender kun viktig informasjon om billettsalg. Ingen spam.
      </p>
    </form>
  )
}
