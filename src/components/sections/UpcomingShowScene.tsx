// routes/landing/sections/UpcomingShowScene.tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'
import { useReducedMotion } from '@/hooks/useRedusedMotion'

// Embedded data
const upcomingShowData = {
  title: "Oberst Krebs og de Skotske spionene",
  genre: "Familiemusikal",
  ageRating: "5+",
  description: "En skotsk teatertrupp står utenfor festningsmurene, men de har ikke bare kommet den lange veien til Kongsvinger for å underholde… Du kan forvente en forestilling stappfull av av magi, spenning, humor, dans og fengende musikk når «Oberst Krebs og de skotske spionene» spilles 2. til 11. juli på Kongsvinger festning.",
  poster: "/assets/landing/finale.jpg",
  backgroundImage: "/assets/landing/festningskuliss.webp",
  dates: "Juli 2026",
  ctaLink: "https://eventyrfestningen.ticketco.events/no/nb",
  highlights: [
    "450 publikummere",
    "30+ skuespillere",
    "Spektakulært scenografi",
    "Humor for alle"
  ]
}

export default function UpcomingShowScene() {
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
      className="relative min-h-screen flex items-center overflow-hidden py-20 bg-navy-950"
    >
      {/* Background layer - slower movement */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img
          src={upcomingShowData.backgroundImage}
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
            {/* Poster with frame */}
            <div className="relative aspect-[2/3] max-w-md mx-auto lg:mx-0 rounded-xl overflow-hidden 
                          border-4 border-gold-500/40 shadow-[0_0_60px_rgba(251,191,36,0.25)]
                          hover:border-gold-500/60 hover:shadow-[0_0_80px_rgba(251,191,36,0.35)] transition-all duration-500">
              <img
                src={upcomingShowData.poster}
                alt={`${upcomingShowData.title} plakat`}
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
            {/* Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block text-torch-400 font-sans text-sm uppercase tracking-widest">
                Kommende forestilling
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold-400 leading-tight
                         drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">
              {upcomingShowData.title}
            </h2>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-gold-200 font-sans text-sm">
              <span className="px-3 py-1 bg-navy-800/60 backdrop-blur-sm rounded-full border border-gold-500/20">
                {upcomingShowData.genre}
              </span>
              <span className="px-3 py-1 bg-navy-800/60 backdrop-blur-sm rounded-full border border-gold-500/20">
                {upcomingShowData.ageRating}
              </span>
              <span className="font-sans text-sm">
                {upcomingShowData.dates}
              </span>
            </div>

            {/* Description */}
            <p className="text-navy-50 text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed
                        drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {upcomingShowData.description}
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {upcomingShowData.highlights.map((highlight, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Primary CTA - Kjøp billetter */}
              <a
                href={upcomingShowData.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "torch", size: "xl" }),
                  "group relative overflow-hidden inline-flex w-full sm:w-auto"
                )}
              >
                {/* Button shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                <span className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Kjøp billetter</span>
              </a>

              {/* Secondary CTA - Les mer */}
              <a
                href="/om-forestillingen"
                className={cn(
                  buttonVariants({ variant: "outline", size: "xl" }),
                  "border-2 border-gold-400/60 text-white hover:bg-gold-400/10 hover:border-gold-400 transition-all backdrop-blur-sm bg-navy-900/20 w-full sm:w-auto"
                )}
              >
                Les mer om forestillingen
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}