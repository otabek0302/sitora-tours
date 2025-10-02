import Script from 'next/script'

/**
 * Structured Data (JSON-LD) for SEO
 * Helps search engines understand your business information
 * Shows in Google Knowledge Panel and local search results
 */
export const OrganizationStructuredData = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Sitora Tours',
    alternateName: 'Sitora Travel',
    url: 'https://sitoratours.uz',
    logo: 'https://sitoratours.uz/logo.png',
    description: 'Premium travel agency in Uzbekistan offering tours, hotel bookings, and car rentals across Central Asia.',

    // Contact Information
    email: 'info@sitoratours.com',
    telephone: ['+998915589901', '+998932269996', '+998939944468'],

    // Address
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mir Said Baraka Street, 1',
      addressLocality: 'Samarkand',
      addressCountry: 'UZ',
      postalCode: '140100',
    },

    // Location Coordinates
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.658391,
      longitude: 66.944888,
    },

    // Business Hours
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],

    // Social Media
    sameAs: ['https://www.instagram.com/sitora_tour/', 'https://www.facebook.com/uzbekvoyage'],

    // Service Areas
    areaServed: [
      {
        '@type': 'Country',
        name: 'Uzbekistan',
      },
      {
        '@type': 'Country',
        name: 'Kazakhstan',
      },
      {
        '@type': 'Country',
        name: 'Kyrgyzstan',
      },
      {
        '@type': 'Country',
        name: 'Tajikistan',
      },
      {
        '@type': 'Country',
        name: 'Turkmenistan',
      },
    ],

    // Services Offered
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Travel Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: 'Uzbekistan Tours',
            description: 'Guided tours across Uzbekistan including Samarkand, Bukhara, and Khiva',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hotel Booking',
            description: 'Luxury and budget hotel reservations across Uzbekistan',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Car Rental',
            description: 'Premium car rental services with driver options',
          },
        },
      ],
    },

    // Price Range
    priceRange: '$$',

    // Languages
    availableLanguage: ['English', 'Russian', 'Uzbek'],
  }

  return (
    <Script
      id='organization-structured-data'
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

/**
 * Local Business Structured Data
 * For better local search visibility
 */
export const LocalBusinessStructuredData = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://sitoratours.uz/#organization',
    name: 'Sitora Tours',
    image: 'https://sitoratours.uz/logo.png',

    telephone: '+998915589901',
    email: 'info@sitoratours.com',

    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Mir Said Baraka Street, 1',
      addressLocality: 'Tashkent',
      addressCountry: 'UZ',
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.658391,
      longitude: 66.944888,
    },

    url: 'https://sitoratours.uz',

    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },

    priceRange: '$$',
  }

  return (
    <Script
      id='local-business-structured-data'
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
