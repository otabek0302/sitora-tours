'use client'

import HotelsContent from '@/components/pages/hotels/hotels-content'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useHotelsContext } from '@/lib/stores'

const HotelsPage = () => {
  const locale = useLocale()
  const { fetchHotels, setLocale } = useHotelsContext()

  useEffect(() => {
    setLocale(locale)
    fetchHotels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <section className='py-12 md:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <HotelsContent />
      </div>
    </section>
  )
}

export default HotelsPage
