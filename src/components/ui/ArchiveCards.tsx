import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { urlFor } from "@/lib/sanity";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import type { Show } from "@/types/sanity";

function TypeBadge({ type }: { type: Show["type"] }) {
  return (
    <Badge variant={type === "main" ? "default" : "torch"}>
      {type === "main" ? "Hovedforestilling" : "Halloween"}
    </Badge>
  );
}

/* 1) POSTER SPOTLIGHT — filmplakat med spotlight + glassmeta */
export function PosterSpotlightCard({ show }: { show: Show }) {
  return (
    <Link to={`/arkiv/${show.slug}`}>
      <Card className="group relative overflow-hidden bg-navy-900/90 border-navy-800 hover:shadow-2xl transition-all duration-300">
        {/* spotlight / vignette */}
        <div className="absolute inset-0 bg-[radial-linear(80%_60%_at_50%_20%,rgba(251,146,60,.25),transparent_60%)] pointer-events-none" />
        {/* year */}
        <div className="absolute top-4 right-4 z-10">
          <div className="rounded-full bg-gold-500 text-white px-3 py-1 shadow">
            <span className="font-display font-bold">{show.year}</span>
          </div>
        </div>

        {/* poster */}
        {show.posterImage && (
          <div className="aspect-3/4 overflow-hidden">
            <img
              src={urlFor(show.posterImage).width(640).height(853).quality(85).auto("format").url()}
              alt={show.posterImage.alt || show.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* bottom gradient */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        )}

        <CardContent className="relative -mt-16">
          <div className="rounded-xl bg-white/90 backdrop-blur-md p-5 shadow ring-1 ring-black/10">
            <div className="mb-2">
              <TypeBadge type={show.type} />
            </div>
            <h3 className="text-2xl font-display font-bold text-navy-900 group-hover:text-torch-600 transition-colors line-clamp-1">
              {show.title}
            </h3>
            {show.story?.[0]?.children?.[0]?.text && (
              <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                {show.story[0].children[0].text}
              </p>
            )}
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              {show.year}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/* 2) POLAROID STACK — papirramme, lett rotasjon, “pin” */
export function PolaroidCard({ show }: { show: Show }) {
  return (
    <Link to={`/arkiv/${show.slug}`}>
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="absolute left-1/2 top-2 -translate-x-1/2 h-3 w-3 rounded-full bg-gold-500 shadow ring-2 ring-white z-10" />
        <Card className="group relative bg-white border-gold-200 shadow-xl rotate-[-2.5deg] hover:rotate-0 transition-transform duration-300 overflow-visible">
          {/* stack skygge */}
          <div className="absolute -z-10 inset-0 translate-x-1 translate-y-1 rotate-2 rounded-xl bg-white border border-gold-200 opacity-80" />
          {/* “polaroid”-ramme */}
          <div className="p-3">
            <div className="overflow-hidden rounded-md bg-gray-200">
              {show.posterImage && (
                <img
                  src={urlFor(show.posterImage).width(640).height(640).quality(85).auto("format").url()}
                  alt={show.posterImage.alt || show.title}
                  className="aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-navy-900">{show.title}</h3>
              <span className="rounded bg-gold-500 px-2 py-0.5 text-xs font-semibold text-white">
                {show.year}
              </span>
            </div>
            <div className="mt-2"><TypeBadge type={show.type} /></div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}

/* 3) TICKET STUB — “billett” med perforering og utsparte sirkler */
export function TicketStubCard({ show }: { show: Show }) {
  return (
    <Link to={`/arkiv/${show.slug}`}>
      <Card className="group relative overflow-visible bg-white border-gold-200 shadow-sm hover:shadow-xl transition">
        {/* runde kutt i midten (venstre/høyre) */}
        <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white -translate-x-1/2 shadow-inner" />
        <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white translate-x-1/2 shadow-inner" />
        {/* perforert linje */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-gold-400/60" />

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto]">
          {/* poster */}
          {show.posterImage && (
            <div className="relative overflow-hidden">
              <img
                src={urlFor(show.posterImage).width(800).height(600).quality(85).auto("format").url()}
                alt={show.posterImage.alt || show.title}
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                {show.year}
              </div>
            </div>
          )}

          {/* infofelt */}
          <div className="p-6">
            <div className="mb-2"><TypeBadge type={show.type} /></div>
            <h3 className="font-display text-2xl font-bold text-navy-900 line-clamp-1">{show.title}</h3>
            {show.story?.[0]?.children?.[0]?.text && (
              <p className="mt-2 text-sm text-gray-700 line-clamp-4">
                {show.story[0].children[0].text}
              </p>
            )}
            <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-gold-100 px-3 py-1 text-sm text-gold-800">
              <Calendar className="h-4 w-4" />
              {show.year} • {show.type === "main" ? "Hovedforestilling" : "Halloween"}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

/* 4) GLASS GLOW — glasskort over farget bakgrunn + lysende kant */
export function GlassGlowCard({ show }: { show: Show }) {
  return (
    <Link to={`/arkiv/${show.slug}`}>
      <div className="group relative rounded-2xl bg-linear-to-br from-navy-900 to-burgundy-900 p-px shadow-lg hover:shadow-2xl transition-shadow">
        {/* glow-kant */}
        <div className="absolute inset-0 rounded-2xl opacity-60 blur-xl bg-[radial-linear(60%_60%_at_80%_10%,var(--color-torch-500),transparent)] pointer-events-none" />
        <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl ring-1 ring-black/10 overflow-hidden">
          {show.posterImage && (
            <div className="aspect-4/3 overflow-hidden">
              <img
                src={urlFor(show.posterImage).width(640).height(480).quality(85).auto("format").url()}
                alt={show.posterImage.alt || show.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-5">
            <div className="mb-2"><TypeBadge type={show.type} /></div>
            <h3 className="font-display text-2xl font-bold text-navy-900 line-clamp-1">{show.title}</h3>
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="h-4 w-4" />
              {show.year}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* 5) DECKLED PAPER — “revet” papirkant (mask) + rammehånd */
export function DeckledPaperCard({ show }: { show: Show }) {
  return (
    <Link to={`/forestilling/${show.slug}`}>
      <Card className="group relative overflow-hidden bg-amber-50 border-gold-300 shadow hover:shadow-xl transition">
        {/* revet kant via mask */}
        <div className="absolute inset-0 mask-[radial-linear(18px_18px_at_0_0,transparent_17px,black_18px),radial-linear(18px_18px_at_100%_0,transparent_17px,black_18px),radial-linear(18px_18px_at_0_100%,transparent_17px,black_18px),radial-linear(18px_18px_at_100%_100%,transparent_17px,black_18px)] mask-exclude mask-no-repeat mask-position-[0_0,100%_0,0_100%,100%_100%]" />
        {show.posterImage && (
          <div className="aspect-4/5 overflow-hidden">
            <img
              src={urlFor(show.posterImage).width(640).height(800).quality(85).auto("format").url()}
              alt={show.posterImage.alt || show.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-5">
          <div className="mb-2"><TypeBadge type={show.type} /></div>
          <h3 className="font-display text-2xl font-bold text-navy-900">{show.title}</h3>
          {show.story?.[0]?.children?.[0]?.text && (
            <p className="mt-2 text-sm text-gray-700 line-clamp-3">{show.story[0].children[0].text}</p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="h-4 w-4" />
              {show.year}
            </span>
            <span className="rounded-lg border-2 border-gold-400/60 bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-800 shadow-[inset_0_1px_0_rgba(255,255,255,.6)]">
              Arkiv
            </span>
          </div>
        </div>
        {/* hjørnedekor */}
        <span className="pointer-events-none absolute right-3 top-3 h-8 w-8 border-t-2 border-r-2 border-gold-400/40" />
        <span className="pointer-events-none absolute left-3 bottom-3 h-8 w-8 border-b-2 border-l-2 border-gold-400/40" />
      </Card>
    </Link>
  );
}
