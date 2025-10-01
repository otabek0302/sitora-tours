'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useHotelsContext } from '@/lib/stores/hotels'
import { DetailLoading, DetailError, DetailContainer } from '@/components/ui'
import { HotelGallery, HotelInfo, HotelContact, HotelPolicies, HotelFeatures } from '@/components/pages/hotels/single-hotel'

const SingleHotelPage = () => {
  const params = useParams()
  const locale = useLocale()
  const { currentHotel, loading, error, fetchHotelBySlug, setLocale } = useHotelsContext()

  useEffect(() => {
    setLocale(locale)
    if (params.slug) fetchHotelBySlug(params.slug as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug, locale])

  if (loading) return <DetailLoading message='Loading hotel details...' />
  if (error || !currentHotel) return <DetailError title='Hotel not found' message='The hotel you are looking for does not exist or has been removed.' backUrl='/hotels' backText='Back to Hotels' />

  return (
    <DetailContainer className='space-y-6'>
      <HotelGallery images={currentHotel.images} name={currentHotel.name} />
      <HotelInfo hotel={currentHotel} />
      <HotelFeatures hotel={currentHotel} />
      <HotelContact hotel={currentHotel} />
      <HotelPolicies hotel={currentHotel} />
    </DetailContainer>
  )
}

export default SingleHotelPage
