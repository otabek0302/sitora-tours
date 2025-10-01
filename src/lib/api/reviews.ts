import { apiRequest } from './index'
import { Review, ReviewSchema, CreateReview, CreateReviewSchema } from '@/lib/schemas/reviews'
import { z } from 'zod'

const ReviewsResponseSchema = z.object({
  docs: z.array(ReviewSchema),
  totalDocs: z.number().optional(),
  limit: z.number().optional(),
  totalPages: z.number().optional(),
  page: z.number().optional(),
  pagingCounter: z.number().optional(),
  hasPrevPage: z.boolean().optional(),
  hasNextPage: z.boolean().optional(),
  prevPage: z.number().nullable().optional(),
  nextPage: z.number().nullable().optional(),
})

/**
 * Fetch reviews (optionally filtered by tour)
 */
export async function fetchReviews(locale?: string, tourId?: number): Promise<Review[]> {
  try {
    const localeParam = locale ? `locale=${locale}&` : ''
    const tourParam = tourId ? `where[tour][equals]=${tourId}&` : ''
    const url = `/api/reviews?${localeParam}${tourParam}depth=1&limit=100&sort=-createdAt`

    const data = await apiRequest<z.infer<typeof ReviewsResponseSchema>>(url)
    const validatedData = ReviewsResponseSchema.parse(data)
    return validatedData.docs
  } catch (error) {
    console.error('Reviews API Error:', error)
    throw new Error('Failed to load reviews. Please try again.')
  }
}

/**
 * Create a new review
 */
export async function createReview(review: CreateReview, locale?: string): Promise<Review> {
  try {
    // Validate input
    const validatedReview = CreateReviewSchema.parse(review)

    const localeParam = locale ? `?locale=${locale}` : ''
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/reviews${localeParam}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedReview),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Create Review Error Response:', errorText)
      throw new Error('Failed to submit review. Please try again.')
    }

    const data = await response.json()

    // Use passthrough to allow extra Payload fields and safeParse to avoid throwing
    const validatedData = ReviewSchema.passthrough().safeParse(data)

    if (!validatedData.success) {
      return data as Review
    }

    return validatedData.data as Review
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return the first validation error message
      const firstError = error.issues[0]
      throw new Error(firstError.message)
    }
    console.error('Create Review API Error:', error)
    throw new Error('Failed to submit review. Please try again.')
  }
}

export default fetchReviews
