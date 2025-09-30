import { CitiesResponseSchema, CitySchema, CitiesResponse, City } from '@/lib/schemas'
import { apiRequest } from './index'

// Fetch cities
export async function fetchCities(locale?: string): Promise<CitiesResponse> {
  try {
    const localeParam = locale ? `?locale=${locale}` : ''
    const data = await apiRequest<CitiesResponse>(`/api/cities${localeParam}`)
    return CitiesResponseSchema.parse(data)
  } catch (error) {
    throw new Error('Failed to load cities. Please try again.')
  }
}

// Fetch single city by slug
export async function fetchCityBySlug(slug: string, locale?: string): Promise<City> {
  try {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiRequest<any>(`/api/cities?where[slug][equals]=${slug}${localeParam}`)
    if (!response.docs || response.docs.length === 0) {
      throw new Error('City not found')
    }
    return CitySchema.parse(response.docs[0])
  } catch (error) {
    throw new Error('Failed to load city details. Please try again.')
  }
}

// Fetch recommended cities (featured cities)
export async function fetchRecommendedCities(limit: number = 4, locale?: string): Promise<City[]> {
  try {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiRequest<any>(`/api/cities?limit=${limit}&sort=-createdAt${localeParam}`)
    if (!response.docs) {
      return []
    }
    return response.docs.map((city: any) => CitySchema.parse(city))
  } catch (error) {
    throw new Error('Failed to load recommended cities. Please try again.')
  }
}
