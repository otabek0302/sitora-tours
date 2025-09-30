import { HotelsResponseSchema, HotelSchema, HotelsResponse, Hotel } from '@/lib/schemas'
import { apiRequest } from './index'

// Fetch hotels
export async function fetchHotels(locale?: string): Promise<HotelsResponse> {
  try {
    const localeParam = locale ? `?locale=${locale}` : ''
    const data = await apiRequest<HotelsResponse>(`/api/hotels${localeParam}`)
    return HotelsResponseSchema.parse(data)
  } catch (error) {
    throw new Error('Failed to load hotels. Please try again.')
  }
}

// Fetch single hotel by slug
export async function fetchHotelBySlug(slug: string, locale?: string): Promise<Hotel> {
  try {
    const localeParam = locale ? `&locale=${locale}` : ''
    const response = await apiRequest<any>(`/api/hotels?where[slug][equals]=${slug}${localeParam}`)
    if (!response.docs || response.docs.length === 0) {
      throw new Error('Hotel not found')
    }
    return HotelSchema.parse(response.docs[0])
  } catch (error) {
    throw new Error('Failed to load hotel details. Please try again.')
  }
}
