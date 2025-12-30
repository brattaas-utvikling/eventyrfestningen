// routes/landing/components/ScrollIndicator.tsx (Advanced version)
import { motion } from 'framer-motion'
import { ChevronDown, ArrowDown } from 'lucide-react'

interface Props {
  text?: string
  variant?: 'chevron' | 'mouse' | 'arrow' | 'dots'
  className?: string
}

export default function ScrollIndicator({ 
  text = "Scroll for å utforske",
  variant = 'chevron',
  className = ""
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className={`flex flex-col items-center gap-2 ${className}`}
    >
      <span className="text-gold-400 text-xs sm:text-sm font-sans uppercase tracking-wider">
        {text}
      </span>
      
      {variant === 'chevron' && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-6 h-6 text-gold-400" />
        </motion.div>
      )}

      {variant === 'arrow' && (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.2,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="w-6 h-6 text-gold-400" />
        </motion.div>
      )}

      {variant === 'mouse' && (
        <motion.div 
          className="w-6 h-10 border-2 border-gold-400 rounded-full relative flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 bg-gold-400 rounded-full"
          />
        </motion.div>
      )}

      {variant === 'dots' && (
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-gold-400 rounded-full"
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}