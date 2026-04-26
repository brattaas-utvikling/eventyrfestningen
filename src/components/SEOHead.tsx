// src/components/SEOHead.tsx
// automatisk til <head> når de rendres i en komponent.

type SeoType = 'website' | 'article'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: SeoType
  schema?: object | object[] | null
  preloadVideo?: string
}

export function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
  schema,
  preloadVideo,
}: SEOHeadProps) {
  const siteName = 'Eventyrfestningen'
  const fullTitle = title ? `${title} | ${siteName}` : siteName

  const schemaJson = schema
    ? JSON.stringify(Array.isArray(schema) ? schema : [schema])
    : null

  return (
    <>
      {/* ---- Grunnleggende ---- */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}

      {/* ---- Open Graph ---- */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:width" content="1200" />}
      {image && <meta property="og:image:height" content="630" />}

      {/* ---- Twitter / X ---- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* ---- Canonical ---- */}
      {url && <link rel="canonical" href={url} />}

      {/* ---- Video preload ---- */}
      {preloadVideo && (
        <link rel="preload" as="video" href={preloadVideo} type="video/mp4" />
      )}

      {/* ---- JSON-LD structured data ---- */}
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
      )}
    </>
  )
}
// src/components/SEOHead.tsx
// import { useEffect } from 'react'

// type SeoType = 'website' | 'article'

// interface SEOHeadProps {
//   title?: string
//   description?: string
//   image?: string
//   url?: string
//   type?: SeoType
//   schema?: object | object[] | null
//   preloadVideo?: string
// }

// export function SEOHead({
//   title,
//   description,
//   image,
//   url,
//   type = 'website',
//   schema,
//   preloadVideo,
// }: SEOHeadProps) {
//   useEffect(() => {
//     const siteName = 'Eventyrfestningen'
//     const fullTitle = title ? `${title} | ${siteName}` : siteName
    
//     document.title = fullTitle

//     // liten helper for å "upserte" meta-tags
//     const upsertMeta = (attrs: Record<string, string>) => {
//       const selector = Object.entries(attrs)
//         .map(([key, value]) => `[${key}="${value}"]`)
//         .join('')
//       let el = document.head.querySelector<HTMLMetaElement>(selector)
//       if (!el) {
//         el = document.createElement('meta')
//         Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v))
//         document.head.appendChild(el)
//       }
//       return el
//     }

//     // description
//     if (description) {
//       let metaDesc = document.head.querySelector<HTMLMetaElement>(
//         'meta[name="description"]'
//       )
//       if (!metaDesc) {
//         metaDesc = document.createElement('meta')
//         metaDesc.setAttribute('name', 'description')
//         document.head.appendChild(metaDesc)
//       }
//       metaDesc.setAttribute('content', description)
//     }

//     // Open Graph
//     const ogTitle = upsertMeta({ property: 'og:title' })
//     ogTitle.setAttribute('content', fullTitle)

//     if (description) {
//       const ogDesc = upsertMeta({ property: 'og:description' })
//       ogDesc.setAttribute('content', description)
//     }

//     const ogType = upsertMeta({ property: 'og:type' })
//     ogType.setAttribute('content', type)

//     if (url) {
//       const ogUrl = upsertMeta({ property: 'og:url' })
//       ogUrl.setAttribute('content', url)
//     }

//     if (image) {
//       const ogImage = upsertMeta({ property: 'og:image' })
//       ogImage.setAttribute('content', image)
//     }

//     // Twitter
//     const twCard = upsertMeta({ name: 'twitter:card' })
//     twCard.setAttribute('content', 'summary_large_image')

//     const twTitle = upsertMeta({ name: 'twitter:title' })
//     twTitle.setAttribute('content', fullTitle)

//     if (description) {
//       const twDesc = upsertMeta({ name: 'twitter:description' })
//       twDesc.setAttribute('content', description)
//     }

//     if (image) {
//       const twImage = upsertMeta({ name: 'twitter:image' })
//       twImage.setAttribute('content', image)
//     }

//     // canonical
//     if (url) {
//       let link = document.head.querySelector<HTMLLinkElement>(
//         'link[rel="canonical"]'
//       )
//       if (!link) {
//         link = document.createElement('link')
//         link.setAttribute('rel', 'canonical')
//         document.head.appendChild(link)
//       }
//       link.setAttribute('href', url)
//     }

//     // Video preload
//     if (preloadVideo) {
//       let videoPreload = document.head.querySelector<HTMLLinkElement>(
//         'link[rel="preload"][as="video"]'
//       )
//       if (!videoPreload) {
//         videoPreload = document.createElement('link')
//         videoPreload.setAttribute('rel', 'preload')
//         videoPreload.setAttribute('as', 'video')
//         document.head.appendChild(videoPreload)
//       }
//       videoPreload.setAttribute('href', preloadVideo)
//       videoPreload.setAttribute('type', 'video/mp4')
//     }

//     // JSON-LD
//     const existing = document.getElementById('seo-jsonld')
//     if (existing) {
//       existing.remove()
//     }

//     if (schema) {
//       const script = document.createElement('script')
//       script.type = 'application/ld+json'
//       script.id = 'seo-jsonld'
//       script.text = JSON.stringify(Array.isArray(schema) ? schema : [schema])
//       document.head.appendChild(script)
//     }
//   }, [title, description, image, url, type, schema, preloadVideo])

//   return null
// }

// // src/components/SEOHead.tsx
// import { useEffect } from 'react'

// type SeoType = 'website' | 'article'

// interface SEOHeadProps {
//   title?: string
//   description?: string
//   image?: string
//   url?: string
//   type?: SeoType
//   schema?: object | object[] | null
// }

// export function SEOHead({
//   title,
//   description,
//   image,
//   url,
//   type = 'website',
//   schema,
// }: SEOHeadProps) {
//   useEffect(() => {
//     const siteName = 'Eventyrfestningen'
//     const fullTitle = title ? `${title} | ${siteName}` : siteName

//     document.title = fullTitle

//     // liten helper for å "upserte" meta-tags
//     const upsertMeta = (attrs: Record<string, string>) => {
//       const selector = Object.entries(attrs)
//         .map(([key, value]) => `[${key}="${value}"]`)
//         .join('')

//       let el = document.head.querySelector<HTMLMetaElement>(selector)
//       if (!el) {
//         el = document.createElement('meta')
//         Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v))
//         document.head.appendChild(el)
//       }
//       return el
//     }

//     // description
//     if (description) {
//       let metaDesc = document.head.querySelector<HTMLMetaElement>(
//         'meta[name="description"]'
//       )
//       if (!metaDesc) {
//         metaDesc = document.createElement('meta')
//         metaDesc.setAttribute('name', 'description')
//         document.head.appendChild(metaDesc)
//       }
//       metaDesc.setAttribute('content', description)
//     }

//     // Open Graph
//     const ogTitle = upsertMeta({ property: 'og:title' })
//     ogTitle.setAttribute('content', fullTitle)

//     if (description) {
//       const ogDesc = upsertMeta({ property: 'og:description' })
//       ogDesc.setAttribute('content', description)
//     }

//     const ogType = upsertMeta({ property: 'og:type' })
//     ogType.setAttribute('content', type)

//     if (url) {
//       const ogUrl = upsertMeta({ property: 'og:url' })
//       ogUrl.setAttribute('content', url)
//     }

//     if (image) {
//       const ogImage = upsertMeta({ property: 'og:image' })
//       ogImage.setAttribute('content', image)
//     }

//     // Twitter
//     const twCard = upsertMeta({ name: 'twitter:card' })
//     twCard.setAttribute('content', 'summary_large_image')

//     const twTitle = upsertMeta({ name: 'twitter:title' })
//     twTitle.setAttribute('content', fullTitle)

//     if (description) {
//       const twDesc = upsertMeta({ name: 'twitter:description' })
//       twDesc.setAttribute('content', description)
//     }

//     if (image) {
//       const twImage = upsertMeta({ name: 'twitter:image' })
//       twImage.setAttribute('content', image)
//     }

//     // canonical
//     if (url) {
//       let link = document.head.querySelector<HTMLLinkElement>(
//         'link[rel="canonical"]'
//       )
//       if (!link) {
//         link = document.createElement('link')
//         link.setAttribute('rel', 'canonical')
//         document.head.appendChild(link)
//       }
//       link.setAttribute('href', url)
//     }

//     // JSON-LD
//     const existing = document.getElementById('seo-jsonld')
//     if (existing) {
//       existing.remove()
//     }
//     if (schema) {
//       const script = document.createElement('script')
//       script.type = 'application/ld+json'
//       script.id = 'seo-jsonld'
//       script.text = JSON.stringify(Array.isArray(schema) ? schema : [schema])
//       document.head.appendChild(script)
//     }
//   }, [title, description, image, url, type, schema])

//   return null
// }
