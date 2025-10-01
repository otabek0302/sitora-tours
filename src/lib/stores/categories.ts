import { create } from 'zustand'
import { Category } from '@/lib/schemas'
import { fetchCategories as fetchCategoriesAPI } from '@/lib/api/categories'

interface CategoriesState {
  // Data
  categories: Category[]
  loading: boolean
  error: string | null

  // Locale
  locale: string

  // Actions
  setCategories: (categories: Category[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setLocale: (locale: string) => void

  fetchCategories: () => Promise<void>
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  // Initial state
  categories: [],
  loading: true, // Start with loading to prevent flash of empty content
  error: null,
  locale: 'en',

  // Actions
  setCategories: categories => set({ categories }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  setLocale: locale => set({ locale }),

  fetchCategories: async () => {
    const { setLoading, setError, setCategories, loading, locale } = get()

    // Prevent duplicate calls if already loading
    if (loading) {
      return
    }

    try {
      setLoading(true)
      setError(null)

      const response = await fetchCategoriesAPI(locale)

      setCategories(response.docs)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'There was an error fetching the categories!')
    } finally {
      setLoading(false)
    }
  },
}))

// Hook for easier usage
export const useCategoriesContext = () => useCategoriesStore()
