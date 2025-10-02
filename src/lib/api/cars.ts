import { CarsResponseSchema, CarSchema, CarFilters, Pagination, CarsResponse, Car, PayloadResponse } from '@/lib/schemas'
import { carsFiltersToUrlParams, validateCarsFilters } from '@/lib/utils/filters'
import { getUniqueValues } from '@/lib/utils'
import { apiRequest } from './index'

// Fetch cars with filters
export async function fetchCars(filters?: Partial<CarFilters>, pagination?: Pagination, locale?: string): Promise<CarsResponse> {
  // Validate filters before making API call
  if (filters && pagination && !validateCarsFilters(filters)) {
    throw new Error('Invalid filters provided')
  }

  // Convert filters to URL parameters
  const params = filters && pagination && carsFiltersToUrlParams(filters, pagination)
  const localeParam = locale ? `locale=${locale}` : ''

  try {
    const separator = params ? '&' : '?'
    const url = `/api/cars${params ? `?${params}` : ''}${localeParam ? `${params ? separator : '?'}${localeParam}` : ''}`
    const data = await apiRequest<CarsResponse>(url)
    return CarsResponseSchema.parse(data)
  } catch (error) {
    console.error('fetchCars error:', error)
    throw new Error('Failed to load cars. Please try again.')
  }
}

// Fetch single car by slug
export async function fetchCarBySlug(slug: string, locale?: string): Promise<Car> {
  try {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiRequest<PayloadResponse<Car>>(`/api/cars?where[slug][equals]=${slug}${localeParam}`)
    if (!response.docs || response.docs.length === 0) {
      throw new Error('Car not found')
    }
    return CarSchema.parse(response.docs[0])
  } catch (error) {
    console.error('fetchCarBySlug error:', error)
    throw new Error('Failed to load car details. Please try again.')
  }
}

// Fetch recommended cars (featured cars)
export async function fetchRecommendedCars(limit: number = 4, locale?: string): Promise<Car[]> {
  try {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiRequest<PayloadResponse<Car>>(`/api/cars?limit=${limit}&sort=-createdAt${localeParam}`)
    if (!response.docs) {
      return []
    }
    return response.docs.map(car => CarSchema.parse(car))
  } catch (error) {
    console.error('fetchRecommendedCars error:', error)
    throw new Error('Failed to load recommended cars. Please try again.')
  }
}

// Fetch cars max price
export async function fetchCarsMaxPrice(): Promise<number> {
  try {
    const data = await apiRequest<Car[]>('/api/cars?sort=price')
    return data.reduce((max, car) => Math.max(max, car.price), 0)
  } catch (error) {
    console.error('fetchCarsMaxPrice error:', error)
    throw new Error('Failed to load cars max price. Please try again.')
  }
}

// Fetch cars min price
export async function fetchCarsMinPrice(): Promise<number> {
  try {
    const data = await apiRequest<Car[]>('/api/cars?sort=price')
    return data.reduce((min, car) => Math.min(min, car.price), 0)
  } catch (error) {
    console.error('fetchCarsMinPrice error:', error)
    throw new Error('Failed to load cars min price. Please try again.')
  }
}

// Fetch cars's types
export async function fetchCarsTypes(locale?: string): Promise<string[]> {
  try {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiRequest<PayloadResponse<Car>>(`/api/cars?sort=type${localeParam}`)
    const data = response.docs || []
    const types = getUniqueValues(data.map((car: Car) => car.type) as string[])
    return types
  } catch (error) {
    console.error('fetchCarsTypes error:', error)
    throw new Error('Failed to load cars types. Please try again.')
  }
}

// Fetch cars's brands
export async function fetchCarsBrands(locale?: string): Promise<string[]> {
  try {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiRequest<PayloadResponse<Car>>(`/api/cars?sort=brand${localeParam}`)
    const data = response.docs || []
    const brands = getUniqueValues(data.map((car: Car) => car.brand) as string[])
    return brands
  } catch (error) {
    console.error('fetchCarsBrands error:', error)
    throw new Error('Failed to load cars brands. Please try again.')
  }
}
