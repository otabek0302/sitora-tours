import { Metadata } from 'next'
import { fetchCityBySlugServer } from '@/lib/api/server'
import { CitySchema, PayloadResponse, City } from '@/lib/schemas'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params

  try {
    const response = await fetchCityBySlugServer(slug, locale) as PayloadResponse<City>
    if (!response.docs || response.docs.length === 0) {
      throw new Error('City not found')
    }
    const city = CitySchema.parse(response.docs[0])
    const cityImage = city.image?.url || `https://sitoratour.com/media/og-city-${slug}.jpg`
    const cityDescription = city.description 
      ? city.description.substring(0, 160) 
      : `Discover amazing tours and experiences in ${city.name}. Explore Uzbekistan's beauty with Sitora Tour.`

    return {
      title: `Tours in ${city.name} | Sitora Tour Uzbekistan`,
      description: cityDescription,
      openGraph: {
        title: `Tours in ${city.name}`,
        description: cityDescription,
        url: `https://sitoratour.com/${locale}/cities/${slug}`,
        images: [cityImage],
        type: 'website',
      },
      alternates: {
        canonical: `https://sitoratour.com/${locale}/cities/${slug}`,
      },
    }
  } catch (error) {
    // Fallback metadata if city not found
    return {
      title: `City | Sitora Tour Uzbekistan`,
      description: `Discover amazing tours and experiences. Explore Uzbekistan's beauty with Sitora Tour.`,
      alternates: {
        canonical: `https://sitoratour.com/${locale}/cities/${slug}`,
      },
    }
  }
}

