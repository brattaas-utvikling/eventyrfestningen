import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import type { Show } from "@/types/sanity";
import { Badge } from "@/components/ui/Badge";

/** Reusable base (tilt) – tilpasset tema-variablene dine */
export interface InteractiveTiltCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  actionText?: string;
  href: string;              // intern lenke til forestillingsside
  onActionClick?: () => void;
  topRight?: React.ReactNode;
  topLeft?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const InteractiveTiltCard = React.forwardRef<HTMLDivElement, InteractiveTiltCardProps>(
  (
    { title, subtitle, imageUrl, actionText = "Se detaljer", href, onActionClick, topRight, topLeft, footer, className },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const spring = { damping: 15, stiffness: 150 };
    const sx = useSpring(mouseX, spring);
    const sy = useSpring(mouseY, spring);
    const rotateX = useTransform(sy, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(sx, [-0.5, 0.5], ["-10deg", "10deg"]);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - r.left) / r.width - 0.5);
      mouseY.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <div style={{ perspective: "1000px" }}>
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={cn(
            "relative h-[26rem] w-full rounded-2xl border border-navy-700/40 shadow-2xl",
            "bg-transparent overflow-visible",
            className
          )}
        >
          {/* Klikkbar helflate for navigasjon */}
          <Link to={href} aria-label={title} className="absolute inset-0 z-0" />

          <div
            className="absolute inset-4 grid h-[calc(100%-2rem)] w-[calc(100%-2rem)] grid-rows-[1fr_auto] rounded-xl overflow-hidden ring-1 ring-black/10"
            style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
          >
            {/* Bakgrunnsbilde */}
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Gradients for lesbarhet */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/10" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_10%,rgba(255,161,35,.25),transparent_60%)]" />

            {/* Toppinnhold */}
            <div className="relative z-10 flex items-start justify-between p-4 text-white">
              <div>
                <motion.h2 style={{ transform: "translateZ(50px)" }} className="text-2xl font-display font-bold">
                  {title}
                </motion.h2>
                {subtitle ? (
                  <motion.p style={{ transform: "translateZ(45px)" }} className="text-sm text-white/80">
                    {subtitle}
                  </motion.p>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                {topLeft}
                {topRight ?? (
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: "2.5deg" }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transform: "translateZ(60px)" }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/30"
                  >
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bunninnhold */}
            <div className="relative z-10 p-4">
              {footer}
              <div className="mt-3 flex gap-2">
                <Link
                  to={href}
                  onClick={() => {
                    onActionClick?.();
                    // Ikke stopp event – dette er primærhandling
                  }}
                  className={cn(
                    "inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-navy-900",
                    "bg-torch-500 hover:bg-torch-400 transition-colors"
                  )}
                  style={{ transform: "translateZ(40px)" }}
                >
                  {actionText}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);
InteractiveTiltCard.displayName = "InteractiveTiltCard";

/** Arkiv-spesifikk 3D-variant som bruker Sanity Show */
export function Archive3DCard({ show, className }: { show: Show; className?: string }) {
  const posterUrl = show.posterImage
    ? urlFor(show.posterImage).width(900).height(1200).quality(85).auto("format").url()
    : "https://dummyimage.com/900x1200/171717/ffffff&text=Eventyrfestningen";

  return (
    <InteractiveTiltCard
      className={className}
      title={show.title}
      subtitle={show.type === "main" ? "Hovedforestilling" : "Halloween"}
      imageUrl={posterUrl}
      href={`/forestilling/${show.slug}`}
      actionText="Se detaljer"
      topLeft={
        <span className="sr-only">{show.year}</span>
      }
      topRight={
        <div
          style={{ transform: "translateZ(60px)" }}
          className="flex items-center gap-2"
        >
          <div className="rounded-full bg-[color:var(--color-gold-500)] px-3 py-1 text-xs font-bold text-white shadow">
            {show.year}
          </div>
        </div>
      }
      footer={
        <div className="flex items-center justify-between text-sm text-white/85">
          <div className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {show.year}
          </div>
          <Badge variant={show.type === "main" ? "default" : "torch"}>
            {show.type === "main" ? "Hovedforestilling" : "Halloween"}
          </Badge>
        </div>
      }
    />
  );
}
