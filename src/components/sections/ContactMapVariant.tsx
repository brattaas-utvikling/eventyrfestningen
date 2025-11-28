// Alternativ 1: Interaktivt Kart + Veibeskrivelse
import { motion } from "framer-motion";
import { MapPin, Car, Bus, Train, Navigation } from "lucide-react";

export function ContactMapVariant() {
  return (
    <motion.div
      id="kontakt-skjema"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl bg-navy-800/30 border border-navy-700/50 backdrop-blur p-6 sm:p-8 space-y-6"
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-display text-white mb-2">
          Finn oss
        </h3>
        <p className="text-navy-100/70 text-sm">
          Eventyrfestningen ligger vakkert til på Kongsvinger Festning
        </p>
      </div>

      {/* Interaktivt kart */}
      <div className="relative aspect-video rounded-xl overflow-hidden border border-navy-700/50">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2045.367!2d12.000826!3d60.191679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjDCsDExJzMwLjAiTiAxMsKwMDAnMDMuMCJF!5e0!3m2!1sno!2sno!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-300"
        />
        
        {/* Map overlay button */}
        <a
          href="https://maps.google.com/?q=Kongsvinger+Festning"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white text-navy-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg transition-colors"
        >
          <Navigation className="h-4 w-4" />
          Åpne i kart
        </a>
      </div>

      {/* Veibeskrivelse */}
      <div className="space-y-4">
        <h4 className="text-lg font-display text-white mb-3">
          Hvordan komme seg hit
        </h4>

        {/* Med bil */}
        <motion.div 
          className="flex gap-4 p-4 rounded-xl bg-navy-900/40 border border-navy-700/30 hover:border-gold-400/30 transition-colors"
          whileHover={{ x: 4 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200 flex-shrink-0">
            <Car className="h-5 w-5" />
          </div>
          <div>
            <p className="text-white font-medium mb-1">Med bil</p>
            <p className="text-sm text-navy-100/70">
              Fra Oslo: E6 nordover (ca. 1,5 time). Gratis parkering ved festningen.
            </p>
          </div>
        </motion.div>

        {/* Med tog */}
        <motion.div 
          className="flex gap-4 p-4 rounded-xl bg-navy-900/40 border border-navy-700/30 hover:border-gold-400/30 transition-colors"
          whileHover={{ x: 4 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200 flex-shrink-0">
            <Train className="h-5 w-5" />
          </div>
          <div>
            <p className="text-white font-medium mb-1">Med tog</p>
            <p className="text-sm text-navy-100/70">
              Kongsvinger stasjon, deretter 15 min. gange eller buss nr. 2.
            </p>
          </div>
        </motion.div>

        {/* Med buss */}
        <motion.div 
          className="flex gap-4 p-4 rounded-xl bg-navy-900/40 border border-navy-700/30 hover:border-gold-400/30 transition-colors"
          whileHover={{ x: 4 }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200 flex-shrink-0">
            <Bus className="h-5 w-5" />
          </div>
          <div>
            <p className="text-white font-medium mb-1">Med buss</p>
            <p className="text-sm text-navy-100/70">
              Buss nr. 2 stopper ved festningsporten.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Parkering info */}
      <div className="p-4 rounded-xl bg-torch-500/10 border border-torch-500/20">
        <p className="text-sm text-white flex items-center gap-2">
          <MapPin className="h-4 w-4 text-torch-400" />
          <span className="text-torch-200">Gratis parkering</span> tilgjengelig ved inngangen
        </p>
      </div>
    </motion.div>
  );
}