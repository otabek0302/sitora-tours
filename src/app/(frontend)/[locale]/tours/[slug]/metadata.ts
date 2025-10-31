import { Metadata } from 'next'
import { fetchTourBySlugServer } from '@/lib/api/server'
import { TourSchema, PayloadResponse, Tour } from '@/lib/schemas'

type Props = {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params

  try {
    const response = (await fetchTourBySlugServer(slug, locale)) as PayloadResponse<Tour>
    if (!response.docs || response.docs.length === 0) {
      throw new Error('Tour not found')
    }
    const tour = TourSchema.parse(response.docs[0])
    const tourImage = tour.images?.[0]?.image?.url || `https://sitoratour.com/media/og-tour-${slug}.jpg`
    const tourDescription = tour.description ? tour.description.substring(0, 160) : `Discover unforgettable tours in ${tour.name}. Book now with Sitora Tour and explore Uzbekistan's beauty.`

    return {
      title: `${tour.name} | Sitora Tour Uzbekistan`,
      description: tourDescription,
      openGraph: {
        title: tour.name,
        description: tourDescription,
        url: `https://sitoratour.com/${locale}/tours/${slug}`,
        images: [tourImage],
        type: 'website',
      },
      alternates: {
        canonical: `https://sitoratour.com/${locale}/tours/${slug}`,
      },
    }
  } catch (error) {
    // Fallback metadata if tour not found
    return {
      title: `Tour | Sitora Tour Uzbekistan`,
      description: `Discover unforgettable tours. Book now with Sitora Tour and explore Uzbekistan's beauty.`,
      alternates: {
        canonical: `https://sitoratour.com/${locale}/tours/${slug}`,
      },
    }
  }
}
