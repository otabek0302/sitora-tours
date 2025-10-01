import { describe, it, expect } from 'vitest'
import { TourSchema, CarSchema, CitySchema, HotelSchema } from '@/lib/schemas'
import { ReviewSchema, CreateReviewSchema } from '@/lib/schemas/reviews'

describe('Schemas - Unit Tests', () => {
  describe('TourSchema', () => {
    it('should validate valid tour data', () => {
      const validTour = {
        id: 1,
        name: 'Silk Road Tour',
        slug: 'silk-road-tour',
        description: 'Amazing tour',
        price: 500,
        duration_days: 7,
        duration_nights: 6,
        rating: 4.5,
        category: 1,
        cities: [1, 2],
        images: [],
      }

      const result = TourSchema.safeParse(validTour)
      expect(result.success).toBe(true)
    })

    it('should allow tour with populated relationships', () => {
      const tour = {
        id: 1,
        name: 'Silk Road Tour',
        slug: 'silk-road-tour',
        description: 'Amazing tour',
        price: 500,
        duration_days: 7,
        duration_nights: 6,
        rating: 4.5,
        category: {
          id: 1,
          name: 'Adventure',
          slug: 'adventure',
        },
        cities: [
          { id: 1, name: 'Samarkand', slug: 'samarkand' },
          { id: 2, name: 'Bukhara', slug: 'bukhara' },
        ],
        images: [],
      }

      const result = TourSchema.safeParse(tour)
      expect(result.success).toBe(true)
    })
  })

  describe('CarSchema', () => {
    it('should validate valid car data', () => {
      const validCar = {
        id: 1,
        name: 'Toyota Land Cruiser',
        slug: 'toyota-land-cruiser',
        brand: 'Toyota',
        model: 'Land Cruiser',
        type: 'SUV',
        capacity: 7,
        price: 100,
        image: { id: 1, url: 'https://example.com/image.jpg' },
      }

      const result = CarSchema.safeParse(validCar)
      expect(result.success).toBe(true)
    })
  })

  describe('CitySchema', () => {
    it('should validate valid city data', () => {
      const validCity = {
        id: 1,
        name: 'Samarkand',
        slug: 'samarkand',
        description: 'Historic city',
        image: { id: 1, url: 'https://example.com/image.jpg' },
      }

      const result = CitySchema.safeParse(validCity)
      expect(result.success).toBe(true)
    })
  })

  describe('HotelSchema', () => {
    it('should validate valid hotel data', () => {
      const validHotel = {
        id: 1,
        name: 'Silk Road Hotel',
        slug: 'silk-road-hotel',
        description: 'Luxury hotel',
        rating: '5',
        address: '123 Main St',
        phone: '+998901234567',
        city: 1,
      }

      const result = HotelSchema.safeParse(validHotel)
      expect(result.success).toBe(true)
    })
  })

  describe('ReviewSchema', () => {
    it('should validate valid review with tour ID', () => {
      const validReview = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        comment: 'Great tour!',
        rating: 5,
        tour: 1,
      }

      const result = ReviewSchema.safeParse(validReview)
      expect(result.success).toBe(true)
    })

    it('should validate review with populated tour', () => {
      const validReview = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        comment: 'Great tour!',
        rating: 5,
        tour: {
          id: 1,
          name: 'Silk Road Tour',
          slug: 'silk-road-tour',
        },
      }

      const result = ReviewSchema.safeParse(validReview)
      expect(result.success).toBe(true)
    })

    it('should accept rating between 1 and 5', () => {
      const review = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        comment: 'Great!',
        rating: 3,
        tour: 1,
      }

      const result = ReviewSchema.safeParse(review)
      expect(result.success).toBe(true)
    })
  })

  describe('CreateReviewSchema', () => {
    it('should validate valid review creation data', () => {
      const validReviewData = {
        first_name: 'John',
        last_name: 'Doe',
        comment: 'Amazing experience!',
        rating: 5,
        tour: 1,
      }

      const result = CreateReviewSchema.safeParse(validReviewData)
      expect(result.success).toBe(true)
    })

    it('should reject rating outside 1-5 range', () => {
      const invalidReview = {
        first_name: 'John',
        last_name: 'Doe',
        comment: 'Great!',
        rating: 6,
        tour: 1,
      }

      const result = CreateReviewSchema.safeParse(invalidReview)
      expect(result.success).toBe(false)
    })

    it('should reject rating less than 1', () => {
      const invalidReview = {
        first_name: 'John',
        last_name: 'Doe',
        comment: 'Great!',
        rating: 0,
        tour: 1,
      }

      const result = CreateReviewSchema.safeParse(invalidReview)
      expect(result.success).toBe(false)
    })

    it('should reject empty first name', () => {
      const invalidReview = {
        first_name: '',
        last_name: 'Doe',
        comment: 'Great!',
        rating: 5,
        tour: 1,
      }

      const result = CreateReviewSchema.safeParse(invalidReview)
      expect(result.success).toBe(false)
    })

    it('should reject comment shorter than 3 characters', () => {
      const invalidReview = {
        first_name: 'John',
        last_name: 'Doe',
        comment: 'Ok',
        rating: 5,
        tour: 1,
      }

      const result = CreateReviewSchema.safeParse(invalidReview)
      expect(result.success).toBe(false)
    })

    it('should reject comment longer than 1000 characters', () => {
      const invalidReview = {
        first_name: 'John',
        last_name: 'Doe',
        comment: 'a'.repeat(1001),
        rating: 5,
        tour: 1,
      }

      const result = CreateReviewSchema.safeParse(invalidReview)
      expect(result.success).toBe(false)
    })
  })
})
