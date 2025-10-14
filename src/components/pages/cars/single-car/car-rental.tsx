'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { Car } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { ApplyCar } from '@/components/ui'

interface CarRentalProps {
  car: Car
}

const CarRental = ({ car }: CarRentalProps) => {
  const t = useTranslations('pages.cars.single')
  const [applyOpen, setApplyOpen] = useState(false)

  return (
    <Card className='border-border bg-card rounded-[26px] shadow-none'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-sitora-text-heading text-xl font-bold'>{t('rental_info')}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Price */}
        <div className='flex items-center justify-between'>
          <div className='flex items-start gap-3'>
            <div className='flex-1'>
              <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('price_per_day')}</h3>
              <p className='text-sitora-primary text-3xl font-bold'>${car.price}</p>
            </div>
          </div>
        </div>

        {/* Rental Policies */}
        <div className='border-border space-y-4 border-t pt-6'>
          <div className='flex items-start gap-3'>
            <span className='text-sitora-primary text-lg font-bold'>—</span>
            <div className='flex-1'>
              <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('min_rental')}</h3>
              <p className='text-sitora-body text-base'>{t('min_rental_value')}</p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <span className='text-sitora-primary text-lg font-bold'>—</span>
            <div className='flex-1'>
              <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('driver_requirements')}</h3>
              <p className='text-sitora-body text-base'>{t('driver_requirements_value')}</p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <span className='text-sitora-primary text-lg font-bold'>—</span>
            <div className='flex-1'>
              <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('insurance')}</h3>
              <p className='text-sitora-body text-base'>{t('insurance_value')}</p>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <div className='border-border border-t pt-4'>
          <Button size='lg' onClick={() => setApplyOpen(true)} className='bg-sitora-primary hover:bg-sitora-primary/90 text-sitora-white w-full text-base'>
            {t('book_button')}
          </Button>
        </div>
      </CardContent>

      {/* Apply Car Modal */}
      <ApplyCar open={applyOpen} setOpen={setApplyOpen} car={car} />
    </Card>
  )
}

export default CarRental
