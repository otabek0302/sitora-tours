import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Hotel } from '@/lib/schemas'
import { MapPin, Phone } from 'lucide-react'

interface HotelContactProps {
  hotel: Hotel
}

const HotelContact = ({ hotel }: HotelContactProps) => {
  const t = useTranslations('pages.single_hotel')

  return (
    <Card className='border-border bg-card rounded-[26px] shadow-none'>
      <CardHeader className='pb-4'>
        <div className='flex items-center gap-3'>
          <CardTitle className='text-sitora-text-heading text-xl font-bold'>{t('contact_info')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {/* Address */}
        {hotel.address && (
          <div className='space-y-2'>
            <div className='flex items-start gap-3'>
              <MapPin className='text-sitora-primary mt-1 h-5 w-5 flex-shrink-0' />
              <div className='flex-1'>
                <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('address')}</h3>
                <p className='text-sitora-body text-base leading-relaxed'>{hotel.address}</p>
              </div>
            </div>
          </div>
        )}

        {/* Phone */}
        {hotel.phone && (
          <div className='border-border border-t pt-4'>
            <div className='flex items-start gap-3'>
              <Phone className='text-sitora-primary mt-1 h-5 w-5 flex-shrink-0' />
              <div className='flex-1'>
                <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('phone')}</h3>
                <Link href={`tel:${hotel.phone}`} className='text-sitora-primary hover:text-sitora-primary-dark text-base font-medium transition-colors duration-200 hover:underline'>
                  {hotel.phone}
                </Link>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default HotelContact
