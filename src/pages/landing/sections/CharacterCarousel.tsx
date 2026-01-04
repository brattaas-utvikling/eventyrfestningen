// routes/landing/sections/CharacterCarousel-v1-cards.tsx
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCards, EffectCoverflow } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'
import 'swiper/css/effect-coverflow'

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
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
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
    swiperInstance?.slideNext()
  }

  const prevCharacter = () => {
    swiperInstance?.slidePrev()
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
          className="absolute inset-0 bg-navy-950"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* Theatrical curtain frame */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute inset-0 border-[20px] sm:border-[40px] border-navy-900/40 backdrop-blur-sm" />
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
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-torch-400 font-sans text-sm uppercase tracking-widest mb-4">
            Karakterer
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-gold-400 my-4
                       drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            {data.title}
          </h2>
          <p className="text-navy-100 text-lg md:text-xl font-sans font-light max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Desktop: Cards Effect (Stacked Deck) */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center max-w-6xl mx-auto">
            {/* Left: Stacked Cards Swiper */}
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination, EffectCards]}
                effect="cards"
                grabCursor={true}
                cardsEffect={{
                  perSlideOffset: 8,
                  perSlideRotate: 2,
                  rotate: true,
                  slideShadows: false,
                }}
                pagination={{
                  clickable: true,
                  bulletActiveClass: 'swiper-pagination-bullet-active-custom',
                }}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="character-cards-swiper"
              >
                {data.characters.map((character, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden 
                                  shadow-[0_0_60px_rgba(251,191,36,0.25)] border-4 border-gold-500/40
                                  hover:shadow-[0_0_80px_rgba(251,191,36,0.35)] hover:border-gold-500/60
                                  transition-all duration-500">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
                      
                      {/* Decorative corners */}
                      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-gold-500 rounded-tl-2xl opacity-80" />
                      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-gold-500 rounded-br-2xl opacity-80" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Pulsing glow */}
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
            </div>

            {/* Right: Character Info */}
            <div>
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Character number & role */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-2 bg-navy-800/80 backdrop-blur-sm border border-gold-500/30 
                               text-torch-300 font-sans text-sm font-semibold uppercase tracking-wide rounded-lg">
                    {data.characters[activeIndex].role}
                  </span>
                </div>

                {/* Character name */}
                <h3 className="font-display text-4xl md:text-5xl xl:text-6xl text-gold-300 mb-6 leading-tight
                             drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                  {data.characters[activeIndex].name}
                </h3>

                {/* Description */}
                <p className="text-navy-100 font-sans text-lg md:text-xl font-light leading-relaxed mb-8">
                  {data.characters[activeIndex].description}
                </p>

                {/* Navigation dots */}
                {/* <div className="flex gap-3">
                  {data.characters.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => swiperInstance?.slideTo(idx)}
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
                          layoutId="activeDesktopIndicator"
                          className="absolute inset-0 -m-2 rounded-full border-2 border-gold-500/50"
                        />
                      )}
                    </motion.button>
                  ))}
                </div> */}
              </motion.div>
            </div>
          </div>

          {/* Desktop Navigation arrows */}
          {/* <div className="flex justify-center gap-4 mt-12">
            <motion.button
              onClick={prevCharacter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-navy-800/90 backdrop-blur-sm border-2 border-gold-500/40 
                       flex items-center justify-center hover:bg-navy-700/90 hover:border-gold-500/60
                       transition-all shadow-lg hover:shadow-gold-500/20"
            >
              <ChevronLeft className="w-6 h-6 text-gold-400" />
            </motion.button>

            <motion.button
              onClick={nextCharacter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-navy-800/90 backdrop-blur-sm border-2 border-gold-500/40 
                       flex items-center justify-center hover:bg-navy-700/90 hover:border-gold-500/60
                       transition-all shadow-lg hover:shadow-gold-500/20"
            >
              <ChevronRight className="w-6 h-6 text-gold-400" />
            </motion.button>
          </div> */}
        </div>

        {/* Mobile: Coverflow Effect */}
        <div className="lg:hidden relative">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active-custom',
            }}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="character-mobile-swiper"
          >
            {data.characters.map((character, idx) => (
              <SwiperSlide key={idx} className="!w-[75vw] xs:!w-[70vw] sm:!w-[60vw] max-w-md">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden 
                              shadow-[0_0_40px_rgba(0,0,0,0.5)] border-4 border-gold-500/30
                              hover:border-gold-500/50 transition-all duration-500">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-gold-500 to-torch-500 
                                    flex items-center justify-center shadow-lg border-2 border-navy-900">
                        <span className="font-display text-base sm:text-lg font-bold text-navy-900">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-navy-800/90 backdrop-blur-sm border border-gold-500/30 
                                   text-gold-400 font-sans text-xs font-semibold uppercase tracking-wide rounded-full">
                        {character.role}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-gold-400 mb-2 leading-tight
                                 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]">
                      {character.name}
                    </h3>

                    <p className="text-navy-50 font-sans text-sm sm:text-base font-light leading-relaxed
                                drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {character.description}
                    </p>
                  </div>

                  <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-t-4 border-l-4 border-gold-500/60 rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-b-4 border-r-4 border-gold-500/60 rounded-br-2xl" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prevCharacter}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-navy-800/90 backdrop-blur-sm border-2 border-gold-500/40 
                       flex items-center justify-center active:bg-navy-700/90 transition-all shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-gold-400" />
            </motion.button>

            <motion.button
              onClick={nextCharacter}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-navy-800/90 backdrop-blur-sm border-2 border-gold-500/40 
                       flex items-center justify-center active:bg-navy-700/90 transition-all shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-gold-400" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Custom Swiper styles */}
      <style>{`
        .character-cards-swiper {
          padding: 40px 20px 80px;
          width: 100%;
          max-width: 500px;
        }

        .character-cards-swiper .swiper-slide {
          background: transparent;
        }

        .character-cards-swiper .swiper-pagination {
          bottom: 20px !important;
        }

        .character-mobile-swiper {
          padding: 40px 0 80px;
          overflow: visible !important;
        }
        
        .character-mobile-swiper .swiper-slide {
          transition: all 0.3s ease;
          opacity: 0.4;
        }
        
        .character-mobile-swiper .swiper-slide-active {
          opacity: 1;
          z-index: 10;
        }
        
        .character-mobile-swiper .swiper-slide-prev,
        .character-mobile-swiper .swiper-slide-next {
          opacity: 0.7;
        }

        .character-mobile-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(251, 191, 36, 0.3);
          opacity: 1;
          transition: all 0.3s;
        }
        
        .swiper-pagination-bullet-active-custom {
          background: rgb(251, 191, 36);
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.8);
          width: 12px;
          height: 12px;
        }
      `}</style>
    </section>
  )
}