'use client'

import CarsSidebar from '@/components/pages/cars/cars-sidebar'
import CarsContent from '@/components/pages/cars/cars-content'
import CarsPagination from '@/components/pages/cars/cars-pagination'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useCarsContext } from '@/lib/stores/cars'

const CarsPage = () => {
  const locale = useLocale()
  const { fetchCars, setLocale } = useCarsContext()

  useEffect(() => {
    setLocale(locale)
    fetchCars()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <section className='py-12 md:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col-reverse gap-6 sm:gap-8 lg:flex-row'>
          {/* Sidebar */}
          <div className='order-2 lg:order-1 lg:w-1/4'>
            <CarsSidebar />
          </div>

          {/* Main content */}
          <div className='order-1 lg:order-2 lg:w-3/4'>
            <CarsContent />
            <CarsPagination />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarsPage
