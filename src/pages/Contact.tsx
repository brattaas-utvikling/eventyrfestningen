// src/routes/Contact.tsx
import { SEOHead } from '@/components/SEOHead'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { ContactForm } from '@/components/features/ContactForm'
import { Card, CardContent } from '@/components/ui/Card'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Clock,
} from 'lucide-react'

export function Contact() {
  return (
    <>
      <SEOHead
        title="Kontakt oss"
        description="Ta kontakt med Kongsvinger Festningsteater. Vi svarer på alle henvendelser om forestillinger, sponsing og samarbeid."
      />

      <section className="py-20 sm:py-28 bg-gradient-to-br from-navy-900 to-burgundy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6">
              Kontakt oss
            </h1>
            <p className="text-xl text-gray-200">
              Har du spørsmål om forestillinger, billetter, sponsing eller noe
              annet? Vi hører gjerne fra deg!
            </p>
          </div>
        </Container>
      </section>

      <Section background="white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Info */}
            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">
                Kontaktinformasjon
              </h2>
              <div className="space-y-6">
                {/* Email */}
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-torch-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-torch-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-1">E-post</h3>
                      <a
                        href="mailto:post@festningsteater.no"
                        className="text-torch-600 hover:text-torch-700 transition-colors"
                      >
                        post@festningsteater.no
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone */}
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-torch-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-torch-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-1">Telefon</h3>
                      <a
                        href="tel:+4712345678"
                        className="text-torch-600 hover:text-torch-700 transition-colors"
                      >
                        +47 123 45 678
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Address */}
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-torch-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-torch-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-1">Adresse</h3>
                      <p className="text-gray-700">
                        Kongsvinger Festning
                        <br />
                        2226 Kongsvinger
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Hours */}
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-torch-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-torch-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 mb-1">
                        Kontortider
                      </h3>
                      <p className="text-gray-700">
                        Man–fre: 10–16
                        <br />
                        Helg: stengt
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Socials */}
              <div>
                <h3 className="text-xl font-display font-bold text-navy-900 mb-4">
                  Følg oss
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com/festningsteater"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center hover:bg-torch-100 transition-colors group"
                  >
                    <Facebook className="h-6 w-6 text-navy-700 group-hover:text-torch-600 transition-colors" />
                  </a>
                  <a
                    href="https://instagram.com/festningsteater"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center hover:bg-torch-100 transition-colors group"
                  >
                    <Instagram className="h-6 w-6 text-navy-700 group-hover:text-torch-600 transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <Card className="border-2 border-navy-100">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                    Send oss en melding
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Fyll ut skjemaet så svarer vi deg innen 1–2 virkedager.
                  </p>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
