// Alternativ 5: Neste Forestilling + Countdown
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Ticket, Users, Star, ArrowRight } from "lucide-react";

// Mock data - erstatt med ekte data fra Sanity
const NEXT_EVENT = {
  title: "Mysteriet på Festningen",
  date: new Date("2025-07-15T19:00:00"),
  venue: "Kongsvinger Festning",
  duration: "90 minutter",
  ageLimit: "Familievennlig (5+ år)",
  availableSeats: "Få billetter igjen!",
  posterUrl: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=800&fit=crop",
  highlights: [
    "Storslått produksjon",
    "Profesjonelle skuespillere",
    "Spennende handling",
    "Magisk atmosfære"
  ]
};

function calculateTimeLeft(targetDate: Date) {
  const difference = targetDate.getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}

export function ContactEventVariant() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(NEXT_EVENT.date));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(NEXT_EVENT.date));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Dager", value: timeLeft.days },
    { label: "Timer", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sek", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      id="kontakt-skjema"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl bg-cynical-800/30 border border-cynical-700/50 backdrop-blur overflow-hidden"
      whileHover={{ y: -2 }}
    >
      {/* Event Poster */}
      <div className="relative aspect-3/4 sm:aspect-video overflow-hidden">
        <img
          src={NEXT_EVENT.posterUrl}
          alt={NEXT_EVENT.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-cynical-900 via-cynical-900/60 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-4 right-4">
          <div className="px-3 py-1.5 rounded-full bg-torch-500 text-white text-xs font-semibold shadow-lg animate-pulse">
            {NEXT_EVENT.availableSeats}
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-display font-bold text-white mb-1">
            {NEXT_EVENT.title}
          </h3>
          <p className="text-gold-400 text-sm font-medium">
            Neste forestilling
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Countdown */}
        <div>
          <p className="text-center text-sm text-cynical-100/60 mb-3">
            Premiere om
          </p>
          <div className="grid grid-cols-4 gap-3">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="text-center p-3 rounded-xl bg-cynical-900/60 border border-cynical-700/30"
              >
                <div className="text-2xl font-display font-bold text-gold-400 mb-1">
                  {unit.value.toString().padStart(2, "0")}
                </div>
                <div className="text-xs text-cynical-100/60 uppercase">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400/10 text-gold-400 shrink-0">
              <Calendar className="h-4 w-4" />
            </div>
            <span className="text-white">
              {NEXT_EVENT.date.toLocaleDateString("nb-NO", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400/10 text-gold-400 shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <span className="text-white">
              Kl. {NEXT_EVENT.date.toLocaleTimeString("nb-NO", {
                hour: "2-digit",
                minute: "2-digit"
              })} • {NEXT_EVENT.duration}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400/10 text-gold-400 shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="text-white">{NEXT_EVENT.venue}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400/10 text-gold-400 shrink-0">
              <Users className="h-4 w-4" />
            </div>
            <span className="text-white">{NEXT_EVENT.ageLimit}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="p-4 rounded-xl bg-cynical-900/40 border border-cynical-700/30">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 text-gold-400" />
            <span className="text-sm font-medium text-white">Høydepunkter</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {NEXT_EVENT.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs text-cynical-100/80"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <motion.a
            href="https://billetter.no"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-linear-to-r from-torch-500 to-torch-600 text-white font-semibold shadow-lg hover:from-torch-600 hover:to-torch-700 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Ticket className="h-5 w-5" />
            Kjøp billetter nå
          </motion.a>

          <motion.a
            href="/kalender"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-cynical-900/60 border border-cynical-700/50 text-white font-medium hover:bg-cynical-900/80 hover:border-gold-400/50 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Se alle forestillinger
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Newsletter Signup */}
        <div className="p-4 rounded-xl bg-gold-400/5 border border-gold-400/20">
          <p className="text-sm text-white mb-2 font-medium">
            Få beskjed når nye billetter slippes
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="din@epost.no"
              className="flex-1 px-3 py-2 rounded-lg bg-cynical-900/60 border border-cynical-700/50 text-white text-sm placeholder:text-cynical-100/40 focus:outline-none focus:border-gold-400/50"
            />
            <button className="px-4 py-2 rounded-lg bg-gold-400 text-cynical-900 text-sm font-medium hover:bg-gold-500 transition-colors">
              Meld på
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}