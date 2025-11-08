// schemas/documents/milestone.ts
export const milestone = {
  name: 'milestone',
  title: 'Milepæl',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'År',
      type: 'number',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 3
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt-tekst' }
      ]
    }
  ],
  orderings: [
    {
      title: 'År, nyeste først',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }]
    }
  ]
}
