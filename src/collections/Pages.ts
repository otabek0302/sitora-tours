import type { GlobalConfig } from 'payload'

export const Pages: GlobalConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    description: '📄 Manage your website sections',
    group: 'Content',
  },
  hooks: {
    afterRead: [
      async ({ doc }) => {
        // If no sections exist, add default sections
        if (!doc?.sections || doc.sections.length === 0) {
          doc.sections = [
            { blockType: 'hero', blockName: 'Hero Section' },
            { blockType: 'faq', blockName: 'FAQ Section' },
            { blockType: 'special-offers', blockName: 'Special Offers' },
            { blockType: 'recommended-tours', blockName: 'Recommended Tours' },
            { blockType: 'recommended-cities', blockName: 'Recommended Cities' },
            { blockType: 'recommended-cars', blockName: 'Recommended Cars' },
          ]
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'sections',
      type: 'blocks',
      minRows: 6,
      maxRows: 6,
      admin: {
        description: 'Website sections - Fixed structure, edit content only',
        initCollapsed: false,
      },
      blocks: [
        {
          slug: 'hero',
          labels: {
            singular: 'Hero Section',
            plural: 'Hero Sections',
          },
          fields: [
            {
              label: 'Title',
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              label: 'Subtitle',
              name: 'subtitle',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              label: 'Button',
              name: 'button',
              type: 'text',
              localized: true,
            },
            {
              label: 'Hero Image',
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'posts',
              type: 'array',
              maxRows: 2,
              fields: [
                {
                  label: 'Review',
                  name: 'review',
                  type: 'relationship',
                  relationTo: 'reviews',
                },
                {
                  label: 'Video',
                  name: 'video',
                  type: 'upload',
                  relationTo: 'media',
                  filterOptions: {
                    mimeType: { contains: 'video/' },
                  },
                },
              ],
            },
          ],
        },
        {
          slug: 'faq',
          labels: {
            singular: 'FAQ Section',
            plural: 'FAQ Sections',
          },
          fields: [
            {
              name: 'faqs',
              type: 'array',
              maxRows: 10,
              fields: [
                {
                  label: 'Question',
                  name: 'question',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  label: 'Answer',
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          slug: 'special-offers',
          labels: {
            singular: 'Special Offers Section',
            plural: 'Special Offers Sections',
          },
          fields: [
            {
              label: 'Tours',
              name: 'tours',
              type: 'relationship',
              relationTo: 'tours',
            },
          ],
        },
        {
          slug: 'recommended-tours',
          labels: {
            singular: 'Recommended Tours Section',
            plural: 'Recommended Tours Sections',
          },
          fields: [
            {
              label: 'Tours',
              name: 'tours',
              type: 'relationship',
              relationTo: 'tours',
              hasMany: true,
              minRows: 1,
              maxRows: 6,
            },
          ],
        },
        {
          slug: 'recommended-cities',
          labels: {
            singular: 'Recommended Cities Section',
            plural: 'Recommended Cities Sections',
          },
          fields: [
            {
              label: 'Cities',
              name: 'cities',
              type: 'relationship',
              relationTo: 'cities',
              hasMany: true,
              minRows: 1,
              maxRows: 6,
            },
          ],
        },
        {
          slug: 'recommended-cars',
          labels: {
            singular: 'Recommended Cars Section',
            plural: 'Recommended Cars Sections',
          },
          fields: [
            {
              label: 'Cars',
              name: 'cars',
              type: 'relationship',
              relationTo: 'cars',
              hasMany: true,
              minRows: 1,
              maxRows: 6,
            },
          ],
        },
      ],
    },
  ],
}

export default Pages
