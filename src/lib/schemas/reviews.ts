import { z } from 'zod'

// Base review schema
export const ReviewSchema = z.object({
  id: z.number(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email().optional(),
  comment: z.string().min(10).max(1000),
  rating: z.number().min(1).max(5),
  tour_id: z.number().optional(),
  car_id: z.number().optional(),
  hotel_id: z.number().optional(),
  city_id: z.number().optional(),
  isVerified: z.boolean().default(false),
  isApproved: z.boolean().default(false),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

// Review submission schema
export const ReviewSubmissionSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required').optional(),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(1000, 'Comment must be less than 1000 characters'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  tour_id: z.number().optional(),
  car_id: z.number().optional(),
  hotel_id: z.number().optional(),
  city_id: z.number().optional(),
})

// Review list response schema
export const ReviewsResponseSchema = z.object({
  docs: z.array(ReviewSchema),
  totalDocs: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  page: z.number(),
  pagingCounter: z.number(),
  hasPrevPage: z.boolean(),
  hasNextPage: z.boolean(),
  prevPage: z.number().nullable(),
  nextPage: z.number().nullable(),
})

// Review filters schema
export const ReviewFiltersSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  isApproved: z.boolean().optional(),
  isActive: z.boolean().optional(),
  tour_id: z.number().optional(),
  car_id: z.number().optional(),
  hotel_id: z.number().optional(),
  city_id: z.number().optional(),
  search: z.string().optional(),
})

// Review search params schema
export const ReviewSearchParamsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sort: z.enum(['rating', 'createdAt', '-rating', '-createdAt']).default('-createdAt'),
  ...ReviewFiltersSchema.shape,
})

// TypeScript types inferred from schemas
export type Review = z.infer<typeof ReviewSchema>
export type ReviewSubmission = z.infer<typeof ReviewSubmissionSchema>
export type ReviewsResponse = z.infer<typeof ReviewsResponseSchema>
export type ReviewFilters = z.infer<typeof ReviewFiltersSchema>
export type ReviewSearchParams = z.infer<typeof ReviewSearchParamsSchema>
