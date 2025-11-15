import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,

  admin: {
    group: 'Setting',
    useAsTitle: 'first_name',
  },

  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'first_name',
      type: 'text',
      required: true,
    },
    {
      name: 'last_name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],

  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.slug && data?.first_name) {
          data.slug = data.first_name.toLowerCase().replace(/\s+/g, '-')
        }
      },
    ],
  },
}
