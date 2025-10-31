import { Metadata } from 'next'
import { fetchHotelBySlugServer } from '@/lib/api/server'
import { HotelSchema, PayloadResponse, Hotel } from '@/lib/schemas'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params

  try {
    const response = await fetchHotelBySlugServer(slug, locale) as PayloadResponse<Hotel>
    if (!response.docs || response.docs.length === 0) {
      throw new Error('Hotel not found')
    }
    const hotel = HotelSchema.parse(response.docs[0])
    const hotelImage = hotel.images?.[0]?.image?.url || `https://sitoratour.com/media/og-hotel-${slug}.jpg`
    const hotelDescription = hotel.description 
      ? hotel.description.substring(0, 160) 
      : `Book ${hotel.name} in ${hotel.location?.name || 'Uzbekistan'}. Premium accommodation with Sitora Tour.`

    return {
      title: `${hotel.name} | Sitora Tour Uzbekistan`,
      description: hotelDescription,
      openGraph: {
        title: hotel.name,
        description: hotelDescription,
        url: `https://sitoratour.com/${locale}/hotels/${slug}`,
        images: [hotelImage],
        type: 'website',
      },
      alternates: {
        canonical: `https://sitoratour.com/${locale}/hotels/${slug}`,
      },
    }
  } catch (error) {
    // Fallback metadata if hotel not found
    return {
      title: `Hotel | Sitora Tour Uzbekistan`,
      description: `Premium hotels in Uzbekistan. Book your perfect accommodation with Sitora Tour.`,
      alternates: {
        canonical: `https://sitoratour.com/${locale}/hotels/${slug}`,
      },
    }
  }
}

