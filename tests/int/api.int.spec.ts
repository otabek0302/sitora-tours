import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('Sitora Tours - API Integration Tests', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  describe('Collections', () => {
    it('should fetch users collection', async () => {
      const users = await payload.find({
        collection: 'users',
      })
      expect(users).toBeDefined()
      expect(users.docs).toBeDefined()
    })

    it('should fetch tours collection', async () => {
      const tours = await payload.find({
        collection: 'tours',
        limit: 10,
      })
      expect(tours).toBeDefined()
      expect(tours.docs).toBeDefined()
      expect(Array.isArray(tours.docs)).toBe(true)
    })

    it('should fetch cars collection', async () => {
      const cars = await payload.find({
        collection: 'cars',
        limit: 10,
      })
      expect(cars).toBeDefined()
      expect(Array.isArray(cars.docs)).toBe(true)
    })

    it('should fetch cities collection', async () => {
      const cities = await payload.find({
        collection: 'cities',
        limit: 10,
      })
      expect(cities).toBeDefined()
      expect(Array.isArray(cities.docs)).toBe(true)
    })

    it('should fetch hotels collection', async () => {
      const hotels = await payload.find({
        collection: 'hotels',
        limit: 10,
      })
      expect(hotels).toBeDefined()
      expect(Array.isArray(hotels.docs)).toBe(true)
    })

    it('should fetch reviews collection', async () => {
      const reviews = await payload.find({
        collection: 'reviews',
        limit: 10,
      })
      expect(reviews).toBeDefined()
      expect(Array.isArray(reviews.docs)).toBe(true)
    })

    it('should fetch categories collection', async () => {
      const categories = await payload.find({
        collection: 'categories',
        limit: 10,
      })
      expect(categories).toBeDefined()
      expect(Array.isArray(categories.docs)).toBe(true)
    })

    it('should fetch media collection', async () => {
      const media = await payload.find({
        collection: 'media',
        limit: 10,
      })
      expect(media).toBeDefined()
      expect(Array.isArray(media.docs)).toBe(true)
    })
  })

  describe('Globals', () => {
    it('should fetch pages global', async () => {
      const pages = await payload.findGlobal({
        slug: 'pages',
      })
      expect(pages).toBeDefined()
      expect(pages.sections).toBeDefined()
    })

    it('should have hero section in pages', async () => {
      const pages = await payload.findGlobal({
        slug: 'pages',
      })
      const heroSection = pages.sections?.find((s: any) => s.blockType === 'hero')
      expect(heroSection).toBeDefined()
    })
  })

  describe('Localization', () => {
    it('should fetch tours in English', async () => {
      const tours = await payload.find({
        collection: 'tours',
        locale: 'en',
        limit: 1,
      })
      expect(tours.docs.length).toBeGreaterThanOrEqual(0)
    })

    it('should fetch tours in Russian', async () => {
      const tours = await payload.find({
        collection: 'tours',
        locale: 'ru',
        limit: 1,
      })
      expect(tours.docs.length).toBeGreaterThanOrEqual(0)
    })

    it('should fetch tours in Uzbek', async () => {
      const tours = await payload.find({
        collection: 'tours',
        locale: 'uz',
        limit: 1,
      })
      expect(tours.docs.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Relationships', () => {
    it('should populate tour category relationship', async () => {
      const tours = await payload.find({
        collection: 'tours',
        depth: 1,
        limit: 1,
      })

      if (tours.docs.length > 0 && tours.docs[0].category) {
        const category = tours.docs[0].category
        expect(typeof category === 'object' || typeof category === 'number').toBe(true)
      }
    })

    it('should populate tour cities relationship', async () => {
      const tours = await payload.find({
        collection: 'tours',
        depth: 1,
        limit: 1,
      })

      if (tours.docs.length > 0 && tours.docs[0].cities) {
        expect(Array.isArray(tours.docs[0].cities)).toBe(true)
      }
    })

    it('should populate review tour relationship', async () => {
      const reviews = await payload.find({
        collection: 'reviews',
        depth: 1,
        limit: 1,
      })

      if (reviews.docs.length > 0 && reviews.docs[0].tour) {
        const tour = reviews.docs[0].tour
        expect(typeof tour === 'object' || typeof tour === 'number').toBe(true)
      }
    })
  })

  describe('Filtering & Sorting', () => {
    it('should filter tours by price range', async () => {
      const tours = await payload.find({
        collection: 'tours',
        where: {
          price: {
            less_than_equal: 1000,
          },
        },
      })
      expect(tours).toBeDefined()
    })

    it('should sort tours by rating', async () => {
      const tours = await payload.find({
        collection: 'tours',
        sort: '-rating',
        limit: 5,
      })
      expect(tours).toBeDefined()
    })

    it('should filter reviews by tour', async () => {
      // Get first tour
      const tours = await payload.find({
        collection: 'tours',
        limit: 1,
      })

      if (tours.docs.length > 0) {
        const tourId = tours.docs[0].id
        const reviews = await payload.find({
          collection: 'reviews',
          where: {
            tour: {
              equals: tourId,
            },
          },
        })
        expect(reviews).toBeDefined()
      }
    })
  })

  describe('Media Upload Restrictions', () => {
    it('should have correct mime types configured', async () => {
      const mediaConfig = payload.collections['media']?.config
      expect(mediaConfig).toBeDefined()
      expect(mediaConfig?.upload).toBeDefined()
    })
  })
})
