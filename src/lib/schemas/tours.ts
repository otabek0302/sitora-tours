import { z } from 'zod'

// Image Schema
const ImageSchema = z.object({
  id: z.number(),
  url: z.string(),
})

// Base tour schema matching Payload CMS structure
const RelationObjectSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string().optional(),
  slug: z.string().optional(),
})

export const TourSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  description: z.string().optional(),
  duration_days: z.number(),
  duration_nights: z.number(),
  price: z.number(),
  slug: z.string(),

  category: RelationObjectSchema.optional(),
  cities: z.array(RelationObjectSchema).optional(),
  countries: z.array(RelationObjectSchema).optional(),
  tourType: z.enum(['local', 'abroad']).optional(),

  locations: z
    .array(
      z.object({
        id: z.string().optional(),
        from: RelationObjectSchema,
        to: RelationObjectSchema,
        transport: z.string(),
        fromTime: z.string().optional(),
        toTime: z.string().optional(),
        duration: z.string().optional(),
      }),
    )
    .optional(),

  itinerary: z
    .array(
      z.object({
        id: z.string().optional(),
        day: z.string(),
        activities: z.array(
          z.object({
            id: z.string().optional(),
            activity: z.string(),
          }),
        ),
      }),
    )
    .optional(),

  services: z
    .object({
      included: z
        .array(
          z.object({
            id: z.string().optional(),
            title: z.string(),
          }),
        )
        .optional(),
      notIncluded: z
        .array(
          z.object({
            id: z.string().optional(),
            title: z.string(),
          }),
        )
        .optional(),
    })
    .optional(),

  accommodation: z
    .array(
      z.object({
        id: z.string().optional(),
        city: z.union([z.number(), RelationObjectSchema]).optional(),
        hotel: z
          .array(
            z.union([
              z.number(),
              RelationObjectSchema,
              z.object({
                id: z.union([z.string(), z.number()]),
                name: z.string().optional(),
                slug: z.string().optional(),
                description: z.string().optional(),
                address: z.string().optional(),
                phone: z.string().optional(),
                rating: z.string().optional(),
                website: z.string().optional(),
                email: z.string().optional(),
              }),
            ]),
          )
          .optional(),
      }),
    )
    .optional(),
  booking_pricing: z
    .array(
      z.object({
        id: z.string().optional(),
        dateStart: z.string().nullish(),
        dateEnd: z.string().nullish(),
        numberOfPersons: z.number().nullish(),
        pricePerPerson: z.number().optional(),
      }),
    )
    .optional(),
  images: z
    .array(
      z.object({
        id: z.string().optional(),
        image: ImageSchema,
      }),
    )
    .optional(),
  rating: z.number().min(0).max(5).optional(),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

// Tour list response schema
export const ToursResponseSchema = z.object({
  docs: z.array(TourSchema),
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

// Tour filters schema (internal - numbers/arrays)
export const TourFiltersSchema = z.object({
  category: z.number().nullable().optional(),
  cities: z.array(z.number()).optional(),
  countries: z.array(z.number()).optional(),
  tourType: z.enum(['local', 'abroad']).optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  durationMin: z.number().min(0).optional(),
  durationMax: z.number().min(0).optional(),
})

// TypeScript types inferred from schemas
export type Tour = z.infer<typeof TourSchema>
export type ToursResponse = z.infer<typeof ToursResponseSchema>
export type TourFilters = z.infer<typeof TourFiltersSchema>
