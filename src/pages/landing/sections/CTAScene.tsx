// routes/landing/sections/CTAScene.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Ticket, ArrowRight } from 'lucide-react'

interface CTAData {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
  secondaryCTA: {
    text: string
    link: string
  }
}

interface Props {
  data: CTAData
}

export default function CTAScene({ data }: Props) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 py-20 overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gold-500/20 backdrop-blur-sm border-2 border-gold-500/50 rounded-full"
          >
            <Ticket className="w-10 h-10 text-gold-400" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold-400"
            style={{
              textShadow: "0 0 30px rgba(251, 191, 36, 0.4)"
            }}
          >
            {data.headline}
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-navy-200 font-sans font-light max-w-2xl mx-auto"
          >
            {data.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            {/* Primary CTA */}
            <Link
              to={data.ctaLink}
              className="inline-flex items-center gap-3 px-10 py-5 bg-torch-500 text-navy-900 font-sans font-bold text-lg rounded-lg
                         hover:bg-torch-400 transition-all duration-300 transform hover:scale-105 group
                         shadow-[0_0_30px_rgba(255,161,35,0.6)] hover:shadow-[0_0_40px_rgba(255,161,35,0.8)]"
            >
              <Ticket className="w-6 h-6" />
              {data.ctaText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary CTA */}
            <Link
              to={data.secondaryCTA.link}
              className="inline-flex items-center gap-2 px-8 py-5 border-2 border-gold-500 text-gold-400 font-sans font-semibold text-lg rounded-lg
                         hover:bg-gold-500/10 transition-colors"
            >
              {data.secondaryCTA.text}
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 pt-12 text-navy-400 text-sm font-sans"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold-400 rounded-full" />
              <span>Sette av over 11.000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold-400 rounded-full" />
              <span>450 publikummere</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gold-400 rounded-full" />
              <span>Profesjonell produksjon</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}