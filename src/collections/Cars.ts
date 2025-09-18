import { CollectionConfig } from 'payload';

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
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      label: 'Car Image',
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
