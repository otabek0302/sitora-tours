'use client'

import { useEffect } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useHotelsContext } from '@/lib/stores'
import { PageLoading, PageError, PageContainer } from '@/components/ui'
import HotelsContent from '@/components/pages/hotels/hotels-content'

const HotelsPage = () => {
  const locale = useLocale()
  const t = useTranslations('pages.hotels')
  const { fetchHotels, setLocale, loading, error } = useHotelsContext()

  useEffect(() => {
    setLocale(locale)
    fetchHotels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  if (loading) return <PageLoading message={t('hotels_loading')} />
  if (error) return <PageError title={t('hotels_error')} message={error} />

  return (
    <PageContainer>
      <HotelsContent />
    </PageContainer>
  )
}

export default HotelsPage

