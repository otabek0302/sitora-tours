import { useTranslations } from 'next-intl'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const ContactDetails = () => {
  const t = useTranslations('pages.contact_us')

  return (
    <div className='space-y-4 sm:space-y-6'>
      <div className='flex items-start gap-3 sm:gap-4'>
        <div className='bg-sitora-primary-light flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12'>
          <Mail className='text-sitora-primary h-4 w-4 sm:h-5 sm:w-5' />
        </div>
        <div className='flex-1'>
          <h3 className='text-sitora-text-subtitle mb-1 text-xs font-semibold sm:text-sm'>{t('email')}</h3>
          <p className='text-sitora-body text-xs leading-relaxed sm:text-sm'>info@sitoratours.com</p>
        </div>
      </div>
      <div className='flex items-start gap-3 sm:gap-4'>
        <div className='bg-sitora-primary-light flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12'>
          <Phone className='text-sitora-primary h-4 w-4 sm:h-5 sm:w-5' />
        </div>
        <div className='flex-1'>
          <h3 className='text-sitora-text-subtitle mb-1 text-xs font-semibold sm:text-sm'>{t('phone')}</h3>
          <p className='text-sitora-body text-xs leading-relaxed sm:text-sm'>
            +998 91 558 99 01<br />
            +998 93 226 99 96<br />
            +998 93 994 44 68
          </p>
        </div>
      </div>
      <div className='flex items-start gap-3 sm:gap-4'>
        <div className='bg-sitora-primary-light flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12'>
          <MapPin className='text-sitora-primary h-4 w-4 sm:h-5 sm:w-5' />
        </div>
        <div className='flex-1'>
          <h3 className='text-sitora-text-subtitle mb-1 text-xs font-semibold sm:text-sm'>{t('office')}</h3>
          <p className='text-sitora-body text-xs leading-relaxed sm:text-sm'>Mir Said Baraka Street, 1, Samarkand, Uzbekistan</p>
        </div>
      </div>
      <div className='flex items-start gap-3 sm:gap-4'>
        <div className='bg-sitora-primary-light flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12'>
          <Clock className='text-sitora-primary h-4 w-4 sm:h-5 sm:w-5' />
        </div>
        <div className='flex-1'>
          <h3 className='text-sitora-text-subtitle mb-1 text-xs font-semibold sm:text-sm'>{t('business_hours')}</h3>
          <p className='text-sitora-body text-xs leading-relaxed sm:text-sm'>
            Monday - Friday: 09:00 - 17:00<br />
            Saturday - Sunday: Weekend
          </p>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className='border-sitora-primary h-48 overflow-hidden rounded-[20px] border shadow-none sm:h-52 sm:rounded-[26px]'>
        <iframe src='https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3072.3!2d66.944888!3d39.658391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMznCsDM5JzMwLjIiTiA2NsKwNTYnNDAuNCJF!5e0!3m2!1sen!2s!4v1696420800000!5m2!1sen!2s' width='100%' height='100%' style={{ border: 0 }} allowFullScreen loading='lazy' referrerPolicy='no-referrer-when-downgrade' title='Sitora Tours Office - Mir Said Baraka Street, 1' />
      </div>
    </div>
  )
}

export default ContactDetails
