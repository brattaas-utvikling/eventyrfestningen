// scripts/generate-sitemap.ts
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const BASE_URL = process.env.VITE_SITE_URL ?? "https://eventyrfestningen.no";

// Egen Sanity-klient for Node-scriptet
const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID!,
  dataset: process.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: process.env.VITE_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: true,
});

type SanityDoc = {
  slug?: { current?: string };
  _updatedAt?: string;
};

async function getNewsSlugs() {
  const docs = await sanityClient.fetch<SanityDoc[]>(
    `*[_type == "news" && defined(slug.current)]{slug, _updatedAt}`
  );
  return docs
    .filter((d) => d.slug?.current)
    .map((d) => ({
      slug: d.slug!.current!,
      lastmod: d._updatedAt,
    }));
}

async function getShowSlugs() {
  const docs = await sanityClient.fetch<SanityDoc[]>(
    `*[_type == "show" && defined(slug.current)]{slug, _updatedAt}`
  );
  return docs
    .filter((d) => d.slug?.current)
    .map((d) => ({
      slug: d.slug!.current!,
      lastmod: d._updatedAt,
    }));
}

function isoDateOrFallback(date?: string) {
  if (!date) return undefined;
  try {
    return new Date(date).toISOString();
  } catch {
    return undefined;
  }
}

type UrlEntry = {
  loc: string;
  changefreq?: string;
  priority?: number;
  lastmod?: string;
};

function buildUrlXml({ loc, changefreq, priority, lastmod }: UrlEntry) {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    typeof priority === "number"
      ? `    <priority>${priority.toFixed(1)}</priority>`
      : null,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function generateSitemap() {
  console.log("🔍 Henter data fra Sanity...");

  const [news, shows] = await Promise.all([getNewsSlugs(), getShowSlugs()]);

  const staticUrls: UrlEntry[] = [
    { loc: `${BASE_URL}/`, changefreq: "weekly", priority: 1.0 },
    { loc: `${BASE_URL}/om-forestillingen`, changefreq: "weekly", priority: 0.9 },
    { loc: `${BASE_URL}/kalender`, changefreq: "weekly", priority: 0.8 },
    { loc: `${BASE_URL}/nyheter`, changefreq: "daily", priority: 0.7 },
    { loc: `${BASE_URL}/om-oss`, changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/sponsorer`, changefreq: "monthly", priority: 0.5 },
    { loc: `${BASE_URL}/arkiv`, changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/kontakt`, changefreq: "yearly", priority: 0.5 },
    { loc: `${BASE_URL}/personvern`, changefreq: "yearly", priority: 0.3 },
  ];

  const newsUrls: UrlEntry[] = news.map((n) => ({
    loc: `${BASE_URL}/nyheter/${n.slug}`,
    changefreq: "weekly",
    priority: 0.6,
    lastmod: isoDateOrFallback(n.lastmod),
  }));

  const showUrls: UrlEntry[] = shows.map((s) => ({
    loc: `${BASE_URL}/arkiv/${s.slug}`,
    changefreq: "monthly",
    priority: 0.5,
    lastmod: isoDateOrFallback(s.lastmod),
  }));

  const all = [...staticUrls, ...newsUrls, ...showUrls];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    all.map(buildUrlXml).join("\n") +
    `\n</urlset>\n`;

  const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");

  console.log(`✅ sitemap.xml generert: ${outPath}`);
  console.log(
    `   Inneholder ${staticUrls.length} statiske + ${newsUrls.length} nyheter + ${showUrls.length} arkiv-sider.`
  );
}

generateSitemap().catch((err) => {
  console.error("❌ Feil ved generering av sitemap:", err);
  process.exit(1);
});
