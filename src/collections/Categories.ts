import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
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
      label: 'Category Name',
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
