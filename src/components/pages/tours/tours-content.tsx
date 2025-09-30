import ToursCard from '../../ui/tour-card'

import { useTranslations } from 'next-intl'
import { useToursContext } from '@/lib/stores/tours'

const ToursContent = () => {
  const t = useTranslations('pages.tours')
  const { tours, loading, error } = useToursContext()

  if (loading) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <div className='border-sitora-success mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
        <p className='text-sitora-body text-sm sm:text-base'>{t('tours_loading')}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <h3 className='text-sitora-error mb-2 text-lg font-semibold sm:mb-3 sm:text-xl'>{t('tours_error')}</h3>
        <p className='text-sitora-body text-sm sm:text-base'>{error}</p>
      </div>
    )
  }

  if (!tours.length) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <h3 className='text-sitora-text-subtitle mb-2 text-lg font-semibold sm:mb-3 sm:text-xl'>{t('no_tours')}</h3>
        <p className='text-sitora-body text-sm sm:text-base'>{t('tours_no_filters')}</p>
      </div>
    )
  }

  return (
    <div className='grid gap-4 sm:gap-6'>
      {tours.map(tour => (
        <ToursCard key={tour.id} tour={tour} />
      ))}
    </div>
  )
}

export default ToursContent
