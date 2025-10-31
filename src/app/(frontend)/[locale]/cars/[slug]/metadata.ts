import { Metadata } from 'next'
import { fetchCarBySlugServer } from '@/lib/api/server'
import { CarSchema, PayloadResponse, Car } from '@/lib/schemas'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params

  try {
    const response = await fetchCarBySlugServer(slug, locale) as PayloadResponse<Car>
    if (!response.docs || response.docs.length === 0) {
      throw new Error('Car not found')
    }
    const car = CarSchema.parse(response.docs[0])
    const carImage = car.image?.url || `https://sitoratour.com/media/og-car-${slug}.jpg`
    const carDescription = `Rent ${car.name} in Uzbekistan. Premium car rental with Sitora Tour. ${car.type || ''} - ${car.capacity || ''} passengers. Book now!`

    return {
      title: `Rent ${car.name} | Sitora Tour Uzbekistan`,
      description: carDescription,
      openGraph: {
        title: `Rent ${car.name}`,
        description: carDescription,
        url: `https://sitoratour.com/${locale}/cars/${slug}`,
        images: [carImage],
        type: 'website',
      },
      alternates: {
        canonical: `https://sitoratour.com/${locale}/cars/${slug}`,
      },
    }
  } catch (error) {
    // Fallback metadata if car not found
    return {
      title: `Car Rental | Sitora Tour Uzbekistan`,
      description: `Premium car rental in Uzbekistan. Book your perfect vehicle with Sitora Tour.`,
      alternates: {
        canonical: `https://sitoratour.com/${locale}/cars/${slug}`,
      },
    }
  }
}

