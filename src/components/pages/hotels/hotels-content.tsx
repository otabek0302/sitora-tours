import HotelCard from '../../ui/hotel-card'

import { useTranslations } from 'next-intl'
import { useHotelsContext } from '@/lib/stores'

const HotelsContent = () => {
  const t = useTranslations('pages.hotels')
  const { hotels } = useHotelsContext()

  if (!hotels.length) {
    return (
      <div className='py-8 text-center sm:py-12'>
        <h3 className='text-sitora-text-subtitle mb-2 text-lg font-semibold sm:mb-3 sm:text-xl'>{t('no_hotels')}</h3>
        <p className='text-sitora-body text-sm sm:text-base'>{t('hotels_no_filters')}</p>
      </div>
    )
  }

  return (
    <div className='grid gap-4'>
      {hotels.map(hotel => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  )
}

export default HotelsContent
