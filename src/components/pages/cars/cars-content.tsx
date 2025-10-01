import CarsCard from '../../ui/car-card'

import { useTranslations } from 'next-intl'
import { useCarsContext } from '@/lib/stores/cars'

const CarsContent = () => {
  const t = useTranslations('pages.cars')
  const { cars } = useCarsContext()

  if (!cars.length) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <h3 className='text-sitora-text-subtitle mb-2 text-lg font-semibold sm:mb-3 sm:text-xl'>{t('no_cars')}</h3>
        <p className='text-sitora-body text-sm sm:text-base'>{t('cars_no_filters')}</p>
      </div>
    )
  }

  return (
    <div className='grid gap-4'>
      {cars.map(car => (
        <CarsCard key={car.id} car={car} />
      ))}
    </div>
  )
}

export default CarsContent
