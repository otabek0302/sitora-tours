'use client'

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, Checkbox, Input, Label } from '@/components/ui'
import { useToursContext } from '@/lib/stores/tours'
import { useCategoriesContext, useCitiesContext } from '@/lib/stores'

const ToursSidebar = () => {
  const t = useTranslations('pages.tours')
  const locale = useLocale()
  const { filters, setFilters, resetFilters, activeFilter } = useToursContext()
  const { categories, fetchCategories, setLocale: setCategoriesLocale } = useCategoriesContext()
  const { cities, fetchCities, setLocale: setCitiesLocale } = useCitiesContext()

  // State to control accordion open/close state
  const [accordionValue, setAccordionValue] = useState<string[]>(['filter', 'city'])

  useEffect(() => {
    setCategoriesLocale(locale)
    setCitiesLocale(locale)
    fetchCategories()
    fetchCities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const handleCityChange = (id: number) => {
    const currentCities = filters.cities || []
    const isSelected = currentCities.includes(id)

    const newCities = isSelected ? currentCities.filter(cityId => cityId !== id) : [...currentCities, id]

    setFilters({ cities: newCities })
  }

  return (
    <div className='space-y-4'>
      <Accordion type='multiple' value={accordionValue} onValueChange={setAccordionValue} className='space-y-4'>
        <AccordionItem value='filter' className='bg-card border-border cursor-pointer rounded-[26px] border shadow-none transition-all duration-300 hover:shadow-sm'>
          <AccordionTrigger className='text-sitora-text-subtitle sm:text-md hover:text-sitora-primary cursor-pointer px-4 py-4 text-sm font-semibold hover:no-underline sm:px-6'>{t('sidebar.filterBy')}</AccordionTrigger>
          <AccordionContent className='space-y-2 px-4 pb-6 sm:px-6'>
            {categories.map(category => (
              <div key={category.id} className='flex items-center space-x-2'>
                <Checkbox id={`category-${category.slug}`} className='h-5 w-5 shadow-none' checked={filters.category === category.id} onCheckedChange={checked => setFilters({ category: checked ? category.id : null })} />
                <Label htmlFor={`category-${category.slug}`} className='text-sitora-text-muted text-sm font-normal'>
                  {category.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='city' className='bg-card border-border cursor-pointer rounded-[26px] border shadow-none transition-all duration-300 hover:shadow-sm'>
          <AccordionTrigger className='text-sitora-text-subtitle sm:text-md hover:text-sitora-primary cursor-pointer px-4 py-4 text-sm font-semibold hover:no-underline sm:px-6'>{t('sidebar.city')}</AccordionTrigger>
          <AccordionContent className='space-y-2 px-4 pb-6 sm:px-6'>
            {cities.map(city => (
              <div key={city.id} className='flex items-center space-x-2'>
                <Checkbox id={`city-${city.slug}`} className='h-5 w-5 shadow-none' checked={filters.cities?.includes(city.id) || false} onCheckedChange={() => handleCityChange(city.id)} />
                <Label htmlFor={`city-${city.slug}`} className='text-sitora-text-muted text-sm font-normal'>
                  {city.name}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='price' className='bg-card border-border cursor-pointer rounded-[26px] border shadow-none transition-all duration-300 hover:shadow-sm'>
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
        <AccordionItem value='duration' className='bg-card border-border cursor-pointer rounded-[26px] border shadow-none transition-all duration-300 hover:shadow-sm'>
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
