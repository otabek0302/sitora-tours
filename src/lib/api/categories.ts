import { CategoriesResponseSchema, CategorySchema, CategoriesResponse, Category, PayloadResponse } from '@/lib/schemas'
import { apiRequest } from './index'

// Fetch categories with filters
export async function fetchCategories(locale?: string): Promise<CategoriesResponse> {
  try {
    const localeParam = locale ? `?locale=${locale}` : ''
    const data = await apiRequest<CategoriesResponse>(`/api/categories${localeParam}`)
    return CategoriesResponseSchema.parse(data)
  } catch (error) {
    console.error('fetchCategories error:', error)
    throw new Error('Failed to load categories. Please try again.')
  }
}

// Fetch single category by slug
export async function fetchCategoryBySlug(slug: string): Promise<Category> {
  try {
    const response = await apiRequest<PayloadResponse<Category>>(`/api/categories?where[slug][equals]=${slug}`)
    if (!response.docs || response.docs.length === 0) {
      throw new Error('Category not found')
    }
    return CategorySchema.parse(response.docs[0])
  } catch (error) {
    console.error('fetchCategoryBySlug error:', error)
    throw new Error('Failed to load category details. Please try again.')
  }
}
