// schemas/documents/sponsor.ts
export const sponsor = {
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt-tekst' }
      ]
    },
    {
      name: 'url',
      title: 'Nettside',
      type: 'url'
    },
    {
      name: 'tier',
      title: 'Sponsor-nivå',
      type: 'string',
      options: {
        list: [
          { title: 'Hovedsponsor', value: 'main' },
          { title: 'Gullsponsor', value: 'gold' },
          { title: 'Sølvsponsor', value: 'silver' },
          { title: 'Partner', value: 'partner' }
        ]
      }
    },
    {
      name: 'order',
      title: 'Sorteringsrekkefølge',
      type: 'number',
      description: 'Lavere tall vises først'
    }
  ],
  orderings: [
    {
      title: 'Rekkefølge',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
}
