// ALTERNATIV: Inline CSS i Button-komponenten (ingen ekstra filer)

// src/components/ui/Button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  withShine?: boolean;
  withPulse?: boolean; // NY: Aktiverer CSS-animasjon
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    withShine = false, 
    withPulse = false,
    children, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Inline CSS for pulse-animasjoner
    const pulseStyles = withPulse ? {
      animation: 'border-pulse 2s ease-in-out infinite',
    } : {};
    
    // Hvis asChild og withShine
    if (asChild && withShine) {
      return (
        <>
          <style>{`
            @keyframes border-pulse {
              0%, 100% {
                border-color: rgba(251, 146, 60, 0.5);
                box-shadow: 0 0 20px rgba(255, 161, 35, 0.4);
              }
              50% {
                border-color: rgba(251, 146, 60, 0.9);
                box-shadow: 0 0 30px rgba(255, 161, 35, 0.6);
              }
            }
            
            @keyframes glow-pulse {
              0%, 100% {
                box-shadow: 0 0 20px rgba(255, 161, 35, 0.4), inset 0 0 20px rgba(255, 161, 35, 0.1);
              }
              50% {
                box-shadow: 0 0 40px rgba(255, 161, 35, 0.6), inset 0 0 30px rgba(255, 161, 35, 0.2);
              }
            }
          `}</style>
          
          <Comp
            className={cn(
              buttonVariants({ variant, size }), 
              "group relative overflow-hidden", 
              className
            )}
            style={pulseStyles}
            ref={ref}
            {...props}
          >
            {/* Shine effect */}
            <span 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                         translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" 
            />
            {/* Content wrapper */}
            <span className="relative inline-flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              {children}
            </span>
          </Comp>
        </>
      );
    }
    
    // Standard button med shine og pulse
    if (withShine || withPulse) {
      return (
        <>
          {withPulse && (
            <style>{`
              @keyframes border-pulse {
                0%, 100% {
                  border-color: rgba(251, 146, 60, 0.5);
                  box-shadow: 0 0 20px rgba(255, 161, 35, 0.4);
                }
                50% {
                  border-color: rgba(251, 146, 60, 0.9);
                  box-shadow: 0 0 30px rgba(255, 161, 35, 0.6);
                }
              }
            `}</style>
          )}
          
          <Comp
            className={cn(
              buttonVariants({ variant, size }), 
              withShine && "group relative overflow-hidden",
              className
            )}
            style={pulseStyles}
            ref={ref}
            {...props}
          >
            {withShine && (
              <span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" 
              />
            )}
            <span className={cn(
              withShine && "relative inline-flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            )}>
              {children}
            </span>
          </Comp>
        </>
      );
    }
    
    // Standard button
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };

// BRUK:
// <Button variant="torch" withShine withPulse>Kjøp billetter</Button>

// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { type VariantProps } from "class-variance-authority";
// import { cn } from "@/lib/utils";
// import { buttonVariants } from "./button-variants";

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Button.displayName = "Button";

// export { Button };
