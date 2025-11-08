// src/components/SEOHead.tsx
import { useEffect } from 'react'

interface SEOHeadProps {
  title?: string
  description?: string
}

export function SEOHead({ title, description }: SEOHeadProps) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Eventyrfestningen`
    } else {
      document.title = 'Eventyrfestningen'
    }
    if (description) {
      // her kan du også sett meta via DOM hvis du vil
    }
  }, [title, description])

  return null
}


// // src/components/SEOHead.tsx
// import { Helmet } from 'react-helmet-async'
// import { generateMetaTags } from '@/config/seo'

// interface SEOHeadProps {
//   title?: string
//   description?: string
//   keywords?: string[]
//   image?: string
//   url?: string
//   type?: 'website' | 'article'
//   schema?: object | object[]
// }

// export function SEOHead({
//   title,
//   description,
//   keywords,
//   image,
//   url,
//   type,
//   schema,
// }: SEOHeadProps) {
//   const meta = generateMetaTags({
//     title,
//     description,
//     keywords,
//     image,
//     url,
//     type,
//   })

//   return (
//     <Helmet>
//       {/* Basic Meta Tags */}
//       <title>{meta.title}</title>
//       <meta name="description" content={meta.description} />
//       <meta name="keywords" content={meta.keywords} />
//       <link rel="canonical" href={meta.canonical} />

//       {/* Open Graph */}
//       <meta property="og:type" content={meta.openGraph.type} />
//       <meta property="og:url" content={meta.openGraph.url} />
//       <meta property="og:title" content={meta.openGraph.title} />
//       <meta property="og:description" content={meta.openGraph.description} />
//       <meta property="og:image" content={meta.openGraph.images[0].url} />
//       <meta property="og:image:width" content="1200" />
//       <meta property="og:image:height" content="630" />
//       <meta property="og:site_name" content={meta.openGraph.siteName} />

//       {/* Twitter Card */}
//       <meta name="twitter:card" content={meta.twitter.card} />
//       <meta name="twitter:site" content={meta.twitter.site} />
//       <meta name="twitter:title" content={meta.twitter.title} />
//       <meta name="twitter:description" content={meta.twitter.description} />
//       <meta name="twitter:image" content={meta.twitter.image} />

//       {/* Structured Data */}
//       {schema ? (
//         <script type="application/ld+json">
//           {JSON.stringify(Array.isArray(schema) ? schema : [schema])}
//         </script>
//       ) : null}

//       {/* Additional SEO tags */}
//       <meta name="robots" content="index, follow" />
//       <meta name="language" content="Norwegian" />
//       <meta name="geo.region" content="NO-34" />
//       <meta name="geo.placename" content="Kongsvinger" />
//     </Helmet>
//   )
// }
