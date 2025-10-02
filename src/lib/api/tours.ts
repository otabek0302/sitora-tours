import { ToursResponseSchema, TourSchema, ToursResponse, Tour, TourFilters, Pagination, PayloadResponse } from '../schemas'
import { filtersToUrlParams, validateFilters } from '@/lib/utils/filters'
import { apiRequest } from './index'

// Fetch tours with filters
export async function fetchTours(filters?: Partial<TourFilters>, pagination?: Pagination, locale?: string): Promise<ToursResponse> {
  // Validate filters before making API call
  if (filters && !validateFilters(filters)) {
    throw new Error('Invalid filters provided')
  }

  // Convert filters to URL parameters
  const params = filters && pagination ? filtersToUrlParams(filters, pagination) : null
  const localeParam = locale ? `locale=${locale}` : ''

  try {
    const separator = params ? '&' : '?'
    const url = `/api/tours${params ? `?${params}` : ''}${localeParam ? `${params ? separator : '?'}${localeParam}` : ''}`
    const data = await apiRequest<ToursResponse>(url)
    return ToursResponseSchema.parse(data)
  } catch (error) {
    console.error('fetchTours error:', error)
    throw new Error('Failed to load tours. Please try again.')
  }
}

// Fetch single tour by slug
export async function fetchTourBySlug(slug: string, locale?: string): Promise<Tour> {
  try {
    const localeParam = locale ? `&locale=${locale}` : ''
    // depth=3 to populate: tour → accommodation → hotels (with full details)
    const response = await apiRequest<PayloadResponse<Tour>>(`/api/tours?where[slug][equals]=${slug}&depth=3${localeParam}`)
    if (!response.docs || response.docs.length === 0) {
      throw new Error('Tour not found')
    }
    return TourSchema.parse(response.docs[0])
  } catch (error) {
    console.error('fetchTourBySlug error:', error)
    throw new Error('Failed to load tour details. Please try again.')
  }
}

// Fetch tours max price
export async function fetchToursMaxPrice(): Promise<number> {
  try {
    const data = await apiRequest<Tour[]>('/api/tours?sort=price')
    return data.reduce((max, tour) => Math.max(max, tour.price), 0)
  } catch (error) {
    console.error('fetchToursMaxPrice error:', error)
    throw new Error('Failed to load tours max price. Please try again.')
  }
}

// Fetch tours min price
export async function fetchToursMinPrice(): Promise<number> {
  try {
    const data = await apiRequest<Tour[]>('/api/tours?sort=price')
    return data.reduce((min, tour) => Math.min(min, tour.price), 0)
  } catch (error) {
    console.error('fetchToursMinPrice error:', error)
    throw new Error('Failed to load tours min price. Please try again.')
  }
}

// Fetch recommended tours (featured/top-rated tours)
export async function fetchRecommendedTours(limit: number = 6, locale?: string): Promise<Tour[]> {
  try {
    const localeParam = locale ? `&locale=${locale}` : ''
    // depth=2 to populate categories and cities
    const response = await apiRequest<PayloadResponse<Tour>>(`/api/tours?limit=${limit}&sort=-rating&depth=2${localeParam}`)
    if (!response.docs) {
      return []
    }
    return response.docs.map(tour => TourSchema.parse(tour))
  } catch (error) {
    console.error('fetchRecommendedTours error:', error)
    throw new Error('Failed to load recommended tours. Please try again.')
  }
}

// Fetch related tours (same category, excluding current tour)
export async function fetchRelatedTours(tourId: number, category?: number, limit: number = 6, locale?: string): Promise<Tour[]> {
  try {
    const categoryParam = category ? `&where[category][in]=${category}` : ''
    const localeParam = locale ? `&locale=${locale}` : ''
    // depth=2 to populate categories and cities
    const response = await apiRequest<PayloadResponse<Tour>>(`/api/tours?limit=${limit + 1}&sort=-createdAt&depth=2${categoryParam}${localeParam}`)

    if (!response.docs) {
      return []
    }

    // Filter out the current tour and limit results
    const relatedTours = response.docs
      .filter(tour => tour.id !== tourId)
      .slice(0, limit)
      .map(tour => TourSchema.parse(tour))

    return relatedTours
  } catch (error) {
    console.error('fetchRelatedTours error:', error)
    throw new Error('Failed to load related tours. Please try again.')
  }
}
