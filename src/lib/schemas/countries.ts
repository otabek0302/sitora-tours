import { z } from 'zod'

export const CountryCitySchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  city: z.string(),
})

export const CountrySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  cities: z.array(CountryCitySchema).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export const CountriesResponseSchema = z.object({
  docs: z.array(CountrySchema),
  totalDocs: z.number(),
  limit: z.number(),
  page: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
})

export type Country = z.infer<typeof CountrySchema>
export type CountriesResponse = z.infer<typeof CountriesResponseSchema>

