import { Hero } from "@/components/sections/Hero";
import { Skeleton } from "@/components/ui/Skeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { queries } from "@/lib/sanityQueries";
import type { Show, Performance } from "@/types/sanity";
import { useScrollDepthTracking } from "@/lib/analytics";
import { TrackSection } from "@/lib/Tracksection";
import { SEOHead } from "@/components/SEOHead";
import { urlFor } from "@/lib/sanity";
import { defaultSEO } from "@/config/seo";
import UpcomingShowScene from "@/components/sections/UpcomingShowScene";
import HistoryScene from "@/components/sections/HistoryScene";
import ArchiveTeaser from "@/components/sections/ArchiveTeaser";
import { landingData } from "@/components/sections/data/landingData";

export default function Home() {
  const { data: show, isLoading } = useSanityQuery<Show>(
    "current-show",
    queries.currentShow
  );

  const { data: performances } = useSanityQuery<Performance[]>(
    "upcoming-performances",
    queries.upcomingPerformances
  );

  useScrollDepthTracking("home");

  if (isLoading || !show) return <Skeleton />;

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
        preloadVideo="/assets/landing/heroVideo.mp4"
      />

      <TrackSection page="home" section="hero_ticket_launch">
        <Hero show={show} nextPerformance={performances?.[0]} />
      </TrackSection>

      <TrackSection page="home" section="upcoming-event">
        <UpcomingShowScene />
      </TrackSection>

      <TrackSection page="home" section="history">
        <HistoryScene data={landingData.history} />
      </TrackSection>

      <TrackSection page="home" section="archive_teaser">
        <ArchiveTeaser data={landingData.archive} />
      </TrackSection>
    </>
  );
}


// // import { FaqSection } from "@/components/sections/FaqSection";
// import { FortressExperienceSection } from "@/components/sections/FortressExperienceSection";
// import { Hero } from "@/components/sections/Hero";
// // import { HighlightsSection } from "@/components/sections/HighlightsSection";
// import { QuickInfoSection } from "@/components/sections/QuickInfoSection";
// // import { StorySection } from "@/components/sections/StorySection";
// // import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
// import { Skeleton } from "@/components/ui/Skeleton";
// import { useSanityQuery } from "@/hooks/useSanityQuery";
// import { queries } from "@/lib/sanityQueries";
// import type { Show, Performance } from "@/types/sanity";
// import { useScrollDepthTracking } from "@/lib/analytics";
// import { TrackSection } from "@/lib/Tracksection";

// export default function Home() {
//   const { data: show, isLoading } = useSanityQuery<Show>(
//     "current-show",
//     queries.currentShow
//   );

//   const { data: performances } = useSanityQuery<Performance[]>(
//     "upcoming-performances",
//     queries.upcomingPerformances
//   );

//   useScrollDepthTracking("home");

//   if (isLoading || !show) {
//     return <Skeleton />;
//   }


//   return (
//     <>
//       <Hero show={show} nextPerformance={performances?.[0]} />
//       {/* <StorySection /> */}
//       <TrackSection page="home" section="fortress_experience">
//       <FortressExperienceSection />
//       </TrackSection>
      
//       <TrackSection page="home" section="quick_info">
//       <QuickInfoSection />
//       </TrackSection>
//       {/* <HighlightsSection /> */}
//     </>
//   );
// }
