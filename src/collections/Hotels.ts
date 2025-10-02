import { CollectionConfig } from 'payload'
import { autoGenerateSlug } from '@/lib/utils/slug'

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
      label: 'Hotel Description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'city',
      label: 'Hotel In City',
      type: 'relationship',
      relationTo: 'cities',
      required: true,
    },
    {
      name: 'address',
      label: 'Hotel Address',
      type: 'text',
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
    {
      name: 'images',
      label: 'Hotel Images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'policies',
      type: 'group',
      label: 'Hotel Policies',
      fields: [
        {
          name: 'checkIn',
          type: 'text',
          label: 'Check-in Time',
          required: true,
        },
        {
          name: 'checkOut',
          type: 'text',
          label: 'Check-out Time',
          required: true,
        },
        {
          name: 'cancellation',
          type: 'text',
          localized: true,
          label: 'Cancellation Policy',
        },
        {
          name: 'pet',
          type: 'text',
          localized: true,
          label: 'Pet Policy',
        },
        {
          name: 'children',
          type: 'text',
          localized: true,
          label: 'Children Policy',
        },
        {
          name: 'payment',
          type: 'text',
          localized: true,
          label: 'Payment Policy',
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [autoGenerateSlug],
  },
  timestamps: true,
}
