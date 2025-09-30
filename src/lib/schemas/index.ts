// Export all schemas and types
export * from './tours'
export * from './cars'
export * from './categories'
export * from './cities'
export * from './hotels'

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
