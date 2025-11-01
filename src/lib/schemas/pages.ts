import { z } from 'zod'
import { TourSchema } from './tours'
import { CitySchema } from './cities'
import { CarSchema } from './cars'
import { ReviewSchema } from './reviews'

// Image schema
const ImageSchema = z.object({
  id: z.number(),
  url: z.string(),
})

// Hero Section
const HeroSectionSchema = z.object({
  blockType: z.literal('hero'),
  blockName: z.string().nullish(),
  id: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  button: z.string().optional(),
  image: z.union([z.number(), ImageSchema, z.null()]).optional().nullable(),
  posts: z
    .array(
      z.object({
        id: z.string().optional(),
        review: z.union([z.number(), ReviewSchema, z.null()]).optional().nullable(),
        video: z.union([z.number(), ImageSchema, z.null()]).optional().nullable(),
      }),
    )
    .optional(),
})

// FAQ Section
const FAQSectionSchema = z.object({
  blockType: z.literal('faq'),
  blockName: z.string().nullish(),
  id: z.string().optional(),
  faqs: z
    .array(
      z.object({
        id: z.string().optional(),
        question: z.string().optional(),
        answer: z.string().optional(),
      }),
    )
    .optional(),
})

// Special Offers Section
const SpecialOffersSectionSchema = z.object({
  blockType: z.literal('special-offers'),
  blockName: z.string().nullish(),
  id: z.string().optional(),
  tours: z.union([z.number(), TourSchema, z.null()]).optional().nullable(),
})

// Recommended Local Tours Section
const RecommendedLocalToursSectionSchema = z.object({
  blockType: z.literal('recommended-local-tours'),
  blockName: z.string().nullish(),
  id: z.string().optional(),
  tours: z
    .union([z.array(z.union([z.number(), TourSchema, z.null()])), z.number(), TourSchema, z.null()])
    .optional()
    .nullable(),
})

// Recommended Abroad Tours Section
const RecommendedAbroadToursSectionSchema = z.object({
  blockType: z.literal('recommended-abroad-tours'),
  blockName: z.string().nullish(),
  id: z.string().optional(),
  tours: z
    .union([z.array(z.union([z.number(), TourSchema, z.null()])), z.number(), TourSchema, z.null()])
    .optional()
    .nullable(),
})

// Legacy Recommended Tours Section (for backward compatibility)
const RecommendedToursSectionSchema = z.object({
  blockType: z.literal('recommended-tours'),
  blockName: z.string().nullish(),
  id: z.string().optional(),
  tours: z
    .union([z.array(z.union([z.number(), TourSchema, z.null()])), z.number(), TourSchema, z.null()])
    .optional()
    .nullable(),
})

// Recommended Cities Section
const RecommendedCitiesSectionSchema = z.object({
  blockType: z.literal('recommended-cities'),
  blockName: z.string().nullish(),
  id: z.string().optional(),
  cities: z
    .union([z.array(z.union([z.number(), CitySchema, z.null()])), z.number(), CitySchema, z.null()])
    .optional()
    .nullable(),
})

// Recommended Cars Section
const RecommendedCarsSectionSchema = z.object({
  blockType: z.literal('recommended-cars'),
  blockName: z.string().nullish(),
  id: z.string().optional(),
  cars: z
    .union([z.array(z.union([z.number(), CarSchema, z.null()])), z.number(), CarSchema, z.null()])
    .optional()
    .nullable(),
})

// Union of all section types
const SectionSchema = z.discriminatedUnion('blockType', [
  HeroSectionSchema,
  FAQSectionSchema,
  SpecialOffersSectionSchema,
  RecommendedLocalToursSectionSchema,
  RecommendedAbroadToursSectionSchema,
  RecommendedToursSectionSchema, // Legacy, for backward compatibility
  RecommendedCitiesSectionSchema,
  RecommendedCarsSectionSchema,
])

// Pages schema
export const PagesSchema = z.object({
  id: z.number().optional(),
  sections: z.array(SectionSchema).optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
})

export type Pages = z.infer<typeof PagesSchema>
export type Section = z.infer<typeof SectionSchema>
export type HeroSection = z.infer<typeof HeroSectionSchema>
export type FAQSection = z.infer<typeof FAQSectionSchema>
export type SpecialOffersSection = z.infer<typeof SpecialOffersSectionSchema>
export type RecommendedLocalToursSection = z.infer<typeof RecommendedLocalToursSectionSchema>
export type RecommendedAbroadToursSection = z.infer<typeof RecommendedAbroadToursSectionSchema>
export type RecommendedToursSection = z.infer<typeof RecommendedToursSectionSchema> // Legacy
export type RecommendedCitiesSection = z.infer<typeof RecommendedCitiesSectionSchema>
export type RecommendedCarsSection = z.infer<typeof RecommendedCarsSectionSchema>
