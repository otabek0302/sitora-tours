import { z } from 'zod'

// Base tour schema
export const TourSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  duration: z.string(),
  transport: z.string(),
  type: z.string(),
  rating: z.number().min(0).max(5),
  reviews: z.number().min(0),
  price: z.number().min(0),
  image: z.string().url().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  category: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  maxGroupSize: z.number().min(1).optional(),
  minGroupSize: z.number().min(1).optional(),
  includes: z.array(z.string()).optional(),
  excludes: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  itinerary: z.array(z.object({
    day: z.number(),
    title: z.string(),
    description: z.string(),
    activities: z.array(z.string()).optional(),
  })).optional(),
  location: z.object({
    city: z.string(),
    country: z.string(),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
})

// Tour list response schema
export const ToursResponseSchema = z.object({
  docs: z.array(TourSchema),
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

// Tour filters schema
export const TourFiltersSchema = z.object({
  category: z.string().optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
  durationRange: z.tuple([z.number(), z.number()]).optional(),
  rating: z.number().min(0).max(5).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  location: z.string().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  search: z.string().optional(),
})

// Tour search params schema
export const TourSearchParamsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sort: z.enum(['price', 'rating', 'duration', 'createdAt', '-price', '-rating', '-duration', '-createdAt']).default('-createdAt'),
  ...TourFiltersSchema.shape,
})

// TypeScript types inferred from schemas
export type Tour = z.infer<typeof TourSchema>
export type ToursResponse = z.infer<typeof ToursResponseSchema>
export type TourFilters = z.infer<typeof TourFiltersSchema>
export type TourSearchParams = z.infer<typeof TourSearchParamsSchema>
