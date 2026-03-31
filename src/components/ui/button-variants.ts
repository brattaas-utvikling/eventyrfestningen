// src/components/ui/button-variants.ts
import { cva } from "class-variance-authority";

/**
 * BUTTON VARIANTS — synkronisert med global.css tokens
 *
 * Designprinsipper:
 * - Base bruker `.btn` utility (Halyard Display, tracking, weight) fra global.css
 * - `.btn-caps` bruker --ui-tracking-caps (0.12em) for uppercase varianter
 * - focus-ring: ring-offset bruker kontekstspesifikk farge per variant
 *   → whiteghost er eneste som bruker ring-offset-white; resten ring-offset-cynical-900
 * - motion-safe wrapper sikrer prefers-reduced-motion
 * - min-h-[44px] på alle størrelser → WCAG 2.5.5 touch target
 * - before:/after: pseudo-elementer kun på varianter som faktisk trenger dem
 *   (torch, gold, outline). ghost/link/default trenger ikke det.
 */

export const buttonVariants = cva(
  [
    // Layout
    "inline-flex items-center justify-center rounded-lg",

    // Touch target (WCAG 2.5.5)
    "min-h-[44px] min-w-[44px]",

    // Typography — bruker .btn utility fra global.css
    // (Halyard Display, font-semibold, tracking-[0.02em], leading-[1.2])
    "btn antialiased",

    // Cursor — ! tvinger gjennom @tailwindcss/forms-reset
    "!cursor-pointer",

    // Base ring på alle knapper
    "ring-1 ring-white/10 hover:ring-white/15",

    // Subtle press feedback
    "motion-safe:active:translate-y-[0.5px]",

    // Transition
    "motion-safe:transition-all motion-safe:duration-200",

    // Disabled states — native + aria (asChild/<a>-tag)
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",

    // Focus base
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  ].join(" "),
  {
    variants: {
      variant: {
        // ── Nøytral system-knapp ──────────────────────────────────────────
        default: [
          "bg-cynical-900 text-white",
          "hover:bg-cynical-800",
          "shadow-[0_10px_26px_rgba(0,0,0,0.28)]",
          "hover:shadow-[0_14px_38px_rgba(0,0,0,0.34)]",
          "focus-visible:ring-cynical-500 focus-visible:ring-offset-cynical-900",
        ].join(" "),

        // ── Primær CTA — orange glow ──────────────────────────────────────
        // before: emboss highlight | after: radial sparkle on hover
        // NB: overflow-hidden settes her, ikke i base, siden ikke alle trenger det
        torch: [
          "relative overflow-hidden",
          "bg-gradient-to-r from-torch-500 to-torch-600 text-white",
          "hover:from-torch-600 hover:to-torch-700",
          "ring-1 ring-white/12 hover:ring-white/18",
          "shadow-[0_14px_40px_rgba(0,0,0,0.30)]",
          "hover:shadow-[0_20px_62px_rgba(0,0,0,0.38)] hover:shadow-torch",
          "motion-safe:active:scale-[0.99]",
          "focus-visible:ring-torch-300 focus-visible:ring-offset-cynical-900",
          // Emboss highlight (statisk)
          "before:content-[''] before:absolute before:inset-0 before:pointer-events-none",
          "before:bg-gradient-to-b before:from-white/22 before:via-white/10 before:to-transparent",
          "before:opacity-80",
          // Radial sparkle (hover)
          "after:content-[''] after:absolute after:inset-0 after:pointer-events-none",
          "after:opacity-0 hover:after:opacity-100",
          "motion-safe:after:transition-opacity motion-safe:after:duration-300",
          "after:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_55%)]",
        ].join(" "),

        // ── Premium sekundær CTA — gull ───────────────────────────────────
        gold: [
          "relative overflow-hidden",
          "bg-gradient-to-r from-gold-400 to-gold-600 text-cynical-900",
          "hover:from-gold-500 hover:to-gold-700",
          "shadow-[0_12px_32px_rgba(0,0,0,0.22)]",
          "hover:shadow-[0_18px_46px_rgba(0,0,0,0.30),0_0_28px_rgba(245,158,11,0.30)]",
          "focus-visible:ring-gold-400 focus-visible:ring-offset-cynical-900",
          // Subtilt shine-lag
          "before:content-[''] before:absolute before:inset-0 before:pointer-events-none",
          "before:bg-gradient-to-b before:from-white/18 before:via-white/8 before:to-transparent",
          "before:opacity-70",
        ].join(" "),

        // ── Støttevariant — mørk fløyel ───────────────────────────────────
        burgundy: [
          "bg-burgundy-900 text-white",
          "hover:bg-burgundy-800",
          "shadow-[0_10px_26px_rgba(0,0,0,0.26)]",
          "hover:shadow-[0_14px_38px_rgba(0,0,0,0.32),0_0_26px_rgba(190,18,60,0.22)]",
          "focus-visible:ring-burgundy-400 focus-visible:ring-offset-cynical-900",
        ].join(" "),

        // ── Outline glass/foil — gull border ─────────────────────────────
        outline: [
          "relative overflow-hidden",
          "border-2 border-gold-400/70 text-white bg-white/0",
          "hover:bg-gold-400/10 hover:border-gold-400/90",
          "shadow-[0_10px_26px_rgba(0,0,0,0.22)]",
          "hover:shadow-[0_0_28px_rgba(251,191,36,0.18)]",
          "md:backdrop-blur-sm",
          "focus-visible:ring-gold-400 focus-visible:ring-offset-cynical-900",
          // Inner sheen
          "before:content-[''] before:absolute before:inset-0 before:pointer-events-none",
          "before:bg-gradient-to-b before:from-white/10 before:to-transparent",
          "before:opacity-60",
        ].join(" "),

        // ── Outline neon torch ────────────────────────────────────────────
        torchoutline: [
          "border-2 border-torch-500 text-torch-300",
          "hover:text-torch-200 hover:border-torch-300",
          "shadow-[0_10px_26px_rgba(0,0,0,0.22)]",
          "hover:shadow-[0_0_30px_rgba(255,161,35,0.22)]",
          "focus-visible:ring-torch-400 focus-visible:ring-offset-cynical-900",
        ].join(" "),

        // ── Ghost — minimal på mørk bakgrunn ─────────────────────────────
        ghost: [
          "bg-white/0 text-white shadow-none ring-0",
          "hover:bg-white/10",
          "focus-visible:ring-cynical-500 focus-visible:ring-offset-cynical-900",
        ].join(" "),

        // ── White ghost — lys flate (modal etc.) ─────────────────────────
        whiteghost: [
          "bg-white text-cynical-900",
          "hover:bg-cynical-100",
          "shadow-[0_10px_26px_rgba(0,0,0,0.18)]",
          "hover:shadow-[0_14px_38px_rgba(0,0,0,0.22)]",
          // NB: eneste varianten med ring-offset-white
          "focus-visible:ring-cynical-500 focus-visible:ring-offset-white",
        ].join(" "),

        // ── Tekstlenke ────────────────────────────────────────────────────
        link: [
          "bg-transparent shadow-none ring-0 min-h-0 min-w-0",
          "text-torch-300 underline-offset-4",
          "hover:text-torch-200 hover:underline",
          "focus-visible:ring-torch-500 focus-visible:ring-offset-cynical-900",
        ].join(" "),
      },

      size: {
        // NB: ingen under 44px — sm og md bruker min-h fra base, px skalerer
        sm: "h-11 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-11 w-11 p-0",
        "icon-lg": "h-12 w-12 p-0",
      },

      // caps bruker .btn-caps fra global.css → uppercase + tracking-[0.12em]
      caps: {
        true: "btn-caps",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      caps: false,
    },
  }
);

// Type-eksporter — nyttig for komponenter som refererer varianter uten CVA-import
export type ButtonVariant = NonNullable<
  Parameters<typeof buttonVariants>[0]
>["variant"];

export type ButtonSize = NonNullable<
  Parameters<typeof buttonVariants>[0]
>["size"];