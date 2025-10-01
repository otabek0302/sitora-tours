'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useCitiesContext } from '@/lib/stores/cities'
import { DetailLoading, DetailError, DetailContainer } from '@/components/ui'
import { CityHeader, CityTours } from '@/components/pages/cities/single-city'

const SingleCityPage = () => {
  const params = useParams()
  const locale = useLocale()
  const t = useTranslations('pages.cities.single')
  const { currentCity, loading, error, fetchCityBySlug, setLocale } = useCitiesContext()

  useEffect(() => {
    setLocale(locale)
    if (params.slug) fetchCityBySlug(params.slug as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug, locale])

  if (loading) return <DetailLoading message={t('loading')} />
  if (error || !currentCity) return <DetailError title={t('error')} message={t('error_message')} backUrl='/cities' backText={t('back_to_cities')} />

  return (
    <DetailContainer>
      <CityHeader city={currentCity} />
      <CityTours cityId={currentCity.id} cityName={currentCity.name} />
    </DetailContainer>
  )
}

export default SingleCityPage
