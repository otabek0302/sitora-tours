// Export all schemas and types
export * from './tours'
export * from './cities'
export * from './cars'
export * from './reviews'

// Common utility schemas
import { z } from 'zod'

// Generic API response schema
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
})

// Pagination schema
export const PaginationSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1).max(100),
  totalPages: z.number(),
  totalDocs: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
})

// Search schema
export const SearchSchema = z.object({
  query: z.string().min(1),
  filters: z.record(z.any()).optional(),
  sort: z.string().optional(),
  ...PaginationSchema.shape,
})

// TypeScript types
export type ApiResponse<T = any> = z.infer<typeof ApiResponseSchema> & { data?: T }
export type Pagination = z.infer<typeof PaginationSchema>
export type Search = z.infer<typeof SearchSchema>
