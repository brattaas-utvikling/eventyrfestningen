// src/components/ui/OldPaper.tsx
import { forwardRef } from "react";
import type { ReactNode } from "react";

interface OldPaperProps {
  children: ReactNode;
  className?: string;
}

export const OldPaper = forwardRef<HTMLDivElement, OldPaperProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ filter: 'sepia(0.2)' }}>
        {/* Enhanced noise texture */}
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          mixBlendMode: "soft-light",
        }} />
        {/* Vignette with stronger edges */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(circle, transparent 50%, rgba(139,69,19,0.3) 100%)",
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.2)",
        }} />
        {/* Subtle fold lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
          background: "linear-gradient(to right, transparent, rgba(0,0,0,0.05) 50%, transparent)",
          backgroundSize: "4px 100%",
        }} />
        {children}
      </div>
    );
  }
);

OldPaper.displayName = "OldPaper";

// // src/components/ui/OldPaper.tsx
// import { forwardRef } from "react";
// import type { ReactNode } from "react";

// interface OldPaperProps {
//   children: ReactNode;
//   className?: string;
// }

// export const OldPaper = forwardRef<HTMLDivElement, OldPaperProps>(
//   ({ children, className = "" }, ref) => {
//     return (
//       <div
//         ref={ref}
//         className={`relative ${className}`}
//       >
//         {/* Paper texture overlay */}
//         <div
//           className="absolute inset-0 opacity-30 pointer-events-none"
//           style={{
//             backgroundImage:
//               "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
//             mixBlendMode: "multiply",
//           }}
//         />

//         {/* Vignette */}
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background:
//               "radial-gradient(circle, transparent 60%, rgba(101, 67, 33, 0.2) 100%)",
//           }}
//         />

//         {children}
//       </div>
//     );
//   }
// );

// OldPaper.displayName = "OldPaper";


// // src/components/ui/OldPaper.tsx
// import { forwardRef, type ReactNode } from 'react';

// interface OldPaperProps {
//   children: ReactNode;
//   className?: string;
// }

// export const OldPaper = forwardRef<HTMLDivElement, OldPaperProps>(
//   ({ children, className = '' }, ref) => {
//     return (
//       <div ref={ref} className={`relative ${className}`}>
//         {/* Paper texture overlay */}
//         <div 
//           className="absolute inset-0 opacity-30 pointer-events-none"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//             mixBlendMode: 'multiply'
//           }}
//         />
//         {/* Vignette */}
//         <div 
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: 'radial-gradient(circle, transparent 60%, rgba(101, 67, 33, 0.2) 100%)'
//           }}
//         />
//         {children}
//       </div>
//     );
//   }
// );

// OldPaper.displayName = 'OldPaper';