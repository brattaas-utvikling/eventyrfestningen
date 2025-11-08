import { Hero } from "@/components/sections/Hero";
import { Skeleton } from "@/components/ui/Skeleton";
import { useSanityQuery } from "@/hooks/useSanityQuery";
import { queries } from "@/lib/sanityQueries";
import type { Show, Performance } from "@/types/sanity";

export default function Home() {
  const { data: show, isLoading } = useSanityQuery<Show>(
    "current-show",
    queries.currentShow
  );

  const { data: performances } = useSanityQuery<Performance[]>(
    "upcoming-performances",
    queries.upcomingPerformances
  );

  if (isLoading || !show) {
    return <Skeleton />;
  }

  return (
    <>
      <Hero show={show} nextPerformance={performances?.[0]} />
    </>
  );
}
