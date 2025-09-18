import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Setting',
    useAsTitle: 'first_name',
  },
  auth: true,
  fields: [
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
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.slug && data?.first_name) {
          data.slug = data.first_name.toLowerCase().replace(/\s+/g, '-');
        }
      },
    ],
  },
};
