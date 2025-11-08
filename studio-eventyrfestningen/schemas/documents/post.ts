// schemas/documents/post.ts
export const post = {
  name: 'post',
  title: 'Nyhet',
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
      options: { source: 'title' }
    },
    {
      name: 'publishedAt',
      title: 'Publisert dato',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'excerpt',
      title: 'Ingress',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(200)
    },
    {
      name: 'mainImage',
      title: 'Hovedbilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt-tekst' }
      ]
    },
    {
      name: 'body',
      title: 'Innhold',
      type: 'array',
      of: [
        { type: 'block' },
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
  orderings: [
    {
      title: 'Publiseringsdato, nyeste først',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ]
}
