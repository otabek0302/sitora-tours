import { useTranslations } from 'next-intl'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const ContactDetails = () => {
  const t = useTranslations('pages.contact_us')

  return (
    <div className='space-y-4'>
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

      {/* Google Maps Embed */}
      <div className='border-sitora-primary h-52 overflow-hidden rounded-[26px] border shadow-none'>
        <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.3583658389756!2d69.27419931541726!3d41.310849979272186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b7e4d1856!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s' width='100%' height='100%' style={{ border: 0 }} allowFullScreen loading='lazy' referrerPolicy='no-referrer-when-downgrade' title='Sitora Tours Office Location' />
      </div>
    </div>
  )
}

export default ContactDetails
