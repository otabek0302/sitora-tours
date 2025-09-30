import Image from 'next/image'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface HotelGalleryProps {
  images?: { id?: string; image: { id: number; url: string } }[]
  name: string
}

const HotelGallery = ({ images, name }: HotelGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className='bg-sitora-primary-light flex h-[400px] w-full items-center justify-center rounded-2xl lg:h-[500px]'>
        <span className='text-sitora-primary text-lg font-medium'>No Images Available</span>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {/* Main Image */}
      <div className='relative h-[400px] w-full overflow-hidden rounded-2xl lg:h-[500px]'>
        <Image src={images[selectedImage].image.url} alt={`${name} - Image ${selectedImage + 1}`} fill sizes='100vw' className='object-cover' priority />
      </div>

      {/* Thumbnail Gallery */}
      <div className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'>
        {images.slice(0, 8).map((img, index) => (
          <button key={img.id || index} onClick={() => setSelectedImage(index)} className={cn('relative h-20 w-full overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md sm:h-24', selectedImage === index ? 'ring-sitora-primary ring-1 ring-offset-1' : 'opacity-70 hover:opacity-100')}>
            <Image src={img.image.url} alt={`${name} thumbnail ${index + 1}`} fill sizes='(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw' className='object-cover' />
          </button>
        ))}
      </div>
    </div>
  )
}

export default HotelGallery
