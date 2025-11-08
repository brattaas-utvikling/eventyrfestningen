import { useSanityQuery } from "@/hooks/useSanityQuery";
import { queries } from "@/lib/sanityQueries";
import { formatDate } from "@/lib/utils";
import type { Performance } from "@/types/sanity"; // 👈 riktig import!
import { Badge } from "./ui/Badge";

export default function Calendar() {
  const { data, isLoading } = useSanityQuery<Performance[]>(
    "upcoming-performances",
    queries.upcomingPerformances
  );

  if (isLoading) return <div className="p-6">Laster forestillinger…</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="font-display text-3xl text-gold-300 mb-4">
        Forestillingskalender
      </h1>
      {data?.map((perf) => (
        <div
          key={perf._id}
          className="bg-navy-800/40 border border-navy-700 rounded-lg p-4 flex items-center justify-between"
        >
          <div>
            <p className="text-lg text-white">
              {formatDate(perf.date, { weekday: "long" })}
            </p>
            <p className="text-sm text-navy-100/70">{perf.show.title}</p>
          </div>
          <Badge
            variant={
              perf.status === "soldout"
                ? "soldout"
                : perf.status === "few"
                ? "few"
                : "available"
            }
          >
            {perf.status === "soldout"
              ? "Utsolgt"
              : perf.status === "few"
              ? "Få billetter"
              : "Ledig"}
          </Badge>
        </div>
      ))}
    </div>
  );
}
