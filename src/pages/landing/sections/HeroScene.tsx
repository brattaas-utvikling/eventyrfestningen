// routes/landing/sections/HeroScene.tsx (With theatrical indicator)
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import SimpleCurtain from '../components/SimpleCurtain'
import ScrollIndicator from '../components/ScrollIndicator'

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
  
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReducedMotion ? [1, 1] : [1, 0.98]
  )

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-navy-950"
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
        <div className="absolute inset-0 bg-linear-to-b from-navy-950/40 via-navy-950/60 to-navy-950/90" />
      </motion.div>

      {/* Simple Curtains */}
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
        </div>
      )}

      {/* Content - Just headline and scroll indicator */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center"
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="mb-24"
        >
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-gold-400
                     leading-tight px-4 max-w-5xl mx-auto font-normal"
            style={{
              textShadow: "0 0 40px rgba(251, 191, 36, 0.5), 0 0 80px rgba(251, 191, 36, 0.2)"
            }}
          >
            {data.headline}
          </h1>

          {/* Decorative underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
            className="h-px w-32 sm:w-48 md:w-64 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-8 sm:mt-12"
          />
        </motion.div>

        {/* Theatrical scroll indicator */}
        <div className="absolute bottom-16 sm:bottom-20 md:bottom-24">
          <ScrollIndicator variant="spotlight" />
        </div>
      </motion.div>
    </section>
  )
}