import { create } from 'zustand'
import { Tour, TourFilters, Pagination } from '@/lib/schemas'
import { fetchTours as fetchToursAPI, fetchTourBySlug as fetchTourBySlugAPI, fetchRecommendedTours as fetchRecommendedToursAPI, fetchRelatedTours as fetchRelatedToursAPI } from '../api'

// Types
interface ToursState {
  // Data
  tours: Tour[]
  currentTour: Tour | null
  recommendedTours: Tour[]
  relatedTours: Tour[]
  loading: boolean
  error: string | null
  relatedToursLoading: boolean
  relatedToursError: string | null

  // Filters
  filters: TourFilters

  // Pagination
  pagination: Pagination

  // Locale
  locale: string

  // Actions
  setTours: (tours: Tour[]) => void
  setCurrentTour: (tour: Tour | null) => void
  setRecommendedTours: (tours: Tour[]) => void
  setRelatedTours: (tours: Tour[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setRelatedToursLoading: (loading: boolean) => void
  setRelatedToursError: (error: string | null) => void
  setLocale: (locale: string) => void
  setFilters: (filters: Partial<TourFilters>) => void
  setPagination: (pagination: Partial<Pagination>) => void
  resetFilters: () => void
  fetchTours: () => Promise<void>
  fetchTourBySlug: (slug: string) => Promise<void>
  fetchRecommendedTours: (limit?: number) => Promise<void>
  fetchRelatedTours: (tourId: number, category?: number, limit?: number, locale?: string) => Promise<void>
  activeFilter: () => boolean
}

export const useToursStore = create<ToursState>((set, get) => ({
  // Initial state
  tours: [],
  currentTour: null,
  recommendedTours: [],
  relatedTours: [],
  loading: true, // Start with loading to prevent flash of empty content
  error: null,
  relatedToursLoading: false,
  relatedToursError: null,
  locale: 'en',
  filters: {
    category: null,
    cities: [],
    minPrice: 0,
    maxPrice: 10000,
    durationMin: 0,
    durationMax: 30,
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },

  // Actions
  setTours: tours => set({ tours }),
  setCurrentTour: currentTour => set({ currentTour }),
  setRecommendedTours: recommendedTours => set({ recommendedTours }),
  setRelatedTours: relatedTours => set({ relatedTours }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  setRelatedToursLoading: relatedToursLoading => set({ relatedToursLoading }),
  setRelatedToursError: relatedToursError => set({ relatedToursError }),
  setLocale: locale => set({ locale }),

  setFilters: newFilters => {
    const currentFilters = get().filters
    const updatedFilters = { ...currentFilters, ...newFilters }
    set({ filters: updatedFilters })
    get().fetchTours()
  },

  setPagination: newPagination => {
    set({ pagination: { ...get().pagination, ...newPagination } })
    get().fetchTours()
  },

  resetFilters: () => {
    set({
      filters: {
        category: null,
        cities: [],
        minPrice: 0,
        maxPrice: 10000,
        durationMin: 0,
        durationMax: 30,
      },
      pagination: { ...get().pagination, page: 1 },
    })
    get().fetchTours()
  },

  fetchTours: async () => {
    const { setLoading, setError, setTours, setPagination, filters, pagination, loading, locale } = get()

    // Prevent duplicate calls if already loading
    if (loading) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetchToursAPI(filters, pagination, locale)

      setTours(response.docs)
      set({
        pagination: {
          ...get().pagination,
          page: response.page,
          limit: response.limit,
          total: response.totalDocs,
          hasNextPage: response.hasNextPage,
          hasPrevPage: response.hasPrevPage,
        },
      })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'There was an error fetching the tours!')
    } finally {
      setLoading(false)
    }
  },

  activeFilter: () => {
    const { filters } = get()
    return Boolean(filters.category || (filters.cities && filters.cities.length > 0) || filters.minPrice !== 0 || filters.maxPrice !== 10000 || filters.durationMin !== 0 || filters.durationMax !== 30)
  },

  fetchTourBySlug: async (slug: string) => {
    const { setLoading, setError, setCurrentTour, locale } = get()

    try {
      setLoading(true)
      setError(null)

      const tour = await fetchTourBySlugAPI(slug, locale)
      setCurrentTour(tour)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load tour!')
      setCurrentTour(null)
    } finally {
      setLoading(false)
    }
  },

  fetchRecommendedTours: async (limit = 6) => {
    const { setLoading, setError, setRecommendedTours, locale } = get()

    try {
      setLoading(true)
      setError(null)

      const tours = await fetchRecommendedToursAPI(limit, locale)
      setRecommendedTours(tours)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load recommended tours!')
    } finally {
      setLoading(false)
    }
  },

  fetchRelatedTours: async (tourId, category, limit = 6, locale) => {
    const { setRelatedTours, setRelatedToursLoading, setRelatedToursError, relatedToursLoading } = get()

    // Prevent duplicate calls
    if (relatedToursLoading) {
      return
    }

    try {
      setRelatedToursLoading(true)
      setRelatedToursError(null)

      const tours = await fetchRelatedToursAPI(tourId, category, limit, locale)
      setRelatedTours(tours)
    } catch (error) {
      setRelatedToursError(error instanceof Error ? error.message : 'Failed to load related tours!')
    } finally {
      setRelatedToursLoading(false)
    }
  },
}))

// Hook for easier usage
export const useToursContext = () => useToursStore()
