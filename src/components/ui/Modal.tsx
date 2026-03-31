// src/components/ui/Modal.tsx
import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  // Capture the trigger element so we can return focus when modal closes
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      // Defer focus to after animation frame so the element is visible
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      // Return focus to the element that opened the modal
      (triggerRef.current as HTMLElement | null)?.focus();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-4 top-[5vh] z-50 mx-auto flex max-h-[90vh] max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-cynical-900 shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-6 py-4">
              <h2
                id={titleId}
                className="font-sans text-sm font-semibold uppercase tracking-[0.1em] text-white/50"
              >
                {title}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/35 transition-colors hover:bg-white/8 hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-torch-500"
                aria-label="Lukk"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
