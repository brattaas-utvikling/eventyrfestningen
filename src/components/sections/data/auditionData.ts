// src/components/sections/data/auditionData.ts
// Statisk innhold for audition til «Oberst Krebs og den franske prinsen».
// Bildene ligger i public/assets/audition/.

const IMG = "/assets/audition";

// Seksjonen vises frem til påmeldingsfristen (norsk tid), deretter forsvinner den av seg selv.
// NB: vintertid fra 25.10, derfor +01:00.
export const AUDITION_END = new Date("2026-10-30T23:59:00+01:00");

export const auditionData = {
  title: "Audition",
  showTitle: "Oberst Krebs og den franske prinsen",
  dateLabel: "Søndag 29. november",
  dateTime: "2026-11-29",
  signupHeading: "Meld deg på som:",
  signupNote: "Påmeldingen skjer i Google Skjema",
  deadlineLabel: "Påmeldingsfrist 30. oktober",
  deadlineDateTime: "2026-10-30",
  // Én påmelding per gruppe (Google Skjema, åpnes i ny fane)
  signups: [
    { id: "dans", label: "Dansere", url: "https://forms.gle/vMTPM6adbBuXGo2K6" },
    { id: "skuespiller-9-13", label: "Skuespillere 9–13 år", url: "https://forms.gle/WcdgM1HERT47uGRM7" },
    { id: "skuespiller-13-pluss", label: "Skuespillere 13 år og eldre", url: "https://forms.gle/6MvMtycEPf3WtDYbA" },
  ],
  images: {
    bgDesktop: `${IMG}/bg-desktop.webp`,
    bgTablet: `${IMG}/bg-tablet.webp`,
    bgMobile: `${IMG}/bg-mobil.webp`,
    character: `${IMG}/prinsen.webp`,
    logo: `${IMG}/logo-franske-prinsen.webp`,
    fog: `${IMG}/fog.webp`,
  },
} as const;

export function isAuditionActive(now = new Date()) {
  return now < AUDITION_END;
}
