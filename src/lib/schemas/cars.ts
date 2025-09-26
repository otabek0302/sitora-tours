import { z } from 'zod'

// Base car schema
export const CarSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
  capacity: z.number().min(1),
  transmission: z.enum(['manual', 'automatic']).default('automatic'),
  fuelType: z.enum(['petrol', 'diesel', 'hybrid', 'electric']).default('petrol'),
  features: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5),
  reviews: z.number().min(0),
  price: z.number().min(0),
  pricePerDay: z.boolean().default(true),
  image: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  isAvailable: z.boolean().default(true),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  location: z.string().optional(),
  pickupLocation: z.string().optional(),
  returnLocation: z.string().optional(),
  insurance: z.object({
    included: z.boolean().default(false),
    type: z.string().optional(),
    coverage: z.string().optional(),
  }).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

// Car list response schema
export const CarsResponseSchema = z.object({
  docs: z.array(CarSchema),
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

// Car filters schema
export const CarFiltersSchema = z.object({
  type: z.string().optional(),
  brand: z.string().optional(),
  transmission: z.enum(['manual', 'automatic']).optional(),
  fuelType: z.enum(['petrol', 'diesel', 'hybrid', 'electric']).optional(),
  capacity: z.number().min(1).optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
  rating: z.number().min(0).max(5).optional(),
  isAvailable: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  location: z.string().optional(),
  search: z.string().optional(),
})

// Car search params schema
export const CarSearchParamsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sort: z.enum(['price', 'rating', 'name', 'createdAt', '-price', '-rating', '-name', '-createdAt']).default('-createdAt'),
  ...CarFiltersSchema.shape,
})

// TypeScript types inferred from schemas
export type Car = z.infer<typeof CarSchema>
export type CarsResponse = z.infer<typeof CarsResponseSchema>
export type CarFilters = z.infer<typeof CarFiltersSchema>
export type CarSearchParams = z.infer<typeof CarSearchParamsSchema>
