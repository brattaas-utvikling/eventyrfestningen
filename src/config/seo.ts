// src/config/seo.ts
import { urlFor } from '@/lib/sanity'
import type { Show, Performance, Post } from '@/types/sanity'

export const defaultSEO = {
  siteName: 'Eventyrfestningen',
  siteUrl: 'https://eventyrfestningen.no',
  defaultTitle:
    'Eventyrfestningen - Storslåtte familieforestillinger',
  defaultDescription:
    'Opplev magiske familieforestillinger på Kongsvinger Festning. Profesjonell teateropplevelse med historie, drama og fantasi for hele familien.',
  defaultKeywords: [
    'teater Kongsvinger',
    'familieforestilling Innlandet',
    'Kongsvinger Festning',
    'barneteater',
    'sommerteater Norge',
    'kulturopplevelser barn',
  ],
  twitterHandle: '@festningsteater',
  facebookUrl: 'https://facebook.com/eventyrfestningen',
  instagramUrl: 'https://instagram.com/eventyrfestningen',
}

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
}

export function generateMetaTags({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  author,
}: MetaTagsProps = {}) {
  const finalTitle = title
    ? `${title} | ${defaultSEO.siteName}`
    : defaultSEO.defaultTitle

  const finalDescription = description || defaultSEO.defaultDescription
  const finalKeywords = keywords || defaultSEO.defaultKeywords
  const finalUrl = url || defaultSEO.siteUrl
  const finalImage = image || `${defaultSEO.siteUrl}/og-image.jpg`

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords.join(', '),
    canonical: finalUrl,
    openGraph: {
      type,
      url: finalUrl,
      title: finalTitle,
      description: finalDescription,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: title || defaultSEO.siteName,
        },
      ],
      siteName: defaultSEO.siteName,
      ...(publishedTime ? { publishedTime } : {}),
      ...(author ? { author } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: defaultSEO.twitterHandle,
      title: finalTitle,
      description: finalDescription,
      image: finalImage,
    },
  }
}

// JSON-LD: organisasjon
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TheaterGroup',
    name: defaultSEO.siteName,
    url: defaultSEO.siteUrl,
    logo: `${defaultSEO.siteUrl}/logo.png`,
    description: defaultSEO.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kongsvinger Festning',
      addressLocality: 'Kongsvinger',
      postalCode: '2226',
      addressCountry: 'NO',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+47-123-45-678',
      contactType: 'customer service',
      email: 'post@festningsteater.no',
      availableLanguage: ['Norwegian'],
    },
    sameAs: [defaultSEO.facebookUrl, defaultSEO.instagramUrl],
  }
}

// JSON-LD: event – nå uten any
export function generateEventSchema(
  show: Show | null | undefined,
  performance: Performance | null | undefined
) {
  if (!show || !performance) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'TheaterEvent',
    name: show.title,
    description: show.seo?.description || defaultSEO.defaultDescription,
    image: show.posterImage
      ? urlFor(show.posterImage).width(1200).url()
      : undefined,
    startDate: performance.date,
    endDate: performance.date,
    location: {
      '@type': 'Place',
      name: 'Kongsvinger Festning',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kongsvinger Festning',
        addressLocality: 'Kongsvinger',
        postalCode: '2226',
        addressCountry: 'NO',
      },
    },
    organizer: {
      '@type': 'TheaterGroup',
      name: defaultSEO.siteName,
      url: defaultSEO.siteUrl,
    },
    performer: show.cast
      ? show.cast.map((c) => ({
          '@type': 'Person',
          name: c.actor.name,
          roleName: c.role,
        }))
      : undefined,
    offers: {
      '@type': 'Offer',
      url: show.ticketUrl,
      price: '0',
      priceCurrency: 'NOK',
      availability:
        performance.status === 'soldout'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Families with children',
    },
  }
}

// JSON-LD: artikkel – nå typed
export function generateArticleSchema(post: Post | null | undefined) {
  if (!post) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage
      ? urlFor(post.mainImage).width(1200).url()
      : undefined,
    datePublished: post.publishedAt,
    dateModified: (post as Post & { _updatedAt?: string })._updatedAt
      ? (post as Post & { _updatedAt?: string })._updatedAt
      : post.publishedAt,
    author: {
      '@type': 'Organization',
      name: defaultSEO.siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: defaultSEO.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${defaultSEO.siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${defaultSEO.siteUrl}/nyheter/${post.slug}`,
    },
  }
}
