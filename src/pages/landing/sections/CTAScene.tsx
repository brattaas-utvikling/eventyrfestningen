// routes/landing/sections/CTAScene.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Ticket, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

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
                            className={cn(
                              buttonVariants({ variant: "torch", size: "xl" }),
                              "group relative overflow-hidden"  // Added 'relative' to contain the shine
                            )}
              to={data.ctaLink}

            >
                {/* Button shine effect - now contained within button */}
                <Ticket className="w-6 h-6 me-3" />
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                <span className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">{data.ctaText}</span>
              
            </Link>


            {/* Secondary CTA */}
            <Link
              to={data.secondaryCTA.link}
              className={cn(
                buttonVariants({ variant: "outline", size: "xl" }),
                "group relative overflow-hidden"  // Added 'relative' to contain the shine
              )}
            >
               <Calendar className="w-6 h-6 me-3" />
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