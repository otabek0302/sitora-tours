'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useToursContext } from '@/lib/stores/tours'
import { DetailLoading, DetailError, BackButton, DetailContainer } from '@/components/ui'
import { TourGallery, TourInfo, TourPath, TourItinerary, TourServices, TourAccommodation, TourPricing, TourReviews, TourRelated } from '@/components/pages/tours/single-tour'

export default function SingleTourPage() {
  const t = useTranslations('pages.single_tour')
  const params = useParams()
  const locale = useLocale()
  const { currentTour, loading, error, fetchTourBySlug, setLocale } = useToursContext()

  useEffect(() => {
    setLocale(locale)
    if (params.slug) fetchTourBySlug(params.slug as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug, locale])

  if (loading) return <DetailLoading message={t('loading')} />
  if (error || !currentTour) return <DetailError title={t('error')} message={error || t('error_message')} backUrl='/tours' backText={t('back_to_tours')} />

  return (
    <DetailContainer>
      <BackButton href='/tours'>{t('back_to_tours')}</BackButton>
      <TourGallery tour={currentTour} />
      <TourInfo tour={currentTour} />
      <TourPath tour={currentTour} />
      <TourItinerary tour={currentTour} />
      <TourServices tour={currentTour} />
      <TourAccommodation tour={currentTour} />
      <TourPricing tour={currentTour} />
      <TourReviews tour={currentTour} />
      <TourRelated tour={currentTour} />
    </DetailContainer>
  )
}
