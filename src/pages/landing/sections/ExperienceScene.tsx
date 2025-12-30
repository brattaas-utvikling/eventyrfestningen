// routes/landing/sections/ExperienceScene.tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'  // Add this import

interface ExperienceHighlight {
  icon: string
  title: string
  description: string
}

interface ExperienceData {
  title: string
  subtitle: string
  backgroundImage: string
  highlights: ExperienceHighlight[]
}

interface Props {
  data: ExperienceData
}

export default function ExperienceScene({ data }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "20%"]
  )

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.75, 0.85])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden py-20"
    >
      {/* Background with parallax */}
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
            Opplevelsen
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-400 mb-4">
            {data.title}
          </h2>
          <p className="text-navy-200 text-lg md:text-xl font-sans font-light max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.highlights.map((highlight, idx) => {
            // Type-safe icon lookup
            const IconComponent = (Icons[highlight.icon as keyof typeof Icons] as LucideIcon) || Icons.Star

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="relative bg-navy-800/60 backdrop-blur-sm border border-gold-500/20 rounded-lg p-6 h-full
                               hover:border-gold-500/40 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-4 inline-flex p-3 bg-gold-500/10 rounded-lg group-hover:bg-gold-500/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-gold-400" />
                  </div>

                  {/* Content */}
                  <h3 className="font-sans font-semibold text-xl text-gold-400 mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-navy-300 font-sans font-light leading-relaxed">
                    {highlight.description}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold-500/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}