import { create } from 'zustand'
import { City } from '@/lib/schemas'
import { fetchCities as fetchCitiesAPI, fetchCityBySlug as fetchCityBySlugAPI, fetchRecommendedCities as fetchRecommendedCitiesAPI } from '@/lib/api/cities'

interface CitiesState {
  // Data
  cities: City[]
  currentCity: City | null
  recommendedCities: City[]
  loading: boolean
  error: string | null

  // Locale
  locale: string

  // Actions
  setCities: (cities: City[]) => void
  setCurrentCity: (city: City | null) => void
  setRecommendedCities: (cities: City[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setLocale: (locale: string) => void

  fetchCities: () => Promise<void>
  fetchCityBySlug: (slug: string) => Promise<void>
  fetchRecommendedCities: (limit?: number) => Promise<void>
}

export const useCitiesStore = create<CitiesState>((set, get) => ({
  // Initial state
  cities: [],
  currentCity: null,
  recommendedCities: [],
  loading: false,
  error: null,
  locale: 'en',

  // Actions
  setCities: cities => set({ cities }),
  setCurrentCity: currentCity => set({ currentCity }),
  setRecommendedCities: recommendedCities => set({ recommendedCities }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  setLocale: locale => set({ locale }),

  fetchCities: async () => {
    const { setLoading, setError, setCities, loading, locale } = get()

    // Prevent duplicate calls if already loading
    if (loading) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetchCitiesAPI(locale)

      setCities(response.docs)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'There was an error fetching the cities!')
    } finally {
      setLoading(false)
    }
  },

  fetchCityBySlug: async (slug: string) => {
    const { setLoading, setError, setCurrentCity, locale } = get()

    try {
      setLoading(true)
      setError(null)

      const city = await fetchCityBySlugAPI(slug, locale)
      setCurrentCity(city)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load city!')
      setCurrentCity(null)
    } finally {
      setLoading(false)
    }
  },

  fetchRecommendedCities: async (limit = 4) => {
    const { setLoading, setError, setRecommendedCities, locale } = get()

    try {
      setLoading(true)
      setError(null)

      const cities = await fetchRecommendedCitiesAPI(limit, locale)
      setRecommendedCities(cities)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load recommended cities!')
    } finally {
      setLoading(false)
    }
  },
}))

// Hook for easier usage
export const useCitiesContext = () => useCitiesStore()
