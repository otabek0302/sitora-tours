import Link from 'next/link'
import Image from 'next/image'

import { City } from '@/lib/schemas'
import { useTranslations } from 'next-intl'

export const RecommendedCitiesCard = ({ city }: { city: City }) => {
  const t = useTranslations('pages.home.recommended_cities')

  return (
    <div key={city.id} className='embla__slide w-full flex-shrink-0 lg:w-[calc(25%-18px)]'>
      <Link href={`/cities/${city.slug}`}>
        <div className='bg-card border-border group relative h-[300px] cursor-pointer overflow-hidden rounded-[26px] border shadow-none transition-all duration-300 hover:scale-[1.02] hover:shadow-lg lg:h-[480px]'>
          {/* City Image */}
          {city.image?.url ? (
            <Image src={city.image.url} alt={city.name} fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw' className='object-cover transition-transform duration-300 group-hover:scale-105' />
          ) : (
            <div className='bg-sitora-primary-light flex h-full w-full items-center justify-center'>
              <span className='text-sitora-primary text-sm font-medium'>{t('no_image')}</span>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />

          {/* Content */}
          <div className='text-sitora-white absolute right-0 bottom-0 left-0 p-6'>
            <h3 className='mb-2 text-xl font-bold'>{city.name || ''}</h3>
            <p className='text-sm font-normal opacity-90 transition-all duration-300 group-hover:opacity-100'>
              {city.description ? (
                <>
                  {/* Short text - shown by default */}
                  <span className='group-hover:hidden'>
                    {city.description.length > 100 ? `${city.description.substring(0, 100)}...` : city.description}
                  </span>
                  {/* Medium text - shown on hover (if description is longer than 100 chars) */}
                  {city.description.length > 100 && (
                    <span className='hidden group-hover:inline'>
                      {city.description.length > 250 ? `${city.description.substring(0, 250)}...` : city.description}
                    </span>
                  )}
                </>
              ) : (
                <span className='group-hover:hidden'>{t('no_description')}</span>
              )}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
