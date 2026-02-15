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
      description: 'For intern oversikt – vises ikke i e-posten',
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
      description: 'Stor overskrift oeverst i nyhetsbrevet',
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
      title: 'Brodtekst',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
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
      name: 'actorCard',
      title: 'Skuespiller-kort',
      type: 'object',
      description: 'Vises som et fremhevet kort i nyhetsbrevet',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Skuespillernavn',
          description: 'F.eks. "Jonas Strand Gravli"',
        },
        {
          name: 'role',
          type: 'string',
          title: 'Rollefigur',
          description: 'F.eks. "Oberst Krebs"',
        },
        {
          name: 'bio',
          type: 'text',
          title: 'Kort bio',
          rows: 4,
          description: 'Presentasjon av skuespilleren (2-4 setninger)',
        },
        {
          name: 'credentials',
          type: 'array',
          title: 'Meritter / kjente roller',
          description: 'Vises som piller under bion. F.eks. "Ragnarok (Netflix)"',
          of: [{ type: 'string' }],
          options: { layout: 'tags' },
        },
        {
          name: 'image',
          type: 'image',
          title: 'Bilde',
          description: 'Skuespilleren i kostyme – vises oeverst i kortet',
          options: { hotspot: true },
        },
      ],
    }),

    defineField({
      name: 'eventInfo',
      title: 'Praktisk info',
      type: 'object',
      description: 'Dato, tid, sted osv. – vises som en info-boks i e-posten',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'dates',
          type: 'string',
          title: 'Datoer',
          description: 'F.eks. "2., 3., 4. juli og 8.-11. juli 2026"',
        },
        {
          name: 'time',
          type: 'string',
          title: 'Tid',
          description: 'F.eks. "Kl. 22:00"',
        },
        {
          name: 'venue',
          type: 'string',
          title: 'Spillested',
          description: 'F.eks. "Kongsvinger Festning - utendors"',
        },
        {
          name: 'ageLimit',
          type: 'string',
          title: 'Aldersgrense',
          description: 'F.eks. "Fra 5 ar - morsomt for alle aldre"',
        },
        {
          name: 'distance',
          type: 'string',
          title: 'Avstand fra Oslo',
          description: 'F.eks. "1 time og 15 min fra Oslo"',
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
          description: 'F.eks. "Kjop billetter na"',
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
      media: 'actorCard.image',
    },
    prepare({
      title,
      subtitle,
      sentAt,
      media,
    }: {
      title?: string
      subtitle?: 'draft' | 'ready' | 'sent'
      sentAt?: string
      media?: any
    }) {
      const statusLabelMap: Record<'draft' | 'ready' | 'sent', string> = {
        draft: 'Kladd',
        ready: 'Klar',
        sent: 'Sendt',
      }
      const statusLabel = subtitle ? statusLabelMap[subtitle] : 'Ukjent'

      return {
        title,
        subtitle: sentAt
          ? `${statusLabel} - ${new Date(sentAt).toLocaleDateString('no-NO')}`
          : statusLabel,
        media,
      }
    },
  },
})