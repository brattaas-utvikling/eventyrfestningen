// routes/landing/sections/HeroScene.tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import SimpleCurtain from '../components/SimpleCurtain'

interface HeroData {
  headline: string
  subheadline: string
  backgroundImage: string
  curtainOverlay?: string
  ctaText: string
  ctaLink: string
}

interface Props {
  data: HeroData
}

export default function HeroScene({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "50%"]
  )
  
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 1, 0])
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "30%"]
  )

  // Move this hook OUTSIDE the conditional - hooks must always be called
  // const centerGlowOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0, 1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative h-[150vh] bg-navy-900"
    >
      {/* Background - festningen */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img
          src={data.backgroundImage}
          alt="Kongsvinger Festning"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy-900/70 via-navy-900/50 to-navy-900" />
      </motion.div>

      {/* Simple Curtains - NO wavy animation */}
      {data.curtainOverlay && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <SimpleCurtain 
            side="left" 
            imageSrc={data.curtainOverlay} 
            scrollProgress={scrollYProgress} 
          />
          <SimpleCurtain 
            side="right" 
            imageSrc={data.curtainOverlay} 
            scrollProgress={scrollYProgress} 
          />

          {/* Center golden glow as curtains open */}
          {/* <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-gold-500/20 to-transparent pointer-events-none"
            style={{ opacity: centerGlowOpacity }}
          /> */}
        </div>
      )}

      {/* Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gold-400 mb-6 px-4"
          style={{
            textShadow: "0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.3)"
          }}
        >
          {data.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-navy-200 max-w-2xl mb-12 font-sans font-light px-4"
        >
          {data.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Link
            to={data.ctaLink}
            className="inline-block px-8 py-4 bg-torch-500 text-navy-900 font-sans font-semibold text-lg rounded-md
                       hover:bg-torch-400 transition-all duration-300 transform hover:scale-105
                       shadow-[0_0_20px_rgba(255,161,35,0.5)] hover:shadow-[0_0_30px_rgba(255,161,35,0.7)]"
          >
            {data.ctaText}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 sm:bottom-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-gold-400 text-xs sm:text-sm font-sans uppercase tracking-wider">
              Scroll for å utforske
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-gold-400" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}