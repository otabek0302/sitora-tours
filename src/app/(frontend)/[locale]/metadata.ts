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
    authors: [{ name: 'Sitora Tours', url: 'https://sitoratours.uz' }],
    generator: 'Next.js',
    keywords: [
      'Sitora Tours',
      'Uzbekistan Tours',
      'Travel Uzbekistan',
      'Silk Road Tours',
      'Samarkand Tours',
      'Bukhara Tours',
      'Tashkent Tours',
      'Central Asia Travel',
      'Uzbekistan Hotels',
      'Car Rental Uzbekistan',
      'Tourism Uzbekistan',
      'Cultural Tours',
      'Adventure Travel',
      'Luxury Tours Uzbekistan',
    ],
    creator: 'Sitora Tours',
    publisher: 'Sitora Tours',
    metadataBase: new URL('https://sitoratours.uz'),
    verification: {
      google: 'j07f1HmJvncNCzLIv9aGfYmvv_AqSiImPnhkeRDpZus',
    },
    alternates: {
      canonical: 'https://sitoratours.uz',
      languages: {
        en: 'https://sitoratours.uz/en',
        ru: 'https://sitoratours.uz/ru',
        uz: 'https://sitoratours.uz/uz',
      },
    },

    openGraph: {
      title: 'Sitora Tours - Discover Uzbekistan with Premium Travel Experiences',
      description: 'Explore the beauty of Uzbekistan with Sitora Tours. Discover ancient cities, cultural heritage, luxury hotels, and unforgettable adventures.',
      type: 'website',
      url: 'https://sitoratours.uz/',
      siteName: 'Sitora Tours',
      locale: 'en-US',
      images: [
        {
          url: 'https://sitoratours.uz/og-image.jpg',
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
      images: ['https://sitoratours.uz/og-image.jpg'],
    },

    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },

    manifest: '/site.webmanifest',
  }
}
