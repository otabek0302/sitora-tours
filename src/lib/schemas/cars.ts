import { z } from 'zod'

// Image Schema
const ImageSchema = z.object({
  id: z.number(),
  url: z.string(),
})

// Car Pricing Schema - flexible for migration period
const CarPricingSchema = z
  .object({
    pricePerDayInCity: z.number().nullable().optional(),
    transferAirportHotelAirport: z.number().nullable().optional(),
    transferHotelDinnerHotel: z.number().nullable().optional(),
    longRouteFrom7Days: z.number().nullable().optional(),
  })
  .nullable()
  .optional()

// Car Schema with backward compatibility
export const CarSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    slug: z.string(),
    brand: z.string(),
    capacity: z.number(),
    // Support both old (price) and new (pricing) structures during migration
    price: z.number().optional(), // Old field for backward compatibility
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
  .transform(data => {
    // Transform old price to new pricing structure if needed
    if (data.price && !data.pricing?.pricePerDayInCity) {
      return {
        ...data,
        pricing: {
          pricePerDayInCity: data.price,
          transferAirportHotelAirport: data.pricing?.transferAirportHotelAirport ?? null,
          transferHotelDinnerHotel: data.pricing?.transferHotelDinnerHotel ?? null,
          longRouteFrom7Days: data.pricing?.longRouteFrom7Days ?? null,
        },
      }
    }
    // Ensure pricing object exists even if all fields are null
    if (!data.pricing) {
      return {
        ...data,
        pricing: {
          pricePerDayInCity: null,
          transferAirportHotelAirport: null,
          transferHotelDinnerHotel: null,
          longRouteFrom7Days: null,
        },
      }
    }
    return data
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
