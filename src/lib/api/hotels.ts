import { HotelsResponseSchema, HotelSchema, HotelsResponse, Hotel, PayloadResponse } from '@/lib/schemas'
import { apiRequest } from './index'

// Fetch hotels
export async function fetchHotels(locale?: string): Promise<HotelsResponse> {
  try {
    const localeParam = locale ? `?locale=${locale}` : ''
    const depthParam = localeParam ? '&depth=2' : '?depth=2'
    // depth=2 to populate city relationships
    const data = await apiRequest<HotelsResponse>(`/api/hotels${localeParam}${depthParam}`)
    return HotelsResponseSchema.parse(data)
  } catch (error) {
    console.error('fetchHotels error:', error)
    throw new Error('Failed to load hotels. Please try again.')
  }
}

// Fetch single hotel by slug
export async function fetchHotelBySlug(slug: string, locale?: string): Promise<Hotel> {
  try {
    const localeParam = locale ? `&locale=${locale}` : ''
    // depth=2 to populate city relationship with full details
    const response = await apiRequest<PayloadResponse<Hotel>>(`/api/hotels?where[slug][equals]=${slug}&depth=2${localeParam}`)
    if (!response.docs || response.docs.length === 0) {
      throw new Error('Hotel not found')
    }
    return HotelSchema.parse(response.docs[0])
  } catch (error) {
    console.error('fetchHotelBySlug error:', error)
    throw new Error('Failed to load hotel details. Please try again.')
  }
}
