'use client'

import { useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useToursContext } from '@/lib/stores/tours'
import { PageLoading, PageError, PageContainer, SidebarLayout } from '@/components/ui'
import ToursSidebar from '@/components/pages/tours/tours-sidebar'
import ToursContent from '@/components/pages/tours/tours-content'
import ToursPagination from '@/components/pages/tours/tours-pagination'

const ToursPage = () => {
  const locale = useLocale()
  const t = useTranslations('pages.tours')
  const { fetchTours, setLocale, loading, error } = useToursContext()

  useEffect(() => {
    setLocale(locale)
    fetchTours()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  if (loading) return <PageLoading message={t('tours_loading')} />
  if (error) return <PageError title={t('tours_error')} message={error} />

  return (
    <PageContainer>
      <SidebarLayout sidebar={<ToursSidebar />}>
        <ToursContent />
        <ToursPagination />
      </SidebarLayout>
    </PageContainer>
  )
}

export default ToursPage
