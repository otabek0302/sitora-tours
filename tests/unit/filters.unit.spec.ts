import { describe, it, expect } from 'vitest'
import { filtersToUrlParams, validateFilters, carsFiltersToUrlParams, validateCarsFilters } from '@/lib/utils/filters'

describe('Filters - Unit Tests', () => {
  describe('filtersToUrlParams (Tours)', () => {
    it('should build query params with all filters', () => {
      const filters = {
        category: 1,
        cities: [1, 2],
        minPrice: 100,
        maxPrice: 500,
        durationMin: 3,
        durationMax: 7,
      }
      const pagination = { page: 1, limit: 12, total: 0, hasNextPage: false, hasPrevPage: false }
      const params = filtersToUrlParams(filters, pagination)
      const query = decodeURIComponent(params.toString())
      
      expect(query).toContain('where[category][in]=1')
      expect(query).toContain('where[cities][in]=1,2')
      expect(query).toContain('where[price][greater_than_equal]=100')
      expect(query).toContain('where[price][less_than_equal]=500')
      expect(query).toContain('where[duration_days][greater_than_equal]=3')
      expect(query).toContain('where[duration_days][less_than_equal]=7')
    })

    it('should handle pagination', () => {
      const filters = {}
      const pagination = { page: 2, limit: 20, total: 100, hasNextPage: true, hasPrevPage: true }
      const params = filtersToUrlParams(filters, pagination)
      const query = params.toString()

      expect(query).toContain('page=2')
      expect(query).toContain('limit=20')
    })

    it('should skip default pagination values', () => {
      const filters = {}
      const pagination = { page: 1, limit: 12, total: 0, hasNextPage: false, hasPrevPage: false }
      const params = filtersToUrlParams(filters, pagination)
      const query = params.toString()

      expect(query).not.toContain('page=1')
      expect(query).not.toContain('limit=12')
    })
  })

  describe('validateFilters (Tours)', () => {
    it('should validate correct filters', () => {
      const filters = {
        category: 1,
        minPrice: 100,
        maxPrice: 500,
        durationMin: 3,
        durationMax: 7,
        cities: [1, 2],
      }
      expect(validateFilters(filters)).toBe(true)
    })

    it('should reject negative prices', () => {
      const filters = {
        minPrice: -10,
      }
      expect(validateFilters(filters)).toBe(false)
    })

    it('should reject when min > max price', () => {
      const filters = {
        minPrice: 500,
        maxPrice: 100,
      }
      expect(validateFilters(filters)).toBe(false)
    })

    it('should reject when min > max duration', () => {
      const filters = {
        durationMin: 10,
        durationMax: 5,
      }
      expect(validateFilters(filters)).toBe(false)
    })

    it('should reject non-array cities', () => {
      const filters = {
        cities: 'invalid' as any,
      }
      expect(validateFilters(filters)).toBe(false)
    })
  })

  describe('carsFiltersToUrlParams', () => {
    it('should build query params with all car filters', () => {
      const filters = {
        brand: 'Toyota',
        type: 'SUV',
        minPrice: 50,
        maxPrice: 150,
        minCapacity: 4,
        maxCapacity: 7,
      }
      const pagination = { page: 1, limit: 12, total: 0, hasNextPage: false, hasPrevPage: false }
      const params = carsFiltersToUrlParams(filters, pagination)
      const query = decodeURIComponent(params.toString())
      
      expect(query).toContain('where[brand][equals]=Toyota')
      expect(query).toContain('where[type][equals]=SUV')
      expect(query).toContain('where[price][greater_than_equal]=50')
      expect(query).toContain('where[price][less_than_equal]=150')
      expect(query).toContain('where[capacity][greater_than_equal]=4')
      expect(query).toContain('where[capacity][less_than_equal]=7')
    })

    it('should handle partial car filters', () => {
      const filters = {
        brand: 'Toyota',
      }
      const pagination = { page: 1, limit: 12, total: 0, hasNextPage: false, hasPrevPage: false }
      const params = carsFiltersToUrlParams(filters, pagination)
      const query = decodeURIComponent(params.toString())
      
      expect(query).toContain('where[brand][equals]=Toyota')
      expect(query).not.toContain('type')
      expect(query).not.toContain('capacity')
    })
  })

  describe('validateCarsFilters', () => {
    it('should validate correct car filters', () => {
      const filters = {
        brand: 'Toyota',
        type: 'SUV',
        minPrice: 50,
        maxPrice: 150,
        minCapacity: 4,
        maxCapacity: 7,
      }
      expect(validateCarsFilters(filters)).toBe(true)
    })

    it('should reject invalid price range', () => {
      const filters = {
        minPrice: 200,
        maxPrice: 100,
      }
      expect(validateCarsFilters(filters)).toBe(false)
    })

    it('should reject invalid capacity', () => {
      const filters = {
        minCapacity: 0,
      }
      expect(validateCarsFilters(filters)).toBe(false)
    })

    it('should reject capacity > 10', () => {
      const filters = {
        maxCapacity: 15,
      }
      expect(validateCarsFilters(filters)).toBe(false)
    })
  })
})
