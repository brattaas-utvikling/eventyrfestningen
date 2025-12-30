// lib/hooks/useParallax.ts
import { useRef } from 'react'
import { useScroll, useTransform, type MotionValue, type UseScrollOptions } from 'framer-motion'

interface UseParallaxOptions {
  offset?: UseScrollOptions['offset']
  speed?: number // Multiplier: negative = slower, positive = faster
}

interface ParallaxReturn {
  ref: React.RefObject<HTMLElement | null>
  y: MotionValue<string>
  scrollYProgress: MotionValue<number>
}

export function useParallax(options: UseParallaxOptions = {}): ParallaxReturn {
  const { offset = ["start end", "end start"], speed = -0.5 } = options
  const ref = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * -100}%`, `${speed * 100}%`]
  )

  return { ref, y, scrollYProgress }
}