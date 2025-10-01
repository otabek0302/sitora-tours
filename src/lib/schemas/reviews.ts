import { z } from 'zod'

// Review schema
export const ReviewSchema = z
  .object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string().optional().nullable(),
    comment: z.string(),
    rating: z.number().min(1).max(5),
    tour: z.union([
      z.number(),
      z
        .object({
          id: z.number(),
          name: z.string().optional(),
          slug: z.string().optional(),
        })
        .passthrough(),
    ]),
    slug: z.string().optional().nullable(),
    updatedAt: z.string().optional(),
    createdAt: z.string().optional(),
  })
  .passthrough()

// Create review request schema
export const CreateReviewSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  last_name: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  comment: z.string().min(3, 'Comment must be at least 3 characters').max(1000, 'Comment must not exceed 1000 characters'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must not exceed 5'),
  tour: z.number().min(1, 'Tour selection is required'),
})

export type Review = z.infer<typeof ReviewSchema>
export type CreateReview = z.infer<typeof CreateReviewSchema>
