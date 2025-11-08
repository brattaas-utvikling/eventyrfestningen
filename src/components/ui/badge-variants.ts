// src/components/ui/badge-variants.ts
import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-navy-100 text-navy-900",
        gold: "border-transparent bg-gold-100 text-gold-900",
        torch: "border-transparent bg-torch-100 text-torch-900",
        burgundy: "border-transparent bg-burgundy-100 text-burgundy-900",
        outline: "text-foreground",
        available: "border-transparent bg-green-100 text-green-800",
        few: "border-transparent bg-yellow-100 text-yellow-800",
        soldout: "border-transparent bg-red-100 text-red-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
