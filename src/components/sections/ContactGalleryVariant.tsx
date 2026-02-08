// Alternativ 3: Bildegalleri med Team
import { motion } from "framer-motion";
import { Camera, Users, Heart, Sparkles } from "lucide-react";

const TEAM_STATS = [
  { icon: Users, label: "Frivillige", value: "50+" },
  { icon: Sparkles, label: "Forestillinger i år", value: "14" },
  { icon: Heart, label: "Fornøyde besøkende", value: "5000+" },
];

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop",
    alt: "Backstage forberedelser",
    caption: "Bak kulissene"
  },
  {
    src: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=600&h=400&fit=crop",
    alt: "Skuespillere i aksjon",
    caption: "På scenen"
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    alt: "Teamprat",
    caption: "Teamet vårt"
  },
  {
    src: "https://images.unsplash.com/photo-1523301343968-6a6ebf63c672?w=600&h=400&fit=crop",
    alt: "Kostymedesign",
    caption: "Kostymer"
  },
];

export function ContactGalleryVariant() {
  return (
    <motion.div
      id="kontakt-skjema"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl bg-cynical-800/30 border border-cynical-700/50 backdrop-blur p-6 sm:p-8 space-y-6"
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-400/10 mb-4">
          <Camera className="h-6 w-6 text-gold-400" />
        </div>
        <h3 className="text-2xl font-display text-white mb-2">
          Bli med på eventyret
        </h3>
        <p className="text-cynical-100/70 text-sm">
          Glimt fra produksjon, forberedelser og magiske øyeblikk
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-3">
        {GALLERY_IMAGES.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            className="group relative aspect-4/3 rounded-xl overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-cynical-900/80 via-cynical-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-sm font-medium">
                  {image.caption}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 pt-4">
        {TEAM_STATS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center p-4 rounded-xl bg-cynical-900/40 border border-cynical-700/30"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold-400/10 mb-2">
                <Icon className="h-5 w-5 text-gold-400" />
              </div>
              <div className="text-2xl font-display font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-cynical-100/60">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quote */}
      <div className="p-5 rounded-xl bg-gold-400/5 border border-gold-400/20">
        <div className="flex gap-3">
          <div className="text-gold-400 text-4xl leading-none font-serif">"</div>
          <div>
            <p className="text-white/90 text-sm italic leading-relaxed mb-2">
              Vi skaper ikke bare forestillinger – vi skaper minner som varer livet ut. 
              Bli med på reisen!
            </p>
            <p className="text-cynical-100/60 text-xs">
              — Teamet på Eventyrfestningen
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-2">
        <p className="text-sm text-cynical-100/70 mb-3">
          Interessert i å bidra eller samarbeide?
        </p>
        <a
          href="mailto:post@eventyrfestningen.no"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-gold-400 to-gold-500 text-cynical-900 font-medium hover:from-gold-500 hover:to-gold-600 transition-all shadow-lg hover:shadow-xl"
        >
          Send oss en melding
        </a>
      </div>
    </motion.div>
  );
}