// routes/landing/sections/UpcomingShowScene.tsx (Optimized colors & contrast)
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
  
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 0.65, 0.75])

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
          className="absolute inset-0 bg-navy-950"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Content - faster movement (creates depth) */}
      <motion.div
        className="relative z-20 w-full max-w-7xl mx-auto px-4"
        style={{ y: contentY }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Poster */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[2/3] max-w-md mx-auto lg:mx-0 rounded-xl overflow-hidden 
                          border-4 border-gold-500/40 shadow-[0_0_60px_rgba(251,191,36,0.25)]
                          hover:border-gold-500/60 hover:shadow-[0_0_80px_rgba(251,191,36,0.35)] transition-all duration-500">
              <img
                src={data.poster}
                alt={`${data.title} plakat`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Subtle gold glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Decorative corner accents - more prominent */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-gold-500 rounded-tl-xl opacity-80" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 border-gold-500 rounded-br-xl opacity-80" />
            
            {/* Pulsing glow effect behind poster */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 -z-10 bg-gold-500/20 blur-3xl rounded-xl"
            />
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block px-5 py-2.5 bg-torch-500 text-navy-900 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider rounded-full 
                             shadow-[0_0_20px_rgba(255,161,35,0.4)] hover:shadow-[0_0_30px_rgba(255,161,35,0.6)] transition-shadow">
                Kommende forestilling
              </span>
              <span className="px-4 py-2 bg-navy-800/80 backdrop-blur-sm border border-gold-500/30 text-gold-400 text-xs sm:text-sm font-sans font-semibold uppercase tracking-wide rounded-full">
                {data.genre}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold-400 leading-tight
                         drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">
              {data.title}
            </h2>

            {/* Meta info */}
            <div className="flex flex-wrap gap-6 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-gold-400 font-sans font-medium">
                <div className="p-2 bg-gold-500/10 rounded-lg border border-gold-500/20">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span>{data.dates}</span>
              </div>
              <div className="flex items-center gap-2 text-gold-400 font-sans font-medium">
                <div className="p-2 bg-gold-500/10 rounded-lg border border-gold-500/20">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span>Fra {data.ageRating}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-navy-100 text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed">
              {data.description}
            </p>

            {/* Highlights - better contrast */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {data.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-3 text-gold-400 font-sans font-medium text-sm sm:text-base
                           p-3 bg-navy-800/50 backdrop-blur-sm rounded-lg border border-gold-500/20
                           hover:bg-navy-800/70 hover:border-gold-500/30 transition-all"
                >
                  <div className="w-2 h-2 bg-gold-500 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  <span>{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs - improved hierarchy and contrast */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to={data.ctaLink}
                className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 
                         bg-torch-500 text-navy-900 font-sans font-bold text-base sm:text-lg rounded-lg
                         hover:bg-torch-400 transition-all duration-300 transform hover:scale-105
                         shadow-[0_0_30px_rgba(255,161,35,0.5)] hover:shadow-[0_0_40px_rgba(255,161,35,0.7)]
                         overflow-hidden"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative">Les mer om forestillingen</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/billetter"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 
                         border-2 border-gold-500 bg-gold-500/5 text-gold-400 font-sans font-bold text-base sm:text-lg rounded-lg 
                         hover:bg-gold-500/15 hover:border-gold-400 hover:text-gold-300 transition-all duration-300
                         shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]"
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