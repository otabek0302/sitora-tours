'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import { Car } from '@/lib/schemas'

interface CarSpecsProps {
  car: Car
}

const CarSpecs = ({ car }: CarSpecsProps) => {
  const t = useTranslations('pages.cars.single')

  return (
    <Card className='border-border bg-card shadow-none'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-sitora-text-heading text-xl font-bold'>{t('specifications')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-6 sm:grid-cols-2'>
          {/* Brand */}
          <div className='flex items-start gap-3'>
            <span className='text-sitora-primary text-lg font-bold'>—</span>
            <div className='flex-1'>
              <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('brand')}</h3>
              <p className='text-sitora-body text-base'>{car.brand}</p>
            </div>
          </div>

          {/* Model */}
          <div className='flex items-start gap-3'>
            <span className='text-sitora-primary text-lg font-bold'>—</span>
            <div className='flex-1'>
              <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('model')}</h3>
              <p className='text-sitora-body text-base'>{car.model}</p>
            </div>
          </div>

          {/* Type */}
          <div className='flex items-start gap-3'>
            <span className='text-sitora-primary text-lg font-bold'>—</span>
            <div className='flex-1'>
              <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('type')}</h3>
              <p className='text-sitora-body text-base'>{car.type}</p>
            </div>
          </div>

          {/* Capacity */}
          <div className='flex items-start gap-3'>
            <span className='text-sitora-primary text-lg font-bold'>—</span>
            <div className='flex-1'>
              <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('capacity')}</h3>
              <p className='text-sitora-body text-base'>
                {car.capacity} {t('passengers')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CarSpecs
