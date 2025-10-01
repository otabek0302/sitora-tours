'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useCarsContext } from '@/lib/stores/cars'
import { DetailLoading, DetailError, DetailContainer } from '@/components/ui'
import { CarGallery, CarInfo, CarSpecs, CarRental } from '@/components/pages/cars/single-car'

const SingleCarPage = () => {
  const params = useParams()
  const locale = useLocale()
  const t = useTranslations('pages.cars.single')
  const { currentCar, loading, error, fetchCarBySlug, setLocale } = useCarsContext()

  useEffect(() => {
    setLocale(locale)
    if (params.slug) fetchCarBySlug(params.slug as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug, locale])

  if (loading) return <DetailLoading message={t('loading')} />
  if (error || !currentCar) return <DetailError title={t('error')} message={t('error_message')} backUrl='/cars' backText={t('back_to_cars')} />

  return (
    <DetailContainer className='space-y-6'>
      <CarGallery images={currentCar.images} name={currentCar.name} />
      <CarInfo car={currentCar} />
      <div className='grid gap-4 lg:grid-cols-2'>
        <CarSpecs car={currentCar} />
        <CarRental car={currentCar} />
      </div>
    </DetailContainer>
  )
}

export default SingleCarPage
