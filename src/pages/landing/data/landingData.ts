// routes/landing/data/landingData.ts

export const landingData = {
  hero: {
    headline: "Velkommen til Eventyrfestningen",
    subheadline: "Der historien blir levende og magien aldri slutter",
    backgroundImage: "/assets/landing/hero-image.jpg",
    curtainOverlay: "/assets/landing/hero-curtain.jpeg",
    ctaText: "Kjøp billetter",
    ctaLink: "/billetter"
  },

  upcomingShow: {
    title: "Oberst Krebs og de Skotske spionene",
    genre: "Familiemusikal",
    ageRating: "5+",
    description: "Bli med på en magisk reise gjennom Kongsvingers mørke historie. Når solen går ned over festningen, våkner de gamle historiene til live...",
    poster: "/assets/landing/show-poster.jpg",
    backgroundImage: "/assets/landing/show-scene-bg.jpg",
    dates: "Juli 2026",
    ctaLink: "https://eventyrfestningen.ticketco.events/no/nb",
    highlights: [
      "450 publikummere",
      "30+ skuespillere",
      "Spektakulært scenografi",
      "Humor for alle"
    ]
  },

  experience: {
    title: "Opplev magien",
    subtitle: "Hver forestilling er en reise du sent vil glemme",
    backgroundImage: "/assets/landing/experience-atmosphere.jpg",
    highlights: [
      {
        icon: "Users",
        title: "Stort ensemble",
        description: "Over 30 dedikerte skuespillere på scenen"
      },
      {
        icon: "Music",
        title: "Live musikk",
        description: "Profesjonelt orkester og sangere"
      },
      {
        icon: "Sparkles",
        title: "Storslått produksjon",
        description: "Profesjonelt lys, lyd og scenografi"
      },
      {
        icon: "Heart",
        title: "For hele familien",
        description: "Forestillinger fra 5 år og oppover"
      },
      {
        icon: "Castle",
        title: "Unik lokasjon",
        description: "Kongsvinger Festning som kulisse"
      },
      {
        icon: "Star",
        title: "Mange års erfaring",
        description: "Kvalitet gjennom generasjoner"
      }
    ]
  },

  history: {
    yearsActive: "Over 5 år med magi",
    title: "Vår Historie",
    summary: "Siden 2019 har Eventyrfestningen skapt magiske øyeblikk for familier i Kongsvinger og omegn. Med over 30 års erfaring har vi utviklet oss fra små oppsetninger til storslåtte produksjoner med profesjonelt nivå.",
    vintageImage: "/assets/landing/history-vintage.jpg",
    stats: [
      { number: "5", label: "År med teater" },
      { number: "450", label: "Plasser per show" },
      { number: "11000", label: "Publikummere totalt" },
      { number: "30", label: "Forestillinger" }
    ],
    ctaText: "Les hele historien",
    ctaLink: "/om-oss"
  },

  archive: {
    title: "Arkivet",
    subtitle: "Utforsk våre tidligere produksjoner",
    description: "Ta en titt tilbake på 5+ år med magiske forestillinger",
    previewImage: "/assets/landing/archive-preview.jpg",
    ctaText: "Utforsk arkivet",
    ctaLink: "/arkiv",
    highlightYears: ["2024", "2023", "2022", "2021", "2020", "2019"]
  },

  practical: {
    title: "Praktisk informasjon",
    venue: {
      name: "Kongsvinger Festning",
      address: "Kongsvinger Festning 2, 2213 Kongsvinger",
      googleMapsLink: "https://maps.app.goo.gl/F2HRWHN3YEcTdyij6"
    },
    parking: {
      title: "Parkering",
      description: "Gratis parkering. Følg skiltene til besøkerparkering."
    },
    accessibility: {
      title: "Tilgjengelighet",
      description: "HC-parkering ved inngangen. Kontakt oss for spesielle behov."
    },
    arrival: {
      title: "Ankomst",
      description: "Vi anbefaler å ankomme minimum 30 minutter før forestilling."
    },
    backgroundImage: "/assets/landing/practical-venue.jpg"
  },

  finalCTA: {
    headline: "Klar for eventyret?",
    subheadline: "Billettene går raskt - sikre dine plasser i dag!",
    ctaText: "Kjøp billetter nå",
    ctaLink: "/billetter",
    secondaryCTA: {
      text: "Se alle forestillinger",
      link: "/forestillinger"
    }
  }
}

export type LandingData = typeof landingData