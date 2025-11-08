// schemas/objects/seo.ts
export const seo = {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'SEO Tittel',
      type: 'string',
      validation: (Rule: any) => Rule.max(60)
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(160)
    },
    {
      name: 'keywords',
      title: 'Nøkkelord',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'ogImage',
      title: 'Open Graph Bilde',
      type: 'image',
      description: '1200x630px for beste resultat'
    }
  ]
}
