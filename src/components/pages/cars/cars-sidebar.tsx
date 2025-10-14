'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, Checkbox, Input, Label } from '@/components/ui'
import { useCarsContext } from '@/lib/stores/cars'

const CarsSidebar = () => {
  const t = useTranslations('pages.cars')
  const { filters, setFilters, resetFilters, activeFilter, types, brands, fetchCarsTypes, fetchCarsBrands, locale } = useCarsContext()

  // Fetch types and brands on mount or when locale changes
  useEffect(() => {
    fetchCarsTypes()
    fetchCarsBrands()
  }, [fetchCarsTypes, fetchCarsBrands, locale])

  return (
    <div className='space-y-4'>
      <Accordion type='multiple' defaultValue={['filter', 'type']} className='space-y-4'>
        <AccordionItem value='filter' className='bg-card border-border cursor-pointer rounded-[20px] border shadow-none transition-all duration-300 hover:shadow-sm'>
          <AccordionTrigger className='text-sitora-text-subtitle sm:text-md hover:text-sitora-primary cursor-pointer px-4 py-4 text-sm font-semibold hover:no-underline sm:px-6'>{t('sidebar.filterBy')}</AccordionTrigger>
          <AccordionContent className='space-y-2 px-4 pb-6 sm:px-6'>
            {brands.length > 0 ? (
              brands.map(brand => (
                <div key={brand} className='flex items-center space-x-2'>
                  <Checkbox id={`brand-${brand}`} className='h-5 w-5 shadow-none' checked={filters.brand === brand} onCheckedChange={checked => setFilters({ brand: checked ? brand : undefined })} />
                  <Label htmlFor={`brand-${brand}`} className='text-sitora-text-muted text-sm font-normal'>
                    {brand}
                  </Label>
                </div>
              ))
            ) : (
              <p className='text-sitora-text-muted text-sm'>{t('sidebar.noBrands')}</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='type' className='bg-card border-border cursor-pointer rounded-[20px] border shadow-none transition-all duration-300 hover:shadow-sm'>
          <AccordionTrigger className='text-sitora-text-subtitle sm:text-md hover:text-sitora-primary cursor-pointer px-4 py-4 text-sm font-semibold hover:no-underline sm:px-6'>{t('sidebar.type')}</AccordionTrigger>
          <AccordionContent className='space-y-2 px-4 pb-6 sm:px-6'>
            {types.length > 0 ? (
              types.map(type => (
                <div key={type} className='flex items-center space-x-2'>
                  <Checkbox id={`type-${type}`} className='h-5 w-5 shadow-none' checked={filters.type === type} onCheckedChange={checked => setFilters({ type: checked ? type : undefined })} />
                  <Label htmlFor={`type-${type}`} className='text-sitora-text-muted text-sm font-normal'>
                    {type}
                  </Label>
                </div>
              ))
            ) : (
              <p className='text-sitora-text-muted text-sm'>{t('sidebar.noTypes')}</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='price' className='bg-card border-border cursor-pointer rounded-[20px] border shadow-none transition-all duration-300 hover:shadow-sm'>
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
                <Input id='max-price' type='number' value={filters.maxPrice || ''} onChange={e => setFilters({ maxPrice: +e.target.value || 1000 })} placeholder='Max 1,000' className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-10 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' min={0} max={10000} step={10} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='capacity' className='bg-card border-border cursor-pointer rounded-[20px] border shadow-none transition-all duration-300 hover:shadow-sm'>
          <AccordionTrigger className='text-sitora-text-subtitle sm:text-md hover:text-sitora-primary cursor-pointer px-4 py-4 text-sm font-semibold hover:no-underline sm:px-6'>{t('sidebar.capacity')}</AccordionTrigger>
          <AccordionContent className='text-sitora-body sm:text-md px-4 pb-6 text-sm leading-relaxed font-normal sm:px-6'>
            <div className='flex gap-2'>
              <div className='flex-1'>
                <Label htmlFor='min-capacity' className='text-sitora-text-muted text-sm font-normal'>
                  {t('sidebar.min')}
                </Label>
                <Input id='min-capacity' type='number' value={filters.minCapacity || ''} onChange={e => setFilters({ minCapacity: +e.target.value || 1 })} placeholder='Min 1' className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-10 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' min={1} max={10} step={1} />
              </div>
              <div className='flex-1'>
                <Label htmlFor='max-capacity' className='text-sitora-text-muted text-sm font-normal'>
                  {t('sidebar.max')}
                </Label>
                <Input id='max-capacity' type='number' value={filters.maxCapacity || ''} onChange={e => setFilters({ maxCapacity: +e.target.value || 10 })} placeholder='Max 10' className='border-border focus:border-sitora-primary focus:ring-sitora-primary h-10 rounded-md shadow-none outline-none focus:outline-none focus-visible:ring-0' min={1} max={10} step={1} />
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

export default CarsSidebar
