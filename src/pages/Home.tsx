// import { FaqSection } from "@/components/sections/FaqSection";
import { FortressExperienceSection } from "@/components/sections/FortressExperienceSection";
import { Hero } from "@/components/sections/Hero";
// import { HighlightsSection } from "@/components/sections/HighlightsSection";
import { QuickInfoSection } from "@/components/sections/QuickInfoSection";
// import { StorySection } from "@/components/sections/StorySection";
// import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { Skeleton } from "@/components/ui/Skeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { queries } from "@/lib/sanityQueries";
import type { Show, Performance } from "@/types/sanity";
import { useScrollDepthTracking } from "@/lib/analytics";
import { TrackSection } from "@/lib/Tracksection";

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

  if (isLoading || !show) {
    return <Skeleton />;
  }


  return (
    <>
      <Hero show={show} nextPerformance={performances?.[0]} />
      {/* <StorySection /> */}
      <TrackSection page="home" section="fortress_experience">
      <FortressExperienceSection />
      </TrackSection>
      
      <TrackSection page="home" section="quick_info">
      <QuickInfoSection />
      </TrackSection>
      {/* <HighlightsSection /> */}
    </>
  );
}
