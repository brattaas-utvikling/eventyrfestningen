// src/components/sections/data/prinsenData.ts
// Hero for sommerforestillingen 2027, «Oberst Krebs og den franske prinsen».
// Bruker de samme bildene som audition (public/assets/audition/).

const IMG = "/assets/audition";
const TICKET_URL = "https://eventyrfestningen.ticketco.events/no/nb";

// Heroen vises etter audition og frem til siste forestilling (norsk sommertid).
export const PRINSEN_HERO_END = new Date("2027-07-10T23:59:00+02:00");

export const prinsenData = {
  showTitle: "Oberst Krebs og den franske prinsen",
  srTitle: "Oberst Krebs og den franske prinsen – sommeren 2027",
  dateLabel: "1.–10. juli 2027",
  dateTime: "2027-07-01/2027-07-10",
  ticketLabel: "Kjøp billetter",
  ticketUrl: TICKET_URL,
  images: {
    bgDesktop: `${IMG}/bg-desktop.webp`,
    bgTablet: `${IMG}/bg-tablet.webp`,
    bgMobile: `${IMG}/bg-mobil.webp`,
    character: `${IMG}/prinsen.webp`,
    logo: `${IMG}/logo-franske-prinsen.webp`,
    fog: `${IMG}/fog.webp`,
  },
} as const;

export function isPrinsenHeroActive(now = new Date()) {
  return now < PRINSEN_HERO_END;
}

export const prinsenEventSchema = {
  "@context": "https://schema.org",
  "@type": "TheaterEvent",
  name: "Oberst Krebs og den franske prinsen",
  startDate: "2027-07-01",
  endDate: "2027-07-10",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [`https://eventyrfestningen.no${IMG}/bg-desktop.webp`],
  location: {
    "@type": "Place",
    name: "Kongsvinger festning",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kongsvinger",
      addressCountry: "NO",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Eventyrfestningen",
    url: "https://eventyrfestningen.no",
  },
  offers: {
    "@type": "Offer",
    url: TICKET_URL,
    availability: "https://schema.org/InStock",
  },
};
