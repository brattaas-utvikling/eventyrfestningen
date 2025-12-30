// lib/utils/imageLoader.ts

/**
 * Preload critical images for hero section
 */
export function preloadHeroImages(images: string[]) {
  if (typeof window === 'undefined') return

  images.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}

// Use in LandingPage.tsx:
// useEffect(() => {
//   preloadHeroImages([
//     landingData.hero.backgroundImage,
//     landingData.hero.curtainOverlay
//   ])
// }, [])