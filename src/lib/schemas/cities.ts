import { z } from 'zod'

// Image Schema
const ImageSchema = z.object({
  id: z.number(),
  url: z.string(),
})

// City Schema
export const CitySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  image: ImageSchema.nullish(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// Cities Response Schema
export const CitiesResponseSchema = z.object({
  docs: z.array(CitySchema),
  totalDocs: z.number(),
  limit: z.number(),
  page: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
})

// Export types
export type City = z.infer<typeof CitySchema>
export type CitiesResponse = z.infer<typeof CitiesResponseSchema>
