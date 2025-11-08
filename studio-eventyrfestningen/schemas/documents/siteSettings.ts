// schemas/documents/siteSettings.ts
import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Nettside-innstillinger",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nettsidens navn",
      type: "string",
    }),
    defineField({
      name: "heroTitle",
      title: "Forside – overskrift",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Forside – ingress",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "CTA-tekst",
      type: "string",
      initialValue: "Kjøp billetter",
    }),
    defineField({
      name: "primaryCtaUrl",
      title: "CTA-lenke",
      type: "url",
      description: "Lenke til billettpartner",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
