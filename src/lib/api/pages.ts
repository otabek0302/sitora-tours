import { apiRequest } from './index'
import { Pages, PagesSchema } from '@/lib/schemas/pages'

/**
 * Fetch Pages global data
 */
export async function fetchPages(locale?: string): Promise<Pages | null> {
  let data: unknown = null
  try {
    const localeParam = locale ? `locale=${locale}&` : ''
    data = await apiRequest<Pages>(`/api/globals/pages?${localeParam}depth=2`)

    if (!data) {
      return null
    }

    // Validate with Zod schema
    const validatedData = PagesSchema.parse(data)
    return validatedData
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      console.error('Pages Validation Error:', JSON.stringify(error, null, 2))
      console.error('Raw data:', JSON.stringify(data, null, 2))
    }
    console.error('Pages API Error:', error)
    throw new Error('Failed to load pages. Please try again.')
  }
}

export default fetchPages
