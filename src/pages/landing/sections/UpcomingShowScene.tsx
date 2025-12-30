// routes/landing/sections/UpcomingShowScene.tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Users } from 'lucide-react'

interface UpcomingShowData {
  title: string
  genre: string
  ageRating: string
  description: string
  poster: string
  backgroundImage: string
  dates: string
  ctaLink: string
  highlights: string[]
}

interface Props {
  data: UpcomingShowData
}

export default function UpcomingShowScene({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Multi-layer parallax for depth
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "30%"]
  )
  
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "-15%"]
  )
  
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.4, 0.7])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden py-20"
    >
      {/* Background layer - slower movement */}
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

      {/* Content - faster movement (creates depth) */}
      <motion.div
        className="relative z-20 w-full max-w-7xl mx-auto px-4"
        style={{ y: contentY }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Poster */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[2/3] max-w-md mx-auto lg:mx-0 rounded-lg overflow-hidden border-4 border-gold-500/30 shadow-2xl">
              <img
                src={data.poster}
                alt={`${data.title} plakat`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Gold glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-gold-500/20 via-transparent to-transparent" />
            </div>

            {/* Decorative corner accents */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold-500 rounded-tl-lg" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-gold-500 rounded-br-lg" />
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block px-4 py-2 bg-torch-500/20 text-torch-400 text-sm font-sans font-semibold uppercase tracking-wider rounded-full border border-torch-500/30">
                Kommende forestilling
              </span>
              <span className="text-navy-300 text-sm font-sans">
                {data.genre}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-gold-400">
              {data.title}
            </h2>

            <div className="flex flex-wrap gap-4 text-sm text-navy-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{data.dates}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Fra {data.ageRating}</span>
              </div>
            </div>

            <p className="text-navy-200 text-base md:text-lg font-sans font-light leading-relaxed">
              {data.description}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {data.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-2 text-gold-400 text-sm"
                >
                  <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                  <span>{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to={data.ctaLink}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-torch-500 text-navy-900 font-sans font-semibold rounded-md hover:bg-torch-400 transition-all duration-300 transform hover:scale-105 group"
              >
                Les mer om forestillingen
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/billetter"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gold-500 text-gold-400 font-sans font-semibold rounded-md hover:bg-gold-500/10 transition-colors"
              >
                Kjøp billetter
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}