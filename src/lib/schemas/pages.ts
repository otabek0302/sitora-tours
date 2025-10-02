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
  blockName: z.string().optional(),
  id: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  button: z.string().optional(),
  image: z.union([z.number(), ImageSchema]).optional(),
  posts: z
    .array(
      z.object({
        id: z.string().optional(),
        review: z.union([z.number(), ReviewSchema]).optional(),
        video: z.union([z.number(), ImageSchema]).optional(),
      }),
    )
    .optional(),
})

// FAQ Section
const FAQSectionSchema = z.object({
  blockType: z.literal('faq'),
  blockName: z.string().optional(),
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
  blockName: z.string().optional(),
  id: z.string().optional(),
  tours: z.union([z.number(), TourSchema]).optional(),
})

// Recommended Tours Section
const RecommendedToursSectionSchema = z.object({
  blockType: z.literal('recommended-tours'),
  blockName: z.string().optional(),
  id: z.string().optional(),
  tours: z.union([z.array(z.union([z.number(), TourSchema])), z.number(), TourSchema]).optional(),
})

// Recommended Cities Section
const RecommendedCitiesSectionSchema = z.object({
  blockType: z.literal('recommended-cities'),
  blockName: z.string().optional(),
  id: z.string().optional(),
  cities: z.union([z.array(z.union([z.number(), CitySchema])), z.number(), CitySchema]).optional(),
})

// Recommended Cars Section
const RecommendedCarsSectionSchema = z.object({
  blockType: z.literal('recommended-cars'),
  blockName: z.string().optional(),
  id: z.string().optional(),
  cars: z.union([z.array(z.union([z.number(), CarSchema])), z.number(), CarSchema]).optional(),
})

// Union of all section types
const SectionSchema = z.discriminatedUnion('blockType', [HeroSectionSchema, FAQSectionSchema, SpecialOffersSectionSchema, RecommendedToursSectionSchema, RecommendedCitiesSectionSchema, RecommendedCarsSectionSchema])

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
export type RecommendedToursSection = z.infer<typeof RecommendedToursSectionSchema>
export type RecommendedCitiesSection = z.infer<typeof RecommendedCitiesSectionSchema>
export type RecommendedCarsSection = z.infer<typeof RecommendedCarsSectionSchema>
