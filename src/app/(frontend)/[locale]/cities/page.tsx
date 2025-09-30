'use client'

import CitiesContent from '@/components/pages/cities/cities-content'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useCitiesContext } from '@/lib/stores'

const CitiesPage = () => {
  const locale = useLocale()
  const { fetchCities, setLocale } = useCitiesContext()

  useEffect(() => {
    setLocale(locale)
    fetchCities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <section className='py-12 md:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <CitiesContent />
      </div>
    </section>
  )
}

export default CitiesPage
