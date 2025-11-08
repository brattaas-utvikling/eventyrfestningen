// schemas/documents/performance.ts
export const performanceDoc = {
  name: 'performance',
  title: 'Forestillings-dato',
  type: 'document',
  fields: [
    {
      name: 'show',
      title: 'Forestilling',
      type: 'reference',
      to: [{ type: 'show' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'date',
      title: 'Dato og tid',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ledig', value: 'available' },
          { title: 'Få billetter', value: 'few' },
          { title: 'Utsolgt', value: 'soldout' }
        ]
      },
      initialValue: 'available'
    },
    {
      name: 'venue',
      title: 'Spillested',
      type: 'string',
      initialValue: 'Kongsvinger Festning'
    }
  ],
  preview: {
    select: {
      showTitle: 'show.title',
      date: 'date',
      status: 'status'
    },
    prepare({ showTitle, date, status }: any) {
      return {
        title: showTitle,
        subtitle: `${new Date(date).toLocaleDateString('nb-NO')} - ${status}`
      }
    }
  }
}

// // schemas/documents/performance.ts
// export const performance = {
//   name: 'performance',
//   title: 'Forestillings-dato',
//   type: 'document',
//   fields: [
//     {
//       name: 'show',
//       title: 'Forestilling',
//       type: 'reference',
//       to: [{ type: 'show' }],
//       validation: (Rule: any) => Rule.required()
//     },
//     {
//       name: 'date',
//       title: 'Dato og tid',
//       type: 'datetime',
//       validation: (Rule: any) => Rule.required()
//     },
//     {
//       name: 'status',
//       title: 'Status',
//       type: 'string',
//       options: {
//         list: [
//           { title: 'Ledig', value: 'available' },
//           { title: 'Få billetter', value: 'few' },
//           { title: 'Utsolgt', value: 'soldout' }
//         ]
//       },
//       initialValue: 'available'
//     },
//     {
//       name: 'venue',
//       title: 'Spillested',
//       type: 'string',
//       initialValue: 'Kongsvinger Festning'
//     }
//   ],
//   preview: {
//     select: {
//       showTitle: 'show.title',
//       date: 'date',
//       status: 'status'
//     },
//     prepare({ showTitle, date, status }: any) {
//       return {
//         title: showTitle,
//         subtitle: `${new Date(date).toLocaleDateString('nb-NO')} - ${status}`
//       }
//     }
//   }
// }