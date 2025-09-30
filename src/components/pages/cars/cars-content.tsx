import CarsCard from '../../ui/car-card'

import { useTranslations } from 'next-intl'
import { useCarsContext } from '@/lib/stores/cars'

const CarsContent = () => {
  const t = useTranslations('pages.cars')
  const { cars, loading, error } = useCarsContext()

  if (loading) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <div className='border-sitora-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
        <p className='text-sitora-body text-sm sm:text-base'>{t('cars_loading')}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <h3 className='mb-2 text-lg font-semibold text-red-500 sm:mb-3 sm:text-xl'>{t('cars_error')}</h3>
        <p className='text-sitora-body text-sm sm:text-base'>{error}</p>
      </div>
    )
  }

  if (!cars.length) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <h3 className='text-sitora-text-subtitle mb-2 text-lg font-semibold sm:mb-3 sm:text-xl'>{t('no_cars')}</h3>
        <p className='text-sitora-body text-sm sm:text-base'>{t('cars_no_filters')}</p>
      </div>
    )
  }

  return (
    <div className='grid gap-4 sm:gap-6'>
      {cars.map(car => (
        <CarsCard key={car.id} car={car} />
      ))}
    </div>
  )
}

export default CarsContent
