// routes/landing/data/landingData.ts
export const landingData = {
  hero: {
    headline: "Velkommen til Eventyrfestningen",
    subheadline: "Der historien blir levende og magien aldri slutter",
    backgroundImage: "/assets/landing/hero-image.jpeg",
    curtainOverlay: "/assets/landing/hero-curtain.jpeg",
    ctaText: "Kjøp billetter",
    ctaLink: "/billetter"
  },

  upcomingShow: {
    title: "Oberst Krebs og de Skotske spionene",
    genre: "Familiemusikal",
    ageRating: "5+",
    description: "Bli med på en magisk reise gjennom Kongsvingers mørke historie. Når solen går ned over festningen, våkner de gamle historiene til live...",
    poster: "/assets/landing/oberst-krebs_horisontal.jpg",
    backgroundImage: "/assets/landing/festningskuliss.webp",
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
        title: "Stort ensemble",
        description: "Over 30 dedikerte skuespillere på scenen",
        image: "/assets/landing/scottish-ensamble.jpg"
      },
      {
        title: "Fantastisk musikk",
        description: "Profesjonell komponist og sangere",
        image: "/assets/landing/min-store-entre.webp"
      },
      {
        title: "Storslått produksjon",
        description: "Profesjonelt lys, lyd og scenografi",
        image: "/assets/landing/produksjon.webp"
      },
      {
        title: "For hele familien",
        description: "Forestillinger fra 5 år og oppover",
        image: "/assets/landing/oberst-skatt.webp"
      },
      {
        title: "Unik lokasjon",
        description: "Kongsvinger Festning som kulisse",
        image: "/assets/landing/festningskuliss.webp"
      },
      {
        title: "Festningslandsbyen",
        description: "Opplev atmosfæren sammen med familie og venner",
        image: "/assets/landing/festningslandsbyen.webp"
      }
    ]
  },

  history: {
    yearsActive: "Over 5 år med magi",
    title: "Vår Historie",
    summary: "Siden 2019 har Eventyrfestningen skapt magiske øyeblikk for familier i Kongsvinger og omegn. Med over 30 års erfaring har vi utviklet oss fra små oppsetninger til storslåtte produksjoner med profesjonelt nivå.",
    vintageImage: "/assets/landing/aggi-masken.webp",
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
    previewImage: "/assets/landing/plakat_bakgrunn.jpeg",
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

  characters: {
    title: "Møt karakterene",
    subtitle: "Bli kjent med de fargerike personlighetene i vår forestilling",
    backgroundImage: "/assets/landing/characters-bg.jpg",
    characters: [
      {
        name: "Oberst Krebs",
        role: "Kommandant",
        description: "Oberst Krebs er en stolt og sta militær leder som er fast bestemt på å beskytte festningen og dens hemmeligheter for enhver pris.",
        image: "/assets/landing/oberst-karusell.png"
      },
      {
        name: "Sadolin",
        role: "Oberst Krebs' høyre hånd",
        description: "En modig og lojal soldat som følger obersten i tykt og tynt. Han er også en stor klossmajor!",
        image: "/assets/landing/sadolin-karusell.png"
      },
      {
        name: "Duff",
        role: "Mathesonskattens arving",
        description: "Arvingen av Mathesonskaten - en hevnlysten skotte som er fast bestemt på å gjenerobre det som rettmessig tilhører henne.",
        image: "/assets/landing/duff-karusell.png"
      },
      {
        name: "Duncan",
        role: "Teatersjef",
        description: "Duffs trofaste mann og teatersjef. En karismatisk leder med en skjult agenda.",
        image: "/assets/landing/duncan-karusell.jpeg"
      },
      {
        name: "Aggie",
        role: "Spionen",
        description: "En ung eventyrer på jakt etter den legendariske masken. Full av pågangsmot og nysgjerrighet.",
        image: "/assets/landing/aggie-karusell.png"
      },
      {
        name: "Klara",
        role: "Tjenestepike",
        description: "En lojal tjenestepike ved festningen som kjenner alle hemmelighetene. Hun er modig og smart, og spiller en nøkkelrolle i historien.",
        image: "/assets/landing/klara-karusell.jpeg"
      }
    ]
  },

  finalCTA: {
    headline: "Klar for eventyret?",
    subheadline: "Sikre dine billetter til vår neste forestilling i dag!",
    ctaText: "Kjøp billetter nå",
    ctaLink: "https://eventyrfestningen.ticketco.events/no/nb",
    secondaryCTA: {
      text: "Se alle forestillinger",
      link: "/kalender"
    }
  }
}

export type LandingData = typeof landingData