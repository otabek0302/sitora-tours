'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useHotelsContext } from '@/lib/stores/hotels'
import { HotelGallery, HotelInfo, HotelContact, HotelPolicies, HotelFeatures } from '@/components/pages/hotels/single-hotel'

const SingleHotelPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const locale = useLocale()
  const { currentHotel, loading, error, fetchHotelBySlug, setLocale } = useHotelsContext()

  useEffect(() => {
    setLocale(locale)
    if (slug) {
      fetchHotelBySlug(slug)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, locale])

  if (loading) {
    return (
      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex min-h-[400px] items-center justify-center'>
            <div className='text-center'>
              <div className='border-sitora-primary mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2'></div>
              <p className='text-sitora-body text-lg'>Loading hotel details...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !currentHotel) {
    return (
      <section className='py-12 md:py-16'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex min-h-[400px] items-center justify-center'>
            <div className='text-center'>
              <h2 className='text-sitora-error mb-4 text-2xl font-bold'>{error || 'Hotel not found'}</h2>
              <p className='text-sitora-body mb-6'>The hotel you are looking for does not exist or has been removed.</p>
              <a href='/hotels' className='text-sitora-primary hover:text-sitora-primary-dark font-medium underline'>
                Back to Hotels
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='py-8 md:py-12'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='space-y-8'>
          {/* Image Gallery */}
          <HotelGallery images={currentHotel.images} name={currentHotel.name} />

          {/* Hotel Information */}
          <HotelInfo hotel={currentHotel} />

          {/* Hotel Features */}
          <HotelFeatures hotel={currentHotel} />

          {/* Contact Information */}
          <HotelContact hotel={currentHotel} />

          {/* Policies */}
          <HotelPolicies hotel={currentHotel} />
        </div>
      </div>
    </section>
  )
}

export default SingleHotelPage
