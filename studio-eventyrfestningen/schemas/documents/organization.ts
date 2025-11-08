// schemas/documents/organization.ts
export const organization = {
  name: "organization",
  title: "Foreningen",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      initialValue: "Om Eventyrfestningen",
    },
    {
      name: "body",
      title: "Innhold",
      type: "array",
      of: [{ type: "block" }],
      description: "Historikk, mål, hvem dere er",
    },
    {
      name: "volunteering",
      title: "Frivillighet",
      type: "array",
      of: [{ type: "block" }],
      description: "Info til de som vil bidra",
    },
  ],
};
