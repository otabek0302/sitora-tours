import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface CarGalleryProps {
  images?: { id?: string; image: { id: number; url: string } }[]
  name: string
}

const CarGallery = ({ images, name }: CarGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const t = useTranslations('pages.cars.single')

  if (!images || images.length === 0) {
    return (
      <div className='bg-sitora-primary-light border-border flex h-[400px] w-full items-center justify-center rounded-[32px] border shadow-none lg:h-[500px]'>
        <span className='text-sitora-primary text-lg font-medium'>{t('no_images')}</span>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {/* Main Image */}
      <div className='border-border relative h-[400px] w-full overflow-hidden rounded-[32px] border shadow-none lg:h-[600px]'>
        <Image src={images[selectedImage].image.url} alt={`${name} - Image ${selectedImage + 1}`} fill sizes='100vw' className='object-cover' priority />
      </div>

      {/* Thumbnail Gallery */}
      <div className='grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6'>
        {images.slice(0, 8).map((img, index) => (
          <button key={img.id || index} onClick={() => setSelectedImage(index)} className={cn('relative h-20 w-full overflow-hidden rounded-[18px] border-2 shadow-none transition-all duration-300 hover:scale-105 hover:shadow-sm sm:h-32 sm:min-w-52', selectedImage === index ? 'border-sitora-primary' : 'border-border opacity-70 hover:opacity-100')}>
            <Image src={img.image.url} alt={`${name} thumbnail ${index + 1}`} fill sizes='(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw' className='object-cover' />
          </button>
        ))}
      </div>
    </div>
  )
}

export default CarGallery
