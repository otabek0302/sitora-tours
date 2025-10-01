import { create } from 'zustand'
import { CarFilters, Pagination, Car } from '@/lib/schemas'
import { fetchCars as fetchCarsAPI, fetchCarBySlug as fetchCarBySlugAPI, fetchRecommendedCars as fetchRecommendedCarsAPI, fetchCarsTypes as fetchCarsTypesAPI, fetchCarsBrands as fetchCarsBrandsAPI } from '@/lib/api/cars'

interface CarsState {
  // Data
  cars: Car[]
  currentCar: Car | null
  recommendedCars: Car[]
  types: string[]
  brands: string[]
  loading: boolean
  error: string | null

  // Locale
  locale: string

  // Filters
  filters: CarFilters

  // Pagination
  pagination: Pagination

  // Actions
  setCars: (cars: Car[]) => void
  setCurrentCar: (car: Car | null) => void
  setRecommendedCars: (cars: Car[]) => void
  setTypes: (types: string[]) => void
  setBrands: (brands: string[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setLocale: (locale: string) => void
  setFilters: (filters: Partial<CarFilters>) => void
  setPagination: (pagination: Partial<Pagination>) => void
  resetFilters: () => void
  fetchCars: () => Promise<void>
  fetchCarBySlug: (slug: string) => Promise<void>
  fetchRecommendedCars: (limit?: number) => Promise<void>
  fetchCarsTypes: () => Promise<void>
  fetchCarsBrands: () => Promise<void>
  activeFilter: () => boolean
}

export const useCarsStore = create<CarsState>((set, get) => ({
  // Initial state
  cars: [],
  currentCar: null,
  recommendedCars: [],
  types: [],
  brands: [],
  loading: false,
  error: null,
  locale: 'en',
  filters: {
    minPrice: 0,
    maxPrice: 1000,
    minCapacity: 1,
    maxCapacity: 10,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },

  // Actions
  setCars: cars => set({ cars }),
  setCurrentCar: currentCar => set({ currentCar }),
  setRecommendedCars: recommendedCars => set({ recommendedCars }),
  setTypes: types => set({ types }),
  setBrands: brands => set({ brands }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  setLocale: locale => set({ locale }),

  setFilters: newFilters => {
    const currentFilters = get().filters
    const updatedFilters = { ...currentFilters, ...newFilters }
    set({ filters: updatedFilters })
    get().fetchCars()
  },

  setPagination: newPagination => {
    const currentPagination = get().pagination
    const updatedPagination = { ...currentPagination, ...newPagination }
    set({ pagination: updatedPagination })
    get().fetchCars()
  },

  resetFilters: () => {
    set({
      filters: {
        minPrice: 0,
        maxPrice: 1000,
        minCapacity: 1,
        maxCapacity: 10,
      },
      pagination: { ...get().pagination, page: 1 },
    })
    get().fetchCars()
  },

  fetchCars: async () => {
    const { setLoading, setError, setCars, setPagination, filters, pagination, loading, locale } = get()

    // Prevent duplicate calls if already loading
    if (loading) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetchCarsAPI(filters, pagination, locale)

      setCars(response.docs)
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
      setError(error instanceof Error ? error.message : 'There was an error fetching the cars!')
    } finally {
      setLoading(false)
    }
  },

  fetchCarBySlug: async (slug: string) => {
    const { setLoading, setError, setCurrentCar, locale } = get()

    try {
      setLoading(true)
      setError(null)

      const car = await fetchCarBySlugAPI(slug, locale)
      setCurrentCar(car)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load car!')
      setCurrentCar(null)
    } finally {
      setLoading(false)
    }
  },

  fetchRecommendedCars: async (limit = 4) => {
    const { setLoading, setError, setRecommendedCars, locale } = get()

    try {
      setLoading(true)
      setError(null)

      const cars = await fetchRecommendedCarsAPI(limit, locale)
      setRecommendedCars(cars)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load recommended cars!')
    } finally {
      setLoading(false)
    }
  },

  fetchCarsTypes: async () => {
    const { setTypes, locale } = get()

    try {
      const types = await fetchCarsTypesAPI(locale)
      setTypes(types)
    } catch (error) {
      console.error('Failed to load cars types:', error)
    }
  },

  fetchCarsBrands: async () => {
    const { setBrands, locale } = get()

    try {
      const brands = await fetchCarsBrandsAPI(locale)
      setBrands(brands)
    } catch (error) {
      console.error('Failed to load cars brands:', error)
    }
  },

  activeFilter: () => {
    const { filters } = get()
    return Boolean(filters.type || filters.brand || filters.minPrice !== 0 || filters.maxPrice !== 1000 || filters.minCapacity !== 1 || filters.maxCapacity !== 10)
  },
}))

// Hook for easier usage
export const useCarsContext = () => useCarsStore()
