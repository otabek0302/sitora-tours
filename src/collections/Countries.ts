import { CollectionConfig } from 'payload'

import { autoGenerateSlug } from '@/lib/utils/slug'

export const Countries: CollectionConfig = {
  slug: 'countries',
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
      label: 'Country Name',
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
      label: 'Country Description',
      type: 'textarea',
      localized: true,
      required: false,
    },
    {
      name: 'cities',
      label: 'Major Cities',
      type: 'array',
      labels: {
        singular: 'City',
        plural: 'Cities',
      },
      admin: {
        description: 'List key cities covered within this country tours',
      },
      fields: [
        {
          name: 'city',
          label: 'City Name',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [autoGenerateSlug],
  },
  timestamps: true,
}
