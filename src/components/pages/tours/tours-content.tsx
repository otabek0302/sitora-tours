import ToursCard from '../../ui/tour-card'

import { useTranslations } from 'next-intl'
import { useToursContext } from '@/lib/stores/tours'
import { PageLoading } from '@/components/ui'

const ToursContent = () => {
  const t = useTranslations('pages.tours')
  const { tours, loading } = useToursContext()

  if (loading && tours.length === 0) return <PageLoading message={t('tours_loading')} />

  if (!tours.length) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <h3 className='text-sitora-text-subtitle mb-2 text-lg font-semibold sm:mb-3 sm:text-xl'>{t('no_tours')}</h3>
        <p className='text-sitora-body text-sm sm:text-base'>{t('tours_no_filters')}</p>
      </div>
    )
  }

  return (
    <div className='grid gap-4'>
      {tours.map(tour => (
        <ToursCard key={tour.id} tour={tour} />
      ))}
    </div>
  )
}

export default ToursContent
