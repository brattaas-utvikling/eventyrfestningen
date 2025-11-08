// src/lib/sanity.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || "2024-01-01",
  useCdn: import.meta.env.PROD,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// helper fetchSanity<MyType>(query)
export async function fetchSanity<T>(query: string): Promise<T> {
  try {
    const data = await sanityClient.fetch<T>(query);
    return data;
  } catch (error) {
    console.error("Sanity fetch error:", error);
    throw error;
  }
}
