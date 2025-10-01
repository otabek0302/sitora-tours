import { describe, it, expect } from 'vitest'
import { cn, validateReview, cleanReview, getUniqueValues } from '@/lib/utils'
import { formatDateRange, calculateDays } from '@/lib/utils/telegram'

describe('Utils - Unit Tests', () => {
  describe('cn (className merger)', () => {
    it('should merge class names', () => {
      const result = cn('text-red-500', 'bg-blue-500')
      expect(result).toContain('text-red-500')
      expect(result).toContain('bg-blue-500')
    })

    it('should handle conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class')
      expect(result).toContain('base-class')
      expect(result).toContain('conditional-class')
    })

    it('should override conflicting classes', () => {
      const result = cn('p-4', 'p-8')
      expect(result).toBe('p-8')
    })
  })

  describe('validateReview', () => {
    it('should validate complete review', () => {
      const validReview = {
        first_name: 'John',
        last_name: 'Doe',
        rating: 5,
        comment: 'Great tour!',
        tour: 1,
      }
      expect(validateReview(validReview as any)).toBe(true)
    })

    it('should reject review with missing fields', () => {
      const invalidReview = {
        first_name: '',
        last_name: 'Doe',
        rating: 5,
        comment: 'Great!',
        tour: 1,
      }
      expect(validateReview(invalidReview as any)).toBe(false)
    })

    it('should reject review with whitespace-only name', () => {
      const invalidReview = {
        first_name: '   ',
        last_name: 'Doe',
        rating: 5,
        comment: 'Great!',
        tour: 1,
      }
      expect(validateReview(invalidReview as any)).toBe(false)
    })
  })

  describe('cleanReview', () => {
    it('should trim whitespace from review fields', () => {
      const dirtyReview = {
        first_name: '  John  ',
        last_name: '  Doe  ',
        rating: 5,
        comment: '  Great tour!  ',
        tour: 1,
      }
      const cleaned = cleanReview(dirtyReview as any)
      expect(cleaned.first_name).toBe('John')
      expect(cleaned.last_name).toBe('Doe')
      expect(cleaned.comment).toBe('Great tour!')
    })

    it('should handle missing fields gracefully', () => {
      const review = {
        first_name: undefined,
        last_name: undefined,
        rating: 0,
        comment: undefined,
      }
      const cleaned = cleanReview(review as any)
      expect(cleaned.first_name).toBe('')
      expect(cleaned.last_name).toBe('')
      expect(cleaned.comment).toBe('')
      expect(cleaned.rating).toBe(0)
    })
  })

  describe('getUniqueValues', () => {
    it('should return unique values from array', () => {
      const values = ['a', 'b', 'a', 'c', 'b']
      const unique = getUniqueValues(values)
      expect(unique).toEqual(['a', 'b', 'c'])
    })

    it('should filter out undefined values', () => {
      const values = ['a', undefined, 'b', undefined, 'c']
      const unique = getUniqueValues(values)
      expect(unique).toEqual(['a', 'b', 'c'])
    })

    it('should handle empty array', () => {
      const values: string[] = []
      const unique = getUniqueValues(values)
      expect(unique).toEqual([])
    })
  })

  describe('Telegram Utils', () => {
    describe('formatDateRange', () => {
      it('should format date range correctly', () => {
        const start = '2025-03-15'
        const end = '2025-03-20'
        const formatted = formatDateRange(start, end)
        expect(formatted).toContain('March 15, 2025')
        expect(formatted).toContain('March 20, 2025')
      })
    })

    describe('calculateDays', () => {
      it('should calculate days between dates', () => {
        const start = '2025-03-15'
        const end = '2025-03-20'
        const days = calculateDays(start, end)
        expect(days).toBe(5)
      })

      it('should handle same day', () => {
        const start = '2025-03-15'
        const end = '2025-03-15'
        const days = calculateDays(start, end)
        expect(days).toBe(0)
      })

      it('should calculate one day correctly', () => {
        const start = '2025-03-15'
        const end = '2025-03-16'
        const days = calculateDays(start, end)
        expect(days).toBe(1)
      })
    })
  })
})
