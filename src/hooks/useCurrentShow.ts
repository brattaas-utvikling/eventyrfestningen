// src/hooks/useCurrentShow.ts
import { useQuery } from "@tanstack/react-query";
import { fetchSanity } from "@/lib/sanity";
import { queries } from "@/lib/sanityQueries";
import type { Show } from "@/types/sanity";

export function useCurrentShow() {
  return useQuery({
    queryKey: ["current-show"],
    queryFn: () => fetchSanity<Show>(queries.currentShow),
  });
}
