// src/pages/Sponsors.tsx
import React, { useMemo } from "react";
import { Handshake, Medal, Gem, Crown } from "lucide-react";
import clsx from "clsx";

import { useSanityQuery } from "@/hooks/useSanityQuery";
import { queries } from "@/lib/sanityQueries";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { urlFor } from "@/lib/sanity";
import type { Sponsor } from "@/types/sanity";


/* -------------------------------------------------------
 *  Tier-oppsett
 * ------------------------------------------------------*/
const TIERS = ["main", "gold", "silver", "partner"] as const;
type SponsorTier = (typeof TIERS)[number];

const TIER_META: Record<
  SponsorTier,
  { title: string; description: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }
> = {
  main: {
    title: "Hovedsponsor",
    description: "Vår viktigste støttespiller.",
    icon: Crown,
  },
  gold: {
    title: "Gullpartnere",
    description: "Bidrar til å løfte produksjonen.",
    icon: Gem,
  },
  silver: {
    title: "Sølvpartnere",
    description: "Støtter kulturen i regionen.",
    icon: Medal,
  },
  partner: {
    title: "Partnere",
    description: "Samarbeid og lokal støtte.",
    icon: Handshake,
  },
};

function normalizeTier(value?: string): SponsorTier {
  if (value && (TIERS as readonly string[]).includes(value)) {
    return value as SponsorTier;
  }
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
      main: grouped.main ?? [],
      gold: grouped.gold ?? [],
      silver: grouped.silver ?? [],
      partner: grouped.partner ?? [],
    };
  }, [sponsors]);
}

/* -------------------------------------------------------
 *  Logo-komponent – med glow + animert border
 * ------------------------------------------------------*/
function SponsorLogo({
  sponsor,
  size = "md",
  subtle = false,
  bordered = false,
  // hover = true, // behold prop-signatur selv om vi ikke bruker "hover" direkte
}: {
  sponsor: Sponsor;
  size?: "xl" | "lg" | "md" | "sm";
  subtle?: boolean;
  bordered?: boolean;
  hover?: boolean;
}) {
  const box = {
    xl: "h-32",
    lg: "h-24",
    md: "h-20",
    sm: "h-16",
  }[size];

  const imgH = {
    xl: "max-h-24",
    lg: "max-h-20",
    md: "max-h-16",
    sm: "max-h-14",
  }[size];

  const needsLightBg = sponsor.needsLightBackground ?? true;

  const inner = (
    <div
      className={clsx(
        "relative w-full rounded-xl overflow-hidden",
        "flex items-center justify-center",
        "transition-all duration-500",
        subtle ? "opacity-80" : "opacity-100",
        "hover:opacity-100",
        box
      )}
      title={sponsor.name}
    >
      {/* lys bakplate for mørke logoer */}
      {needsLightBg && (
        <div className="absolute inset-[3px] rounded-lg bg-white/85 backdrop-blur-sm" />
      )}

      {sponsor.logo ? (
        <img
          src={urlFor(sponsor.logo).width(600).url()}
          alt={sponsor.name}
          className={clsx(
            "relative z-10 object-contain max-w-[90%]",
            imgH,
            needsLightBg ? "mix-blend-multiply" : "mix-blend-normal"
          )}
          loading="lazy"
        />
      ) : (
        <span className="relative z-10 text-sm font-medium text-white/80">
          {sponsor.name}
        </span>
      )}
    </div>
  );

  const content = (
    <div
      className={clsx(
        "relative w-full",
        bordered && "rounded-xl",

        // base bakgrunn
        "bg-white/5",

        // glow + tint ved hover
        "transition-all duration-500",
        "hover:bg-white/10 hover:backdrop-blur-sm",

        // subtil ytre glow
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[18px] before:bg-transparent before:transition-all before:duration-500",
        "hover:before:bg-gold-400/10",

        // animert border rundt kortet
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[18px] after:p-px after:bg-[linear-gradient(130deg,rgba(253,224,71,0.7),rgba(255,255,255,0.2),rgba(253,224,71,0.7))] after:bg-size-[250%_250%] after:opacity-0 hover:after:opacity-100",
        "after:animate-[borderGlow_5s_linear_infinite]"
      )}
    >
      {inner}
    </div>
  );

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        {content}
      </a>
    );
  }

  return <div className="w-full">{content}</div>;
}

/* -------------------------------------------------------
 *  Rad-heading per tier
 * ------------------------------------------------------*/
function RowHeading({
  tier,
  className,
}: {
  tier: SponsorTier;
  className?: string;
}) {
  const { title, description, icon: Icon } = TIER_META[tier];
  return (
    <div className={clsx("flex items-center gap-3 mb-4", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10">
        <Icon
          className={clsx(
            "h-5 w-5",
            tier === "main" ? "text-gold-300" : "text-gold-400"
          )}
        />
      </div>
      <div>
        <h3 className="font-display text-xl text-white">{title}</h3>
        <p className="text-xs text-white/60">{description}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
 *  DESIGN: Spotlight-grid
 *  - Main: full bredde
 *  - Gold: 2 kolonner (md+)
 *  - Silver: 3 kolonner (md+)
 *  - Partner: grid, nedtonet
 * ------------------------------------------------------*/
function DesignSpotlight({
  main,
  gold,
  silver,
  partner,
}: ReturnType<typeof useTieredSponsors>) {
  // const MainIcon = TIER_META.main.icon;

  return (
    <section className="rounded-2xl overflow-hidden border border-white/10 bg-linear-to-br from-navy-900 via-navy-900 to-burgundy-900">
      {/* HOVEDSPONSOR */}
      <div className="relative px-4 py-10 sm:px-8 flex justify-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.20),transparent_90%)]"/>
        <div className="relative z-10 w-full max-w-5xl">
        <RowHeading tier="main" />
          {/* <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-black/40 px-4 py-1.5 text-gold-100 shadow-lg shadow-black/40">
              <MainIcon className="h-4 w-4 text-gold-300" />
              <span className="text-xs font-display font-semibold tracking-[0.12em] uppercase">
                Hovedsponsor
              </span>
            </div>
          </div> */}

          <div className="grid grid-cols-1 gap-4">
            {main.map((sponsor) => (
              <SponsorLogo key={sponsor._id} sponsor={sponsor} size="xl" bordered />
            ))}
          </div>
        </div>
      </div>

      {/* ØVRIGE TIER */}
      <div className="border-t border-white/10 bg-black/40 px-4 py-10 sm:px-8 space-y-10">
        {/* GOLD */}
        {gold.length > 0 && (
          <div className="max-w-6xl mx-auto w-full">
            <RowHeading tier="gold" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {gold.map((sponsor) => (
                <SponsorLogo key={sponsor._id} sponsor={sponsor} size="lg" bordered />
              ))}
            </div>
          </div>
        )}

        {/* SILVER */}
        {silver.length > 0 && (
          <div className="max-w-6xl mx-auto w-full">
            <RowHeading tier="silver" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {silver.map((sponsor) => (
                <SponsorLogo
                  key={sponsor._id}
                  sponsor={sponsor}
                  size="md"
                  bordered
                  subtle
                />
              ))}
            </div>
          </div>
        )}

        {/* PARTNER */}
        {partner.length > 0 && (
          <div className="max-w-6xl mx-auto w-full">
            <RowHeading tier="partner" />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {partner.map((sponsor) => (
                <SponsorLogo
                  key={sponsor._id}
                  sponsor={sponsor}
                  size="sm"
                  subtle
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------
 *  Siden
 * ------------------------------------------------------*/
export function Sponsors() {
  const { data: sponsors, isLoading } = useSanityQuery<Sponsor[]>(
    "sponsors",
    queries.sponsors
  );
  const tiered = useTieredSponsors(sponsors);

  return (
    <>
      <Section className="py-20 sm:py-28 bg-linear-to-br from-navy-900 to-burgundy-900 text-white">
        <Container>
          <div className="max-w-3xl">
            <h1 className="mb-4 text-5xl sm:text-6xl font-display font-bold text-white">
              Sponsorer
            </h1>
            <p className="text-lg text-white/80">
              Uten våre samarbeidspartnere hadde forestillingen på Kongsvinger
              Festning ikke vært mulig. Deres støtte bidrar til å skape en unik forestilling til barn og boksne i alle aldre. Vi er dypt takknemlige for deres engasjement for kultur og lokalsamfunn. Ta gjerne en titt på våre sponsorer og oppdag de fantastiske virksomhetene som står bak denne magiske opplevelsen.
            </p>
          </div>
        </Container>
      </Section>

      <Section background="navy">
        <Container>
          {/* <DesignHeader index={1} label="Spotlight-oppsett" icon={Sparkles} /> */}
          {isLoading ? <SkeletonBlock /> : <DesignSpotlight {...tiered} />}
        </Container>
      </Section>
    </>
  );
}

/* -------------------------------------------------------
 *  UI-helpers
 * ------------------------------------------------------*/
function SkeletonBlock() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-24 w-full rounded-xl bg-white/10 animate-pulse"
        />
      ))}
    </div>
  );
}

// function DesignHeader({
//   index,
//   label,
//   icon: Icon,
// }: {
//   index: number;
//   label: string;
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
// }) {
//   return (
//     <div className="mb-6 flex items-center gap-3">
//       <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 border border-white/10">
//         <Icon className="h-5 w-5 text-gold-300" />
//       </div>
//       <h2 className="text-2xl font-display font-bold text-white">
//         {index}. {label}
//       </h2>
//     </div>
//   );
// }
