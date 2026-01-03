// routes/landing/sections/ExperienceScene.tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface ExperienceHighlight {
  title: string
  description: string
  image: string
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
      {/* Section background with parallax */}
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

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.highlights.map((highlight, idx) => (
            <Card
              key={idx}
              idx={idx}
              total={data.highlights.length}
              highlight={highlight}
              scrollYProgress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Individual card component
interface CardProps {
  idx: number
  total: number
  highlight: ExperienceHighlight
  scrollYProgress: MotionValue<number>
  prefersReducedMotion: boolean
}

function Card({ 
  idx, 
  total, 
  highlight, 
  scrollYProgress, 
  prefersReducedMotion
}: CardProps) {
  // Stagger timing for each card
  const cardTrigger = 0.05 + (idx / total) * 0.7

  // Rotation (spin in)
  const rotateY = useTransform(
    scrollYProgress,
    [cardTrigger - 0.1, cardTrigger],
    prefersReducedMotion ? [0, 0] : [-180, 0]
  )

  // Scale (pop in)
  const scale = useTransform(
    scrollYProgress,
    [cardTrigger - 0.1, cardTrigger, cardTrigger + 0.1],
    prefersReducedMotion ? [1, 1, 1] : [0.5, 1.05, 1]
  )

  // Opacity
  const opacity = useTransform(
    scrollYProgress,
    [cardTrigger - 0.1, cardTrigger],
    [0, 1]
  )

  // Y position (slide up)
  const y = useTransform(
    scrollYProgress,
    [cardTrigger - 0.1, cardTrigger],
    prefersReducedMotion ? [0, 0] : [50, 0]
  )

  return (
    <motion.div
      style={{
        rotateY,
        scale,
        opacity,
        y,
        transformStyle: 'preserve-3d'
      }}
      className="group relative"
    >
      {/* Card with individual background image */}
      <div className="relative rounded-lg overflow-hidden h-full shadow-lg hover:shadow-gold-500/20 transition-shadow min-h-[300px]">
        {/* Background image with lighter overlay */}
        <div className="absolute inset-0">
          <img
            src={highlight.image}
            alt={highlight.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Lighter overlay - changed from 85% to 50% */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/50 to-navy-900/30 
                         group-hover:from-navy-900/85 group-hover:via-navy-900/45 group-hover:to-navy-900/25 
                         transition-colors" />
        </div>

        {/* Content - positioned at bottom */}
        <div className="relative h-full flex flex-col justify-end border border-gold-500/20 rounded-lg p-6
                       hover:border-gold-500/40 transition-all duration-300">
          
          {/* Card number badge */}
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-linear-to-br from-gold-500 to-torch-500 
                        rounded-full flex items-center justify-center shadow-lg border-2 border-navy-900
                        transform rotate-12 group-hover:rotate-0 transition-transform">
            <span className="font-display text-sm font-bold text-navy-900">
              {String(idx + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="font-sans font-semibold text-xl md:text-2xl text-gold-400 mb-2">
              {highlight.title}
            </h3>
            <p className="text-navy-100 font-sans font-light leading-relaxed">
              {highlight.description}
            </p>
          </div>

          {/* Decorative corners */}
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold-500/30 rounded-tr-lg 
                         opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold-500/30 rounded-bl-lg 
                         opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </motion.div>
  )
}