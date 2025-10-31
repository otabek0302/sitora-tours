import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: 'Sitora Tours - Discover Uzbekistan with Premium Travel Experiences',
      template: '%s | Sitora Tours',
    },
    description: 'Explore the beauty of Uzbekistan with Sitora Tours. Discover ancient cities, cultural heritage, luxury hotels, and unforgettable adventures across Central Asia.',
    robots: 'index, follow',
    applicationName: 'Sitora Tours',
    authors: [{ name: 'Sitora Tours', url: 'https://sitoratour.com' }],
    generator: 'Next.js',
    keywords: ['Sitora Tours', 'Uzbekistan Tours', 'Travel Uzbekistan', 'Silk Road Tours', 'Samarkand Tours', 'Bukhara Tours', 'Tashkent Tours', 'Central Asia Travel', 'Uzbekistan Hotels', 'Car Rental Uzbekistan', 'Tourism Uzbekistan', 'Cultural Tours', 'Adventure Travel', 'Luxury Tours Uzbekistan'],
    creator: 'Sitora Tours',
    publisher: 'Sitora Tours',
    metadataBase: new URL('https://sitoratour.com'),
    verification: {
      google: 'x42UmBlyopuNe0jXYQJAHc-Vy-h09Q9pMg0d7oJdVVM',
    },
    alternates: {
      canonical: 'https://sitoratour.com',
      languages: {
        en: 'https://sitoratour.com/en',
        ru: 'https://sitoratour.com/ru',
        uz: 'https://sitoratour.com/uz',
      },
    },

    openGraph: {
      title: 'Sitora Tours - Discover Uzbekistan with Premium Travel Experiences',
      description: 'Explore the beauty of Uzbekistan with Sitora Tours. Discover ancient cities, cultural heritage, luxury hotels, and unforgettable adventures.',
      type: 'website',
      url: 'https://sitoratour.com/',
      siteName: 'Sitora Tours',
      locale: 'en-US',
      images: [
        {
          url: 'https://sitoratour.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Sitora Tours - Discover Amazing Uzbekistan',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: 'Sitora Tours - Discover Uzbekistan with Premium Travel Experiences',
      description: 'Explore the beauty of Uzbekistan with Sitora Tours. Ancient cities, cultural heritage, and unforgettable adventures.',
      images: ['https://sitoratour.com/og-image.jpg'],
    },

    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },

    manifest: '/site.webmanifest',
  }
}
