// Server-side API functions for metadata generation
// These use absolute URLs and work in server components

const getServerBaseUrl = () => {
  // For server-side requests inside Docker, use localhost
  // This avoids circular requests and works within the container
  if (process.env.NODE_ENV === 'production') {
    return 'http://localhost:3000'
  }
  // Local development
  return 'http://localhost:3000'
}

// Server-side fetch wrapper
async function serverApiRequest<T>(endpoint: string): Promise<T> {
  const baseUrl = getServerBaseUrl()
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // Don't cache for metadata generation
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}

// Server-side fetch tour by slug
export async function fetchTourBySlugServer(slug: string, locale?: string) {
  const localeParam = locale ? `&locale=${locale}` : ''
  const response = await serverApiRequest(`/api/tours?where[slug][equals]=${slug}&depth=2${localeParam}`)
  return response
}

// Server-side fetch city by slug
export async function fetchCityBySlugServer(slug: string, locale?: string) {
  const localeParam = locale ? `&locale=${locale}` : ''
  const response = await serverApiRequest(`/api/cities?where[slug][equals]=${slug}&depth=2${localeParam}`)
  return response
}

// Server-side fetch car by slug
export async function fetchCarBySlugServer(slug: string, locale?: string) {
  const localeParam = locale ? `&locale=${locale}` : ''
  const response = await serverApiRequest(`/api/cars?where[slug][equals]=${slug}&depth=2${localeParam}`)
  return response
}

// Server-side fetch hotel by slug
export async function fetchHotelBySlugServer(slug: string, locale?: string) {
  const localeParam = locale ? `&locale=${locale}` : ''
  const response = await serverApiRequest(`/api/hotels?where[slug][equals]=${slug}&depth=2${localeParam}`)
  return response
}
