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
      <div className='bg-card border-border relative h-[300px] cursor-pointer overflow-hidden rounded-3xl border shadow-none transition-all duration-300 hover:shadow-md lg:h-[480px]'>
        {/* City Image */}
        {city.image?.url ? <Image src={city.image.url} alt={city.name} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className='object-cover transition-transform duration-300 group-hover:scale-105' /> : <div className='from-sitora-primary/20 to-sitora-primary-dark/40 absolute inset-0 bg-gradient-to-br' />}

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />

        {/* Content */}
        <div className='text-sitora-white absolute right-0 bottom-0 left-0 p-6'>
          <h3 className='mb-2 text-xl font-bold lg:text-2xl'>{city.name}</h3>
          {city.description && <p className='text-sm font-normal opacity-90 lg:text-base'>{city.description}</p>}
        </div>
      </div>
    </Link>
  )
}

export default CityCard
