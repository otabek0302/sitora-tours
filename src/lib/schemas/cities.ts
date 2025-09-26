import { z } from 'zod'

// Base city schema
export const CitySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  country: z.string(),
  image: z.string().url().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  population: z.number().optional(),
  timezone: z.string().optional(),
  currency: z.string().optional(),
  language: z.array(z.string()).optional(),
  climate: z.string().optional(),
  bestTimeToVisit: z.string().optional(),
  attractions: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

// City list response schema
export const CitiesResponseSchema = z.object({
  docs: z.array(CitySchema),
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

// City filters schema
export const CityFiltersSchema = z.object({
  country: z.string().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  search: z.string().optional(),
})

// City search params schema
export const CitySearchParamsSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sort: z.enum(['name', 'population', 'createdAt', '-name', '-population', '-createdAt']).default('-createdAt'),
  ...CityFiltersSchema.shape,
})

// TypeScript types inferred from schemas
export type City = z.infer<typeof CitySchema>
export type CitiesResponse = z.infer<typeof CitiesResponseSchema>
export type CityFilters = z.infer<typeof CityFiltersSchema>
export type CitySearchParams = z.infer<typeof CitySearchParamsSchema>
