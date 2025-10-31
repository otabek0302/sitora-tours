import { CollectionConfig } from 'payload'
import { autoGenerateSlug } from '@/lib/utils/slug'

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
      name: 'type',
      label: 'Car Type',
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
      name: 'pricing',
      label: 'Pricing',
      type: 'group',
      fields: [
        {
          name: 'pricePerDayInCity',
          label: 'Price per day in the city',
          type: 'number',
          required: true,
        },
        {
          name: 'transferAirportHotelAirport',
          label: 'Transfer: (airport - hotel - airport)',
          type: 'number',
          required: false,
        },
        {
          name: 'transferHotelDinnerHotel',
          label: 'Transfer: (hotel - dinner - hotel)',
          type: 'number',
          required: false,
        },
        {
          name: 'longRouteFrom7Days',
          label: 'On a long route (from 7 days)',
          type: 'number',
          required: false,
        },
      ],
    },
    {
      name: 'image',
      label: 'Car Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'images',
      label: 'Car Images',
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
  ],
  hooks: {
    beforeValidate: [autoGenerateSlug],
  },
  timestamps: true,
}
