import { Skeleton } from "@/components/ui/Skeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { queries } from "@/lib/sanityQueries";
import type { Show } from "@/types/sanity";
import { useScrollDepthTracking } from "@/lib/analytics";
import { TrackSection } from "@/lib/Tracksection";
import { SEOHead } from "@/components/SEOHead";
import { urlFor } from "@/lib/sanity";
import { defaultSEO } from "@/config/seo";
// import UpcomingShowScene from "@/components/sections/UpcomingShowScene";
import HistoryScene from "@/components/sections/HistoryScene";
import ArchiveTeaser from "@/components/sections/ArchiveTeaser";
import { landingData } from "@/components/sections/data/landingData";
// import AnnouncementSection from "@/components/sections/AnnouncementSection";
import { PlakatHero } from "@/components/sections/PlakatHero";
// import { CoverflowHero } from "@/components/sections/CoverflowHero";
import { EventHero } from "@/components/sections/EventHero";
import {
  halloweenData,
  halloweenEventSchema,
  isHalloweenActive,
} from "@/components/sections/data/halloweenData";
import NextSeasonTeaser from "@/components/sections/NextSeasonTeaserData";
import { AuditionSection } from "@/components/sections/AuditionSection";
import { auditionData, isAuditionActive } from "@/components/sections/data/auditionData";
import { PrinsenHero } from "@/components/sections/PrinsenHero";
import {
  prinsenData,
  prinsenEventSchema,
  isPrinsenHeroActive,
} from "@/components/sections/data/prinsenData";
import { AuditionHero } from "@/components/sections/AuditionHero";

export default function Home() {
  const { data: show, isLoading } = useSanityQuery<Show>(
    "current-show",
    queries.currentShow
  );

  // const { data: performances } = useSanityQuery<Performance[]>(
  //   "upcoming-performances",
  //   queries.upcomingPerformances
  // );

  useScrollDepthTracking("home");


  if (isLoading || !show) return <Skeleton />;

  // Hero etter dato: Halloween (til 24.10 kl. 23) → Audition (til 30.10) → Franske prinsen (til 10.7.2027) → PlakatHero.
  const showHalloween = isHalloweenActive();
  const showAudition = isAuditionActive();
  const showPrinsen = !showHalloween && !showAudition && isPrinsenHeroActive();

  const seoTitle = show.seo?.title ?? `${show.title} – ${defaultSEO.siteName}`;
  const seoDescription = show.seo?.description ?? defaultSEO.defaultDescription;
  const seoImage = show.seo?.ogImage
    ? urlFor(show.seo.ogImage).width(1200).height(630).url()
    : show.heroImage
    ? urlFor(show.heroImage).width(1200).height(630).url()
    : `${defaultSEO.siteUrl}/og-image.jpg`;

  return (
    <>
      <SEOHead 
        title={seoTitle} 
        description={seoDescription} 
        image={seoImage}
        schema={showHalloween ? halloweenEventSchema : showPrinsen ? prinsenEventSchema : undefined}
        // preloadVideo="/assets/landing/heroVideo.mp4"
      />

      {/* <TrackSection page="home" section="hero_ticket_launch">
        <Hero show={show} nextPerformance={performances?.[0]} />
      </TrackSection> */}
      {showHalloween ? (
        <TrackSection page="home" section="hero_halloween">
          <EventHero {...halloweenData} />
        </TrackSection>
      ) : showAudition ? (
        <TrackSection page="home" section="hero_audition">
          <AuditionHero {...auditionData} />
        </TrackSection>
      ) : showPrinsen ? (
        <TrackSection page="home" section="hero_prinsen">
          <PrinsenHero {...prinsenData} />
        </TrackSection>
      ) : (
        <TrackSection page="home" section="hero">
          <PlakatHero
            show={show}
            portraitSrc="/assets/landing/plakat-2026-portrait.webp"
            landscapeSrc="/assets/landing/plakat-2026-landscape.webp"
          />
        </TrackSection>
      )}

      {showHalloween && showAudition && (
        <TrackSection page="home" section="audition">
          <AuditionSection {...auditionData} />
        </TrackSection>
      )}

      {/* Teaseren for 2027 er overflødig når samme forestilling allerede er hero */}
      {!showPrinsen && <NextSeasonTeaser />}

      {/* <TrackSection page="home" section="carosel">
      <CoverflowHero />
      </TrackSection> */}
      
      {/* <TrackSection page="home" section="announcement">
        <AnnouncementSection />
      </TrackSection> */}

      {/* <TrackSection page="home" section="upcoming_event">
        <UpcomingShowScene />
      </TrackSection> */}

      <TrackSection page="home" section="history">
        <HistoryScene data={landingData.history} />
      </TrackSection>

      <TrackSection page="home" section="archive_teaser">
        <ArchiveTeaser data={landingData.archive} />
      </TrackSection>
    </>
  );
}
