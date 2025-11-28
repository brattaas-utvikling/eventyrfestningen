// Alternativ 4: Quick Action Cards
import { motion } from "framer-motion";
import { 
  Ticket, 
  Users, 
  Handshake, 
  Newspaper, 
  Mail, 
  Phone,
  MessageCircle,
  ExternalLink 
} from "lucide-react";

const QUICK_ACTIONS = [
  {
    icon: Ticket,
    title: "Kjøp billetter",
    description: "Sikre plasser til forestillingen",
    color: "from-torch-500 to-torch-600",
    textColor: "text-white",
    action: {
      type: "link",
      url: "https://billetter.no",
      label: "Til billettshop"
    }
  },
  {
    icon: Users,
    title: "Bli frivillig",
    description: "Bli med på produksjonen",
    color: "from-gold-400 to-gold-500",
    textColor: "text-navy-900",
    action: {
      type: "email",
      url: "mailto:post@eventyrfestningen.no?subject=Frivillig",
      label: "Send e-post"
    }
  },
  {
    icon: Handshake,
    title: "Sponsing",
    description: "Samarbeid og partnerskap",
    color: "from-purple-500 to-purple-600",
    textColor: "text-white",
    action: {
      type: "email",
      url: "mailto:post@eventyrfestningen.no?subject=Sponsing",
      label: "Ta kontakt"
    }
  },
  {
    icon: Newspaper,
    title: "Presse",
    description: "Pressemateriell og henvendelser",
    color: "from-blue-500 to-blue-600",
    textColor: "text-white",
    action: {
      type: "email",
      url: "mailto:post@eventyrfestningen.no?subject=Presse",
      label: "Kontakt presse"
    }
  }
];

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: "E-post",
    value: "post@eventyrfestningen.no",
    href: "mailto:post@eventyrfestningen.no",
    color: "text-gold-400"
  },
  {
    icon: Phone,
    title: "Telefon",
    value: "+47 12 34 56 78",
    href: "tel:+4712345678",
    color: "text-torch-400"
  },
  {
    icon: MessageCircle,
    title: "Messenger",
    value: "Chat via Facebook",
    href: "https://m.me/eventyrfestningen",
    color: "text-blue-400"
  }
];

export function ContactActionsVariant() {
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
          Hva kan vi hjelpe deg med?
        </h3>
        <p className="text-navy-100/70 text-sm">
          Velg hva som passer deg best
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {QUICK_ACTIONS.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.a
              key={index}
              href={action.action.url}
              target={action.action.type === "link" ? "_blank" : undefined}
              rel={action.action.type === "link" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              className="group relative overflow-hidden rounded-xl p-5 border border-navy-700/30 hover:border-gold-400/50 transition-all"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative space-y-3">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} ${action.textColor} shadow-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <div>
                  <h4 className="text-white font-display font-bold mb-1">
                    {action.title}
                  </h4>
                  <p className="text-sm text-navy-100/70 mb-3">
                    {action.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-gold-400 group-hover:text-gold-300 transition-colors">
                  <span>{action.action.label}</span>
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-navy-700/50" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-navy-800/30 text-navy-100/60">
            Eller kontakt oss direkte
          </span>
        </div>
      </div>

      {/* Direct Contact Methods */}
      <div className="space-y-3">
        {CONTACT_METHODS.map((method, index) => {
          const Icon = method.icon;
          return (
            <motion.a
              key={index}
              href={method.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-navy-900/40 border border-navy-700/30 hover:border-gold-400/30 hover:bg-navy-900/60 transition-all group"
              whileHover={{ x: 4 }}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ${method.color} flex-shrink-0`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-navy-100/60 mb-0.5">
                  {method.title}
                </p>
                <p className="text-white font-medium truncate">
                  {method.value}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          );
        })}
      </div>

      {/* Response Time Notice */}
      <div className="p-4 rounded-xl bg-torch-500/10 border border-torch-500/20 text-center">
        <p className="text-sm text-white">
          ⚡ Vi svarer normalt innen <span className="font-semibold text-gold-400">1-2 virkedager</span>
        </p>
      </div>
    </motion.div>
  );
}