import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from './button'

interface DetailLoadingProps {
  message?: string
}

export const DetailLoading = ({ message = 'Loading...' }: DetailLoadingProps) => (
  <section className='py-6 lg:py-8'>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex min-h-[400px] items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='text-sitora-primary mx-auto mb-4 h-12 w-12 animate-spin' />
          <p className='text-sitora-body text-lg'>{message}</p>
        </div>
      </div>
    </div>
  </section>
)

interface DetailErrorProps {
  title?: string
  message?: string
  backUrl: string
  backText: string
}

export const DetailError = ({ title = 'Not Found', message = 'The item you are looking for does not exist.', backUrl, backText }: DetailErrorProps) => (
  <section className='py-6 lg:py-8'>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex min-h-[400px] items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-sitora-error mb-4 text-2xl font-bold'>{title}</h2>
          <p className='text-sitora-body mb-6'>{message}</p>
          <Button variant='default' size='sm' asChild>
            <Link href={backUrl}>{backText}</Link>
          </Button>
        </div>
      </div>
    </div>
  </section>
)

interface BackButtonProps {
  href: string
  children: React.ReactNode
}

export const BackButton = ({ href, children }: BackButtonProps) => (
  <Button variant='ghost' size='sm' className='mb-6 shadow-none' asChild>
    <Link href={href}>
      <ArrowLeft className='mr-2 h-4 w-4' />
      {children}
    </Link>
  </Button>
)

interface DetailContainerProps {
  children: React.ReactNode
  className?: string
}

export const DetailContainer = ({ children, className = '' }: DetailContainerProps) => (
  <section className='py-6 lg:py-8'>
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  </section>
)
