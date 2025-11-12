// src/components/ui/ShowFlipCard.tsx
import { useState, useMemo } from "react";
import { ArrowRight, Calendar, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import type { Show } from "@/types/sanity";
import { Link } from "react-router-dom";

interface ShowFlipCardProps {
  show: Show;
  className?: string;
}

export function ShowFlipCard({ show, className }: ShowFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const frontImage = useMemo(() => {
    if (show.posterImage)
      return urlFor(show.posterImage).width(800).height(1100).url();
    if (show.heroImage)
      return urlFor(show.heroImage).width(1200).height(800).url();
    return undefined;
  }, [show]);

  const excerpt = useMemo(() => {
    const blocks = show.story ?? [];
    const firstBlock = blocks.find((b) => b._type === "block");
    if (!firstBlock || !firstBlock.children)
      return "Les mer om forestillingen.";
    const text = firstBlock.children.map((c) => c.text).join(" ");
    return text.length > 140 ? text.slice(0, 140) + " …" : text;
  }, [show]);

  const showTypeLabel =
    show.type === "main" || !show.type
      ? "Hovedforestilling"
      : "Halloween-forestilling";

  const archiveHref = show.slug?.current
    ? `/arkiv/${show.slug.current}`
    : "/arkiv";

  return (
    <div
      className={cn(
        "group relative h-[360px] w-full max-w-[320px] perspective-[2000px]",
        className
      )}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative h-full w-full transform-3d transition-all duration-700",
          isFlipped ? "transform-[rotateY(180deg)]" : "transform-[rotateY(0deg)]"
        )}
      >
        {/* FRONT */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "backface-hidden", // viktig
            "overflow-hidden rounded-2xl bg-navy-900/60 border border-navy-700/50 shadow-lg transition-all duration-500",
            isFlipped ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
            // ↑ når snudd: ikke ta imot klikk
          )}
        >
          <div className="relative h-full w-full">
            {frontImage ? (
              <img
                src={frontImage}
                alt={show.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full bg-navy-800 flex items-center justify-center text-navy-100/60">
                {show.title}
              </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-navy-950/95 via-navy-950/20 to-transparent" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -inset-6 bg-gold-400/10 blur-3xl" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-navy-950/60 border border-gold-400/30 px-3 py-1 text-xs text-gold-50 mb-2">
                <Calendar className="h-3.5 w-3.5" />
                {showTypeLabel} {show.year}
              </p>
              <h3 className="text-white text-lg font-display leading-tight drop-shadow">
                {show.title}
              </h3>
              <p className="text-navy-100/80 text-xs mt-1">Hold for info →</p>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full transform-[rotateY(180deg)] backface-hidden",
            "rounded-2xl p-5 bg-navy-900/95 border border-gold-400/50 backdrop-blur-md",
            "flex flex-col gap-3 transition-all duration-500",
            isFlipped ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            // ↑ når snudd: ta imot klikk
          )}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-navy-900/60 border border-gold-400/20 px-3 py-1 text-xs text-gold-50 self-start">
            {showTypeLabel}
            {show.year ? (
              <span className="text-gold-200/70">• {show.year}</span>
            ) : null}
          </div>

          <h3 className="text-white text-xl font-display leading-tight">
            {show.title}
          </h3>
          <p className="text-navy-100/80 text-sm leading-relaxed flex-1">
            {excerpt}
          </p>

          {show.practicalInfo?.duration ? (
            <p className="text-xs text-navy-100/50">
              Varighet: {show.practicalInfo.duration} min
            </p>
          ) : null}

          <div className="mt-auto pt-2 flex gap-2">
            <Link
              to={archiveHref}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg",
                "bg-gold-400 text-navy-950 px-3 py-2 text-sm font-semibold",
                "hover:bg-gold-300 transition-colors"
              )}
              onClick={(e) => {
                // bare for sikkerhets skyld: ikke la parent sin hover/click forstyrre
                e.stopPropagation();
              }}
            >
              Se forestilling
              <ArrowRight className="h-4 w-4" />
            </Link>

            {show.ticketUrl ? (
              <a
                href={show.ticketUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gold-400/40 px-3 py-2 text-sm text-gold-50 hover:bg-gold-400/10 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Ticket className="h-4 w-4" />
                Billetter
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
