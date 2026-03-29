// src/contexts/VolunteerContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type {
  VolunteerState,
  VolunteerAction,
  VolunteerStep,
  VolunteerInfo,
  VolunteerRole,
  VolunteerData,
} from '@/types/volunteer';
import { VOLUNTEER_STEPS } from '@/types/volunteer';

// ─── Initial state ────────────────────────────────────────────────────────────

const initialData: VolunteerData = {
  info: {
    fornavn: '',
    etternavn: '',
    epost: '',
    telefon: '',
    adresse: '',
    postnummer: '',
  },
  selectedRoles: [],
  annetBeskrivelse: '',
  notat: '',
  vilkaarAkseptert: false,
  vilkaarAkseptertTidspunkt: null,
};

const initialState: VolunteerState = {
  currentStep: 'personlig-info',
  data: initialData,
  isSubmitting: false,
  submitError: null,
  submitSuccess: false,
  submittedDocumentId: null,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────

function volunteerReducer(
  state: VolunteerState,
  action: VolunteerAction
): VolunteerState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'SET_INFO':
      return {
        ...state,
        data: { ...state.data, info: action.payload },
      };

    case 'SET_ROLES':
      return {
        ...state,
        data: { ...state.data, selectedRoles: action.payload },
      };

    case 'SET_ANNET_BESKRIVELSE':
      return {
        ...state,
        data: { ...state.data, annetBeskrivelse: action.payload },
      };

    case 'SET_NOTAT':
      return {
        ...state,
        data: { ...state.data, notat: action.payload },
      };

    case 'SET_VILKAAR':
      return {
        ...state,
        data: {
          ...state.data,
          vilkaarAkseptert: action.payload,
          vilkaarAkseptertTidspunkt: action.payload
            ? new Date().toISOString()
            : null,
        },
      };

    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };

    case 'SET_SUBMIT_ERROR':
      return { ...state, submitError: action.payload, isSubmitting: false };

    case 'SET_SUBMIT_SUCCESS':
      return {
        ...state,
        submitSuccess: true,
        isSubmitting: false,
        submitError: null,
        submittedDocumentId: action.payload,
      };

    default:
      return state;
  }
}

// ─── Context interface ────────────────────────────────────────────────────────

interface VolunteerContextValue {
  state: VolunteerState;
  dispatch: React.Dispatch<VolunteerAction>;
  // Navigation
  goToNextStep: () => void;
  goToPrevStep: () => void;
  goToStep: (step: VolunteerStep) => void;
  currentStepIndex: number;
  totalSteps: number;
  // Setters
  setInfo: (info: VolunteerInfo) => void;
  setRoles: (roles: VolunteerRole[]) => void;
  setAnnetBeskrivelse: (text: string) => void;
  setNotat: (text: string) => void;
  setVilkaar: (accepted: boolean) => void;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

const VolunteerContext = createContext<VolunteerContextValue | null>(null);

export function VolunteerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(volunteerReducer, initialState);

  const stepIds = VOLUNTEER_STEPS.map((s) => s.id);
  const currentStepIndex = stepIds.indexOf(state.currentStep);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  const goToNextStep = useCallback(() => {
    const next = currentStepIndex + 1;
    if (next < stepIds.length) {
      dispatch({ type: 'SET_STEP', payload: stepIds[next] });
      scrollToTop();
    }
  }, [currentStepIndex, stepIds]);

  const goToPrevStep = useCallback(() => {
    const prev = currentStepIndex - 1;
    if (prev >= 0) {
      dispatch({ type: 'SET_STEP', payload: stepIds[prev] });
      scrollToTop();
    }
  }, [currentStepIndex, stepIds]);

  const goToStep = useCallback((step: VolunteerStep) => {
    dispatch({ type: 'SET_STEP', payload: step });
    scrollToTop();
  }, []);

  const setInfo = useCallback(
    (info: VolunteerInfo) => dispatch({ type: 'SET_INFO', payload: info }),
    []
  );
  const setRoles = useCallback(
    (roles: VolunteerRole[]) => dispatch({ type: 'SET_ROLES', payload: roles }),
    []
  );
  const setAnnetBeskrivelse = useCallback(
    (text: string) => dispatch({ type: 'SET_ANNET_BESKRIVELSE', payload: text }),
    []
  );
  const setNotat = useCallback(
    (text: string) => dispatch({ type: 'SET_NOTAT', payload: text }),
    []
  );
  const setVilkaar = useCallback(
    (accepted: boolean) => dispatch({ type: 'SET_VILKAAR', payload: accepted }),
    []
  );

  const value = useMemo<VolunteerContextValue>(
    () => ({
      state,
      dispatch,
      goToNextStep,
      goToPrevStep,
      goToStep,
      currentStepIndex,
      totalSteps: stepIds.length,
      setInfo,
      setRoles,
      setAnnetBeskrivelse,
      setNotat,
      setVilkaar,
    }),
    [
      state,
      goToNextStep,
      goToPrevStep,
      goToStep,
      currentStepIndex,
      stepIds.length,
      setInfo,
      setRoles,
      setAnnetBeskrivelse,
      setNotat,
      setVilkaar,
    ]
  );

  return (
    <VolunteerContext.Provider value={value}>
      {children}
    </VolunteerContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
// eslint-disable-next-line react-refresh/only-export-components
export function useVolunteer(): VolunteerContextValue {
  const ctx = useContext(VolunteerContext);
  if (!ctx) {
    throw new Error('useVolunteer må brukes inni <VolunteerProvider>');
  }
  return ctx;
}
