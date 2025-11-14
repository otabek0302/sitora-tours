// Export all schemas and types
export * from './tours'
export * from './cars'
export * from './categories'
export * from './cities'
export * from './countries'
export * from './hotels'
export * from './pages'
export * from './reviews'

// Common utility schemas
import { z } from 'zod'

// Pagination schema
export const Pagination = z.object({
  page: z.number().min(1),
  limit: z.number().min(1).max(100),
  total: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
})

// TypeScript types
export type Pagination = z.infer<typeof Pagination>

// Generic Payload API Response type
export interface PayloadResponse<T> {
  docs: T[]
  totalDocs?: number
  limit?: number
  totalPages?: number
  page?: number
  pagingCounter?: number
  hasPrevPage?: boolean
  hasNextPage?: boolean
  prevPage?: number | null
  nextPage?: number | null
}
