import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, CreditCard, Receipt, PawPrint, Baby } from 'lucide-react'
import { Hotel } from '@/lib/schemas'

interface HotelPoliciesProps {
  hotel: Hotel
}

const HotelPolicies = ({ hotel }: HotelPoliciesProps) => {
  const t = useTranslations('pages.single_hotel')

  return (
    <Card className='border-border bg-card rounded-[26px] shadow-none'>
      <CardHeader className='pb-4'>
        <div className='flex items-center gap-3'>
          <CardTitle className='text-sitora-text-heading text-xl font-bold'>{t('policies')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4 sm:grid-cols-2'>
          {/* Check-in */}
          <div className='flex items-start gap-3'>
            <Clock className='text-sitora-primary mt-1 h-5 w-5 flex-shrink-0' />
            <div className='flex-1'>
              <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('check_in')}</h3>
              <p className='text-sitora-body text-base'>{hotel.policies?.checkIn || '14:00'}</p>
            </div>
          </div>

          {/* Check-out */}
          <div className='flex items-start gap-3'>
            <Clock className='text-sitora-primary mt-1 h-5 w-5 flex-shrink-0' />
            <div className='flex-1'>
              <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('check_out')}</h3>
              <p className='text-sitora-body text-base'>{hotel.policies?.checkOut || '12:00'}</p>
            </div>
          </div>

          {/* Cancellation Policy */}
          {hotel.policies?.cancellation && (
            <div className='flex items-start gap-3'>
              <Receipt className='text-sitora-primary mt-1 h-5 w-5 flex-shrink-0' />
              <div className='flex-1'>
                <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('cancellation_policy')}</h3>
                <p className='text-sitora-body text-base leading-relaxed'>{hotel.policies.cancellation}</p>
              </div>
            </div>
          )}

          {/* Pet Policy */}
          {hotel.policies?.pet && (
            <div className='flex items-start gap-3'>
              <PawPrint className='text-sitora-primary mt-1 h-5 w-5 flex-shrink-0' />
              <div className='flex-1'>
                <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('pet_policy')}</h3>
                <p className='text-sitora-body text-base'>{hotel.policies.pet}</p>
              </div>
            </div>
          )}

          {/* Children Policy */}
          {hotel.policies?.children && (
            <div className='flex items-start gap-3'>
              <Baby className='text-sitora-primary mt-1 h-5 w-5 flex-shrink-0' />
              <div className='flex-1'>
                <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('children_policy')}</h3>
                <p className='text-sitora-body text-base'>{hotel.policies.children}</p>
              </div>
            </div>
          )}

          {/* Payment Policy */}
          {hotel.policies?.payment && (
            <div className='flex items-start gap-3'>
              <CreditCard className='text-sitora-primary mt-1 h-5 w-5 flex-shrink-0' />
              <div className='flex-1'>
                <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('payment_policy')}</h3>
                <p className='text-sitora-body text-base'>{hotel.policies.payment}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default HotelPolicies
