import CityCard from '../../ui/city-card'

import { useTranslations } from 'next-intl'
import { useCitiesContext } from '@/lib/stores'

const CitiesContent = () => {
  const t = useTranslations('pages.cities')
  const { cities, loading, error } = useCitiesContext()

  if (loading) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <div className='border-sitora-success mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2'></div>
        <p className='text-sitora-body text-sm sm:text-base'>{t('cities_loading')}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <h3 className='text-sitora-error mb-2 text-lg font-semibold sm:mb-3 sm:text-xl'>{t('cities_error')}</h3>
        <p className='text-sitora-body text-sm sm:text-base'>{error}</p>
      </div>
    )
  }

  if (!cities.length) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <h3 className='text-sitora-text-subtitle mb-2 text-lg font-semibold sm:mb-3 sm:text-xl'>{t('no_cities')}</h3>
        <p className='text-sitora-body text-sm sm:text-base'>{t('cities_no_filters')}</p>
      </div>
    )
  }

  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {cities.map(city => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  )
}

export default CitiesContent
