// routes/landing/sections/ArchiveTeaser.tsx (Version 2: Fullscreen with Timeline - Updated)
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

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
    offset: ["start start", "end start"]
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "40%"]
  )

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.2]
  )

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "-20%"]
  )

  // Sort years chronologically (oldest first)
  const sortedYears = [...data.highlightYears].sort((a, b) => parseInt(a) - parseInt(b))

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Fullscreen background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY }}
      >
        <motion.img
          src={data.previewImage}
          alt="Arkiv"
          className="w-full h-full object-cover"
          style={{ scale: imageScale }}
        />
        
        {/* Heavy gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/80 to-navy-950" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-navy-950" />
      </motion.div>

      {/* Content overlay */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-between py-20 px-4"
        style={{ y: contentY }}
      >
        {/* Top: Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-torch-400 font-sans text-sm uppercase tracking-widest">
            {data.subtitle}
          </span>

          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gold-400 mb-6 leading-tight
                       drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
            {data.title}
          </h2>
{/* 
          <p className="text-white text-xl md:text-2xl font-sans font-light max-w-2xl mx-auto
                      drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {data.description}
          </p> */}
        </motion.div>

        {/* Bottom: Timeline + CTA */}
        <div className="max-w-6xl mx-auto w-full">
          {/* Year Timeline - Horizontal with years below dots */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="mb-12"
          >
            <div className="relative pb-16">
              {/* Timeline line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
              
              {/* Year badges on timeline */}
              <div className="relative flex justify-between items-start px-4">
                {sortedYears.map((year, idx) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: 0.5 + idx * 0.1,
                      duration: 0.6,
                      ease: "backOut"
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -10,
                      transition: { duration: 0.2 }
                    }}
                    className="relative group cursor-pointer flex flex-col items-center"
                  >
                    {/* Dot on timeline */}
                    <div className="w-4 h-4 bg-gold-500 rounded-full border-4 border-navy-900 
                                  shadow-[0_0_20px_rgba(251,191,36,0.8)]
                                  group-hover:bg-torch-500 group-hover:shadow-[0_0_30px_rgba(255,161,35,0.9)]
                                  transition-all mb-4" />
                    
                    {/* Year label below dot */}
                    <motion.div
                      className="text-gold-400 font-display font-bold text-lg sm:text-xl md:text-2xl
                               drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                               group-hover:text-torch-400 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                    >
                      {year}
                    </motion.div>

                    {/* Glow effect on dot */}
                    <motion.div
                      className="absolute top-0 w-4 h-4 rounded-full bg-gold-500/30 blur-xl pointer-events-none"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.3
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="text-center"
          >
            <Link
              to={data.ctaLink}
              className={cn(
                buttonVariants({ variant: "torch", size: "xl" }),
                "group relative overflow-hidden text-xl px-12 py-6"
              )}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
              <span className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">{data.ctaText}</span>
              <ArrowRight className="relative w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative corner frames */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-gold-500/40" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-gold-500/40" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-gold-500/40" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-gold-500/40" />
      </div>
    </section>
  )
}