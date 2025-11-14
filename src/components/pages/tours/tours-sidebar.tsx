'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, Checkbox, Input, Label } from '@/components/ui'
import { useToursContext } from '@/lib/stores/tours'
import { useCitiesContext, useCountriesContext } from '@/lib/stores'

const ToursSidebar = () => {
  const t = useTranslations('pages.tours')
  const locale = useLocale()
  const { filters, setFilters, resetFilters, activeFilter } = useToursContext()
  const { cities, fetchCities, setLocale: setCitiesLocale } = useCitiesContext()
  const { countries, fetchCountries, setLocale: setCountriesLocale } = useCountriesContext()

  // State to control accordion open/close state
  const [accordionValue, setAccordionValue] = useState<string[]>(['location', 'price', 'duration'])

  useEffect(() => {
    setCitiesLocale(locale)
    setCountriesLocale(locale)
    fetchCities()
    fetchCountries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const isAbroadMode = filters.tourType === 'abroad'

  const locationItems = useMemo(() => {
    return isAbroadMode ? countries : cities
  }, [countries, cities, isAbroadMode])

  useEffect(() => {
    if (isAbroadMode) {
      if (!filters.countries || filters.countries.length === 0) return
      const allowedIds = new Set(locationItems.map(item => item.id))
      const nextCountries = filters.countries.filter(countryId => allowedIds.has(countryId))
      if (nextCountries.length !== filters.countries.length) {
        setFilters({ countries: nextCountries })
      }
    } else {
      if (!filters.cities || filters.cities.length === 0) return
      const allowedIds = new Set(locationItems.map(item => item.id))
      const nextCities = filters.cities.filter(cityId => allowedIds.has(cityId))
      if (nextCities.length !== filters.cities.length) {
        setFilters({ cities: nextCities })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationItems, isAbroadMode])

  const handleLocationChange = (id: number) => {
    if (isAbroadMode) {
      const currentCountries = filters.countries || []
      const isSelected = currentCountries.includes(id)
      const newCountries = isSelected ? currentCountries.filter(countryId => countryId !== id) : [...currentCountries, id]
      setFilters({ countries: newCountries })
    } else {
      const currentCities = filters.cities || []
      const isSelected = currentCities.includes(id)
      const newCities = isSelected ? currentCities.filter(cityId => cityId !== id) : [...currentCities, id]
      setFilters({ cities: newCities })
    }
  }

  return (
    <div className='space-y-4'>
      <Accordion type='multiple' value={accordionValue} onValueChange={setAccordionValue} className='space-y-4'>
        <AccordionItem value='location' className='bg-card border-border cursor-pointer rounded-2xl border shadow-none transition-all duration-300 hover:shadow-sm'>
          <AccordionTrigger className='text-sitora-text-subtitle sm:text-md hover:text-sitora-primary cursor-pointer px-4 py-4 text-sm font-semibold hover:no-underline sm:px-6'>
            {isAbroadMode ? t('sidebar.country') : t('sidebar.city')}
          </AccordionTrigger>
          <AccordionContent className='space-y-2 px-4 pb-6 sm:px-6'>
            {locationItems.length === 0 && <p className='text-sitora-text-muted text-sm'>{t('tours_no_filters')}</p>}
            {locationItems.map(location => (
              <div key={location.id} className='flex items-center space-x-2'>
                <Checkbox
                  id={`${isAbroadMode ? 'country' : 'city'}-${location.slug}`}
                  className='h-5 w-5 shadow-none'
                  checked={
                    isAbroadMode ? filters.countries?.includes(location.id) || false : filters.cities?.includes(location.id) || false
                  }
                  onCheckedChange={() => handleLocationChange(location.id)}
                />
                <Label
                  htmlFor={`${isAbroadMode ? 'country' : 'city'}-${location.slug}`}
                  className='text-sitora-text-muted text-sm font-normal'
                >
                  {location.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='price' className='bg-card border-border cursor-pointer rounded-2xl border shadow-none transition-all duration-300 hover:shadow-sm'>
          <AccordionTrigger className='text-sitora-text-subtitle sm:text-md hover:text-sitora-primary cursor-pointer px-4 py-4 text-sm font-semibold hover:no-underline sm:px-6'>{t('sidebar.price')}</AccordionTrigger>
          <AccordionContent className='text-sitora-body sm:text-md px-4 pb-6 text-sm leading-relaxed font-normal sm:px-6'>
            <div className='flex gap-2'>
              <div className='flex-1'>
                <Label htmlFor='min-price' className='text-sitora-text-muted text-sm font-normal'>
                  {t('sidebar.min')}
                </Label>
                <Input id='min-price' type='number' value={filters.minPrice || ''} onChange={e => setFilters({ minPrice: +e.target.value || 0 })} placeholder='Min 0' className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-10 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' min={0} max={10000} step={10} />
              </div>
              <div className='flex-1'>
                <Label htmlFor='max-price' className='text-sitora-text-muted text-sm font-normal'>
                  {t('sidebar.max')}
                </Label>
                <Input id='max-price' type='number' value={filters.maxPrice || ''} onChange={e => setFilters({ maxPrice: +e.target.value || 10000 })} placeholder='Max 10,000' className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-10 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' min={0} max={10000} step={10} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='duration' className='bg-card border-border cursor-pointer rounded-2xl border shadow-none transition-all duration-300 hover:shadow-sm'>
          <AccordionTrigger className='text-sitora-text-subtitle sm:text-md hover:text-sitora-primary cursor-pointer px-4 py-4 text-sm font-semibold hover:no-underline sm:px-6'>{t('sidebar.duration')}</AccordionTrigger>
          <AccordionContent className='text-sitora-body sm:text-md px-4 pb-6 text-sm leading-relaxed font-normal sm:px-6'>
            <div className='flex gap-2'>
              <div className='flex-1'>
                <Label htmlFor='min-duration' className='text-sitora-text-muted text-sm font-normal'>
                  {t('sidebar.min')}
                </Label>
                <Input id='min-duration' type='number' value={filters.durationMin || ''} onChange={e => setFilters({ durationMin: +e.target.value || 0 })} placeholder='Min 0' className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-10 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' min={0} max={30} step={1} />
              </div>
              <div className='flex-1'>
                <Label htmlFor='max-duration' className='text-sitora-text-muted text-sm font-normal'>
                  {t('sidebar.max')}
                </Label>
                <Input id='max-duration' type='number' value={filters.durationMax || ''} onChange={e => setFilters({ durationMax: +e.target.value || 30 })} placeholder='Max 30' className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-10 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' min={0} max={30} step={1} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Reset Button */}
      <div className='flex items-center justify-end'>
        <Button variant='default' size='sm' onClick={() => resetFilters()} disabled={!activeFilter()} className='bg-sitora-primary-light text-sitora-primary'>
          {t('sidebar.reset')}
        </Button>
      </div>
    </div>
  )
}

export default ToursSidebar
