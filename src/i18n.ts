import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  const validLocale = locale || 'en'

  return {
    locale: validLocale,
    messages: (await import(`./locales/${validLocale}.json`)).default,
    timeZone: 'UTC',
  }
})
