import { CollectionConfig } from 'payload';

export const Hotels: CollectionConfig = {
  slug: 'hotels',
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
      label: 'Hotel Name',
      type: 'text',
      required: true,
      localized: true,
      index: true,
    },
    {
      name: 'description',
      label: 'Hotel Description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'address',
      label: 'Hotel Address',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'phone',
      label: 'Hotel Phone',
      type: 'text',
      required: true,
    },
    {
      name: 'rating',
      label: 'Hotel Rating',
      type: 'select',
      options: [
        { label: '1 Star', value: '1' },
        { label: '2 Stars', value: '2' },
        { label: '3 Stars', value: '3' },
        { label: '4 Stars', value: '4' },
        { label: '5 Stars', value: '5' },
      ],
    },
    {
      name: 'features',
      label: 'Hotel Features',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'name',
          label: 'Hotel Feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      label: 'Hotel Image',
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
