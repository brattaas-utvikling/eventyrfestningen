// src/components/layout/Section.tsx
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: "cynical" | "burgundy" | "white" | "paper" | "amber";
  /** Hvor mye vertikal padding seksjonen skal ha */
  paddingY?: "default" | "tight" | "none";
}

export function Section({
  id,
  children,
  className,
  background = "white",
  paddingY = "default",
}: SectionProps) {
  const bgClasses = {
    cynical: "bg-cynical-900 text-white",
    burgundy: "bg-burgundy-900 text-white",
    white: "bg-white",
    paper: "bg-amber-50",
    amber: "bg-amber-900",
  };

  const paddingClasses = {
    default: "py-16 sm:py-20 lg:py-24",
    tight: "py-10 sm:py-12 lg:py-16",
    none: "py-0",
  };

  return (
    <section
      id={id}
      className={cn(
        paddingClasses[paddingY],
        bgClasses[background],
        className
      )}
    >
      {children}
    </section>
  );
}
