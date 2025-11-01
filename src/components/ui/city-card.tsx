'use client'

import Image from 'next/image'
import Link from 'next/link'

import { City } from '@/lib/schemas'

interface CityCardProps {
  city: City
}

const CityCard = ({ city }: CityCardProps) => {
  return (
    <Link href={`/cities/${city.slug}`} className='group block'>
      <div className='bg-card border-border relative h-[340px] cursor-pointer overflow-hidden rounded-[26px] border shadow-none transition-all duration-300 hover:shadow-sm lg:h-[480px]'>
        {/* City Image */}
        {city.image?.url ? <Image src={city.image.url} alt={city.name} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover transition-transform duration-300 group-hover:scale-105' /> : <div className='from-sitora-primary/20 to-sitora-primary-dark/40 absolute inset-0 bg-gradient-to-br' />}

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />

        {/* Content */}
        <div className='text-sitora-white absolute right-0 bottom-0 left-0 p-6'>
          <h3 className='mb-2 text-xl font-bold lg:text-2xl'>{city.name}</h3>
          {city.description && (
            <p className='text-sm font-normal opacity-90 transition-all duration-300 group-hover:opacity-100 lg:text-base'>
              {/* Short text - shown by default */}
              <span className='group-hover:hidden'>{city.description.length > 100 ? `${city.description.substring(0, 100)}...` : city.description}</span>
              {/* Medium text - shown on hover (if description is longer than 100 chars) */}
              {city.description.length > 100 && <span className='hidden group-hover:inline'>{city.description.length > 250 ? `${city.description.substring(0, 250)}...` : city.description}</span>}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CityCard
