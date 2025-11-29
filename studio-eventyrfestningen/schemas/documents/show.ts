// src/studio-eventyrfestningen/schemas/documents/show.ts

// Alle GROQ-spørringene samlet på ett sted
export const queries = {
  // 1. Årets hovedforestilling (brukes på /om-forestillingen)
  currentShow: `
    *[_type == "show" && type == "main"] | order(year desc)[0] {
      _id,
      title,
      slug { current },
      year,
      type,
      story,
      posterImage {
        asset,
        alt,
        hotspot,
        crop
      },
      bookImage {
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

  // 1b. Forestilling via slug (brukes på /arkiv/:slug)
  showBySlug: (slug: string) => `
    *[_type == "show" && slug.current == "${slug}"][0] {
      _id,
      title,
      slug { current },
      year,
      type,
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
        _id,
        title,
        "slug": slug.current,
        type,
        posterImage {
          asset,
          alt,
          hotspot,
          crop
        }
      }
    }
  `,

  // 3. Forestillinger for en bestemt forestilling (bruk på /forestilling/:slug hvis du vil)
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
        alt,
        hotspot,
        crop
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
        alt,
        hotspot,
        crop
      },
      bio,
      role
    }
  `,

  // 6. Nyeste poster (til forsiden / nyhetsseksjon)
  recentPosts: (limit = 6) => `
    *[_type == "post"] | order(publishedAt desc) [0...${limit}] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      mainImage {
        asset,
        alt,
        hotspot,
        crop
      },
      "author": author->name
    }
  `,

  // 7. Enkel post (brukes på /nyheter/:slug)
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

  // 8. Arkiv – tidligere forestillinger (til HTMLFlipBook)
  archivedShows: `
    *[_type == "show"] | order(year asc) {
      _id,
      title,
      slug { current },
      year,
      type,
      posterImage {
        asset,
        alt,
        hotspot,
        crop
      },
      // kort utdrag av historien (kan også gjøre full story og lage excerpt i frontend)
      story
    }
  `,

  // 9. Sponsorer
  sponsors: `
    *[_type == "sponsor"] | order(order asc) {
      _id,
      name,
      logo {
        asset,
        alt,
        hotspot,
        crop
      },
      url,
      tier
    }
  `,

  // 10. Site settings (footer, kontakt, sosiale medier osv)
  siteSettings: `
    *[_type == "settings"][0] {
      title,
      description,
      logo {
        asset,
        alt,
        hotspot,
        crop
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
  ,
    // 11. Foreningen / organization
    organization: `
    *[_type == "organization"][0] {
      _id,
      title,
      body,
      volunteering
    }
  `,
};
