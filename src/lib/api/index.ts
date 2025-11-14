// Export all API functions
export * from './tours'
export * from './cars'
export * from './categories'
export * from './cities'
export * from './countries'
export * from './hotels'
export * from './pages'
export * from './reviews'

// Generic fetch wrapper with error handling
export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Use NEXT_PUBLIC_API_URL if available, otherwise detect from window (client-side) or use localhost (server-side)
  let baseUrl = process.env.NEXT_PUBLIC_API_URL

  // Client-side: if no env var, use current origin to maintain HTTPS
  if (typeof window !== 'undefined' && !baseUrl) {
    baseUrl = window.location.origin
  }

  // Server-side fallback
  if (!baseUrl) {
    baseUrl = process.env.NODE_ENV === 'production' ? 'https://sitoratour.com' : 'http://localhost:3000'
  }

  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}
