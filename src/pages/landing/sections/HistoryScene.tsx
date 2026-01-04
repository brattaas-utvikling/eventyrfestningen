// routes/landing/sections/HistoryScene.tsx (Optimized)
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface Stat {
  number: string
  label: string
}

interface HistoryData {
  yearsActive: string
  title: string
  summary: string
  vintageImage: string
  stats: Stat[]
  ctaText: string
  ctaLink: string
}

interface Props {
  data: HistoryData
}

// Animated counter component
function CountUp({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | undefined
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

export default function HistoryScene({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [1.2, 1, 1.2]
  )
  
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-navy-900 py-20 overflow-hidden"
    >
      {/* Vintage paper texture overlay */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none">
        <div className="w-full h-full bg-[url('/textures/old-paper.png')] bg-repeat opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <span className="text-torch-400 font-sans text-sm uppercase tracking-widest">
                {data.title}
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gold-400 mt-2
                           drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                {data.yearsActive}
              </h2>
            </div>

            <p className="text-navy-50 text-base md:text-lg font-sans font-light leading-relaxed
                        drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {data.summary}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4">
              {data.stats.map((stat, idx) => {
                const numValue = parseInt(stat.number.replace(/\D/g, ''))
                const hasPlusSign = stat.number.includes('+')

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.8 + idx * 0.15, 
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                    className="text-center p-4 md:p-6 bg-navy-800/50 backdrop-blur-sm rounded-lg border border-gold-500/20
                               hover:border-gold-500/40 hover:bg-navy-800/70 transition-all duration-300"
                  >
                    <div className="font-display text-3xl md:text-4xl lg:text-5xl text-gold-400 mb-2
                                  drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                      <CountUp end={numValue} suffix={hasPlusSign ? "+" : ""} />
                    </div>
                    <div className="text-gold-300 text-xs md:text-sm font-sans uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA - Moved to right side */}
            <div className="flex justify-end pt-4">
              <Link
                to={data.ctaLink}
                className="group inline-flex items-center gap-2 
                         text-gold-300 hover:text-gold-200 font-sans font-medium text-base md:text-lg
                         transition-colors duration-200"
              >
                <span className="border-b-2 border-gold-500/30 group-hover:border-gold-400/60 transition-colors">
                  {data.ctaText}
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Vintage image with corners INSIDE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <motion.div
              style={{ scale: imageScale, opacity: imageOpacity }}
              className="relative aspect-square max-w-lg mx-auto rounded-xl overflow-hidden 
                       border-4 border-gold-500/40 shadow-[0_0_60px_rgba(251,191,36,0.25)]
                       hover:border-gold-500/60 hover:shadow-[0_0_80px_rgba(251,191,36,0.35)] 
                       transition-all duration-500"
            >
              <img
                src={data.vintageImage}
                alt="Eventyrfestningen historie"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ filter: 'sepia(0.6) contrast(1.1)' }}
              />
              
              {/* Vintage vignette overlay */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-navy-900/40 pointer-events-none" />
              
              {/* Corner ornaments - INSIDE the frame */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold-500 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold-500 rounded-br-lg" />
            </motion.div>

            {/* Pulsing glow effect behind image */}
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
        </div>
      </div>
    </section>
  )
}