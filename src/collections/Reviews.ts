import { CollectionConfig, PayloadRequest } from 'payload'
import { autoGenerateUniqueSlug } from '@/lib/utils/slug'

// Helper function to calculate and update tour rating
async function updateTourRating(req: PayloadRequest, tourId: number) {
  // Run in background to not block the review creation
  setImmediate(async () => {
    try {
      console.log(`[Reviews] Updating rating for tour ${tourId}`)

      // Fetch all reviews for this tour
      const reviews = await req.payload.find({
        collection: 'reviews',
        where: {
          tour: {
            equals: tourId,
          },
        },
        limit: 1000,
      })

      console.log(`[Reviews] Found ${reviews.docs?.length || 0} reviews for tour ${tourId}`)

      const ratings = reviews.docs?.map((review: { rating?: number }) => review.rating || 0) ?? []
      const roundedRating = ratings.length > 0 ? Math.round((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length) * 10) / 10 : 0

      console.log(`[Reviews] Calculated average rating: ${roundedRating}`)

      // Update only the rating field to avoid re-validating the full tour payload.
      await req.payload.update({
        collection: 'tours',
        id: tourId,
        data: { rating: roundedRating },
        overrideAccess: true,
        locale: 'en',
      })

      console.log(`[Reviews] Successfully updated tour ${tourId} rating to ${roundedRating}`)
    } catch (error) {
      console.error(`[Reviews] Error updating tour ${tourId} rating:`, error)
    }
  })
}

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
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-generated from first name',
      },
    },
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
      name: 'tour',
      label: 'Tour',
      type: 'relationship',
      relationTo: 'tours',
      required: true,
    },
  ],
  hooks: {
    beforeValidate: [autoGenerateUniqueSlug],
    afterChange: [
      async ({ req, doc }) => {
        // Update tour rating after review is created or updated
        if (doc.tour) {
          const tourId = typeof doc.tour === 'number' ? doc.tour : doc.tour?.id
          if (tourId) {
            await updateTourRating(req, tourId)
          }
        }
      },
    ],
    afterDelete: [
      async ({ req, doc }) => {
        // Update tour rating after review is deleted
        if (doc.tour) {
          const tourId = typeof doc.tour === 'number' ? doc.tour : doc.tour?.id
          if (tourId) {
            await updateTourRating(req, tourId)
          }
        }
      },
    ],
  },
  timestamps: true,
}
