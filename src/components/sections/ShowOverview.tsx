// src/components/sections/ShowOverview.tsx
import { urlFor } from "@/lib/sanity";
import type { Show, PortableText as PT, SanityImage } from "@/types/sanity";

interface ShowOverviewProps {
  show: Show;
  onImageClick?: (index: number) => void;
}

// enkel portable text-renderer
function renderPortableText(blocks?: PT) {
  if (!blocks) return null;

  return blocks.map((block) => {
    if (block._type !== "block") return null;
    const text = block.children?.map((child) => child.text).join("") ?? "";

    switch (block.style) {
      case "h2":
        return (
          <h2 key={block._key} className="text-2xl font-display text-white mt-6 mb-2">
            {text}
          </h2>
        );
      case "h3":
        return (
          <h3 key={block._key} className="text-xl font-display text-white mt-4 mb-2">
            {text}
          </h3>
        );
      default:
        return (
          <p key={block._key} className="text-navy-100/80 leading-relaxed mb-3">
            {text}
          </p>
        );
    }
  });
}

// samme helper som før
function getBentoClasses(index: number, total: number): string {
  if (total <= 3) {
    return "md:col-span-2 md:row-span-1";
  }

  const patterns: Record<number, string[]> = {
    4: [
      "md:col-span-3 md:row-span-2",
      "md:col-span-3 md:row-span-1",
      "md:col-span-3 md:row-span-1",
      "md:col-span-3 md:row-span-1",
    ],
    5: [
      "md:col-span-3 md:row-span-2",
      "md:col-span-3 md:row-span-1",
      "md:col-span-2 md:row-span-1",
      "md:col-span-2 md:row-span-1",
      "md:col-span-2 md:row-span-1",
    ],
    6: [
      "md:col-span-3 md:row-span-2",
      "md:col-span-3 md:row-span-1",
      "md:col-span-2 md:row-span-1",
      "md:col-span-2 md:row-span-2",
      "md:col-span-2 md:row-span-1",
      "md:col-span-3 md:row-span-1",
    ],
  };

  const pattern = patterns[total];
  if (pattern && pattern[index]) return pattern[index];

  const fallback = [
    "md:col-span-3 md:row-span-2",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
  ];
  return fallback[index % fallback.length];
}

export function ShowOverview({ show, onImageClick }: ShowOverviewProps) {
  const gallery = show.galleryImages ?? [];

  return (
    <section className="bg-navy-900 py-16">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {/* topp-delen din */}
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div>
              <h2 className="text-3xl font-display text-white mb-4">Om forestillingen</h2>
              {renderPortableText(show.story) || (
                <p className="text-navy-100/70">Ingen tekst er lagt inn ennå.</p>
              )}
            </div>
            <div className="space-y-4">
              {show.posterImage ? (
                <img
                  src={urlFor(show.posterImage).width(700).url()}
                  alt={show.title}
                  className="rounded-xl border border-gold-400/40 shadow-lg"
                />
              ) : null}
              <div className="rounded-lg border border-navy-700 bg-navy-900/40 p-4 text-sm text-navy-100/80 space-y-2">
                <p>
                  <span className="text-white font-medium">År:</span> {show.year}
                </p>
                <p>
                  <span className="text-white font-medium">Type:</span>{" "}
                  {show.type === "main" ? "Hovedforestilling" : "Halloween-forestilling"}
                </p>
                {show.practicalInfo?.duration ? (
                  <p>
                    <span className="text-white font-medium">Varighet:</span>{" "}
                    {show.practicalInfo.duration} min
                  </p>
                ) : null}
              </div>
            </div>
        </div>

        {/* galleri */}
        {gallery.length > 0 ? (
          <div>
            <h3 className="text-xl font-display text-white mb-4">Bak kulissene</h3>

            {/* MOBIL: horisontal karusell */}
            <div className="md:hidden">
              <div
                className="
                  flex gap-4 overflow-x-auto pb-3
                  snap-x snap-mandatory
                  [-webkit-overflow-scrolling:touch]
                "
              >
                {gallery.map((img: SanityImage, index: number) => (
                  <button
                    key={img._key ?? index}
                    type="button"
                    onClick={onImageClick ? () => onImageClick(index) : undefined}
                    className="
                      flex-shrink-0 w-64 h-40
                      rounded-lg overflow-hidden border border-navy-700
                      snap-start
                      relative group
                    "
                  >
                    <img
                      src={urlFor(img).width(800).height(500).url()}
                      alt={img.alt || show.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/20 transition" />
                  </button>
                ))}
              </div>
            </div>

            {/* DESKTOP: bento-grid */}
            <div
              className="
                hidden md:grid gap-4
                md:grid-cols-6
                auto-rows-[140px] lg:auto-rows-[160px]
              "
            >
              {gallery.map((img: SanityImage, index: number) => {
                const classes = getBentoClasses(index, gallery.length);
                return (
                  <button
                    key={img._key ?? index}
                    type="button"
                    onClick={onImageClick ? () => onImageClick(index) : undefined}
                    className={`relative group overflow-hidden rounded-lg border border-navy-700 hover:border-gold-400/60 transition ${classes}`}
                  >
                    <img
                      src={urlFor(img).width(900).height(600).quality(80).url()}
                      alt={img.alt || show.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/25 transition" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
