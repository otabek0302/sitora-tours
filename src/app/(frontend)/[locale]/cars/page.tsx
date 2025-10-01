'use client'

import { useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useCarsContext } from '@/lib/stores/cars'
import { PageLoading, PageError, PageContainer, SidebarLayout } from '@/components/ui'
import CarsSidebar from '@/components/pages/cars/cars-sidebar'
import CarsContent from '@/components/pages/cars/cars-content'
import CarsPagination from '@/components/pages/cars/cars-pagination'

const CarsPage = () => {
  const locale = useLocale()
  const t = useTranslations('pages.cars')
  const { fetchCars, setLocale, loading, error } = useCarsContext()

  useEffect(() => {
    setLocale(locale)
    fetchCars()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  if (loading) return <PageLoading message={t('cars_loading')} />
  if (error) return <PageError title={t('cars_error')} message={error} />

  return (
    <PageContainer>
      <SidebarLayout sidebar={<CarsSidebar />}>
        <CarsContent />
        <CarsPagination />
      </SidebarLayout>
    </PageContainer>
  )
}

export default CarsPage
