import { CollectionConfig } from 'payload';

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
      name: 'tour_id',
      label: 'Tour',
      type: 'relationship',
      relationTo: 'tours',
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
  timestamps: true,
};
