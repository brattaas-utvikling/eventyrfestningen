// src/components/volunteer/VolunteerStepIndicator.tsx
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useVolunteer } from '@/contexts/VolunteerContext';
import { VOLUNTEER_STEPS } from '@/types/volunteer';
import { cn } from '@/lib/utils';

export default function VolunteerStepIndicator() {
  const { currentStepIndex } = useVolunteer();
  const total = VOLUNTEER_STEPS.length;

  // Progress line width: 0% at step 0, 100% at last step
  const progressPct =
    currentStepIndex === 0
      ? 0
      : (currentStepIndex / (total - 1)) * 100;

  return (
    <nav
      aria-label="Steg i påmeldingsskjema"
      className="w-full"
      role="navigation"
    >
      {/* Connected timeline */}
      <div className="relative flex items-start justify-between">

        {/* Background track — sits behind circles */}
        <div
          aria-hidden="true"
          className="absolute left-[1.125rem] right-[1.125rem] top-[1.125rem] h-px bg-white/8"
        />

        {/* Animated progress fill */}
        <div
          aria-hidden="true"
          className="absolute left-[1.125rem] top-[1.125rem] h-px origin-left overflow-hidden"
          style={{ width: `calc(${progressPct}% * (100% - 2.25rem) / 100)` }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-torch-600 to-gold-400"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ originX: 0, width: '100%' }}
          />
        </div>

        {/* Step circles */}
        <ol
          className="relative flex w-full justify-between"
          role="progressbar"
          aria-valuenow={currentStepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={total}
        >
          {VOLUNTEER_STEPS.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;
            const isUpcoming = index > currentStepIndex;

            return (
              <li
                key={step.id}
                className="relative z-10 flex flex-col items-center gap-2.5"
                aria-current={isActive ? 'step' : undefined}
              >
                {/* Circle */}
                <motion.div
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300',
                    isCompleted && 'border-gold-400 bg-gold-400 text-cynical-900',
                    isActive && [
                      'border-torch-500 bg-cynical-900 text-torch-500',
                      'shadow-[0_0_0_4px_rgba(255,161,35,0.12),0_0_16px_rgba(255,161,35,0.25)]',
                    ],
                    isUpcoming && 'border-white/12 bg-cynical-900 text-white/20'
                  )}
                  animate={
                    isActive
                      ? { scale: [1, 1.05, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {isCompleted ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      <Check className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <span className="text-sm font-semibold font-sans leading-none">
                      {index + 1}
                    </span>
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={cn(
                    'hidden text-center font-sans transition-colors duration-300 sm:block',
                    // Shorter on small-ish screens
                    'text-[11px] sm:text-xs',
                    isCompleted && 'text-gold-400',
                    isActive && 'font-semibold text-torch-400',
                    isUpcoming && 'text-white/20'
                  )}
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
