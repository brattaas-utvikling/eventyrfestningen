// routes/landing/components/WavyCurtain.tsx
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface Props {
  side: 'left' | 'right'
  imageSrc: string
  scrollProgress: MotionValue<number>
}

export default function WavyCurtain({ side, imageSrc, scrollProgress }: Props) {
  const prefersReducedMotion = useReducedMotion()

  const curtainX = useTransform(
    scrollProgress,
    [0, 0.5],
    side === 'left' 
      ? prefersReducedMotion ? ["0%", "0%"] : ["0%", "-110%"]  // Changed: -110% instead of -100%
      : prefersReducedMotion ? ["0%", "0%"] : ["0%", "110%"]   // Changed: 110% instead of 100%
  )

  const curtainOpacity = useTransform(scrollProgress, [0, 0.3, 0.5], [1, 0.8, 0])

  return (
    <motion.div
      className="absolute inset-y-0 w-[55%]"  // Changed: 55% instead of 50% (10% overlap)
      style={{
        [side]: 0,
        x: curtainX,
        opacity: curtainOpacity,
        transformOrigin: side === 'left' ? 'right' : 'left',
        zIndex: side === 'left' ? 11 : 10  // Left curtain on top for realistic overlap
      }}
    >
      {/* Main curtain image with wave effect */}
      <motion.div
        className="relative w-full h-full"
        animate={!prefersReducedMotion ? {
          skewX: side === 'left' ? [0, -1, 0] : [0, 1, 0],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
          style={{
            objectPosition: side === 'left' ? 'right' : 'left',
            transform: side === 'right' ? 'scaleX(-1)' : 'none',
            filter: 'drop-shadow(4px 0 8px rgba(0,0,0,0.5))'
          }}
        />

        {/* Animated shadow for depth */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: side === 'left'
              ? 'linear-gradient(to right, transparent 70%, rgba(0,0,0,0.4))'
              : 'linear-gradient(to left, transparent 70%, rgba(0,0,0,0.4))'
          }}
          animate={!prefersReducedMotion ? {
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Multiple overlay strips for wave illusion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2, 3, 4].map((wave) => (
          <motion.div
            key={wave}
            className="absolute inset-y-0 w-full opacity-10"
            style={{
              background: side === 'left'
                ? 'linear-gradient(to right, transparent, rgba(139, 0, 0, 0.5), transparent)'
                : 'linear-gradient(to left, transparent, rgba(139, 0, 0, 0.5), transparent)',
              left: `${wave * 20}%`
            }}
            animate={!prefersReducedMotion ? {
              x: side === 'left' ? [-20, 20, -20] : [20, -20, 20],
              scaleX: [1, 1.2, 1]
            } : {}}
            transition={{
              duration: 3 + wave * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: wave * 0.3
            }}
          />
        ))}
      </div>

    </motion.div>
  )
}