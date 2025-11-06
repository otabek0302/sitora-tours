'use client'

import { Star, Car as CarIcon } from 'lucide-react'
import { Car } from '@/lib/schemas'

interface CarInfoProps {
  car: Car
}

const CarInfo = ({ car }: CarInfoProps) => {
  return (
    <div className='space-y-4'>
      {/* Car Name */}
      <h1 className='text-sitora-text-heading text-3xl font-bold sm:text-4xl lg:text-5xl'>{car.name}</h1>

      {/* Brand and Type */}
      <div className='flex flex-wrap items-center gap-4'>
        {/* Brand */}
        <div className='flex items-center gap-2'>
          <CarIcon className='text-sitora-primary h-5 w-5' />
          <span className='text-sitora-body text-base font-medium'>{car.brand}</span>
        </div>

        {/* Separator */}
        <div className='text-sitora-muted'>•</div>

        {/* Type */}
        <div className='flex items-center gap-2'>
          <span className='bg-sitora-primary/10 text-sitora-primary rounded-full px-3 py-1 text-sm font-semibold'>{car.type}</span>
        </div>

        {/* Separator */}
        <div className='text-sitora-muted'>•</div>

        {/* Rating */}
        <div className='flex items-center gap-2'>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-sitora-gold-medium fill-current' : 'text-sitora-text-muted'}`} />
          ))}
          <span className='text-sitora-text-subtitle text-base font-semibold'>4.5/5</span>
        </div>
      </div>

      {/* Description */}
      {car.description && (
        <div className='pt-4'>
          <p className='text-sitora-body text-base leading-relaxed whitespace-pre-line'>{car.description}</p>
        </div>
      )}
    </div>
  )
}

export default CarInfo
