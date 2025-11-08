// schemas/documents/person.ts
export const person = {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt-tekst' }
      ]
    },
    {
      name: 'bio',
      title: 'Biografi',
      type: 'text',
      rows: 4
    },
    {
      name: 'role',
      title: 'Rolle i foreningen',
      type: 'string',
      description: 'F.eks. "Styreleder", "Kunstnerisk leder"'
    }
  ]
}