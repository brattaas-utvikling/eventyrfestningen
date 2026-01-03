// routes/landing/components/SimpleCurtain.tsx
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface Props {
  side: 'left' | 'right'
  imageSrc: string
  scrollProgress: MotionValue<number>
}

export default function SimpleCurtain({ side, imageSrc, scrollProgress }: Props) {
  const prefersReducedMotion = useReducedMotion()

  const curtainX = useTransform(
    scrollProgress,
    [0, 0.5],
    side === 'left' 
      ? prefersReducedMotion ? ["0%", "0%"] : ["0%", "-110%"]
      : prefersReducedMotion ? ["0%", "0%"] : ["0%", "110%"]
  )

  const curtainOpacity = useTransform(scrollProgress, [0, 0.3, 0.5], [1, 0.8, 0])

  return (
    <motion.div
      className="absolute inset-y-0 w-[55%]"
      style={{
        [side]: 0,
        x: curtainX,
        opacity: curtainOpacity,
        zIndex: side === 'left' ? 11 : 10,
        willChange: 'transform, opacity'  // GPU optimization hint
      }}
    >
      <div className="relative w-full h-full">
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
          style={{
            objectPosition: side === 'left' ? 'right' : 'left',
            transform: side === 'right' ? 'scaleX(-1)' : 'none',
            filter: 'drop-shadow(4px 0 8px rgba(0,0,0,0.5))'
          }}
          loading="eager"
        />

        {/* Static shadow for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: side === 'left'
              ? 'linear-gradient(to right, transparent 70%, rgba(0,0,0,0.5))'
              : 'linear-gradient(to left, transparent 70%, rgba(0,0,0,0.5))'
          }}
        />
      </div>
    </motion.div>
  )
}