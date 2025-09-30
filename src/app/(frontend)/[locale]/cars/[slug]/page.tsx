'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useCarsContext } from '@/lib/stores/cars'
import { CarGallery, CarInfo, CarSpecs, CarRental } from '@/components/pages/cars/single-car'

const SingleCarPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const locale = useLocale()
  const t = useTranslations('pages.cars.single')
  const { currentCar, loading, error, fetchCarBySlug, setLocale } = useCarsContext()

  useEffect(() => {
    setLocale(locale)
    if (slug) {
      fetchCarBySlug(slug)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, locale])

  if (loading) {
    return (
      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex min-h-[400px] items-center justify-center'>
            <div className='text-center'>
              <div className='border-sitora-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2'></div>
              <p className='text-sitora-body text-lg'>{t('loading')}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !currentCar) {
    return (
      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex min-h-[400px] items-center justify-center'>
            <div className='text-center'>
              <h2 className='text-sitora-error mb-4 text-2xl font-bold'>{error || t('error')}</h2>
              <p className='text-sitora-body mb-6'>{t('error_message')}</p>
              <a href='/cars' className='text-sitora-primary hover:text-sitora-primary-dark font-medium underline'>
                {t('back_to_cars')}
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-8 md:py-12'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='space-y-8'>
          {/* Image Gallery */}
          <CarGallery images={currentCar.images} name={currentCar.name} />

          {/* Car Information */}
          <CarInfo car={currentCar} />

          {/* Specifications & Rental Info */}
          <div className='grid gap-6 lg:grid-cols-2'>
            <CarSpecs car={currentCar} />
            <CarRental car={currentCar} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleCarPage
