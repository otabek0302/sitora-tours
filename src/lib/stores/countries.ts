import { create } from 'zustand'

import { Country } from '@/lib/schemas'
import { fetchCountries as fetchCountriesAPI, fetchCountryBySlug as fetchCountryBySlugAPI } from '@/lib/api/countries'

interface CountriesState {
  countries: Country[]
  currentCountry: Country | null
  loading: boolean
  error: string | null
  locale: string
  setCountries: (countries: Country[]) => void
  setCurrentCountry: (country: Country | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setLocale: (locale: string) => void
  fetchCountries: () => Promise<void>
  fetchCountryBySlug: (slug: string) => Promise<void>
}

export const useCountriesStore = create<CountriesState>((set, get) => ({
  countries: [],
  currentCountry: null,
  loading: false,
  error: null,
  locale: 'en',

  setCountries: countries => set({ countries }),
  setCurrentCountry: currentCountry => set({ currentCountry }),
  setLoading: loading => set({ loading }),
  setError: error => set({ error }),
  setLocale: locale => set({ locale }),

  fetchCountries: async () => {
    const { loading, locale, setLoading, setError, setCountries } = get()
    if (loading) return

    try {
      setLoading(true)
      setError(null)
      const response = await fetchCountriesAPI(locale)
      setCountries(response.docs)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load countries!')
    } finally {
      setLoading(false)
    }
  },

  fetchCountryBySlug: async (slug: string) => {
    const { locale, setLoading, setError, setCurrentCountry } = get()
    try {
      setLoading(true)
      setError(null)
      const country = await fetchCountryBySlugAPI(slug, locale)
      setCurrentCountry(country)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load country!')
      setCurrentCountry(null)
    } finally {
      setLoading(false)
    }
  },
}))

export const useCountriesContext = () => useCountriesStore()

