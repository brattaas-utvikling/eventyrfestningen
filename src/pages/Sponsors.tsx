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
import { trackEvent } from "@/lib/analytics";

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
  tier,
}: {
  sponsor: Sponsor;
  size?: "xl" | "lg" | "md" | "sm";
  subtle?: boolean;
  bordered?: boolean;
  hover?: boolean;
  tier: SponsorTier;
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
        bordered && "group" // for hover på rammen
      )}
    >
      {bordered && (
        <div
          aria-hidden="true"
          className={clsx(
            // YTRE, ANIMERT GRADIENT-BORDER
            "pointer-events-none absolute -inset-0.5 rounded-2xl",
            // Torch-gradient med CSS-variabler fra @theme
            "bg-[linear-gradient(130deg,var(--color-torch-500),var(--color-torch-100),var(--color-torch-500))]",
            "bg-size-[250%_250%] animate-[borderGlow_5s_linear_infinite]",
            "opacity-0 transition-opacity duration-500",
            "group-hover:opacity-100"
          )}
        />
      )}
  
      <div
        className={clsx(
          "relative w-full",
          bordered && "rounded-xl",
          "bg-white",
          "transition-colors duration-300"
        )}
      >
        {inner}
      </div>
    </div>
  );
  

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
        onClick={() =>
          trackEvent("sponsor_click", {
            sponsorId: sponsor._id,
            sponsorName: sponsor.name,
            tier,
            page: "sponsors",
          })
        }
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
    <section className="overflow-hidden ">
      {/* HOVEDSPONSOR */}
      <div className="relative px-4 py-10 sm:px-8 flex justify-center">
      <div className="pointer-events-none absolute"/>
        <div className="relative z-10 w-full">
          <div className="grid grid-cols-1 gap-4">
            {main.map((sponsor) => (
              <SponsorLogo key={sponsor._id} sponsor={sponsor} size="xl" bordered tier="main"/>
            ))}
          </div>
        </div>
      </div>

      {/* ØVRIGE TIER */}
      <div className="px-4 sm:px-8 space-y-10">
        {/* GOLD */}
        {gold.length > 0 && (
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {gold.map((sponsor) => (
                <SponsorLogo key={sponsor._id} sponsor={sponsor} size="lg" bordered tier="gold"/>
              ))}
            </div>
          </div>
        )}

        {/* SILVER */}
        {silver.length > 0 && (
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {silver.map((sponsor) => (
                <SponsorLogo
                  key={sponsor._id}
                  sponsor={sponsor}
                  size="md"
                  bordered
                  tier="silver"
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
                  tier="partner"
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