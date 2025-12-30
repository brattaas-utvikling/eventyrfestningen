// routes/landing/components/AnimatedCurtain.tsx
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface Props {
  side: 'left' | 'right'
  scrollProgress: MotionValue<number>
}

export default function AnimatedCurtain({ side, scrollProgress }: Props) {
  const prefersReducedMotion = useReducedMotion()

  // Curtain slides out
  const curtainX = useTransform(
    scrollProgress,
    [0, 0.5],
    side === 'left' 
      ? prefersReducedMotion ? ["0%", "0%"] : ["0%", "-100%"]
      : prefersReducedMotion ? ["0%", "0%"] : ["0%", "100%"]
  )

  const curtainOpacity = useTransform(scrollProgress, [0, 0.3, 0.5], [1, 0.8, 0])

  // Wave animation values
  const waveAmplitude = 15 // pixels

  return (
    <motion.div
      className="absolute inset-y-0 w-1/2 overflow-hidden"
      style={{
        [side]: 0,
        x: curtainX,
        opacity: curtainOpacity
      }}
    >
      {/* Multiple fabric strips for depth */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
        <motion.div
          key={idx}
          className="absolute inset-y-0 bg-linear-to-b from-burgundy-800 via-burgundy-700 to-burgundy-900"
          style={{
            width: `${100 / 9}%`,
            left: side === 'left' ? `${(idx * 100) / 9}%` : 'auto',
            right: side === 'right' ? `${(idx * 100) / 9}%` : 'auto',
            filter: `brightness(${0.85 + idx * 0.02})`,
            boxShadow: side === 'left' 
              ? 'inset -2px 0 4px rgba(0,0,0,0.3)'
              : 'inset 2px 0 4px rgba(0,0,0,0.3)'
          }}
          animate={!prefersReducedMotion ? {
            x: [
              0,
              Math.sin((idx * Math.PI) / 4) * waveAmplitude,
              0
            ],
          } : {}}
          transition={{
            duration: 3 + idx * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.1
          }}
        >
          {/* Fabric texture overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(0,0,0,0.1) 2px,
                rgba(0,0,0,0.1) 4px
              )`
            }}
          />

          {/* Highlight on edge */}
          <div
            className="absolute inset-y-0 w-1 bg-linear-to-b from-gold-500/30 via-gold-500/10 to-transparent"
            style={{
              [side === 'left' ? 'right' : 'left']: 0
            }}
          />
        </motion.div>
      ))}

      {/* Gold trim at the edge */}
      <motion.div
        className="absolute inset-y-0 w-2"
        style={{
          [side === 'left' ? 'right' : 'left']: 0,
          background: 'linear-gradient(to bottom, #f59e0b, #d97706, #b45309)',
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
        }}
        animate={!prefersReducedMotion ? {
          boxShadow: [
            '0 0 20px rgba(251, 191, 36, 0.5)',
            '0 0 30px rgba(251, 191, 36, 0.8)',
            '0 0 20px rgba(251, 191, 36, 0.5)'
          ]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Tassel at bottom */}
      <motion.div
        className="absolute bottom-0 flex justify-center gap-2 pb-8"
        style={{
          [side === 'left' ? 'right' : 'left']: '10%',
          width: '20%'
        }}
      >
        {[0, 1, 2].map((tassel) => (
          <motion.div
            key={tassel}
            className="w-1 h-12 bg-linear-to-b from-gold-600 to-gold-800 rounded-full"
            animate={!prefersReducedMotion ? {
              rotate: [-5, 5, -5],
              scaleY: [1, 1.05, 1]
            } : {}}
            transition={{
              duration: 2 + tassel * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: tassel * 0.2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}