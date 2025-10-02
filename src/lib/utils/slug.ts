/** Slug Generation Utilities */
export function generateSlug(name: string | Record<string, string> | undefined): string {
  if (!name) {
    return ''
  }

  let englishName = ''

  if (typeof name === 'object') {
    englishName = name.en || name.english || Object.values(name)[0] || ''
  } else {
    englishName = name
  }

  if (!englishName) {
    return ''
  }

  return englishName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/** Payload CMS beforeValidate hook for auto-generating slugs */
export const autoGenerateSlug = ({ data, operation }: { data?: Record<string, unknown>; operation: string }) => {
  if (operation === 'create' && data?.name) {
    const slug = generateSlug(data.name as string | Record<string, string>)
    if (slug) {
      data.slug = slug
    }
  }
}

/** Generate unique slug with timestamp suffix */
export function generateUniqueSlug(name: string | Record<string, string> | undefined): string {
  const baseSlug = generateSlug(name)
  if (!baseSlug) {
    return `item-${Date.now()}`
  }
  return `${baseSlug}-${Date.now()}`
}

/** Payload CMS beforeValidate hook for auto-generating unique slugs */
export const autoGenerateUniqueSlug = ({ data, operation }: { data?: Record<string, unknown>; operation: string }) => {
  if (operation === 'create' && data?.first_name) {
    const slug = generateUniqueSlug(data.first_name as string)
    data.slug = slug
  }
}
