import { create } from 'zustand'
import { Pages, HeroSection, FAQSection, SpecialOffersSection, RecommendedToursSection, RecommendedCitiesSection, RecommendedCarsSection } from '@/lib/schemas/pages'
import { fetchPages as fetchPagesAPI } from '@/lib/api/pages'

interface PagesState {
  // Data
  pages: Pages | null
  loading: boolean
  error: string | null

  // Locale
  locale: string

  // Actions
  setPages: (pages: Pages | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setLocale: (locale: string) => void
  fetchPages: () => Promise<void>

  // Section getters
  getHeroSection: () => HeroSection | undefined
  getFAQSection: () => FAQSection | undefined
  getSpecialOffersSection: () => SpecialOffersSection | undefined
  getRecommendedToursSection: () => RecommendedToursSection | undefined
  getRecommendedCitiesSection: () => RecommendedCitiesSection | undefined
  getRecommendedCarsSection: () => RecommendedCarsSection | undefined
}

export const usePagesStore = create<PagesState>((set, get) => ({
  // Initial state
  pages: null,
  loading: true, // Start with loading true to prevent flash of empty content
  error: null,
  locale: 'en',

  // Actions
  setPages: pages => set({ pages }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  setLocale: locale => set({ locale }),

  fetchPages: async () => {
    const { setPages, setLoading, setError, locale } = get()

    setLoading(true)
    setError(null)

    try {
      const data = await fetchPagesAPI(locale)
      setPages(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load pages'
      setError(errorMessage)
      console.error('Pages Store Error:', error)
    } finally {
      setLoading(false)
    }
  },

  // Section getters
  getHeroSection: () => {
    const { pages } = get()
    return pages?.sections?.find(section => section.blockType === 'hero') as HeroSection | undefined
  },

  getFAQSection: () => {
    const { pages } = get()
    return pages?.sections?.find(section => section.blockType === 'faq') as FAQSection | undefined
  },

  getSpecialOffersSection: () => {
    const { pages } = get()
    return pages?.sections?.find(section => section.blockType === 'special-offers') as SpecialOffersSection | undefined
  },

  getRecommendedToursSection: () => {
    const { pages } = get()
    return pages?.sections?.find(section => section.blockType === 'recommended-tours') as RecommendedToursSection | undefined
  },

  getRecommendedCitiesSection: () => {
    const { pages } = get()
    return pages?.sections?.find(section => section.blockType === 'recommended-cities') as RecommendedCitiesSection | undefined
  },

  getRecommendedCarsSection: () => {
    const { pages } = get()
    return pages?.sections?.find(section => section.blockType === 'recommended-cars') as RecommendedCarsSection | undefined
  },
}))

// Hook for easier usage
export const usePagesContext = () => usePagesStore()
