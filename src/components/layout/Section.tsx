// src/components/layout/Section.tsx
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: "navy" | "burgundy" | "white" | "paper";
}

export function Section({
  id,
  children,
  className,
  background = "white",
}: SectionProps) {
  const bgClasses = {
    navy: "bg-navy-900 text-white",
    burgundy: "bg-burgundy-900 text-white",
    white: "bg-white",
    paper: "bg-amber-50",
  };

  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20 lg:py-24", bgClasses[background], className)}
    >
      {children}
    </section>
  );
}
