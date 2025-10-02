import { CollectionConfig } from 'payload'
import { autoGenerateSlug } from '@/lib/utils/slug'

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
        { name: 'dateStart', type: 'date', required: true },
        { name: 'dateEnd', type: 'date', required: true },
        { name: 'pricePerPerson', type: 'number', required: true },
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
    beforeValidate: [autoGenerateSlug],
  },
  timestamps: true,
}
