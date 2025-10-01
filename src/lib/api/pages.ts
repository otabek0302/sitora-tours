import { apiRequest } from './index'
import { Pages, PagesSchema } from '@/lib/schemas/pages'

/**
 * Fetch Pages global data
 */
export async function fetchPages(locale?: string): Promise<Pages> {
  try {
    const localeParam = locale ? `locale=${locale}&` : ''
    const data = await apiRequest<Pages>(`/api/globals/pages?${localeParam}depth=2`)

    // Validate with Zod schema
    const validatedData = PagesSchema.parse(data)
    return validatedData
  } catch (error) {
    console.error('Pages API Error:', error)
    throw new Error('Failed to load pages. Please try again.')
  }
}

export default fetchPages
