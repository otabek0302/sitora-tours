import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ru', 'uz'],
  defaultLocale: 'en',
})

export const config = {
  matcher: ['/((?!api|admin|_next|_static|favicon.ico|.*\\..*|_vercel).*)'],
}
