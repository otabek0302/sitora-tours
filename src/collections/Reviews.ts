import { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: {
    create: () => true,
    delete: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    read: () => true,
  },
  admin: {
    group: 'Client',
    useAsTitle: 'first_name',
  },
  fields: [
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
        description: 'Auto-generated from first name',
      },
    },
    {
      name: 'first_name',
      label: 'First Name',
      type: 'text',
      required: true,
    },
    {
      name: 'last_name',
      label: 'Last Name',
      type: 'text',
    },
    {
      name: 'comment',
      label: 'Comment',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'number',
      required: true,
    },
    {
      name: 'tour',
      label: 'Tour',
      type: 'relationship',
      relationTo: 'tours',
      required: true,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Auto-generate slug from first name
        if (data?.first_name) {
          const slug = data.first_name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .trim()

          data.slug = slug
        }
      },
    ],
  },
  timestamps: true,
}
