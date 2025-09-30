import { CollectionConfig } from 'payload'

export const Hotels: CollectionConfig = {
  slug: 'hotels',
  access: {
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    read: () => true,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Hotel Name',
      type: 'text',
      required: true,
      localized: true,
      index: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-generated from English name',
      },
    },
    {
      name: 'description',
      label: 'Hotel Description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'city',
      label: 'Hotel In City',
      type: 'relationship',
      relationTo: 'cities',
      required: true,
    },
    {
      name: 'address',
      label: 'Hotel Address',
      type: 'text',
      localized: true,
    },
    {
      name: 'phone',
      label: 'Hotel Phone',
      type: 'text',
      required: true,
    },
    {
      name: 'rating',
      label: 'Hotel Rating',
      type: 'select',
      options: [
        { label: '1 Star', value: '1' },
        { label: '2 Stars', value: '2' },
        { label: '3 Stars', value: '3' },
        { label: '4 Stars', value: '4' },
        { label: '5 Stars', value: '5' },
      ],
    },
    {
      name: 'features',
      label: 'Hotel Features',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'name',
          label: 'Hotel Feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      label: 'Hotel Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'images',
      label: 'Hotel Images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'policies',
      type: 'group',
      label: 'Hotel Policies',
      fields: [
        {
          name: 'checkIn',
          type: 'text',
          label: 'Check-in Time',
          required: true,
        },
        {
          name: 'checkOut',
          type: 'text',
          label: 'Check-out Time',
          required: true,
        },
        {
          name: 'cancellation',
          type: 'text',
          localized: true,
          label: 'Cancellation Policy',
        },
        {
          name: 'pet',
          type: 'text',
          localized: true,
          label: 'Pet Policy',
        },
        {
          name: 'children',
          type: 'text',
          localized: true,
          label: 'Children Policy',
        },
        {
          name: 'payment',
          type: 'text',
          localized: true,
          label: 'Payment Policy',
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Auto-generate slug from English name ONLY on create
        if (operation === 'create' && data?.name) {
          let englishName = ''

          // Handle localized name object
          if (typeof data.name === 'object') {
            englishName = data.name.en || data.name.english || Object.values(data.name)[0] || ''
          } else {
            // Handle string name (assume it's English)
            englishName = data.name
          }

          if (englishName) {
            // Generate slug from English name
            const slug = englishName
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
              .replace(/\s+/g, '-') // Replace spaces with hyphens
              .replace(/-+/g, '-') // Replace multiple hyphens with single
              .trim()

            data.slug = slug
          }
        }
      },
    ],
  },
  timestamps: true,
}
