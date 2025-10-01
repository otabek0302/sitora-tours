'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Tour } from '@/lib/schemas'

interface TourGalleryProps {
  tour: Tour
}

const TourGallery = ({ tour }: TourGalleryProps) => {
  const [mainIdx, setMainIdx] = useState(0)
  const [mainImage, setMainImage] = useState(tour.images?.[0])

  useEffect(() => {
    setMainImage(tour.images?.[mainIdx])
  }, [mainIdx, tour.images])

  if (!tour.images?.length) {
    return <div className='bg-sitora-primary-light border-sitora-border h-[300px] w-full rounded-[32px] border shadow-none sm:h-[400px] md:h-[520px]' />
  }

  return (
    <div className='mb-6'>
      <div className='border-sitora-border relative mb-2 h-[300px] w-full overflow-hidden rounded-[32px] border shadow-none sm:h-[400px] md:h-[520px]'>
        <Image src={mainImage?.image?.url || ''} fill priority alt={tour.name || 'Tour image'} className='object-cover object-center' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' onError={() => setMainImage(tour.images?.[0])} />
      </div>
      <div className='flex gap-4 overflow-x-auto pb-2'>
        {tour.images?.map((img, idx: number) => (
          <button key={img.id || idx} onClick={() => setMainIdx(idx)} className={`relative h-20 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-[26px] border-2 shadow-none transition-all sm:h-24 sm:w-40 md:h-32 md:w-52 ${mainIdx === idx ? 'border-sitora-primary' : 'border-sitora-border'}`} type='button'>
            <Image src={img.image?.url || ''} fill priority alt={`Thumbnail ${idx + 1}`} className='object-cover object-center' sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' />
          </button>
        ))}
      </div>
    </div>
  )
}

export default TourGallery
