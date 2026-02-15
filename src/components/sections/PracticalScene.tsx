import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { MapPin, Car, Accessibility, Clock, ExternalLink } from "lucide-react";

export interface PracticalData {
  title: string;
  venue: {
    name: string;
    address: string;
    googleMapsLink: string;
  };
  parking: {
    title: string;
    description: string;
  };
  accessibility: {
    title: string;
    description: string;
  };
  arrival: {
    title: string;
    description: string;
  };
  backgroundImage: string;
}

interface Props {
  data: PracticalData;
}

export default function PracticalScene({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "25%"]
  );

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 0.85, 0.88]);

  const infoItems = [
    {
      icon: MapPin,
      title: data.venue.name,
      description: data.venue.address,
      link: data.venue.googleMapsLink,
      linkText: "Åpne i Google Maps",
    },
    { icon: Car, title: data.parking.title, description: data.parking.description },
    {
      icon: Accessibility,
      title: data.accessibility.title,
      description: data.accessibility.description,
    },
    { icon: Clock, title: data.arrival.title, description: data.arrival.description },
  ] as const;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden py-16 sm:py-20">
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <img
          src={data.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <motion.div className="absolute inset-0 bg-cynical-900" style={{ opacity: overlayOpacity }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-torch-400 font-sans text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">
            Planlegg besøket
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-400">
            {data.title}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {infoItems.map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.06, duration: 0.55, ease: "easeOut" }}
              className="relative group"
            >
              <div
                className="bg-cynical-800/70 backdrop-blur-sm border border-gold-500/20 rounded-lg p-6 h-full
                           hover:border-gold-500/40 hover:bg-cynical-800/80 transition-all duration-300
                           focus-within:border-gold-500/45"
              >
                <div className="mb-4 inline-flex p-3 bg-gold-500/10 rounded-lg group-hover:bg-gold-500/20 transition-colors">
                  <item.icon className="w-7 h-7 text-gold-400" aria-hidden="true" />
                </div>

                <h3 className="font-sans font-semibold text-lg sm:text-xl text-gold-400 mb-3">
                  {item.title}
                </h3>

                <p className="text-cynical-200 font-sans font-light leading-relaxed mb-4">
                  {item.description}
                </p>

                {"link" in item && item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-torch-400 font-sans text-sm font-semibold
                               hover:text-torch-300 transition-colors
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cynical-900 rounded-sm"
                    aria-label={`${item.linkText}: ${item.title}`}
                  >
                    {item.linkText}
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
