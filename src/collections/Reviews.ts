import { CollectionConfig } from 'payload'

// Helper function to calculate and update tour rating
async function updateTourRating(req: any, tourId: number) {
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

      // Calculate average rating
      if (reviews.docs && reviews.docs.length > 0) {
        const totalRating = reviews.docs.reduce((sum: number, review: any) => sum + (review.rating || 0), 0)
        const averageRating = totalRating / reviews.docs.length
        const roundedRating = Math.round(averageRating * 10) / 10

        console.log(`[Reviews] Calculated average rating: ${roundedRating}`)

        // Update the tour with the new average rating (bypass hooks to prevent circular updates)
        await req.payload.update({
          collection: 'tours',
          id: tourId,
          data: {
            rating: roundedRating,
          },
          overrideAccess: true,
        })

        console.log(`[Reviews] Successfully updated tour ${tourId} rating to ${roundedRating}`)
      } else {
        // No reviews, set rating to 0
        await req.payload.update({
          collection: 'tours',
          id: tourId,
          data: {
            rating: 0,
          },
          overrideAccess: true,
        })

        console.log(`[Reviews] Set tour ${tourId} rating to 0 (no reviews)`)
      }
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
    beforeValidate: [
      ({ data, operation }) => {
        // Auto-generate unique slug from first name + timestamp
        if (data?.first_name && operation === 'create') {
          const cleanName = data.first_name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .trim()

          // Add timestamp to ensure uniqueness
          const timestamp = Date.now()
          data.slug = `${cleanName}-${timestamp}`
        }
      },
    ],
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
