'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useCitiesContext } from '@/lib/stores/cities'
import { CityHeader, CityTours } from '@/components/pages/cities/single-city'

const SingleCityPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const locale = useLocale()
  const t = useTranslations('pages.cities.single')
  const { currentCity, loading, error, fetchCityBySlug, setLocale } = useCitiesContext()

  useEffect(() => {
    setLocale(locale)
    if (slug) {
      fetchCityBySlug(slug)
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

  if (error || !currentCity) {
    return (
      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex min-h-[400px] items-center justify-center'>
            <div className='text-center'>
              <h2 className='text-sitora-error mb-4 text-2xl font-bold'>{error || t('error')}</h2>
              <p className='text-sitora-body mb-6'>{t('error_message')}</p>
              <a href='/cities' className='text-sitora-primary hover:text-sitora-primary-dark font-medium underline'>
                {t('back_to_cities')}
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-12 md:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* City Header */}
        <CityHeader city={currentCity} />

        {/* Tours in This City */}
        <CityTours cityId={currentCity.id} cityName={currentCity.name} />
      </div>
    </section>
  )
}

export default SingleCityPage
