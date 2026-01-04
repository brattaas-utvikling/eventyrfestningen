// routes/landing/components/ScrollIndicator.tsx (More theatrical variants)
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Props {
  text?: string
  variant?: 'vintage-badge' | 'ornate-frame' | 'minimal-glow' | 'double-chevron' | 'curtain-pull' | 'spotlight'
  className?: string
}

export default function ScrollIndicator({ 
  text = "Scroll for å utforske",
  variant = 'vintage-badge',
  className = ""
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className={`flex flex-col items-center gap-6 ${className}`}
    >
      {/* Variant 1: Vintage Badge */}
      {variant === 'vintage-badge' && (
        <div className="relative">
          {/* Outer decorative frame */}
          <motion.div
            className="absolute -inset-4 rounded-lg border border-gold-500/20"
            animate={{ 
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          />

          {/* Main badge */}
          <div className="relative px-8 py-4 border border-gold-500/40 rounded-md bg-navy-950/60 backdrop-blur-sm
                        shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <motion.span 
              className="block text-gold-500 text-xs font-serif uppercase tracking-[0.25em] font-light text-center mb-3"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              {text}
            </motion.span>

            <motion.div
              className="flex justify-center"
              animate={{ y: [0, 6, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>
      )}

      {/* Variant 2: Ornate Frame */}
      {variant === 'ornate-frame' && (
        <div className="relative">
          {/* Corner decorations */}
          <div className="absolute -top-2 -left-2 w-3 h-3 border-t border-l border-gold-500/50" />
          <div className="absolute -top-2 -right-2 w-3 h-3 border-t border-r border-gold-500/50" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b border-l border-gold-500/50" />
          <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b border-r border-gold-500/50" />

          {/* Content */}
          <div className="px-6 py-4 bg-navy-900/40 backdrop-blur-sm">
            <motion.span 
              className="block text-gold-500 text-xs font-serif uppercase tracking-[0.3em] font-light text-center mb-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              {text}
            </motion.span>

            <div className="flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -4, 0],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <ChevronDown className="w-4 h-4 text-gold-500" strokeWidth={1.5} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Variant 3: Minimal Glow */}
      {variant === 'minimal-glow' && (
        <div className="relative">
          <motion.span 
            className="block text-gold-500 text-xs sm:text-sm font-serif uppercase tracking-[0.3em] font-light text-center mb-4
                     drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              ease: "easeInOut"
            }}
          >
            {text}
          </motion.span>

          <motion.div
            className="relative w-10 h-10 mx-auto rounded-full border border-gold-500/40 
                     flex items-center justify-center bg-navy-950/30 backdrop-blur-sm"
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gold-500/20 blur-md"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Variant 4: Double Chevron */}
      {variant === 'double-chevron' && (
        <div className="flex flex-col items-center">
          <motion.span 
            className="text-gold-500 text-xs font-serif uppercase tracking-[0.3em] font-light mb-4"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            {text}
          </motion.span>

          <div className="relative h-12">
            <motion.div
              className="absolute inset-0 flex items-start justify-center"
              animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="w-6 h-6 text-gold-500" strokeWidth={1.5} />
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-end justify-center"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              <ChevronDown className="w-6 h-6 text-gold-500" strokeWidth={1.5} />
            </motion.div>
          </div>
        </div>
      )}

      {/* Variant 5: Curtain Pull */}
      {variant === 'curtain-pull' && (
        <div className="flex flex-col items-center gap-4">
          <motion.span 
            className="text-gold-500 text-xs font-serif uppercase tracking-[0.3em] font-light"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            {text}
          </motion.span>

          {/* Rope/tassel effect */}
          <div className="flex flex-col items-center gap-1">
            <motion.div
              className="w-0.5 h-8 bg-gradient-to-b from-gold-500/50 to-gold-500/20"
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              <div className="w-8 h-8 rounded-full border-2 border-gold-500/40 
                           flex items-center justify-center bg-navy-950/40 backdrop-blur-sm
                           shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <ChevronDown className="w-4 h-4 text-gold-500" strokeWidth={2} />
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Variant 6: Spotlight */}
      {variant === 'spotlight' && (
        <div className="relative">
          {/* Spotlight beam effect */}
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-transparent to-gold-500/30 blur-sm"
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scaleY: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="relative px-6 py-3 rounded-lg bg-navy-950/50 backdrop-blur-sm
                     border border-gold-500/30 shadow-[0_0_30px_rgba(251,191,36,0.2)]"
            animate={{ 
              boxShadow: [
                '0 0 30px rgba(251, 191, 36, 0.2)',
                '0 0 40px rgba(251, 191, 36, 0.4)',
                '0 0 30px rgba(251, 191, 36, 0.2)'
              ]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <motion.span 
              className="block text-gold-500 text-xs font-serif uppercase tracking-[0.25em] font-light text-center"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
            >
              {text}
            </motion.span>
          </motion.div>

          <motion.div
            className="mt-4 flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="w-5 h-5 text-gold-500" strokeWidth={1.5} />
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}