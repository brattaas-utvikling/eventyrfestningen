// src/scripts/generate-sitemap.ts
// Kjør ved build: npx tsx src/scripts/generate-sitemap.ts
// Legg til i package.json: "build": "npm run sitemap && vite build"
//
// Dette scriptet henter alle nyhetsartikler og arkivsider fra Sanity
// og genererer en komplett sitemap.xml i /public/

import { createClient } from '@sanity/client'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID ?? '',
  dataset: process.env.VITE_SANITY_DATASET ?? 'production',
  useCdn: false, // Alltid ferske data ved build
  apiVersion: '2024-01-01',
})

const SITE_URL = 'https://eventyrfestningen.no'

// Statiske sider med manuell prioritet
const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/om-forestillingen', priority: '0.9', changefreq: 'weekly' },
  { loc: '/program', priority: '0.9', changefreq: 'weekly' },
  { loc: '/hva-a-gjore-i-kongsvinger', priority: '0.8', changefreq: 'monthly' },
  { loc: '/nyheter', priority: '0.7', changefreq: 'daily' },
  { loc: '/om-oss', priority: '0.6', changefreq: 'monthly' },
  { loc: '/arkiv', priority: '0.6', changefreq: 'monthly' },
  { loc: '/frivillig', priority: '0.5', changefreq: 'monthly' },
  { loc: '/sponsorer', priority: '0.5', changefreq: 'monthly' },
  { loc: '/kontakt', priority: '0.5', changefreq: 'yearly' },
  { loc: '/personvern', priority: '0.3', changefreq: 'yearly' },
]

interface SanityDoc {
  slug: { current: string }
  _updatedAt: string
}

async function generateSitemap() {
  console.log('Henter data fra Sanity...')

  // Hent alle publiserte nyhetsartikler
  const posts: SanityDoc[] = await client.fetch(
    `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
    { slug, _updatedAt }
    | order(_updatedAt desc)`
  )

  // Hent alle arkiv/show-sider
  const shows: SanityDoc[] = await client.fetch(
    `*[_type == "show" && defined(slug.current) && !(_id in path("drafts.**"))]
    { slug, _updatedAt }
    | order(_updatedAt desc)`
  )

  console.log(`Fant ${posts.length} artikler og ${shows.length} show-sider`)

  const today = new Date().toISOString().split('T')[0]

  // Bygg URL-elementer
  const staticUrls = staticPages
    .map(
      (page) => `
  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')

  const postUrls = posts
    .map(
      (post) => `
  <url>
    <loc>${SITE_URL}/nyheter/${post.slug.current}</loc>
    <lastmod>${post._updatedAt.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('')

  const showUrls = shows
    .map(
      (show) => `
  <url>
    <loc>${SITE_URL}/arkiv/${show.slug.current}</loc>
    <lastmod>${show._updatedAt.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>${staticUrls}${postUrls}${showUrls}
</urlset>`

  const outputPath = resolve(process.cwd(), 'public/sitemap.xml')
  writeFileSync(outputPath, sitemap, 'utf-8')
  console.log(`✅ sitemap.xml generert med ${staticPages.length + posts.length + shows.length} URL-er → ${outputPath}`)
}

generateSitemap().catch((err) => {
  console.error('❌ Feil ved generering av sitemap:', err)
  process.exit(1)
})