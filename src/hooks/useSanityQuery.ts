// src/hooks/useSanityQuery.ts
import { useQuery } from "@tanstack/react-query";
import { fetchSanity } from "@/lib/sanity";

interface UseSanityQueryOptions {
  staleTime?: number;
  cacheTime?: number;
  enabled?: boolean;
}

export function useSanityQuery<T>(
  key: string | string[],
  query: string,
  options?: UseSanityQueryOptions
) {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: () => fetchSanity<T>(query),
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    gcTime: options?.cacheTime ?? 10 * 60 * 1000,
    enabled: options?.enabled ?? true,
  });
}
