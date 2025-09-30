import { useTranslations } from 'next-intl'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const ContactDetails = () => {
  const t = useTranslations('pages.contact_us')

  return (
    <div className='space-y-6'>
      <div className='flex items-start gap-4'>
        <div className='bg-sitora-primary-light flex h-12 w-12 items-center justify-center rounded-full'>
          <Mail className='text-sitora-primary h-6 w-6' />
        </div>
        <div className='flex-1'>
          <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('email')}</h3>
          <p className='text-sitora-body text-sm leading-relaxed'>info@sitoratours.com</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className='bg-sitora-primary-light flex h-12 w-12 items-center justify-center rounded-full'>
          <Phone className='text-sitora-primary h-6 w-6' />
        </div>
        <div className='flex-1'>
          <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('phone')}</h3>
          <p className='text-sitora-body text-sm leading-relaxed'>+998954019111</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className='bg-sitora-primary-light flex h-12 w-12 items-center justify-center rounded-full'>
          <MapPin className='text-sitora-primary h-6 w-6' />
        </div>
        <div className='flex-1'>
          <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('office')}</h3>
          <p className='text-sitora-body text-sm leading-relaxed'>Street Davlat Obod, 15</p>
        </div>
      </div>
      <div className='flex items-start gap-4'>
        <div className='bg-sitora-primary-light flex h-12 w-12 items-center justify-center rounded-full'>
          <Clock className='text-sitora-primary h-6 w-6' />
        </div>
        <div className='flex-1'>
          <h3 className='text-sitora-text-subtitle mb-1 text-sm font-semibold'>{t('business_hours')}</h3>
          <p className='text-sitora-body text-sm leading-relaxed'>Monday - Friday: 9:00 AM - 6:00 PM</p>
        </div>
      </div>
      <div className='border-sitora-primary h-52 rounded-2xl border'></div>
    </div>
  )
}

export default ContactDetails
