// routes/landing/sections/PracticalScene.tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { MapPin, Car, Accessibility, Clock, ExternalLink } from 'lucide-react'

interface PracticalData {
  title: string
  venue: {
    name: string
    address: string
    googleMapsLink: string
  }
  parking: {
    title: string
    description: string
  }
  accessibility: {
    title: string
    description: string
  }
  arrival: {
    title: string
    description: string
  }
  backgroundImage: string
}

interface Props {
  data: PracticalData
}

export default function PracticalScene({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "25%"]
  )

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 0.85, 0.88])

  const infoItems = [
    {
      icon: MapPin,
      title: data.venue.name,
      description: data.venue.address,
      link: data.venue.googleMapsLink,
      linkText: "Åpne i Google Maps"
    },
    {
      icon: Car,
      title: data.parking.title,
      description: data.parking.description
    },
    {
      icon: Accessibility,
      title: data.accessibility.title,
      description: data.accessibility.description
    },
    {
      icon: Clock,
      title: data.arrival.title,
      description: data.arrival.description
    }
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden py-20"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img
          src={data.backgroundImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <motion.div
          className="absolute inset-0 bg-navy-900"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-torch-400 font-sans text-sm uppercase tracking-widest mb-4">
            Planlegg besøket
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-400">
            {data.title}
          </h2>
        </motion.div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {infoItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative group"
            >
              <div className="bg-navy-800/70 backdrop-blur-sm border border-gold-500/20 rounded-lg p-6 h-full
                             hover:border-gold-500/40 hover:bg-navy-800/80 transition-all duration-300">
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 bg-gold-500/10 rounded-lg group-hover:bg-gold-500/20 transition-colors">
                  <item.icon className="w-7 h-7 text-gold-400" />
                </div>

                {/* Content */}
                <h3 className="font-sans font-semibold text-xl text-gold-400 mb-3">
                  {item.title}
                </h3>
                <p className="text-navy-200 font-sans font-light leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Link if exists */}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-torch-400 font-sans text-sm font-semibold hover:text-torch-300 transition-colors group/link"
                  >
                    {item.linkText}
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}