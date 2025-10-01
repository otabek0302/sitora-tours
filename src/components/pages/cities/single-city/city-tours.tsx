'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Tour } from '@/lib/schemas'
import TourCard from '@/components/ui/tour-card'

interface CityToursProps {
  cityId: number
  cityName: string
}

const CityTours = ({ cityId, cityName }: CityToursProps) => {
  const t = useTranslations('pages.cities.single')
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCityTours = async () => {
      try {
        setLoading(true)
        // TODO: Fetch tours where cities includes this cityId
        // For now, just placeholder
        const response = await fetch(`/api/tours?where[cities][in]=${cityId}`)
        const data = await response.json()
        setTours(data.docs || [])
      } catch (err) {
        setError('Failed to load tours')
      } finally {
        setLoading(false)
      }
    }

    fetchCityTours()
  }, [cityId])

  if (error) {
    return (
      <div className='py-8'>
        <h2 className='text-sitora-text-heading mb-6 text-2xl font-bold sm:text-3xl'>
          {t('tours_in')} {cityName}
        </h2>
        <p className='text-sitora-error text-center'>{t('tours_error')}</p>
      </div>
    )
  }

  if (!tours.length) {
    return (
      <div className='py-6'>
        <h2 className='text-sitora-text-heading mb-6 text-2xl font-bold sm:text-3xl'>
          {t('tours_in')} {cityName}
        </h2>
        <div className='bg-sitora-primary-light rounded-[26px] p-12 text-center shadow-none'>
          <p className='text-sitora-body text-lg'>{t('no_tours', { city: cityName })}</p>
          <p className='text-sitora-muted mt-2 text-sm'>{t('check_back')}</p>
        </div>
      </div>
    )
  }

  const tourPlural = tours.length === 1 ? t('tour') : t('tours')

  return (
    <div className='py-6'>
      {/* Section Title */}
      <div className='mb-6'>
        <h2 className='text-sitora-text-heading mb-2 text-2xl font-bold sm:text-3xl'>
          {t('tours_in')} {cityName}
        </h2>
        <p className='text-sitora-body text-base'>{t('discover_tours', { count: tours.length, plural: tourPlural, city: cityName })}</p>
      </div>

      {/* Tours Grid */}
      <div className='grid gap-4'>
        {tours.map(tour => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  )
}

export default CityTours
