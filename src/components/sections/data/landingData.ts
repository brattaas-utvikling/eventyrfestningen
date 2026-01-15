export const landingData = {
  history: {
    yearsActive: "Over 5 år med magi",
    title: "Vår Historie",
    summary:
      "Siden 2019 har Eventyrfestningen skapt magiske øyeblikk for familier i Kongsvinger og omegn. Med over 30 års erfaring har vi utviklet oss fra små oppsetninger til storslåtte produksjoner med profesjonelt nivå.",
    vintageImage: "/assets/landing/oberst-skatt.webp",
    stats: [
      { number: "5", label: "År med teater" },
      { number: "450", label: "Plasser per show" },
      { number: "11000", label: "Publikummere totalt" },
      { number: "30", label: "Forestillinger" },
    ],
    ctaText: "Les hele historien",
    ctaLink: "/om-oss",
  },

  archive: {
    title: "Arkivet",
    subtitle: "Utforsk våre tidligere produksjoner",
    description: "Ta en titt tilbake på 5+ år med magiske forestillinger",
    previewImage: "/assets/landing/plakat-bakgrunn.jpeg",
    ctaText: "Utforsk arkivet",
    ctaLink: "/arkiv",
    highlightYears: ["2025","2024", "2023", "2022", "2021", "2020", "2019"],
  },

} as const;

export type LandingData = typeof landingData;
