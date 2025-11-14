// types/sanity.ts

// grunnleggende Sanity-typer
export type SanityImageAsset = {
  _type: "reference";
  _ref: string;
};

export type SanityImage = {
  _type: "image";
  asset: SanityImageAsset;
  alt?: string;
  _key?: string;
  caption?: string;
  // Sanity kan ha hotspot/crop, men vi gjør dem valgfrie
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};

// veldig enkel Portable Text-type
export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style?: string;
  children?: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<Record<string, unknown>>;
};

export type PortableText = PortableTextBlock[];

// felles SEO-objekt
export interface SEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: SanityImage;
}

// person (skuespiller / styre)
export interface Person {
  _id: string;
  name: string;
  image?: SanityImage;
  bio?: string;
  role?: string;
}

// show (årets forestilling / tidligere)
export interface Show {
  _id: string;
  title: string;
  // 👇 endret fra string til SanitySlug
  slug: {
    _type: "slug";
    current: string;
  };
  year: number;
  type: "main" | "halloween";
  story?: PortableText;
  posterImage?: SanityImage;
  heroImage?: SanityImage;
  heroVideoUrl?: string;
  logoImage?: SanityImage;
  cast?: Array<{
    role: string;
    actor: Person;
  }>;
  crew?: Array<{
    role: string;
    person: Person;
  }>;
  practicalInfo?: {
    duration?: number | string;
    ageLimit?: string;
    accessibility?: string;
  };
  ticketUrl?: string;
  galleryImages?: SanityImage[];
  seo?: SEO;
}

// show (årets forestilling / tidligere)
// export interface Show {
//   _id: string;
//   title: string;
//   slug: string;
//   year: number;
//   type: "main" | "halloween";
//   story?: PortableText; // dette er Portable Text i Sanity
//   posterImage?: SanityImage;
//   heroImage?: SanityImage;
//   cast?: Array<{
//     role: string;
//     actor: Person;
//   }>;
//   crew?: Array<{
//     role: string;
//     person: Person;
//   }>;
//   practicalInfo?: {
//     duration?: number | string;
//     ageLimit?: string;
//     accessibility?: string;
//   };
//   ticketUrl?: string;
//   galleryImages?: SanityImage[];
//   logoImage?: SanityImage;
//   seo?: SEO;
// }

// forestillingskalender
export interface Performance {
  _id: string;
  date: string; // ISO-string fra Sanity
  status: "available" | "few" | "soldout" | string;
  venue?: string;
  show: {
    title: string;
    slug: string;
    type: string;
    posterImage?: SanityImage;
  };
}

// tidslinje
export interface Milestone {
  _id: string;
  year: number;
  title: string;
  description?: string;
  image?: SanityImage;
}

// nyheter / blogg
export interface Post {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  mainImage?: SanityImage;
  body?: PortableText;
  seo?: SEO;
  author?: string;
}

// sponsorer
export interface Sponsor {
  _id: string;
  name: string;
  logo?: SanityImage;
  url?: string;
  tier?: "main" | "gold" | "silver" | "partner" | string;
  order?: number;
  needsLightBackground?: boolean; // 👈 legg til denne
}

