import { CollectionConfig } from 'payload';

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
      required: true,
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data?.slug && data?.name) {
          data.slug = data.name.toLowerCase().replace(/\s+/g, '-');
        }
      },
    ],
  },
  timestamps: true,
};
