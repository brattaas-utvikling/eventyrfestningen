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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required()
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
      },
      validation: (Rule: any) => Rule.required()
    },

    // Historien / synopsis (Portable Text)
    {
      name: 'story',
      title: 'Historien',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Ca 300 ord om handlingen'
    },

    // Hero-bilde (brukes øverst på Om forestillingen / forsider)
    {
      name: 'heroImage',
      title: 'Hero-bilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt-tekst' }
      ]
    },

    // Plakat / poster (brukes i kort, deling osv.)
    {
      name: 'posterImage',
      title: 'Plakat',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt-tekst' }
      ]
    },

    // Bilde brukt i arkivbok / flipbook
    {
      name: 'bookImage',
      title: 'Bilde til arkivbok',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt-tekst' }
      ]
    },

    // Logo for forestillingen (brukes i UI der du ønsker)
    {
      name: 'logoImage',
      title: 'Forestillingens logo',
      type: 'image',
      options: { hotspot: true }
    },

    // Optional hero-video (du har feltet i typen din)
    {
      name: 'heroVideoUrl',
      title: 'Hero-video (valgfritt)',
      type: 'url',
      description: 'Lenke til video (YouTube, Vimeo e.l.) til bruk i hero-seksjon'
    },

    // Rollebesetning
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

    // Produksjonsteam
    {
      name: 'crew',
      title: 'Produksjonsteam',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'role',
              type: 'string',
              title: 'Rolle (f.eks. Regissør)'
            },
            {
              name: 'person',
              type: 'reference',
              to: [{ type: 'person' }]
            }
          ]
        }
      ]
    },

    // Praktisk info
    {
      name: 'practicalInfo',
      title: 'Praktisk informasjon',
      type: 'object',
      fields: [
        {
          name: 'duration',
          type: 'string',
          title: 'Varighet',
          description: 'F.eks. "2 timer inkl. pause"'
        },
        {
          name: 'ageLimit',
          type: 'string',
          title: 'Aldersgrense',
          description: 'F.eks. "Alle aldre"'
        },
        {
          name: 'accessibility',
          type: 'text',
          title: 'Tilgjengelighet'
        }
      ]
    },

    // Billettlenke
    {
      name: 'ticketUrl',
      title: 'Billett-URL',
      type: 'url',
      description: 'Link til ekstern billettpartner'
    },

    // Galleri-bilder (matcher queries + ImageLightbox / BentoGallery)
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

    // SEO-objekt – du har egen 'seo'-type et annet sted
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
        title: year ? `${title} (${year})` : title,
        media
      }
    }
  }
}
