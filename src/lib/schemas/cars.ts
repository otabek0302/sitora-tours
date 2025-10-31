import { z } from 'zod'

// Image Schema
const ImageSchema = z.object({
  id: z.number(),
  url: z.string(),
})

// Car Pricing Schema
const CarPricingSchema = z.object({
  pricePerDayInCity: z.number(),
  transferAirportHotelAirport: z.number().optional(),
  transferHotelDinnerHotel: z.number().optional(),
  longRouteFrom7Days: z.number().optional(),
})

// Car Schema
export const CarSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  slug: z.string(),
  brand: z.string(),
  capacity: z.number(),
  pricing: CarPricingSchema,
  image: ImageSchema.nullish(),
  images: z
    .array(
      z.object({
        id: z.string().optional(),
        image: ImageSchema,
      }),
    )
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// Cars Response Schema
export const CarsResponseSchema = z.object({
  docs: z.array(CarSchema),
  totalDocs: z.number(),
  limit: z.number(),
  page: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
})

// Car Filters Schema
export const CarFiltersSchema = z.object({
  type: z.string().optional(),
  brand: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minCapacity: z.number().optional(),
  maxCapacity: z.number().optional(),
})

// Export pricing type
export type CarPricing = z.infer<typeof CarPricingSchema>

// Export types
export type Car = z.infer<typeof CarSchema>
export type CarsResponse = z.infer<typeof CarsResponseSchema>
export type CarFilters = z.infer<typeof CarFiltersSchema>
