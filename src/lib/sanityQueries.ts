// src/lib/sanityQueries.ts

// Alle GROQ-spørringene dine samlet
export const queries = {
  // 1. Årets hovedforestilling
  currentShow: `
    *[_type == "show" && type == "main"] | order(year desc)[0] {
      _id,
      title,
      "slug": slug.current,
      year,
      story,
      posterImage {
        asset,
        alt,
        hotspot,
        crop
      },
      heroImage {
        asset,
        alt,
        hotspot,
        crop
      },
      logoImage {
        asset,
        alt,
        hotspot,
        crop
      },
      "cast": cast[] {
        role,
        "actor": actor-> {
          _id,
          name,
          image {
            asset,
            alt,
            hotspot,
            crop
          },
          bio
        }
      },
      "crew": crew[] {
        role,
        "person": person-> {
          _id,
          name,
          image {
            asset,
            alt,
            hotspot,
            crop
          }
        }
      },
      practicalInfo {
        duration,
        ageLimit,
        accessibility
      },
      ticketUrl,
      galleryImages[] {
        asset,
        alt,
        caption,
        hotspot,
        crop
      },
      seo {
        title,
        description,
        keywords,
        ogImage {
          asset,
          alt
        }
      }
    }
  `,

  // 2. Forestillingskalender (kommende)
  upcomingPerformances: `
    *[_type == "performance" && date > now()] | order(date asc) {
      _id,
      date,
      status,
      venue,
      "show": show-> {
        title,
        "slug": slug.current,
        type,
        posterImage {
          asset,
          alt
        }
      }
    }
  `,

  // 3. Forestillinger for en bestemt forestilling (bruk på /forestilling/:slug)
  performancesByShow: (slug: string) => `
    *[_type == "performance" && show->slug.current == "${slug}"] | order(date asc) {
      _id,
      date,
      status,
      venue
    }
  `,

  // 4. Tidslinje (Om oss)
  milestones: `
    *[_type == "milestone"] | order(year desc) {
      _id,
      year,
      title,
      description,
      image {
        asset,
        alt
      }
    }
  `,

  // 5. Personer / styre
  boardMembers: `
    *[_type == "person" && defined(role)] | order(name asc) {
      _id,
      name,
      image {
        asset,
        alt
      },
      bio,
      role
    }
  `,

  // 6. Nyeste poster
  recentPosts: (limit = 6) => `
    *[_type == "post"] | order(publishedAt desc) [0...${limit}] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage {
        asset,
        alt
      },
      "author": author->name
    }
  `,

  // 7. Enkel post
  postBySlug: (slug: string) => `
    *[_type == "post" && slug.current == "${slug}"][0] {
      _id,
      title,
      publishedAt,
      mainImage {
        asset,
        alt,
        hotspot,
        crop
      },
      body,
      seo {
        title,
        description,
        keywords,
        ogImage {
          asset,
          alt
        }
      }
    }
  `,

  // 8. Arkiv – tidligere forestillinger
  archivedShows: `
    *[_type == "show"] | order(year desc) {
      _id,
      title,
      "slug": slug.current,
      year,
      type,
      posterImage {
        asset,
        alt
      },
      story[0...100]
    }
  `,

  // 9. Sponsorer
  sponsors: `
    *[_type == "sponsor"] | order(order asc) {
      _id,
      name,
      logo {
        asset,
        alt
      },
      url,
      tier
    }
  `,

  // 10. Site settings
  siteSettings: `
    *[_type == "settings"][0] {
      title,
      description,
      logo {
        asset,
        alt
      },
      email,
      phone,
      address,
      socialLinks,
      sponsorPackagePdf {
        asset
      }
    }
  `
};

// // src/lib/sanityQueries.ts

// // Alle GROQ-spørringene dine samlet
// export const queries = {
//   // 1. Årets hovedforestilling
//   currentShow: `
//     *[_type == "show" && type == "main"] | order(year desc)[0] {
//       _id,
//       title,
//       "slug": slug.current,
//       year,
//       story,
//       posterImage,
//       heroImage,
//       logoImage,
//       "cast": cast[] {
//         role,
//         "actor": actor-> {
//           name,
//           image,
//           bio
//         }
//       },
//       "crew": crew[] {
//         role,
//         "person": person-> {
//           name,
//           image
//         }
//       },
//       practicalInfo,
//       ticketUrl,
//       galleryImages,
//       seo
//     }
//   `,

//   // 2. Forestillingskalender (kommende)
//   upcomingPerformances: `
//     *[_type == "performance" && date > now()] | order(date asc) {
//       _id,
//       date,
//       status,
//       venue,
//       "show": show-> {
//         title,
//         "slug": slug.current,
//         type,
//         posterImage
//       }
//     }
//   `,

//   // 3. Forestillinger for en bestemt forestilling (bruk på /forestilling/:slug)
//   performancesByShow: (slug: string) => `
//     *[_type == "performance" && show->slug.current == "${slug}"] | order(date asc) {
//       _id,
//       date,
//       status,
//       venue
//     }
//   `,

//   // 4. Tidslinje (Om oss)
//   milestones: `
//     *[_type == "milestone"] | order(year desc) {
//       _id,
//       year,
//       title,
//       description,
//       image
//     }
//   `,

//   // 5. Personer / styre
//   boardMembers: `
//     *[_type == "person" && defined(role)] | order(name asc) {
//       _id,
//       name,
//       image,
//       bio,
//       role
//     }
//   `,

//   // 6. Nyeste poster
//   recentPosts: (limit = 6) => `
//     *[_type == "post"] | order(publishedAt desc) [0...${limit}] {
//       _id,
//       title,
//       "slug": slug.current,
//       publishedAt,
//       excerpt,
//       mainImage,
//       "author": author->name
//     }
//   `,

//   // 7. Enkel post
//   postBySlug: (slug: string) => `
//     *[_type == "post" && slug.current == "${slug}"][0] {
//       _id,
//       title,
//       publishedAt,
//       mainImage,
//       body,
//       seo
//     }
//   `,

//   // 8. Arkiv – tidligere forestillinger
//   archivedShows: `
//     *[_type == "show"] | order(year desc) {
//       _id,
//       title,
//       "slug": slug.current,
//       year,
//       type,
//       posterImage,
//       story[0...100]
//     }
//   `,

//   // 9. Sponsorer
//   sponsors: `
//     *[_type == "sponsor"] | order(order asc) {
//       _id,
//       name,
//       logo,
//       url,
//       tier
//     }
//   `,

//   // 10. Site settings
//   siteSettings: `
//     *[_type == "settings"][0] {
//       title,
//       description,
//       logo,
//       email,
//       phone,
//       address,
//       socialLinks,
//       sponsorPackagePdf
//     }
//   `
// };
