import { create } from 'zustand'
import { Hotel } from '@/lib/schemas'
import { fetchHotels as fetchHotelsAPI, fetchHotelBySlug as fetchHotelBySlugAPI } from '@/lib/api/hotels'

interface HotelsState {
  // Data
  hotels: Hotel[]
  currentHotel: Hotel | null
  loading: boolean
  error: string | null

  // Locale
  locale: string

  // Actions
  setHotels: (hotels: Hotel[]) => void
  setCurrentHotel: (hotel: Hotel | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setLocale: (locale: string) => void

  fetchHotels: () => Promise<void>
  fetchHotelBySlug: (slug: string) => Promise<void>
}

export const useHotelsStore = create<HotelsState>((set, get) => ({
  // Initial state
  hotels: [],
  currentHotel: null,
  loading: true, // Start with loading to prevent flash of empty content
  error: null,
  locale: 'en',

  // Actions
  setHotels: hotels => set({ hotels }),
  setCurrentHotel: currentHotel => set({ currentHotel }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  setLocale: locale => set({ locale }),

  fetchHotels: async () => {
    const { setLoading, setError, setHotels, loading, locale } = get()

    // Prevent duplicate calls if already loading
    if (loading) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetchHotelsAPI(locale)

      setHotels(response.docs)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'There was an error fetching the hotels!')
    } finally {
      setLoading(false)
    }
  },

  fetchHotelBySlug: async (slug: string) => {
    const { setLoading, setError, setCurrentHotel, locale } = get()

    try {
      setLoading(true)
      setError(null)

      const hotel = await fetchHotelBySlugAPI(slug, locale)
      setCurrentHotel(hotel)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load hotel!')
      setCurrentHotel(null)
    } finally {
      setLoading(false)
    }
  },
}))

// Hook for easier usage
export const useHotelsContext = () => useHotelsStore()
