// schemas/newsletter.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'newsletter',
  title: 'Nyhetsbrev',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel (intern)',
      type: 'string',
      description: 'For intern oversikt - vises ikke i e-posten',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'E-post emne',
      type: 'string',
      description: 'Dette vises som e-post-emne',
      validation: Rule => Rule.required().max(100),
    }),
    defineField({
      name: 'heading',
      title: 'Hovedoverskrift i e-post',
      type: 'string',
      description: 'Stor overskrift øverst i nyhetsbrevet',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'ingress',
      title: 'Ingress',
      type: 'text',
      rows: 3,
      description: 'Kort introduksjonstekst (2-3 setninger)',
      validation: Rule => Rule.required().max(300),
    }),
    defineField({
      name: 'body',
      title: 'Brødtekst',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt-tekst',
              validation: Rule => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Bildetekst',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      title: 'Call-to-action knapp',
      type: 'object',
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Knappetekst',
        },
        {
          name: 'url',
          type: 'url',
          title: 'Lenke',
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Kladd', value: 'draft' },
          { title: 'Klar til sending', value: 'ready' },
          { title: 'Sendt', value: 'sent' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'sentAt',
      title: 'Sendt dato',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'recipientCount',
      title: 'Antall mottakere',
      type: 'number',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'subject',
      subtitle: 'status',
      sentAt: 'sentAt',
    },
    prepare({ title, subtitle, sentAt }) {
      return {
        title,
        subtitle: sentAt
          ? `${subtitle} - Sendt ${new Date(sentAt).toLocaleDateString('no-NO')}`
          : subtitle,
      }
    },
  },
})