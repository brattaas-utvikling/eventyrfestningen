// schemas/documents/show.ts
export const show = {
  name: 'show',
  title: 'Forestilling',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL-slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    },
    {
      name: 'year',
      title: 'År',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(2000).max(2100)
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hovedforestilling', value: 'main' },
          { title: 'Halloween', value: 'halloween' }
        ]
      }
    },
    {
      name: 'story',
      title: 'Historien',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Ca 300 ord om handlingen'
    },
    {
      name: 'posterImage',
      title: 'Plakat',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt-tekst' }
      ]
    },
    {
      name: 'heroImage',
      title: 'Hero-bilde',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'cast',
      title: 'Rollebesetning',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', type: 'string', title: 'Rolle' },
            { name: 'actor', type: 'reference', to: [{ type: 'person' }] }
          ]
        }
      ]
    },
    {
      name: 'crew',
      title: 'Produksjonsteam',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', type: 'string', title: 'Rolle (f.eks. Regissør)' },
            { name: 'person', type: 'reference', to: [{ type: 'person' }] }
          ]
        }
      ]
    },
    {
      name: 'practicalInfo',
      title: 'Praktisk informasjon',
      type: 'object',
      fields: [
        { name: 'duration', type: 'number', title: 'Varighet (minutter)' },
        { name: 'ageLimit', type: 'string', title: 'Aldersgrense (f.eks. "Alle aldre")' },
        { name: 'accessibility', type: 'text', title: 'Tilgjengelighet' }
      ]
    },
    {
      name: 'ticketUrl',
      title: 'Billett-URL',
      type: 'url',
      description: 'Link til ekstern billettpartner'
    },
    {
      name: 'galleryImages',
      title: 'Bildegalleri',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt-tekst' },
            { name: 'caption', type: 'string', title: 'Bildetekst' }
          ]
        }
      ]
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'posterImage'
    },
    prepare({ title, year, media }: any) {
      return {
        title: `${title} (${year})`,
        media
      }
    }
  }
}
