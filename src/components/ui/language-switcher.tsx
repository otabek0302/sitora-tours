'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import { Button } from './button'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'uz', name: "O'zbek" },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='icon' className='group bg-sitora-primary-light hover:bg-sitora-primary shadow-none'>
          <Globe className='text-sitora-primary group-hover:text-sitora-white h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='bottom' align='end' className='w-36 border-none p-1 shadow-none'>
        <div className='flex flex-col gap-2'>
          {languages.map(language => (
            <Button key={language.code} variant={locale === language.code ? 'default' : 'ghost'} size='sm' onClick={() => handleLanguageChange(language.code)} className={`relative ${locale === language.code ? 'bg-sitora-primary text-sitora-white' : 'hover:text-sitora-primary'}`}>
              <span className='text-sm uppercase'>{language.name}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
