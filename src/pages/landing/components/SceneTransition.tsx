// routes/landing/components/SceneTransition.tsx
import { motion } from 'framer-motion'

interface Props {
  variant?: 'fade' | 'wave' | 'curtain'
  color?: string
  height?: string
}

export default function SceneTransition({ 
  variant = 'fade', 
  color = 'rgb(23, 23, 23)', 
  height = '8rem' 
}: Props) {
  if (variant === 'fade') {
    return (
      <div 
        className="w-full bg-gradient-to-b from-transparent to-navy-900"
        style={{ height }}
      />
    )
  }

  if (variant === 'curtain') {
    return (
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full h-1 bg-gold-500 origin-top"
      />
    )
  }

  // Wave SVG
  return (
    <div className="w-full" style={{ height }}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,60 350,0 600,40 C850,80 1050,20 1200,60 L1200,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}