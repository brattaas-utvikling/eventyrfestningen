// src/components/ui/Button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /**
   * Legger til en shine-sweep over knappen ved hover.
   * Bruker .shine-sweep CSS-klassen fra global.css.
   * Deaktiveres automatisk via prefers-reduced-motion i CSS.
   */
  withShine?: boolean;
  /**
   * Pulserende border-glow (animate-border-pulse fra global.css).
   * Bruk sparsomt — kontinuerlig animasjon er visuelt støy.
   * Deaktiveres automatisk via prefers-reduced-motion i CSS.
   */
  withPulse?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Props som er native til <button> og ikke skal videresendes til
 * Slot-rendret element (f.eks. <a>).
 */
const BUTTON_ONLY_PROPS = [
  "type",
  "disabled",
  "form",
  "formAction",
  "formEncType",
  "formMethod",
  "formNoValidate",
  "formTarget",
  "name",
  "value",
] as const;

function omitKeys<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: readonly K[]
): Omit<T, K> {
  const copy = { ...obj };
  for (const key of keys) delete copy[key];
  return copy;
}

/**
 * Sikkert hent children fra et React-element.
 * Unngår direkte tilgang til .props.children uten typesjekk.
 */
function getElementChildren(
  node: React.ReactNode
): React.ReactNode | undefined {
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return node.props.children;
  }
  return undefined;
}

// ─── Interne subkomponenter ───────────────────────────────────────────────────

/**
 * Shine-overlay — refererer til .shine-sweep fra global.css.
 * prefers-reduced-motion håndteres i CSS (display: none).
 */
const ShineLayer = () => (
  <span aria-hidden="true" className="shine-sweep" />
);

/**
 * Text-wrapper — legger drop-shadow på innhold for torch/shine-varianter.
 * Posisjonerer innhold over before:/after: pseudo-elementer.
 */
const TextWrap = ({
  children,
  elevated,
}: {
  children: React.ReactNode;
  elevated?: boolean;
}) => (
  <span
    className={cn(
      "relative inline-flex items-center justify-center gap-2",
      elevated && "drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
    )}
  >
    {children}
  </span>
);

// ─── Button ───────────────────────────────────────────────────────────────────

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      caps,
      asChild = false,
      withShine = false,
      withPulse = false,
      disabled,
      children,
      type,
      ...props
    },
    ref
  ) => {
    // Elevated text-wrap for varianter med pseudo-element-lag
    const needsElevation = withShine || variant === "torch" || variant === "gold" || variant === "outline";

    const classes = cn(
      buttonVariants({ variant, size, caps }),
      // withShine krever group + overflow-hidden for .shine-sweep
      // NB: torch/gold/outline har allerede overflow-hidden fra variants
      withShine && "group overflow-hidden",
      withPulse && "animate-border-pulse",
      // asChild disabled — visual only, siden <a> ikke har native disabled
      disabled && asChild && "pointer-events-none opacity-50",
      className
    );

    const inner = (
      <>
        {withShine && <ShineLayer />}
        <TextWrap elevated={needsElevation}>{children}</TextWrap>
      </>
    );

    // ── asChild-modus: render som Slot (f.eks. <a>, Next.js <Link>) ──────────
    if (asChild) {
      const slotProps = omitKeys(
        props as Record<string, unknown>,
        BUTTON_ONLY_PROPS
      );

      // Hent children fra child-elementet for korrekt Slot-innpakning
      const childElement = React.isValidElement<{
        children?: React.ReactNode;
        className?: string;
      }>(children)
        ? children
        : null;

      const childChildren = childElement
        ? getElementChildren(childElement)
        : children;

      return (
        <Slot
          className={classes}
          aria-disabled={disabled ? true : undefined}
          // Blokker klikk på aria-disabled <a>-tagger
          onClick={
            disabled
              ? (e: React.MouseEvent) => e.preventDefault()
              : (props as React.HTMLAttributes<HTMLElement>).onClick
          }
          tabIndex={disabled ? -1 : undefined}
          {...(slotProps as React.HTMLAttributes<HTMLElement>)}
        >
          {childElement
            ? React.cloneElement(childElement, undefined, (
                <>
                  {withShine && <ShineLayer />}
                  <TextWrap elevated={needsElevation}>
                    {childChildren}
                  </TextWrap>
                </>
              ))
            : inner}
        </Slot>
      );
    }

    // ── Standard <button> ─────────────────────────────────────────────────────
    return (
      <button
        className={classes}
        ref={ref}
        type={type ?? "button"}
        disabled={disabled}
        {...props}
      >
        {inner}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };