// routes/landing/sections/CharacterCarousel.tsx
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Character {
  name: string
  role: string
  description: string
  image: string
}

interface CharacterCarouselData {
  title: string
  subtitle: string
  backgroundImage: string
  characters: Character[]
}

interface Props {
  data: CharacterCarouselData
}

export default function CharacterCarousel({ data }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "30%"]
  )

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 0.82, 0.88])

  const nextCharacter = () => {
    setActiveIndex((prev) => (prev + 1) % data.characters.length)
  }

  const prevCharacter = () => {
    setActiveIndex((prev) => (prev - 1 + data.characters.length) % data.characters.length)
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden py-20"
    >
      {/* Background with parallax */}
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

      {/* Theatrical curtain frame */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute inset-0 border-[30px] sm:border-[50px] border-navy-900/40 backdrop-blur-sm" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-navy-900 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-navy-900 to-transparent" />
      </div>

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
            Karakterer
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-400 mb-4">
            {data.title}
          </h2>
          <p className="text-navy-200 text-lg md:text-xl font-sans font-light max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop: Side-by-side layout */}
          <div className="hidden lg:flex gap-12 items-center">
            {/* Character Image - Left */}
            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -50, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 50, rotateY: 15 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Spotlight effect */}
                  <div className="absolute -inset-20 z-0 pointer-events-none">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-full h-full rounded-full bg-gold-500/30 blur-3xl"
                    />
                  </div>

                  <img
                    src={data.characters[activeIndex].image}
                    alt={data.characters[activeIndex].name}
                    className="relative z-10 w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />
                  
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-gold-500/60 rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-gold-500/60 rounded-br-2xl" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Character Info - Right */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {/* Character number */}
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-gold-500 to-torch-500 
                                  flex items-center justify-center shadow-lg border-2 border-navy-900">
                      <span className="font-display text-xl font-bold text-navy-900">
                        {String(activeIndex + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-gold-500/60 font-sans text-sm uppercase tracking-widest">
                      {data.characters[activeIndex].role}
                    </span>
                  </div>

                  {/* Character name */}
                  <h3 className="font-display text-4xl md:text-5xl text-gold-400 mb-6 leading-tight">
                    {data.characters[activeIndex].name}
                  </h3>

                  {/* Description */}
                  <p className="text-navy-200 font-sans text-lg md:text-xl font-light leading-relaxed mb-8">
                    {data.characters[activeIndex].description}
                  </p>

                  {/* Navigation dots */}
                  <div className="flex gap-3">
                    {data.characters.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="group relative"
                      >
                        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === activeIndex 
                            ? 'bg-gold-500 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                            : 'bg-gold-500/30 group-hover:bg-gold-500/50'
                        }`} />
                        {idx === activeIndex && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 -m-2 rounded-full border-2 border-gold-500/50"
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile/Tablet: Stacked layout */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                {/* Character Image */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl mb-8">
                  {/* Spotlight effect */}
                  <div className="absolute -inset-20 z-0 pointer-events-none">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-full h-full rounded-full bg-gold-500/30 blur-3xl"
                    />
                  </div>

                  <img
                    src={data.characters[activeIndex].image}
                    alt={data.characters[activeIndex].name}
                    className="relative z-10 w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                  
                  {/* Character info overlay on mobile */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    {/* Character number & role */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-gold-500 to-torch-500 
                                    flex items-center justify-center shadow-lg border-2 border-navy-900">
                        <span className="font-display text-lg font-bold text-navy-900">
                          {String(activeIndex + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-gold-400 font-sans text-xs uppercase tracking-widest">
                        {data.characters[activeIndex].role}
                      </span>
                    </div>

                    {/* Character name */}
                    <h3 className="font-display text-3xl sm:text-4xl text-gold-400 mb-3 leading-tight">
                      {data.characters[activeIndex].name}
                    </h3>

                    {/* Description */}
                    <p className="text-navy-100 font-sans text-base sm:text-lg font-light leading-relaxed">
                      {data.characters[activeIndex].description}
                    </p>
                  </div>

                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold-500/60 rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold-500/60 rounded-br-2xl" />
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center gap-3">
                  {data.characters.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="group relative"
                    >
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        idx === activeIndex 
                          ? 'bg-gold-500 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                          : 'bg-gold-500/30 group-hover:bg-gold-500/50'
                      }`} />
                      {idx === activeIndex && (
                        <motion.div
                          layoutId="activeMobileIndicator"
                          className="absolute inset-0 -m-2 rounded-full border-2 border-gold-500/50"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows (all screens) */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4 lg:-mx-16">
            <motion.button
              onClick={prevCharacter}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full 
                       bg-navy-800/90 backdrop-blur-sm border-2 border-gold-500/40 
                       flex items-center justify-center
                       hover:bg-navy-700/90 hover:border-gold-500/60 transition-all
                       shadow-lg hover:shadow-gold-500/20"
            >
              <ChevronLeft className="w-6 h-6 text-gold-400" />
            </motion.button>

            <motion.button
              onClick={nextCharacter}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full 
                       bg-navy-800/90 backdrop-blur-sm border-2 border-gold-500/40 
                       flex items-center justify-center
                       hover:bg-navy-700/90 hover:border-gold-500/60 transition-all
                       shadow-lg hover:shadow-gold-500/20"
            >
              <ChevronRight className="w-6 h-6 text-gold-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}