// Alternativ 2: FAQ Accordion
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle, Ticket, Calendar, MapPin, Users, RockingChairIcon } from "lucide-react";

const FAQ_ITEMS = [
  {
    icon: Ticket,
    question: "Hvordan kjøper jeg billetter?",
    answer: "Billetter kjøpes enkelt via vår billettpartner TicketCo. Klikk på 'Kjøp billetter' i menyen, velg forestilling og antall billetter. Du får bekreftelse på e-post."
  },
  {
    icon: Calendar,
    question: "Når går forestillingene?",
    answer: "Hovedforestillingen går i juli med forestillinger onsdag-søndag. Halloween-forestilling i oktober. Se vår kalender for eksakte datoer og tidspunkter."
  },
  {
    icon: MapPin,
    question: "Hva skjer hvis det regner?",
    answer: "Forestillingen spilles utendørs, og vi gjennomfører så lenge det er forsvarlig. Ta gjerne med regnjakke og evt. regnponcho, paraply er ikke tillat. Ved kraftig uvær kan forestillingen bli forsinket, avbrutt eller flyttet – informasjon gis da via e-post/SMS og i våre kanaler."
  },
  {
    icon: Users,
    question: "Er forestillingen egnet for små barn?",
    answer: "Forestillingen er familievennlig og passer for barn fra 5 år. Det er action, humor og spenning. Varighet ca. 100 minutter."
  },
  {
    icon: HelpCircle,
    question: "Kan jeg bli frivillig?",
    answer: "Ja! Vi trenger hjelp til alt fra parkeringsvakt, bidrag i eventyrlandsbyen, bak kulissene, rigging og nedrigg. Send e-post til kontakt@eventyrfestningen.no med 'Frivillig' i emnefeltet, så tar vi kontakt."
  },
  {
  icon: RockingChairIcon,
  question: "Trenger vi å ta med stol eller sitteunderlag?",
  answer: "Det er benker/sitteplasser i evnetyrlandsbyen, men vi anbefaler et enkelt sitteunderlag for ekstra komfort – spesielt for barn. Egen campingstol kan ikke tas med siden det er eget amfi/tribune til publikum.",
  }
];

export function ContactFAQVariant() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <motion.div
      id="kontakt-skjema"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl bg-navy-800/30 border border-navy-700/50 backdrop-blur p-6 sm:p-8"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold-400/10 mb-4">
          <HelpCircle className="h-6 w-6 text-gold-400" />
        </div>
        <h3 className="text-2xl font-display text-white mb-2">
          Ofte stilte spørsmål
        </h3>
        <p className="text-navy-100/70 text-sm">
          Finn raskt svar på vanlige spørsmål
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              className="rounded-xl bg-navy-900/40 border border-navy-700/30 overflow-hidden"
              initial={false}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-navy-900/60 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400/10 text-gold-200 shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="flex-1 text-white font-medium">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-gold-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 pb-4 pl-[72px]">
                      <p className="text-navy-100/80 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Footer */}
      <div className="mt-6 p-4 rounded-xl bg-torch-500/10 border border-torch-500/20 text-center">
        <p className="text-white text-sm mb-2">
          Fant du ikke svar på spørsmålet ditt?
        </p>
        <p className="text-navy-100/70 text-sm">
          Send oss en e-post på{" "}
          <a 
            href="mailto:post@eventyrfestningen.no" 
            className="text-gold-400 hover:text-gold-300 underline"
          >
            kontakt@eventyrfestningen.no
          </a>
        </p>
      </div>
    </motion.div>
  );
}