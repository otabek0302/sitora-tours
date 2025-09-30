'use client'

import ToursSidebar from '@/components/pages/tours/tours-sidebar'
import ToursContent from '@/components/pages/tours/tours-content'
import ToursPagination from '@/components/pages/tours/tours-pagination'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useToursContext } from '@/lib/stores/tours'

const ToursPage = () => {
  const locale = useLocale()
  const { fetchTours, setLocale } = useToursContext()

  useEffect(() => {
    setLocale(locale)
    fetchTours()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <section className='py-12 md:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col-reverse gap-6 sm:gap-8 lg:flex-row'>
          {/* Sidebar */}
          <div className='order-2 lg:order-1 lg:w-1/4'>
            <ToursSidebar />
          </div>

          {/* Main content */}
          <div className='order-1 lg:order-2 lg:w-3/4'>
            <ToursContent />
            <ToursPagination />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ToursPage
