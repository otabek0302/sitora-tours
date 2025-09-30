'use client'

import Link from 'next/link'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useToursContext } from '@/lib/stores/tours'
import { TourGallery, TourInfo, TourPath, TourItinerary, TourServices, TourAccommodation, TourPricing, TourReviews, TourRelated } from '@/components/pages/tours/single-tour'

export default function SingleTourPage() {
  const t = useTranslations('pages.single_tour')
  const params = useParams()
  const locale = useLocale()
  const { currentTour, loading, error, fetchTourBySlug, setLocale } = useToursContext()

  useEffect(() => {
    setLocale(locale)
    if (params.slug) {
      fetchTourBySlug(params.slug as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug, locale])

  if (loading) {
    return (
      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-8 text-center sm:py-12'>
            <div className='border-sitora-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
            <p className='text-sitora-body text-sm sm:text-base'>{t('loading')}</p>
          </div>
        </div>
      </section>
    )
  }

  if (error || !currentTour) {
    return (
      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='py-8 text-center sm:py-12'>
            <h3 className='text-sitora-error mb-2 text-lg font-semibold sm:mb-3 sm:text-xl'>{t('error')}</h3>
            <p className='text-sitora-body mb-4 text-sm sm:text-base'>{error || t('error_message')}</p>
            <Button variant='default' size='sm' asChild>
              <Link href='/tours'>{t('back_to_tours')}</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-12 md:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Back Button */}
        <Button variant='ghost' size='sm' className='mb-6 shadow-none' asChild>
          <Link href='/tours'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            {t('back_to_tours')}
          </Link>
        </Button>

        {/* Tour Gallery */}
        <TourGallery tour={currentTour} />

        {/* Tour Info */}
        <TourInfo tour={currentTour} />

        {/* Tour Path */}
        <TourPath tour={currentTour} />

        {/* Tour Itinerary */}
        <TourItinerary tour={currentTour} />

        {/* Tour Services */}
        <TourServices tour={currentTour} />

        {/* Tour Accommodation */}
        <TourAccommodation tour={currentTour} />

        {/* Tour Pricing */}
        <TourPricing tour={currentTour} />

        {/* Tour Reviews */}
        <TourReviews tour={currentTour} />

        {/* Related Tours */}
        <TourRelated tour={currentTour} />
      </div>
    </section>
  )
}
