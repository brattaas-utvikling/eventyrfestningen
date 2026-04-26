// src/config/seo.ts
import { urlFor } from '@/lib/sanity'
import type { Show, Performance, Post } from '@/types/sanity'

export const defaultSEO = {
  siteName: 'Eventyrfestningen',
  siteUrl: 'https://eventyrfestningen.no',
  defaultTitle: 'Eventyrfestningen - Storslåtte familieforestillinger',
  defaultDescription:
    'Opplev magiske familieforestillinger på Kongsvinger festning. Profesjonell teateropplevelse med historie, drama og fantasi for hele familien.',
  defaultKeywords: [
    'Eventyrfestningen',
    'Oberst Krebs',
    'utendørs musikal Kongsvinger',
    'familiemusikaler Innlandet',
    'Kongsvinger festning sommer',
    'teater Kongsvinger',
    'sommerforestilling barn',
    'UngINN Kongsvinger',
    'KOBBL-rabatt Kongsvinger'
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

// ─── JSON-LD: organisasjon ──────────────────────────────────────────────────

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
      streetAddress: 'Kongsvinger Festning 2',
      addressLocality: 'Kongsvinger',
      postalCode: '2213',
      addressCountry: 'NO',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+47-959-03-453',
      contactType: 'customer service',
      email: 'kontakt@eventyrfestningen.no',
      availableLanguage: ['Norwegian'],
    },
    sameAs: [defaultSEO.facebookUrl, defaultSEO.instagramUrl],
  }
}

// ─── JSON-LD: event ─────────────────────────────────────────────────────────

export function generateEventSchema(
  show: Show | null | undefined,
  performance: Performance | null | undefined
) {
  if (!show || !performance) return null

  const startDate = new Date(performance.date)
  const endDate = new Date(startDate.getTime() + 100 * 60 * 1000)

  return {
    '@context': 'https://schema.org',
    '@type': 'TheaterEvent',
    name: show.title,
    description: show.seo?.description || defaultSEO.defaultDescription,
    image: show.posterImage
      ? urlFor(show.posterImage).width(1200).url()
      : undefined,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    location: {
      '@type': 'Place',
      name: 'Kongsvinger Festning',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kongsvinger Festning 2',
        addressLocality: 'Kongsvinger',
        postalCode: '2213',
        addressCountry: 'NO',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 60.1942,
        longitude: 12.0035,
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
      '@type': 'AggregateOffer',
      lowPrice: '350',
      highPrice: '450',
      priceCurrency: 'NOK',
      url: show.ticketUrl,
      availability:
        performance.status === 'soldout'
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
      offers: [
        {
          '@type': 'Offer',
          name: 'Ordinær billett',
          price: '450',
          priceCurrency: 'NOK',
          url: show.ticketUrl,
        },
        {
          '@type': 'Offer',
          name: 'KOBBL-rabatt',
          price: '405',
          priceCurrency: 'NOK',
          url: show.ticketUrl,
          eligibleCustomerType: 'https://schema.org/Member',
        },
        {
          '@type': 'Offer',
          name: 'UngINN (13–21 år)',
          price: '350',
          priceCurrency: 'NOK',
          url: show.ticketUrl,
          eligibleAge: {
            '@type': 'QuantitativeValue',
            minValue: 13,
            maxValue: 21,
          },
        },
      ],
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Families with children',
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  }
}

// ─── JSON-LD: artikkel ──────────────────────────────────────────────────────

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

// ─── JSON-LD: Kongsvinger-guide (ny side) ───────────────────────────────────

export function generateKongsvingerGuideSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Hva å gjøre i Kongsvinger',
      description:
        'Anbefalte opplevelser, restauranter, natur og aktiviteter i Kongsvinger og regionen rundt.',
      url: `${defaultSEO.siteUrl}/hva-a-gjore-i-kongsvinger`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Kongsvinger festning' },
        { '@type': 'ListItem', position: 2, name: 'Øvrebyen' },
        { '@type': 'ListItem', position: 3, name: 'Finnskogen' },
        { '@type': 'ListItem', position: 4, name: 'Storsjøen' },
        { '@type': 'ListItem', position: 5, name: 'Magnor Glassverk' },
        { '@type': 'ListItem', position: 6, name: 'Kvinnemuseet' },
        { '@type': 'ListItem', position: 7, name: 'Norsk skogfinsk museum' },
        { '@type': 'ListItem', position: 8, name: 'Finnskogen Spa' },
        { '@type': 'ListItem', position: 9, name: 'Kongsvinger Golf Club' },
        { '@type': 'ListItem', position: 10, name: 'The Plus Magnor' },
        { '@type': 'ListItem', position: 11, name: 'PAN Treetop Cabins' },
        { '@type': 'ListItem', position: 12, name: 'Maarud Gaard Opplevelser' },
        { '@type': 'ListItem', position: 13, name: 'Liermoen' },
        { '@type': 'ListItem', position: 14, name: 'Grensen Experience' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Hjem',
          item: defaultSEO.siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Hva å gjøre i Kongsvinger',
          item: `${defaultSEO.siteUrl}/hva-a-gjore-i-kongsvinger`,
        },
      ],
    },
  ]
}

// // src/config/seo.ts
// import { urlFor } from '@/lib/sanity'
// import type { Show, Performance, Post } from '@/types/sanity'

// export const defaultSEO = {
//   siteName: 'Eventyrfestningen',
//   siteUrl: 'https://eventyrfestningen.no',
//   defaultTitle:
//     'Eventyrfestningen - Storslåtte familieforestillinger',
//   defaultDescription:
//     'Opplev magiske familieforestillinger på Kongsvinger Festning. Profesjonell teateropplevelse med historie, drama og fantasi for hele familien.',
//   defaultKeywords: [
//     'teater Kongsvinger',
//     'familieforestilling Innlandet',
//     'Kongsvinger Festning',
//     'barneteater',
//     'sommerteater Norge',
//     'kulturopplevelser barn',
//   ],
//   twitterHandle: '@festningsteater',
//   facebookUrl: 'https://facebook.com/eventyrfestningen',
//   instagramUrl: 'https://instagram.com/eventyrfestningen',
// }

// interface MetaTagsProps {
//   title?: string
//   description?: string
//   keywords?: string[]
//   image?: string
//   url?: string
//   type?: 'website' | 'article'
//   publishedTime?: string
//   author?: string
// }

// export function generateMetaTags({
//   title,
//   description,
//   keywords,
//   image,
//   url,
//   type = 'website',
//   publishedTime,
//   author,
// }: MetaTagsProps = {}) {
//   const finalTitle = title
//     ? `${title} | ${defaultSEO.siteName}`
//     : defaultSEO.defaultTitle

//   const finalDescription = description || defaultSEO.defaultDescription
//   const finalKeywords = keywords || defaultSEO.defaultKeywords
//   const finalUrl = url || defaultSEO.siteUrl
//   const finalImage = image || `${defaultSEO.siteUrl}/og-image.jpg`

//   return {
//     title: finalTitle,
//     description: finalDescription,
//     keywords: finalKeywords.join(', '),
//     canonical: finalUrl,
//     openGraph: {
//       type,
//       url: finalUrl,
//       title: finalTitle,
//       description: finalDescription,
//       images: [
//         {
//           url: finalImage,
//           width: 1200,
//           height: 630,
//           alt: title || defaultSEO.siteName,
//         },
//       ],
//       siteName: defaultSEO.siteName,
//       ...(publishedTime ? { publishedTime } : {}),
//       ...(author ? { author } : {}),
//     },
//     twitter: {
//       card: 'summary_large_image',
//       site: defaultSEO.twitterHandle,
//       title: finalTitle,
//       description: finalDescription,
//       image: finalImage,
//     },
//   }
// }

// // JSON-LD: organisasjon
// export function generateOrganizationSchema() {
//   return {
//     '@context': 'https://schema.org',
//     '@type': 'TheaterGroup',
//     name: defaultSEO.siteName,
//     url: defaultSEO.siteUrl,
//     logo: `${defaultSEO.siteUrl}/logo.png`,
//     description: defaultSEO.defaultDescription,
//     address: {
//       '@type': 'PostalAddress',
//       streetAddress: 'Kongsvinger Festning 2',
//       addressLocality: 'Kongsvinger',
//       postalCode: '2213',
//       addressCountry: 'NO',
//     },
//     contactPoint: {
//       '@type': 'ContactPoint',
//       telephone: '+47-959-03-453',
//       contactType: 'daglig leder',
//       email: 'kontakt@festningsteater.no',
//       availableLanguage: ['Norwegian'],
//     },
//     sameAs: [defaultSEO.facebookUrl, defaultSEO.instagramUrl],
//   }
// }

// // JSON-LD: event – nå uten any
// export function generateEventSchema(
//   show: Show | null | undefined,
//   performance: Performance | null | undefined
// ) {
//   if (!show || !performance) return null

//   return {
//     '@context': 'https://schema.org',
//     '@type': 'TheaterEvent',
//     name: show.title,
//     description: show.seo?.description || defaultSEO.defaultDescription,
//     image: show.posterImage
//       ? urlFor(show.posterImage).width(1200).url()
//       : undefined,
//     startDate: performance.date,
//     endDate: performance.date,
//     location: {
//       '@type': 'Place',
//       name: 'Kongsvinger Festning',
//       address: {
//         '@type': 'PostalAddress',
//         streetAddress: 'Kongsvinger Festning 2',
//         addressLocality: 'Kongsvinger',
//         postalCode: '2213',
//         addressCountry: 'NO',
//       },
//     },
//     organizer: {
//       '@type': 'TheaterGroup',
//       name: defaultSEO.siteName,
//       url: defaultSEO.siteUrl,
//     },
//     performer: show.cast
//       ? show.cast.map((c) => ({
//           '@type': 'Person',
//           name: c.actor.name,
//           roleName: c.role,
//         }))
//       : undefined,
//     offers: {
//       '@type': 'Offer',
//       url: show.ticketUrl,
//       price: '0',
//       priceCurrency: 'NOK',
//       availability:
//         performance.status === 'soldout'
//           ? 'https://schema.org/SoldOut'
//           : 'https://schema.org/InStock',
//       validFrom: new Date().toISOString(),
//     },
//     audience: {
//       '@type': 'Audience',
//       audienceType: 'Families with children',
//     },
//   }
// }

// // JSON-LD: artikkel – nå typed
// export function generateArticleSchema(post: Post | null | undefined) {
//   if (!post) return null

//   return {
//     '@context': 'https://schema.org',
//     '@type': 'Article',
//     headline: post.title,
//     description: post.excerpt,
//     image: post.mainImage
//       ? urlFor(post.mainImage).width(1200).url()
//       : undefined,
//     datePublished: post.publishedAt,
//     dateModified: (post as Post & { _updatedAt?: string })._updatedAt
//       ? (post as Post & { _updatedAt?: string })._updatedAt
//       : post.publishedAt,
//     author: {
//       '@type': 'Organization',
//       name: defaultSEO.siteName,
//     },
//     publisher: {
//       '@type': 'Organization',
//       name: defaultSEO.siteName,
//       logo: {
//         '@type': 'ImageObject',
//         url: `${defaultSEO.siteUrl}/logo.png`,
//       },
//     },
//     mainEntityOfPage: {
//       '@type': 'WebPage',
//       '@id': `${defaultSEO.siteUrl}/nyheter/${post.slug}`,
//     },
//   }
// }
