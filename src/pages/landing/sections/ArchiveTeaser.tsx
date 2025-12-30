// routes/landing/sections/ArchiveTeaser.tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { Link } from 'react-router-dom'
import { BookOpen, ArrowRight } from 'lucide-react'

interface ArchiveData {
  title: string
  subtitle: string
  description: string
  previewImage: string
  ctaText: string
  ctaLink: string
  highlightYears: string[]
}

interface Props {
  data: ArchiveData
}

export default function ArchiveTeaser({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [1.1, 1, 1.1]
  )

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 py-20 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-burgundy-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gold-500/10 border border-gold-500/30 rounded-full mb-6">
            <BookOpen className="w-5 h-5 text-gold-400" />
            <span className="text-gold-400 font-sans font-semibold uppercase tracking-wider text-sm">
              {data.subtitle}
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-400 mb-6">
            {data.title}
          </h2>

          <p className="text-navy-200 text-lg md:text-xl font-sans font-light max-w-2xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Preview Image with year badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <motion.div
            style={{ scale: imageScale }}
            className="relative aspect-video rounded-xl overflow-hidden border-2 border-gold-500/30 shadow-2xl"
          >
            <img
              src={data.previewImage}
              alt="Arkiv preview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />

            {/* Year badges floating on image */}
            <div className="absolute bottom-6 left-6 flex flex-wrap gap-3">
              {data.highlightYears.map((year, idx) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="px-4 py-2 bg-navy-900/80 backdrop-blur-sm border border-gold-500/30 rounded-full text-gold-400 font-sans font-semibold text-sm"
                >
                  {year}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decorative corner accents */}
          <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-gold-500 rounded-tl-xl" />
          <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-gold-500 rounded-br-xl" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to={data.ctaLink}
            className="inline-flex items-center gap-3 px-8 py-4 bg-torch-500 text-navy-900 font-sans font-semibold text-lg rounded-md
                       hover:bg-torch-400 transition-all duration-300 transform hover:scale-105 group
                       shadow-[0_0_20px_rgba(255,161,35,0.5)]"
          >
            {data.ctaText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}