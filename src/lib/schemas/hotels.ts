import { z } from 'zod'

// City Relation Schema
const CityRelationSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string().optional(),
})

// Image Schema
const ImageSchema = z.object({
  id: z.number(),
  url: z.string(),
})

// Hotel Schema
export const HotelSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  city: CityRelationSchema.optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  rating: z.string().optional(), // '1', '2', '3', '4', '5' from select
  features: z.array(z.object({ id: z.string().optional(), name: z.string() })).optional(),
  image: ImageSchema.nullish(),
  images: z
    .array(
      z.object({
        id: z.string().optional(),
        image: ImageSchema,
      }),
    )
    .optional(),
  policies: z
    .object({
      checkIn: z.string().optional(),
      checkOut: z.string().optional(),
      cancellation: z.string().optional(),
      pet: z.string().optional(),
      children: z.string().optional(),
      payment: z.string().optional(),
    })
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// Hotels Response Schema
export const HotelsResponseSchema = z.object({
  docs: z.array(HotelSchema),
  totalDocs: z.number(),
  limit: z.number(),
  page: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
})

// Export types
export type Hotel = z.infer<typeof HotelSchema>
export type HotelsResponse = z.infer<typeof HotelsResponseSchema>
