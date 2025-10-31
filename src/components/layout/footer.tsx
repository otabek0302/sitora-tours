'use client'
import Link from 'next/link'
import Image from 'next/image'

import { useTranslations } from 'next-intl'
import { logo } from '@/assets'
import { Button } from '../ui'
import { Mail, Phone, Instagram, Facebook, Send } from 'lucide-react'

const Footer = () => {
  const t = useTranslations('footer')
  const nav = useTranslations('navigation')

  return (
    <footer className='bg-card border-border border-t'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Mobile & Tablet Layout */}
        <div className='block lg:hidden'>
          <div className='space-y-8 py-8'>
            {/* Logo & Description */}
            <div className='text-center lg:text-left'>
              <div className='mb-4 flex justify-center lg:justify-start'>
                <div className='relative h-8 w-24 sm:h-9 sm:w-28'>
                  <Image src={logo} fill alt='Sitora Tours' className='object-contain' sizes='(max-width: 640px) 96px, (max-width: 768px) 112px' />
                </div>
              </div>
              <p className='text-sitora-body sm:text-md mx-auto mb-6 max-w-md text-sm font-normal lg:mx-0'>{t('description')}</p>
              <div className='flex flex-col justify-center gap-2 sm:flex-row lg:justify-start'>
                <Button variant='default' size='sm' className='group bg-sitora-primary-light hover:bg-sitora-primary shadow-none'>
                  <Link href='mailto:info@sitoratours.com' className='flex items-center justify-center gap-2 text-sm leading-tight font-normal'>
                    <Mail className='text-sitora-primary group-hover:text-sitora-white h-4 w-4' />
                    <span className='text-sitora-primary group-hover:text-sitora-white block'>info@sitoratours.com</span>
                  </Link>
                </Button>
                <Button variant='default' size='sm' className='group bg-sitora-primary-light hover:bg-sitora-primary shadow-none'>
                  <Link href='tel:+998915589901' className='flex items-center justify-center gap-2 text-sm leading-tight font-normal'>
                    <Phone className='text-sitora-primary group-hover:text-sitora-white h-4 w-4' />
                    <span className='text-sitora-primary group-hover:text-sitora-white block'>+998 91 558 99 01</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mobile Grid - 2 columns on tablet, 1 on mobile */}
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8'>
              {/* Navigation */}
              <div>
                <h3 className='text-sitora-primary sm:text-md mb-3 text-sm font-semibold'>{t('navigation')}</h3>
                <div className='flex flex-col gap-1'>
                  <Link href='/' className='text-sitora-body hover:text-sitora-primary-dark rounded-md py-1 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium'>
                    <span className='block'>{nav('home')}</span>
                  </Link>
                  <Link href='/about-us' className='text-sitora-body hover:text-sitora-primary-dark rounded-md py-1 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium'>
                    <span className='block'>{nav('about')}</span>
                  </Link>
                  <Link href='/local-tours' className='text-sitora-body hover:text-sitora-primary-dark rounded-md py-1 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium'>
                    <span className='block'>{nav('local_tours')}</span>
                  </Link>
                  <Link href='/abroad-tours' className='text-sitora-body hover:text-sitora-primary-dark rounded-md py-1 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium'>
                    <span className='block'>{nav('abroad_tours')}</span>
                  </Link>
                  <Link href='/contact-us' className='text-sitora-body hover:text-sitora-primary-dark rounded-md py-1 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium'>
                    <span className='block'>{nav('contact')}</span>
                  </Link>
                </div>
              </div>

              {/* License */}
              <div>
                <h3 className='text-sitora-primary sm:text-md mb-3 text-sm font-semibold'>{t('license')}</h3>
                <div className='flex flex-col gap-1'>
                  <Link href='/privacy-policy' className='text-sitora-body hover:text-sitora-primary-dark rounded-md py-1 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium'>
                    <span className='block'>{t('privacyPolicy')}</span>
                  </Link>
                  <Link href='/terms-conditions' className='text-sitora-body hover:text-sitora-primary-dark rounded-md py-1 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium'>
                    <span className='block'>{t('terms')}</span>
                  </Link>
                  <Link href='mailto:info@sitoratours.com' className='text-sitora-body hover:text-sitora-primary-dark rounded-md py-1 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium'>
                    <span className='block'>{t('emailAddress')}</span>
                  </Link>
                </div>
              </div>

              {/* Contact - Full width on mobile, spans both columns on tablet */}
              <div className='sm:col-span-2'>
                <h3 className='text-sitora-primary sm:text-md mb-3 text-sm font-semibold'>{t('contact')}</h3>
                <div className='flex flex-col gap-1'>
                  <p className='text-sitora-body text-sm font-normal'>{t('additional_info.working_hours')}</p>
                  <p className='text-sitora-body text-sm font-normal'>{t('additional_info.address')}</p>
                  <div className='mt-2 flex gap-4'>
                    <Link href='https://www.instagram.com/sitora_tour/' target='_blank' rel='noopener noreferrer' className='text-sitora-body flex items-center gap-2 rounded-md py-1 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium'>
                      <Instagram className='text-sitora-primary h-4 w-4' />
                      <span className='block'>Instagram</span>
                    </Link>
                    <Link href='https://www.facebook.com/uzbekvoyage' target='_blank' rel='noopener noreferrer' className='text-sitora-body flex items-center gap-2 rounded-md py-1 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium'>
                      <Facebook className='text-sitora-primary h-4 w-4' />
                      <span className='block'>Facebook</span>
                    </Link>
                    <Link href='https://t.me/sitoratour' target='_blank' rel='noopener noreferrer' className='text-sitora-body flex items-center gap-2 rounded-md py-1 text-sm leading-tight font-normal transition-all duration-300 hover:scale-105 hover:font-medium'>
                      <Send className='text-sitora-primary h-4 w-4' />
                      <span className='block'>Telegram</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className='hidden lg:block'>
          <div className='grid grid-cols-3 gap-8 py-12'>
            <div className='col-span-1'>
              {/* Logo */}
              <div className='max-w-34'>
                <div className='relative h-8 w-24 sm:h-9 sm:w-28 md:h-10 md:w-32'>
                  <Image src={logo} fill alt='Sitora Tours' className='object-contain' sizes='(max-width: 640px) 96px, (max-width: 768px) 112px, 128px' />
                </div>
              </div>
              {/* About Company */}
              <div className='mt-4 space-y-4'>
                <p className='text-sitora-body text-md font-normal'>{t('description')}</p>
                <div className='flex gap-2'>
                  <Button variant='default' size='sm' className='group bg-sitora-primary-light hover:bg-sitora-primary shadow-none'>
                    <Link href='mailto:info@sitoratours.com' className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
                      <Mail className='text-sitora-primary group-hover:text-sitora-white h-4 w-4' />
                      <span className='text-sitora-primary group-hover:text-sitora-white block'>info@sitoratours.com</span>
                    </Link>
                  </Button>
                  <Button variant='default' size='sm' className='group bg-sitora-primary-light hover:bg-sitora-primary shadow-none'>
                    <Link href='tel:+998915589901' className='text-md flex items-center justify-center gap-2 leading-tight font-normal'>
                      <Phone className='text-sitora-primary group-hover:text-sitora-white h-4 w-4' />
                      <span className='text-sitora-primary group-hover:text-sitora-white block'>+998 91 558 99 01</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className='col-span-2'>
              <div className='grid grid-cols-3 gap-6 md:gap-10'>
                {/* Navigation */}
                <div className='col-span-1'>
                  <h3 className='text-sitora-primary text-md mb-4 font-semibold'>{t('navigation')}</h3>
                  <div className='flex flex-col gap-2'>
                    <Link href='/' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md py-2 text-sm leading-tight font-normal transition-all duration-300 hover:font-medium'>
                      <span className='block'>{nav('home')}</span>
                    </Link>
                    <Link href='/about-us' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md py-2 text-sm leading-tight font-normal transition-all duration-300 hover:font-medium'>
                      <span className='block'>{nav('about')}</span>
                    </Link>
                    <Link href='/local-tours' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md py-2 text-sm leading-tight font-normal transition-all duration-300 hover:font-medium'>
                      <span className='block'>{nav('local_tours')}</span>
                    </Link>
                    <Link href='/abroad-tours' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md py-2 text-sm leading-tight font-normal transition-all duration-300 hover:font-medium'>
                      <span className='block'>{nav('abroad_tours')}</span>
                    </Link>
                    <Link href='/contact-us' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md py-2 text-sm leading-tight font-normal transition-all duration-300 hover:font-medium'>
                      <span className='block'>{nav('contact')}</span>
                    </Link>
                  </div>
                </div>

                {/* License */}
                <div className='col-span-1'>
                  <h3 className='text-sitora-primary text-md mb-4 font-semibold'>{t('license')}</h3>
                  <div className='flex flex-col gap-2'>
                    <Link href='/privacy-policy' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md py-2 text-sm leading-tight font-normal transition-all duration-300 hover:font-medium'>
                      <span className='block'>{t('privacyPolicy')}</span>
                    </Link>
                    <Link href='/terms-conditions' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md py-2 text-sm leading-tight font-normal transition-all duration-300 hover:font-medium'>
                      <span className='block'>{t('terms')}</span>
                    </Link>
                    <Link href='mailto:info@sitoratours.com' className='text-sitora-body xl:text-md hover:text-sitora-primary-dark rounded-md py-2 text-sm leading-tight font-normal transition-all duration-300 hover:font-medium'>
                      <span className='block'>{t('emailAddress')}</span>
                    </Link>
                  </div>
                </div>

                {/* Contact */}
                <div className='col-span-1'>
                  <h3 className='text-sitora-primary text-md mb-4 font-semibold'>{t('contact')}</h3>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sitora-body text-md font-normal'>{t('additional_info.working_hours')}</p>
                    <p className='text-sitora-body text-md font-normal'>{t('additional_info.address')}</p>
                    <Link href='https://www.instagram.com/sitora_tour/' target='_blank' rel='noopener noreferrer' className='text-sitora-body text-md flex items-center gap-2 rounded-md py-2 leading-tight font-normal transition-all duration-300 hover:font-medium'>
                      <Instagram className='text-sitora-primary h-4 w-4' />
                      <span className='block'>Instagram</span>
                    </Link>
                    <Link href='https://www.facebook.com/uzbekvoyage' target='_blank' rel='noopener noreferrer' className='text-sitora-body text-md flex items-center gap-2 rounded-md py-2 leading-tight font-normal transition-all duration-300 hover:font-medium'>
                      <Facebook className='text-sitora-primary h-4 w-4' />
                      <span className='block'>Facebook</span>
                    </Link>
                    <Link href='https://t.me/sitoratour' target='_blank' rel='noopener noreferrer' className='text-sitora-body text-md flex items-center gap-2 rounded-md py-2 leading-tight font-normal transition-all duration-300 hover:font-medium'>
                      <Send className='text-sitora-primary h-4 w-4' />
                      <span className='block'>Telegram</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
