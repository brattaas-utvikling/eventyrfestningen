// src/components/ui/button-variants.ts
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-navy-900 text-white hover:bg-navy-800 focus-visible:ring-navy-500",
        torch:
          "bg-gradient-to-r from-torch-500 to-torch-600 text-white hover:from-torch-600 hover:to-torch-700 shadow-lg hover:shadow-torch focus-visible:ring-torch-500",
        gold:
          "bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 hover:from-gold-600 hover:to-gold-700 shadow-lg focus-visible:ring-gold-500",
        burgundy:
          "bg-burgundy-900 text-white hover:bg-burgundy-800 focus-visible:ring-burgundy-500",
        outline:
          "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white focus-visible:ring-navy-500",
        ghost: "text-navy-900 hover:bg-navy-100 focus-visible:ring-navy-500",
        whiteghost: "bg-white text-navy-900 hover:bg-navy-100 focus-visible:ring-navy-500",
        link: "text-torch-600 underline-offset-4 hover:underline focus-visible:ring-torch-500",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
