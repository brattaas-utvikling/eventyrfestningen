// src/components/volunteer/VolunteerWizard.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { VolunteerProvider, useVolunteer } from '@/contexts/VolunteerContext';
import VolunteerStepIndicator from './VolunteerStepIndicator';
import PersonalInfoStep from './steps/PersonalInfoStep';
import RoleSelectionStep from './steps/RoleSelectionStep';
import VolunteerSummaryStep from './steps/VolunteerSummaryStep';
import VolunteerConfirmationStep from './steps/VolunteerConfirmationStep';

// ─── Inner wizard (needs context) ────────────────────────────────────────────

function WizardInner() {
  const { state } = useVolunteer();
  const { currentStep } = state;
  const isConfirmation = currentStep === 'bekreftelse';

  return (
    <div className="w-full">
      {/* Step indicator — hidden on confirmation */}
      <AnimatePresence>
        {!isConfirmation && (
          <motion.div
            key="step-indicator"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mb-10"
          >
            <VolunteerStepIndicator />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step content — AnimatePresence needs motion.div as direct child */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {currentStep === 'personlig-info' && <PersonalInfoStep />}
          {currentStep === 'roller' && <RoleSelectionStep />}
          {currentStep === 'oppsummering' && <VolunteerSummaryStep />}
          {currentStep === 'bekreftelse' && <VolunteerConfirmationStep />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Public export (wraps with provider) ─────────────────────────────────────

export default function VolunteerWizard() {
  return (
    <VolunteerProvider>
      <WizardInner />
    </VolunteerProvider>
  );
}
