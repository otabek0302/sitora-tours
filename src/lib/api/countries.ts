import { CountriesResponseSchema, CountrySchema, CountriesResponse, Country, PayloadResponse } from '@/lib/schemas'
import { apiRequest } from './index'

export async function fetchCountries(locale?: string): Promise<CountriesResponse> {
  try {
    const localeParam = locale ? `?locale=${locale}` : ''
    const data = await apiRequest<CountriesResponse>(`/api/countries${localeParam}`)
    return CountriesResponseSchema.parse(data)
  } catch (error) {
    console.error('fetchCountries error:', error)
    throw new Error('Failed to load countries. Please try again.')
  }
}

export async function fetchCountryBySlug(slug: string, locale?: string): Promise<Country> {
  try {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiRequest<PayloadResponse<Country>>(`/api/countries?where[slug][equals]=${slug}${localeParam}`)
    if (!response.docs || response.docs.length === 0) {
      throw new Error('Country not found')
    }
    return CountrySchema.parse(response.docs[0])
  } catch (error) {
    console.error('fetchCountryBySlug error:', error)
    throw new Error('Failed to load country details. Please try again.')
  }
}

