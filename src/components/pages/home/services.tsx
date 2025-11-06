'use client'

import { useTranslations } from 'next-intl'
import { Plane, Car, Hotel, MapPin, Users, Calendar } from 'lucide-react'
import Link from 'next/link'

const Services = () => {
  const t = useTranslations('pages.home.services')

  return (
    <section className='py-6 lg:py-8'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='mb-6 text-center lg:text-left'>
          <h2 className='text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl'>{t('heading')}</h2>
          <p className='text-sitora-body sm:text-md mx-auto max-w-2xl text-sm font-normal lg:mx-0'>{t('subheading')}</p>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {/* Left Column - Service Categories */}
          <div className='lg:col-span-2'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='bg-card border-border flex h-full flex-col rounded-[26px] border p-6 shadow-none transition-shadow duration-200 hover:shadow-sm'>
                <h3 className='text-sitora-text-subtitle mb-3 text-lg font-semibold'>{t('categories.transportation.title')}</h3>
                <p className='text-sitora-body flex-grow text-sm leading-relaxed font-normal'>{t('categories.transportation.description')}</p>
                <div className='mt-4 flex items-center justify-end'>
                  <Link href={'/cars'} className='text-sitora-primary sm:text-md hover:border-sitora-primary inline-flex h-9 items-center justify-center rounded-2xl border border-transparent px-4 py-2 text-sm font-medium transition-colors duration-200'>
                    {t('view_more')}
                  </Link>
                </div>
              </div>

              <div className='bg-card border-border flex h-full flex-col rounded-[26px] border p-6 shadow-none transition-shadow duration-200 hover:shadow-sm'>
                <h3 className='text-sitora-text-subtitle mb-3 text-lg font-semibold'>{t('categories.accommodation.title')}</h3>
                <p className='text-sitora-body flex-grow text-sm leading-relaxed font-normal'>{t('categories.accommodation.description')}</p>
                <div className='mt-4 flex items-center justify-end'>
                  <Link href={'/hotels'} className='text-sitora-primary sm:text-md hover:border-sitora-primary inline-flex h-9 items-center justify-center rounded-2xl border border-transparent px-4 py-2 text-sm font-medium transition-colors duration-200'>
                    {t('view_more')}
                  </Link>
                </div>
              </div>

              <div className='bg-card border-border flex h-full flex-col rounded-[26px] border p-6 shadow-none transition-shadow duration-200 hover:shadow-sm'>
                <h3 className='text-sitora-text-subtitle mb-3 text-lg font-semibold'>{t('categories.guided_tours.title')}</h3>
                <p className='text-sitora-body flex-grow text-sm leading-relaxed font-normal'>{t('categories.guided_tours.description')}</p>
                <div className='mt-4 flex items-center justify-end'>
                  <Link href={'/tours'} className='text-sitora-primary sm:text-md hover:border-sitora-primary inline-flex h-9 items-center justify-center rounded-2xl border border-transparent px-4 py-2 text-sm font-medium transition-colors duration-200'>
                    {t('view_more')}
                  </Link>
                </div>
              </div>

              <div className='bg-card border-border flex h-full flex-col rounded-[26px] border p-6 shadow-none transition-shadow duration-200 hover:shadow-sm'>
                <h3 className='text-sitora-text-subtitle mb-3 text-lg font-semibold'>{t('categories.cultural_experience.title')}</h3>
                <p className='text-sitora-body flex-grow text-sm leading-relaxed font-normal'>{t('categories.cultural_experience.description')}</p>
                <div className='mt-4 flex items-center justify-end'>
                  <Link href={'/tours'} className='text-sitora-primary sm:text-md hover:border-sitora-primary inline-flex h-9 items-center justify-center rounded-2xl border border-transparent px-4 py-2 text-sm font-medium transition-colors duration-200'>
                    {t('view_more')}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Services */}
          <div className='lg:col-span-1'>
            <div className='bg-card border-border h-full rounded-[26px] border p-6 shadow-none'>
              <h3 className='text-sitora-text-subtitle mb-6 text-lg font-semibold'>{t('main_services_heading')}</h3>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <div className='bg-sitora-primary-light flex h-8 w-8 items-center justify-center rounded-2xl'>
                    <Plane className='text-sitora-primary h-4 w-4' />
                  </div>
                  <span className='text-sitora-body text-sm font-medium'>{t('main_services.flight')}</span>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='bg-sitora-primary-light flex h-8 w-8 items-center justify-center rounded-2xl'>
                    <Car className='text-sitora-primary h-4 w-4' />
                  </div>
                  <span className='text-sitora-body text-sm font-medium'>{t('main_services.car_rental')}</span>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='bg-sitora-primary-light flex h-8 w-8 items-center justify-center rounded-2xl'>
                    <Hotel className='text-sitora-primary h-4 w-4' />
                  </div>
                  <span className='text-sitora-body text-sm font-medium'>{t('main_services.hotel_booking')}</span>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='bg-sitora-primary-light flex h-8 w-8 items-center justify-center rounded-2xl'>
                    <MapPin className='text-sitora-primary h-4 w-4' />
                  </div>
                  <span className='text-sitora-body text-sm font-medium'>{t('main_services.local_guide')}</span>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='bg-sitora-primary-light flex h-8 w-8 items-center justify-center rounded-2xl'>
                    <Users className='text-sitora-primary h-4 w-4' />
                  </div>
                  <span className='text-sitora-body text-sm font-medium'>{t('main_services.group_tours')}</span>
                </div>

                <div className='flex items-center gap-3'>
                  <div className='bg-sitora-primary-light flex h-8 w-8 items-center justify-center rounded-2xl'>
                    <Calendar className='text-sitora-primary h-4 w-4' />
                  </div>
                  <span className='text-sitora-body text-sm font-medium'>{t('main_services.custom_itinerary')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Services List */}
        <div className='mt-8'>
          <h3 className='text-sitora-text-subtitle mb-6 text-xl font-bold lg:text-2xl'>{t('detailed_services_heading')}</h3>
          <div className='bg-card border-border rounded-[26px] border p-6 shadow-none'>
            <ul className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.airport_transfer')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.ticket_booking')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.group_visa')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.hotel_booking')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.sightseeing')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.catering')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.cooking_masterclass')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.guide_translator')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.university_meetings')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.folklore_performances')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.cultural_events')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.desert_experience')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.factory_tours')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.entrance_tickets')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.conference_organization')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.conference_halls')}</span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='text-sitora-primary mt-1 flex-shrink-0 text-lg font-bold'>—</span>
                <span className='text-sitora-body text-sm leading-relaxed'>{t('detailed_services.conference_equipment')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
