'use client'

import { useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useCitiesContext } from '@/lib/stores'
import { PageLoading, PageError, PageContainer } from '@/components/ui'
import CitiesContent from '@/components/pages/cities/cities-content'

const CitiesPage = () => {
  const locale = useLocale()
  const t = useTranslations('pages.cities')
  const { fetchCities, setLocale, loading, error } = useCitiesContext()

  useEffect(() => {
    setLocale(locale)
    fetchCities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  if (loading) return <PageLoading message={t('cities_loading')} />
  if (error) return <PageError title={t('cities_error')} message={error} />

  return (
    <PageContainer>
      <CitiesContent />
    </PageContainer>
  )
}

export default CitiesPage

