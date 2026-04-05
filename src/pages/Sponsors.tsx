// src/pages/Sponsors.tsx
import React, { useMemo } from "react";
import { Crown, Gem, Medal, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

import { useSanityQuery } from "@/hooks/useSanityQuery";
import { queries } from "@/lib/sanityQueries";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { urlFor } from "@/lib/sanity";
import type { Sponsor } from "@/types/sanity";
import { trackSponsorClick } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { SEOHead } from "@/components/SEOHead";
import { PageHero } from "@/components/layout/PageHero";
import { useReducedMotion } from "@/hooks/useRedusedMotion";
import { useScrollDepthTracking } from "@/lib/analytics";

/* ── Tier-oppsett ────────────────────────────────────────────────────────── */

const TIERS = ["main", "gold", "silver", "partner"] as const;
type SponsorTier = (typeof TIERS)[number];

const TIER_META: Record<
  SponsorTier,
  {
    label: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }
> = {
  main:    { label: "Hovedsponsor",  description: "Vår viktigste støttespiller",     icon: Crown    },
  gold:    { label: "Gullpartnere",  description: "Store bidsagsytere", icon: Gem      },
  silver:  { label: "Sølvpartnere",  description: "Samarbeid og lokal støtte",     icon: Medal    },
  partner: { label: "Partnere",      description: "Samarbeid og lokal støtte",       icon: Handshake },
};

function normalizeTier(value?: string): SponsorTier {
  if (value && (TIERS as readonly string[]).includes(value)) return value as SponsorTier;
  return "partner";
}

function useTieredSponsors(sponsors?: Sponsor[]) {
  return useMemo(() => {
    const grouped: Partial<Record<SponsorTier, Sponsor[]>> = {};
    sponsors?.forEach((s) => {
      const tier = normalizeTier(s.tier);
      (grouped[tier] ||= []).push(s);
    });
    return {
      main:    grouped.main    ?? [],
      gold:    grouped.gold    ?? [],
      silver:  grouped.silver  ?? [],
      partner: grouped.partner ?? [],
    };
  }, [sponsors]);
}

/* ── Ornament-skillelinje ────────────────────────────────────────────────── */

function TierDivider({ tier }: { tier: SponsorTier }) {
  const { description } = TIER_META[tier];
  return (
    <div className="relative flex items-center gap-4 py-2">
      {/* Venstre linje */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-500/40" />

      {/* Midtpunkt med ikon + label */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/25 bg-cynical-800/60">

        <span className="eyebrow text-gold-400/90 text-xs">{description}</span>
      </div>

      {/* Høyre linje */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-500/40" />
    </div>
  );
}

/* ── SponsorLogo ─────────────────────────────────────────────────────────── */

type LogoSize = "hero" | "xl" | "lg" | "md" | "sm";

const SIZE_BOX: Record<LogoSize, string> = {
  hero: "h-36 sm:h-44",
  xl:   "h-28 sm:h-32",
  lg:   "h-22 sm:h-24",
  md:   "h-18 sm:h-20",
  sm:   "h-14 sm:h-16",
};

const SIZE_IMG: Record<LogoSize, string> = {
  hero: "max-h-28 sm:max-h-36",
  xl:   "max-h-20 sm:max-h-24",
  lg:   "max-h-16 sm:max-h-18",
  md:   "max-h-12 sm:max-h-14",
  sm:   "max-h-10 sm:max-h-12",
};

// Tier → glowfarge
const TIER_GLOW: Record<SponsorTier, string> = {
  main:    "hover:shadow-[0_0_48px_rgba(251,191,36,0.35)]  hover:border-gold-400/70",
  gold:    "hover:shadow-[0_0_32px_rgba(251,191,36,0.25)]  hover:border-gold-400/55",
  silver:  "hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]  hover:border-gold-500/40",
  partner: "hover:shadow-[0_0_12px_rgba(251,191,36,0.10)]  hover:border-gold-500/25",
};

const TIER_BORDER: Record<SponsorTier, string> = {
  main:    "border-gold-500/35 shadow-[0_0_24px_rgba(251,191,36,0.12)]",
  gold:    "border-gold-500/25",
  silver:  "border-gold-500/15",
  partner: "border-white/8",
};

function SponsorCard({
  sponsor,
  size = "md",
  tier,
}: {
  sponsor: Sponsor;
  size?: LogoSize;
  tier: SponsorTier;
}) {
  const reduced = useReducedMotion();
  const needsLightBg = sponsor.needsLightBackground ?? true;

  const card = (
    <div
      className={clsx(
        "relative w-full rounded-xl overflow-hidden",
        "flex items-center justify-center",
        "border",
        "bg-cynical-800/40",
        "motion-safe:transition-all motion-safe:duration-300",
        TIER_BORDER[tier],
        TIER_GLOW[tier],
        SIZE_BOX[size]
      )}
      title={sponsor.name}
    >
      {/* Lys bakplate for mørke logoer */}
      {needsLightBg && (
        <div className="absolute inset-[3px] rounded-lg bg-white/90" />
      )}

      {/* Subtil gull-shimmer i hjørnene for main/gold */}
      {(tier === "main" || tier === "gold") && (
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.06),transparent_50%)]
                     pointer-events-none"
          aria-hidden="true"
        />
      )}

      {sponsor.logo ? (
        <img
          src={urlFor(sponsor.logo).width(600).url()}
          alt={sponsor.name}
          className={clsx(
            "relative z-10 object-contain max-w-[82%]",
            SIZE_IMG[size],
            needsLightBg ? "mix-blend-multiply" : "mix-blend-normal"
          )}
          loading="lazy"
        />
      ) : (
        <span className="relative z-10 text-sm font-medium text-white/70 px-4 text-center">
          {sponsor.name}
        </span>
      )}
    </div>
  );

  const wrapped = sponsor.url ? (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cynical-900 rounded-xl"
      onClick={() =>
        trackSponsorClick(sponsor._id, sponsor.name, tier)
      }
    >
      {card}
    </a>
  ) : (
    <div className="w-full">{card}</div>
  );

  if (reduced) return wrapped;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {wrapped}
    </motion.div>
  );
}

/* ── Festningsveggen ─────────────────────────────────────────────────────────
   Konsept: sponsor-hierarkiet visualisert som arkitektoniske lag.
   Størrelse og visuelle virkemidler (glow, border, spacing) kommuniserer rang.
   Mobil: vertikal tårnstruktur. Desktop: bredt scenetablå.
────────────────────────────────────────────────────────────────────────────── */

function Festningsveggen({
  main,
  gold,
  silver,
  partner,
}: ReturnType<typeof useTieredSponsors>) {
  return (
    <div className="space-y-10 sm:space-y-14">

      {/* ── HOVEDSPONSOR — troner alene, full bredde, størst glow ───────── */}
      {main.length > 0 && (
        <div className="space-y-4">
          <TierDivider tier="main" />

          {/* Subtil ambient-glow bak kortet */}
          <div className="relative">
            <div
              className="absolute inset-x-[10%] top-4 h-20 bg-gold-500/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-1 gap-4 max-w-2xl mx-auto">
              {main.map((s) => (
                <SponsorCard key={s._id} sponsor={s} size="hero" tier="main" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── GULL — prominente rektangler, 1 kol mobil / 2 kol desktop ────── */}
      {gold.length > 0 && (
        <div className="space-y-4">
          <TierDivider tier="gold" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {gold.map((s) => (
              <SponsorCard key={s._id} sponsor={s} size="xl" tier="gold" />
            ))}
          </div>
        </div>
      )}

      {/* ── SØLV — 2 kol mobil / 3 kol desktop ──────────────────────────── */}
      {silver.length > 0 && (
        <div className="space-y-4">
          <TierDivider tier="silver" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {silver.map((s) => (
              <SponsorCard key={s._id} sponsor={s} size="lg" tier="silver" />
            ))}
          </div>
        </div>
      )}

      {/* ── PARTNER — tett mosaikk, 3 kol mobil / 4-5 kol desktop ────────── */}
      {partner.length > 0 && (
        <div className="space-y-4">
          <TierDivider tier="partner" />
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {partner.map((s) => (
              <SponsorCard key={s._id} sponsor={s} size="sm" tier="partner" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── CTA-seksjon ─────────────────────────────────────────────────────────── */

function BecomeSponsorCTA() {
  return (
    <Section background="cynical">
      <Container>
        {/* Dekorativ linje øverst */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/30 to-transparent mb-10 sm:mb-14" />

        <div className="relative text-center max-w-xl mx-auto space-y-5">
          {/* Ambient glow */}
          <div
            className="absolute inset-x-[15%] top-0 h-16 bg-gold-500/8 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <p className="eyebrow text-torch-300/80 text-[0.7rem] sm:text-xs">
            Bli med
          </p>

          <h2 className="font-heading text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] text-white leading-[1.1] tracking-[-0.01em]">
            Vil du være sponsor?
          </h2>

          <p className="text-cynical-200/75 text-base leading-relaxed">
            Om du ønsker å bli med som sponsor, ta gjerne kontakt for en uforpliktende prat om muligheter og pakker.
          </p>

          <div className="pt-2">
            <Button variant="gold" size="lg" asChild>
              <a href="/kontakt">Ta kontakt</a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── Skeleton ────────────────────────────────────────────────────────────── */

function SkeletonBlock() {
  return (
    <div className="space-y-10">
      {/* Simulerer tier-struktur */}
      <div className="h-36 w-full max-w-2xl mx-auto rounded-xl bg-white/6 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-white/4 animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-white/3 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

/* ── Side ────────────────────────────────────────────────────────────────── */

export function Sponsors() {
  const { data: sponsors, isLoading } = useSanityQuery<Sponsor[]>(
    "sponsors",
    queries.sponsors
  );
  const tiered = useTieredSponsors(sponsors);
  useScrollDepthTracking("sponsorer");
  
  return (
    <>
      <SEOHead
        title="Sponsorer"
        description="Uten våre samarbeidspartnere hadde forestillingen på Kongsvinger Festning ikke vært mulig. Deres støtte bidrar til å skape en unik forestilling til barn og boksne i alle aldre."
      />

      <PageHero
        eyebrow="Samarbeidspartnere"
        title="Sponsorer"
        subtitle="Uten våre samarbeidspartnere hadde forestillingen på Kongsvinger Festning ikke vært mulig. Deres støtte bidrar til å skape en unik opplevelse for barn og voksne i alle aldre."
        backgroundImageUrl="/assets/landing/plakat_bakgrunn.png"
        backgroundImageAlt="Logoer og lyssetting på Kongsvinger Festning"
        align="left"
      />

      <Section background="cynical">
        <Container>
          {isLoading ? <SkeletonBlock /> : <Festningsveggen {...tiered} />}
        </Container>
      </Section>

      <BecomeSponsorCTA />
    </>
  );
}