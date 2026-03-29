// src/components/features/ContactForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { submitContactForm, type ContactFormData } from '@/lib/appwrite'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Navn må være minst 2 tegn'),
  email: z.string().email('Ugyldig e-postadresse'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Melding må være minst 10 tegn'),
})

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setStatus('idle')
      await submitContactForm(data)
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 5000)
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Navn */}
      <div>
        <label className="block text-sm font-medium text-gray-100 mb-2" htmlFor="name">
          Navn *
        </label>
        <input
          id="name"
          {...register('name')}
          className="w-full rounded-lg border border-cynical-700 bg-cynical-900/40 px-4 py-3 text-white focus:border-gold-400 focus:ring-gold-400"
          placeholder="Ditt navn"
        />
        {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name.message}</p>}
      </div>

      {/* E-post */}
      <div>
        <label className="block text-sm font-medium text-gray-100 mb-2" htmlFor="email">
          E-post *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full rounded-lg border border-cynical-700 bg-cynical-900/40 px-4 py-3 text-white focus:border-gold-400 focus:ring-gold-400"
          placeholder="din@epost.no"
        />
        {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
      </div>

      {/* Telefon */}
      <div>
        <label className="block text-sm font-medium text-gray-100 mb-2" htmlFor="phone">
          Telefon (valgfritt)
        </label>
        <input
          id="phone"
          {...register('phone')}
          className="w-full rounded-lg border border-cynical-700 bg-cynical-900/40 px-4 py-3 text-white focus:border-gold-400 focus:ring-gold-400"
          placeholder="+47 123 45 678"
        />
      </div>

      {/* Melding */}
      <div>
        <label className="block text-sm font-medium text-gray-100 mb-2" htmlFor="message">
          Melding *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="w-full rounded-lg border border-cynical-700 bg-cynical-900/40 px-4 py-3 text-white focus:border-gold-400 focus:ring-gold-400"
          placeholder="Skriv meldingen din..."
        />
        {errors.message && <p className="text-sm text-red-400 mt-1">{errors.message.message}</p>}
      </div>

      <div>
        <Button type="submit" variant="torch" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sender …
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Send melding
            </>
          )}
        </Button>
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/30 px-4 py-3 text-green-100">
          <CheckCircle className="h-5 w-5" />
          <p>Henvendelsen din er sendt. Vi svarer så snart vi kan.</p>
        </div>
      )}

      {status === 'error' && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-100">
          Noe gikk galt. Prøv igjen eller send e-post til kontakt@festningsteater.no
        </div>
      )}
    </form>
  )
}
