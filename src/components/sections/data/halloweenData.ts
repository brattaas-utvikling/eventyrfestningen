// src/components/sections/data/halloweenData.ts
// Statisk innhold for Halloween på Festningen 2026. Bildene ligger i public/assets/halloween/.

const IMG = "/assets/halloween";

export const HALLOWEEN_END = new Date("2026-10-24T23:30:00+02:00");

export const halloweenData = {
  titleSpice: "Halloween",
  titleMain: "på Festningen",
  dateLabel: "22.–24. oktober",
  dateTime: "2026-10-22/2026-10-24",
  timeLabel: "Kl. 18.00–23.00",
  note: "Billetter kjøpes på radhusteatret.no",
  images: {
    bgDesktop: `${IMG}/halloween-desktop.webp`,
    bgTablet: `${IMG}/halloween-tablet.webp`,
    bgMobile: `${IMG}/halloween-mobil.webp`,
  },
} as const;

export function isHalloweenActive(now = new Date()) {
  return now < HALLOWEEN_END;
}

export const halloweenEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Halloween på Festningen",
  startDate: "2026-10-22T18:00:00+02:00",
  endDate: "2026-10-24T23:30:00+02:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: [`https://eventyrfestningen.no${IMG}/halloween-desktop.webp`],
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
};
