import { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
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
      label: 'Tour Name',
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
      label: 'Tour Description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'duration_days',
                  label: 'Tour Duration (Days)',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'duration_nights',
                  label: 'Tour Duration (Nights)',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'price',
                  label: 'Tour Price',
                  type: 'number',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tour Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  label: 'Tour Category',
                  type: 'relationship',
                  relationTo: 'categories',
                  required: true,
                },
                {
                  name: 'cities',
                  label: 'Tour Cities',
                  type: 'relationship',
                  relationTo: 'cities',
                  hasMany: true,
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'locations',
      label: 'Travel Path (e.g., Samarkand → Tashkent)',
      type: 'array',
      fields: [
        { name: 'from', type: 'relationship', relationTo: 'cities', required: true },
        { name: 'to', type: 'relationship', relationTo: 'cities', required: true },
        { name: 'transport', type: 'text', localized: true, required: true },
        {
          type: 'row',
          fields: [
            { name: 'fromTime', type: 'text', required: true },
            { name: 'toTime', type: 'text', required: true },
            { name: 'duration', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'accommodation',
      label: 'Accommodation Per City',
      type: 'array',
      fields: [
        { name: 'city', type: 'relationship', relationTo: 'cities', required: true },
        { name: 'hotel', type: 'relationship', relationTo: 'hotels', hasMany: true },
      ],
    },
    {
      name: 'itinerary',
      label: 'Itinerary (By Day)',
      type: 'array',
      fields: [
        { name: 'day', type: 'text', required: true, localized: true },
        {
          name: 'activities',
          type: 'array',
          fields: [{ name: 'activity', type: 'text', required: true, localized: true }],
        },
      ],
    },
    {
      name: 'services',
      label: 'Tour Services',
      type: 'group',
      fields: [
        {
          name: 'included',
          type: 'array',
          label: 'Included Services',
          fields: [{ name: 'title', type: 'text', required: true, localized: true }],
        },
        {
          name: 'notIncluded',
          type: 'array',
          label: 'Not Included Services',
          fields: [{ name: 'title', type: 'text', required: true, localized: true }],
        },
      ],
    },
    {
      name: 'booking_pricing',
      label: 'Booking & Pricing',
      type: 'array',
      fields: [
        { name: 'dateStart', type: 'date' },
        { name: 'dateEnd', type: 'date' },
        { name: 'pricePerAdult', type: 'number' },
        { name: 'pricePerChild', type: 'number' },
      ],
    },
    {
      name: 'images',
      label: 'Gallery',
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
      type: 'tabs',
      tabs: [
        {
          label: 'Ratings & Reviews',
          fields: [
            {
              name: 'rating',
              label: 'Average Rating',
              type: 'number',
              min: 0,
              max: 5,
              defaultValue: 0,
              admin: {
                description: 'Average rating calculated from customer reviews (0-5 stars)',
              },
            },
          ],
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
