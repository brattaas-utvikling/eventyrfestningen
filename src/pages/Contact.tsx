import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { ContactFAQVariant } from "@/components/sections/ContactFAQVariant";
import { SEOHead } from "@/components/SEOHead";

const CONTACT_INFO = {
  title: "Eventyrfestningen",
  intro:
    "Spørsmål om billetter, medvirkning eller samarbeid? Send oss en melding, så svarer vi så fort vi kan.",
  address: { line1: "Kongsvinger festning 2", line2: "2213 Kongsvinger" },
  phone: "+47 959 03 453",
  email: "kontakt@eventyrfestningen.no",
  krebsemail: "krebs@eventyrfestningen.no",
  hours: "Vi svarer normalt innen 1–2 virkedager.",
  socials: {
    facebook: "https://www.facebook.com/eventyrfestningen",
    instagram: "https://www.instagram.com/eventyrfestningen/",
  },
};

export default function Contact() {
  return (
    <>
    <SEOHead
      title="Kontakt Eventyrfestningen"
      description={CONTACT_INFO.intro}
    />


<PageHero
  title="Kontakt Eventyrfestningen"
  subtitle={CONTACT_INFO.intro}
  backgroundImageUrl="/media/festningslandsbyen1.jpg"
  backgroundImageAlt="Sommerkveld ved Kongsvinger festning"
/>


      <section className="relative py-16 lg:py-20 bg-cynical-900 overflow-hidden">
        {/* bakgrunnsglow */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-torch-500/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            {/* venstre kolonne: info */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-2xl bg-cynical-800/50 border border-cynical-700/70 backdrop-blur p-6 sm:p-8 space-y-6"
              // whileHover fjernet for å unngå y-bevegelse
            >
              <div>
                <h2 className="text-2xl font-display text-white mb-2">
                  {CONTACT_INFO.title}
                </h2>
                <p className="text-cynical-100/70 text-sm leading-relaxed">
                  Eventyrfestningen drives av frivillige som brenner for
                  scenekunst, historie og magiske sommerkvelder på Kongsvinger
                  festning. Ta kontakt om du lurer på billetter,
                  frivillighet, samarbeid eller presse – vi hjelper deg gjerne å
                  planlegge besøket.
                </p>
              </div>

              <div className="space-y-4">
                {/* Adresse */}
                <div className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-cynical-100/60">Adresse</p>
                    <p className="text-white">
                      {CONTACT_INFO.address.line1}
                      <br />
                      {CONTACT_INFO.address.line2}
                    </p>
                  </div>
                </div>

                {/* Telefon */}
                <div className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-cynical-100/60">Telefon</p>
                    <a
                      href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
                      className="text-white hover:text-gold-200 transition-colors"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* E-post */}
                <div className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-cynical-100/60">E-post</p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-white break-all hover:text-gold-200 transition-colors"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

                {/* Vil du være med? */}
                <div className="pt-4 border-t border-cynical-700/60">
                  <p className="text-sm text-cynical-100/60 mb-3">Vil du være med i Eventyrfestningen?</p>
                  <ul className="grid gap-2 text-sm text-cynical-100/80 sm:grid-cols-2">
                    <li>• Rigge opp eller ned scenografien</li>
                    <li>• Hjelpe til i Festningslandsbyen</li>
                    <li>• Vertskap og publikumsservice</li>
                    <li>• Parkeringsvakter</li>
                  </ul>
                </div>

              {/* sosiale medier */}
              <div className="pt-4 border-t border-cynical-700/60">
                <p className="text-sm text-cynical-100/60 mb-3">
                  Følg oss i sosiale medier
                </p>
                <div className="flex gap-3">
                  <motion.a
                    href={CONTACT_INFO.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-gold-400/80 hover:text-cynical-900 transition"
                    aria-label="Facebook"
                    whileTap={{ scale: 0.97 }}
                  >
                    <Facebook className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    href={CONTACT_INFO.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-gold-400/80 hover:text-cynical-900 transition"
                    aria-label="Instagram"
                    whileTap={{ scale: 0.97 }}
                  >
                    <Instagram className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* høyre kolonne – ContactFAQVariant har ingen y-hover her */}
            <ContactFAQVariant />

            {/* Hvis du skrur på skjema igjen senere, fjern også whileHover der: */}
            {/*
            <motion.div
              id="kontakt-skjema"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-cynical-800/30 border border-cynical-700/50 backdrop-blur p-6 sm:p-8"
            >
              <ContactForm />
            </motion.div>
            */}
          </div>
        </Container>
      </section>
    </>
  );
}


   {/*

<section className="relative py-16 lg:py-20 bg-cynical-900 overflow-hidden">

<div className="pointer-events-none absolute inset-0 opacity-30">
  <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-torch-500/30 blur-3xl" />
  <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" />
</div>

<Container className="relative z-10">
  <div className="grid gap-8 lg:grid-cols-2 items-start">

    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="rounded-2xl bg-cynical-800/50 border border-cynical-700/70 backdrop-blur p-6 sm:p-8 space-y-6"
      whileHover={{ y: -2 }}
    >
      <div>
        <h2 className="text-2xl font-display text-white mb-2">
          {CONTACT_INFO.title}
        </h2>
        <p className="text-cynical-100/70 text-sm">
          Opplysninger, grupper, presse eller samarbeid – vi vil gjerne høre fra deg.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-cynical-100/60">Adresse</p>
            <p className="text-white">
              {CONTACT_INFO.address.line1}
              <br />
              {CONTACT_INFO.address.line2}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-cynical-100/60">Telefon</p>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
              className="text-white hover:text-gold-200 transition-colors"
            >
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-cynical-100/60">E-post</p>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-white break-all hover:text-gold-200 transition-colors"
            >
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-cynical-100/60">Svartid</p>
            <p className="text-white">{CONTACT_INFO.hours}</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-cynical-700/60">
        <p className="text-sm text-cynical-100/60 mb-3">Følg oss i sosiale medier</p>
        <div className="flex gap-3">
          <motion.a
            href={CONTACT_INFO.socials.facebook}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-gold-400/80 hover:text-cynical-900 transition"
            aria-label="Facebook"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Facebook className="h-5 w-5" />
          </motion.a>
          <motion.a
            href={CONTACT_INFO.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-gold-400/80 hover:text-cynical-900 transition"
            aria-label="Instagram"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Instagram className="h-5 w-5" />
          </motion.a>
        </div>
      </div>
    </motion.div>

    <motion.div
      id="kontakt-skjema"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl bg-cynical-800/30 border border-cynical-700/50 backdrop-blur p-6 sm:p-8"
      whileHover={{ y: -2 }}
    >
      <ContactForm />
    </motion.div>
  </div>
</Container>
</section>
 */}