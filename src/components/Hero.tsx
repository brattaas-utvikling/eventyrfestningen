// src/components/Hero.tsx
import { useQuery } from '@tanstack/react-query'
import { fetchSanity, queries, urlFor } from '@/lib/sanity'

export function Hero() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['currentShow'],
    queryFn: () => fetchSanity(queries.currentShow),
  })

  if (isLoading) return <div className="h-72 bg-slate-100 animate-pulse" />
  if (error || !data) return <p>Noe gikk galt med å laste forestillingen.</p>

  return (
    <header className="relative overflow-hidden bg-slate-950 text-white">
      {data.heroImage && (
        <img
          src={urlFor(data.heroImage).width(1600).quality(80).url()}
          alt={data.title}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
      )}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16">
        <p className="text-amber-200 uppercase tracking-[0.25em]">Kongsvinger Festningsteater</p>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">{data.title}</h1>
        {data.practicalInfo?.duration ? (
          <p className="mt-2 text-slate-100/80">
            Varighet: {data.practicalInfo.duration} min • {data.practicalInfo?.ageLimit ?? 'Alle aldre'}
          </p>
        ) : null}
        {data.ticketUrl && (
          <a
            href={data.ticketUrl}
            className="mt-6 inline-flex items-center rounded bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
          >
            Kjøp billetter
          </a>
        )}
      </div>
    </header>
  )
}
