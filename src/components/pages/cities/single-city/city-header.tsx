'use client'

import { City } from '@/lib/schemas'

interface CityHeaderProps {
  city: City
}

const CityHeader = ({ city }: CityHeaderProps) => {
  return (
    <div className='border-border mb-8 border-b pb-6'>
      <div className='space-y-4'>
        {/* City Name */}
        <h1 className='text-sitora-text-heading text-3xl font-bold sm:text-4xl lg:text-5xl'>{city.name}</h1>

        {/* City Description */}
        {city.description && <p className='text-sitora-body max-w-4xl text-base leading-relaxed sm:text-lg lg:text-xl'>{city.description}</p>}
      </div>
    </div>
  )
}

export default CityHeader
