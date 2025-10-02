import { CollectionConfig } from 'payload'
import { autoGenerateSlug } from '@/lib/utils/slug'

export const Cities: CollectionConfig = {
  slug: 'cities',
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
      label: 'City Name',
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
      label: 'City Description',
      type: 'text',
      required: true,
      localized: true,
      index: true,
    },
    {
      name: 'image',
      label: 'City Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
  hooks: {
    beforeValidate: [autoGenerateSlug],
  },
  timestamps: true,
}
