import { z } from 'zod'

// Category Schema
export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// Categories Response Schema
export const CategoriesResponseSchema = z.object({
  docs: z.array(CategorySchema),
  totalDocs: z.number(),
  limit: z.number(),
  page: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
})

// Export types
export type Category = z.infer<typeof CategorySchema>
export type CategoriesResponse = z.infer<typeof CategoriesResponseSchema>
