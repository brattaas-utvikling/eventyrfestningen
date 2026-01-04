// routes/landing/sections/UpcomingShowScene.tsx (Using consistent button styles)
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { Link } from 'react-router-dom'
// import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

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
  
  // Darker overlay for better text readability
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.80, 0.85])

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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Decorative corner accents - INSIDE the frame */}
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
              
              {/* Decorative corners - ON the frame */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold-500 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold-500 rounded-br-lg" />
            </div>
            
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block text-torch-400 font-sans text-sm uppercase tracking-widest mb-4">
                Kommende forestilling
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold-400 leading-tight
                         drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">
              {data.title}
            </h2>

            {/* Description - Better contrast with darker background */}
            <p className="text-navy-50 text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed
                        drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {data.description}
            </p>

            {/* Highlights - Slower fade-in animation */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {data.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}  // Changed from whileInView to animate
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6 + idx * 0.15,
                    ease: "easeOut"
                  }}
                  className="flex items-center gap-3 text-gold-300 font-sans font-medium text-sm sm:text-base
                            p-3 bg-navy-800/50 backdrop-blur-sm rounded-lg border border-gold-500/20
                            hover:bg-navy-800/70 hover:border-gold-500/30 transition-all"
                >
                  <div className="w-2 h-2 bg-gold-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  <span>{highlight}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs - Using button variants */}
            <div className="flex flex-col gap-4 pt-4">
              {/* Primary CTA - Torch variant */}
              <Link
                to="/billetter"
                className={cn(
                  buttonVariants({ variant: "torch", size: "xl" }),
                  "group relative overflow-hidden"  // Added 'relative' to contain the shine
                )}
              >
                {/* Button shine effect - now contained within button */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                <span className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Kjøp billetter</span>
              </Link>

              {/* Secondary link - Text link */}
              {/* <Link
                to={data.ctaLink}
                className="group inline-flex items-center justify-center gap-2 
                        text-gold-300 hover:text-gold-200 font-sans font-medium text-base sm:text-lg
                        transition-colors duration-200"
              >
                <span className="border-b-2 border-gold-500/30 group-hover:border-gold-400/60 transition-colors">
                  Les mer om forestillingen
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link> */}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}