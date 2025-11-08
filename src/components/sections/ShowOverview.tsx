// src/components/show/ShowOverview.tsx
import { urlFor } from '@/lib/sanity'
import type { Show, PortableText } from '@/types/sanity'

interface ShowOverviewProps {
  show: Show
}

// veldig enkel renderer for Sanity portable text
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

export function ShowOverview({ show }: ShowOverviewProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <h2 className="text-3xl font-display text-white">Om forestillingen</h2>
        {show.story ? (
          <div>{renderPortableText(show.story)}</div>
        ) : (
          <p className="text-navy-100/70">Ingen historie lagt inn ennå.</p>
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
          {show.practicalInfo?.ageLimit ? (
            <p>
              <span className="text-white font-medium">Aldersgrense:</span>{' '}
              {show.practicalInfo.ageLimit}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
