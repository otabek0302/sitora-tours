import { useTranslations } from 'next-intl'
import { Plane, Car, Hotel, MapPin, Users, Calendar, Camera, Utensils } from 'lucide-react'
import Link from 'next/link'

const Services = () => {
  const t = useTranslations('pages.home.services')

  const serviceCategories = [
    {
      id: 1,
      title: t('categories.transportation.title'),
      description: t('categories.transportation.description'),
      link: '/cars',
    },
    {
      id: 2,
      title: t('categories.accommodation.title'),
      description: t('categories.accommodation.description'),
      link: '/hotels',
    },
    {
      id: 3,
      title: t('categories.guided_tours.title'),
      description: t('categories.guided_tours.description'),
      link: '/tours',
    },
    {
      id: 4,
      title: t('categories.cultural_experience.title'),
      description: t('categories.cultural_experience.description'),
      link: '/tours',
    },
  ]

  const mainServices = [
    {
      id: 1,
      name: t('main_services.flight'),
      icon: Plane,
    },
    {
      id: 2,
      name: t('main_services.car_rental'),
      icon: Car,
    },
    {
      id: 3,
      name: t('main_services.hotel_booking'),
      icon: Hotel,
    },
    {
      id: 4,
      name: t('main_services.local_guide'),
      icon: MapPin,
    },
    {
      id: 5,
      name: t('main_services.group_tours'),
      icon: Users,
    },
    {
      id: 6,
      name: t('main_services.custom_itinerary'),
      icon: Calendar,
    },
  ]

  return (
    <section className='py-12 lg:py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <div className='mb-8 text-center lg:text-left'>
          <h2 className='text-sitora-text-subtitle mb-4 text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl'>{t('heading')}</h2>
          <p className='text-sitora-body sm:text-md mx-auto max-w-2xl text-sm font-normal lg:mx-0'>{t('subheading')}</p>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Left Column - Service Categories */}
          <div className='lg:col-span-2'>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {serviceCategories.map(category => (
                <div key={category.id} className='bg-card border-border flex h-full flex-col rounded-2xl border p-6 shadow-none transition-shadow duration-200 hover:shadow-sm'>
                  <h3 className='text-sitora-text-subtitle mb-3 text-lg font-semibold'>{category.title}</h3>
                  <p className='text-sitora-body flex-grow text-sm leading-relaxed font-normal'>{category.description}</p>
                  <div className='mt-4 flex items-center justify-end'>
                    <Link href={category.link} className='text-sitora-primary sm:text-md hover:border-sitora-primary inline-flex h-9 items-center justify-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium transition-colors duration-200'>
                      {t('view_more')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Main Services */}
          <div className='lg:col-span-1'>
            <div className='bg-card border-border h-full rounded-2xl border p-6 shadow-none'>
              <h3 className='text-sitora-text-subtitle mb-6 text-lg font-semibold'>{t('main_services_heading')}</h3>
              <div className='space-y-4'>
                {mainServices.map(service => {
                  const IconComponent = service.icon
                  return (
                    <div key={service.id} className='flex items-center gap-3'>
                      <div className='bg-sitora-primary-light flex h-8 w-8 items-center justify-center rounded-lg'>
                        <IconComponent className='text-sitora-primary h-4 w-4' />
                      </div>
                      <span className='text-sitora-body text-sm font-medium'>{service.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
