import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    read: () => true,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      label: 'Media Image Alt',
      type: 'text',
      required: true,
      index: true,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.slug && data?.alt) {
          data.slug = data.alt.toLowerCase().replace(/\s+/g, '-')
        }
      },
    ],
  },
  timestamps: true,
  upload: {
    staticDir: './media',
    mimeTypes: ['image/jpeg', 'image/png', 'video/mp4'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
    ],
  },
}
