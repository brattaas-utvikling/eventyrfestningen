// src/components/sections/ShowOverview.tsx
import { urlFor } from '@/lib/sanity'
import type { Show, PortableText } from '@/types/sanity'

interface ShowOverviewProps {
  show: Show
  // valgfritt callback når et galleri-bilde klikkes
  onImageClick?: (index: number) => void
}

// enkel portable text-renderer (samme som vi lagde)
function renderPortableText(blocks?: PortableText) {
  if (!blocks) return null

  return blocks.map((block) => {
    if (block._type !== 'block') return null
    const text = block.children?.map((child) => child.text).join('') ?? ''

    switch (block.style) {
      case 'h2':
        return (
          <h2 key={block._key} className="text-2xl font-display text-white mt-6 mb-2">
            {text}
          </h2>
        )
      case 'h3':
        return (
          <h3 key={block._key} className="text-xl font-display text-white mt-4 mb-2">
            {text}
          </h3>
        )
      default:
        return (
          <p key={block._key} className="text-navy-100/80 leading-relaxed mb-3">
            {text}
          </p>
        )
    }
  })
}

export function ShowOverview({ show, onImageClick }: ShowOverviewProps) {
  return (
    <section className="bg-navy-900 py-16">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
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
                <span className="text-white font-medium">Type:</span>{' '}
                {show.type === 'main' ? 'Hovedforestilling' : 'Halloween-forestilling'}
              </p>
              {show.practicalInfo?.duration ? (
                <p>
                  <span className="text-white font-medium">Varighet:</span>{' '}
                  {show.practicalInfo.duration} min
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {/* galleri-grid */}
        {show.galleryImages && show.galleryImages.length > 0 ? (
            <div>
              <h3 className="text-xl font-display text-white mb-4">Bak kulissene</h3>
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {show.galleryImages.map((img, index) => (
                  <button
                    key={img._key ?? index}
                    type="button"
                    onClick={onImageClick ? () => onImageClick(index) : undefined}
                    className="relative group rounded-lg overflow-hidden border border-navy-700 hover:border-gold-400/60 transition"
                  >
                    <img
                      src={urlFor(img).width(600).height(400).url()}
                      alt={img.alt || show.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/30 transition" />
                  </button>
                ))}
              </div>
            </div>
        ) : null}
      </div>
    </section>
  )
}
