import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Container } from "@/components/layout/Container";
// import { ContactForm } from "@/components/features/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
// import { ContactMapVariant } from "@/components/sections/ContactMapVariant";
import { ContactFAQVariant } from "@/components/sections/ContactFAQVariant";
// import { ContactGalleryVariant } from "@/components/sections/ContactGalleryVariant";
// import { ContactActionsVariant } from "@/components/sections/ContactActionsVariant";
// import { ContactEventVariant } from "@/components/sections/ContactEventVariant";


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
    instagram: "https://www.instagram.com/eventyrfestningen/?igsh=MWtiamp2YjZpcnpq",
  },
};

export default function Contact() {
  return (
    <>
      <PageHero
        title="Kontakt Eventyrfestningen"
        subtitle={CONTACT_INFO.intro}
        ctaHref="#kontakt-skjema"
      />

      {/* Innhold */}
      <section className="relative py-16 lg:py-20 bg-navy-900 overflow-hidden">
        {/* bakgrunnsglow */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-10 -right-10 h-56 w-56 rounded-full bg-torch-500/30 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-gold-400/20 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* venstre kolonne: info */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-2xl bg-navy-800/50 border border-navy-700/70 backdrop-blur p-6 sm:p-8 space-y-6"
              whileHover={{ y: -2 }}
            >
              <div>
                <h2 className="text-2xl font-display text-white mb-2">
                  {CONTACT_INFO.title}
                </h2>
                <p className="text-navy-100/70 text-sm leading-relaxed">
                  Eventyrfestningen drives av frivillige som brenner for
                  scenekunst, historie og magiske sommerkvelder på
                  Kongsvinger festning. Ta kontakt om du lurer på billetter,
                  grupper, frivillighet, samarbeid eller presse – vi hjelper
                  deg gjerne å planlegge besøket.
                </p>
              </div>

              <div className="space-y-4">
                {/* Adresse */}
                <div className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-navy-100/60">Adresse</p>
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
                    <p className="text-sm text-navy-100/60">Telefon</p>
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
                    <p className="text-sm text-navy-100/60">E-post</p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-white break-all hover:text-gold-200 transition-colors"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hva kan vi hjelpe deg med? */}
              <div className="pt-4 border-t border-navy-700/60">
                <p className="text-sm text-navy-100/60 mb-3">
                  Hva kan vi hjelpe deg med?
                </p>
                <ul className="grid gap-2 text-sm text-navy-100/80 sm:grid-cols-2">
                  <li>• Billetter</li>
                  <li>• Presse og foto/film</li>
                  <li>• Samarbeid og sponsorer</li>
                  <li>• Frivillighet og medvirkning</li>
                </ul>
              </div>

              {/* sosiale medier */}
              <div className="pt-4 border-t border-navy-700/60">
                <p className="text-sm text-navy-100/60 mb-3">
                  Følg oss i sosiale medier
                </p>
                <div className="flex gap-3">
                  <motion.a
                    href={CONTACT_INFO.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-gold-400/80 hover:text-navy-900 transition"
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
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-gold-400/80 hover:text-navy-900 transition"
                    aria-label="Instagram"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Instagram className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* <ContactMapVariant /> */}
            <ContactFAQVariant />
            {/* <ContactGalleryVariant /> */}
            {/* <ContactActionsVariant /> */}
            {/* <ContactEventVariant /> */}
            {/* høyre kolonne: skjema */}
            {/* <motion.div
              id="kontakt-skjema"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl bg-navy-800/30 border border-navy-700/50 backdrop-blur p-6 sm:p-8"
              whileHover={{ y: -2 }}
            >
              <ContactForm />
            </motion.div> */}
          </div>
        </Container>
      </section>
    </>
  );
}

   {/*

<section className="relative py-16 lg:py-20 bg-navy-900 overflow-hidden">

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
      className="rounded-2xl bg-navy-800/50 border border-navy-700/70 backdrop-blur p-6 sm:p-8 space-y-6"
      whileHover={{ y: -2 }}
    >
      <div>
        <h2 className="text-2xl font-display text-white mb-2">
          {CONTACT_INFO.title}
        </h2>
        <p className="text-navy-100/70 text-sm">
          Opplysninger, grupper, presse eller samarbeid – vi vil gjerne høre fra deg.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-navy-100/60">Adresse</p>
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
            <p className="text-sm text-navy-100/60">Telefon</p>
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
            <p className="text-sm text-navy-100/60">E-post</p>
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
            <p className="text-sm text-navy-100/60">Svartid</p>
            <p className="text-white">{CONTACT_INFO.hours}</p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-navy-700/60">
        <p className="text-sm text-navy-100/60 mb-3">Følg oss i sosiale medier</p>
        <div className="flex gap-3">
          <motion.a
            href={CONTACT_INFO.socials.facebook}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-gold-400/80 hover:text-navy-900 transition"
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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-gold-400/80 hover:text-navy-900 transition"
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
      className="rounded-2xl bg-navy-800/30 border border-navy-700/50 backdrop-blur p-6 sm:p-8"
      whileHover={{ y: -2 }}
    >
      <ContactForm />
    </motion.div>
  </div>
</Container>
</section>
 */}