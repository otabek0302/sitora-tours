import { create } from 'zustand'
import { Review, CreateReview } from '@/lib/schemas/reviews'
import { fetchReviews, createReview } from '@/lib/api/reviews'

interface ReviewsState {
  reviews: Review[]
  loading: boolean
  error: string | null
  locale: string

  // Actions
  setLocale: (locale: string) => void
  fetchReviews: (tourId?: number) => Promise<void>
  addReview: (review: CreateReview) => Promise<boolean>
}

export const useReviewsContext = create<ReviewsState>((set, get) => ({
  reviews: [],
  loading: true, // Start with loading to prevent flash of empty content
  error: null,
  locale: 'en',

  setLocale: (locale: string) => set({ locale }),

  fetchReviews: async (tourId?: number) => {
    set({ loading: true, error: null })
    try {
      const data = await fetchReviews(get().locale, tourId)
      set({ reviews: data, loading: false })
    } catch (error) {
      console.error('Reviews Store Error:', error)
      set({ error: 'Failed to load reviews', loading: false })
    }
  },

  addReview: async (review: CreateReview) => {
    try {
      const newReview = await createReview(review, get().locale)
      // Refetch all reviews to ensure proper data population
      await get().fetchReviews()
      return true
    } catch (error) {
      console.error('Add Review Error:', error)
      return false
    }
  },
}))

export default useReviewsContext
