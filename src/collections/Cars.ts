import { CollectionConfig } from 'payload'
import { autoGenerateSlug } from '@/lib/utils/slug'

export const Cars: CollectionConfig = {
  slug: 'cars',
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
      label: 'Car Name',
      type: 'text',
      required: true,
      localized: true,
      index: true,
    },
    {
      name: 'type',
      label: 'Car Type',
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
      name: 'model',
      label: 'Car Model',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'brand',
      label: 'Car Brand',
      type: 'text',
      required: true,
    },
    {
      name: 'capacity',
      label: 'Car Capacity',
      type: 'number',
      required: true,
    },
    {
      name: 'price',
      label: 'Car Price',
      type: 'number',
      required: true,
    },
    {
      name: 'image',
      label: 'Car Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'images',
      label: 'Car Images',
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
  ],
  hooks: {
    beforeValidate: [autoGenerateSlug],
  },
  timestamps: true,
}
