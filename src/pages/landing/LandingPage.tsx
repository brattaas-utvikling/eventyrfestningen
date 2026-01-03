// routes/landing/LandingPage.tsx
import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'
import { landingData } from './data/landingData'

// Sections
import HeroScene from './sections/HeroScene'
import UpcomingShowScene from './sections/UpcomingShowScene'
import ExperienceScene from './sections/ExperienceScene'
import HistoryScene from './sections/HistoryScene'
import ArchiveTeaser from './sections/ArchiveTeaser'
import PracticalScene from './sections/PracticalScene'
import CTAScene from './sections/CTAScene'
import CharacterCarousel from './sections/CharacterCarousel'

export default function LandingPage() {
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll()
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Disable scroll restoration & scroll to top on mount
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="relative bg-navy-900 overflow-x-hidden">
      {/* Progress indicator */}
      {!prefersReducedMotion && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gold-500 origin-left z-50"
          style={{ scaleX: scaleProgress }}
        />
      )}

      {/* Scenes */}
      <HeroScene data={landingData.hero} />
      <UpcomingShowScene data={landingData.upcomingShow} />
      <ExperienceScene data={landingData.experience} />
      <HistoryScene data={landingData.history} />
      <ArchiveTeaser data={landingData.archive} />
      <CharacterCarousel data={landingData.characters} />
      <PracticalScene data={landingData.practical} />
      <CTAScene data={landingData.finalCTA} />
    </main>
  )
}