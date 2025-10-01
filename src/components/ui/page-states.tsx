import { Loader2 } from 'lucide-react'

interface PageLoadingProps {
  message?: string
}

export const PageLoading = ({ message = 'Loading...' }: PageLoadingProps) => (
  <section className='py-6 lg:py-8'>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='py-8 text-center sm:py-12'>
        <Loader2 className='text-sitora-primary mx-auto mb-4 h-8 w-8 animate-spin' />
        <p className='text-sitora-body text-sm sm:text-base'>{message}</p>
      </div>
    </div>
  </section>
)

interface PageErrorProps {
  title?: string
  message: string
}

export const PageError = ({ title = 'Error', message }: PageErrorProps) => (
  <section className='py-6 lg:py-8'>
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='py-8 text-center sm:py-12'>
        <h3 className='text-sitora-error mb-2 text-lg font-semibold sm:mb-3 sm:text-xl'>{title}</h3>
        <p className='text-sitora-body text-sm sm:text-base'>{message}</p>
      </div>
    </div>
  </section>
)

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export const PageContainer = ({ children, className = '' }: PageContainerProps) => (
  <section className='py-6 lg:py-8'>
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  </section>
)

interface SidebarLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
}

export const SidebarLayout = ({ sidebar, children }: SidebarLayoutProps) => (
  <div className='flex flex-col-reverse gap-4 lg:flex-row'>
    <div className='order-2 lg:order-1 lg:w-1/4'>{sidebar}</div>
    <div className='order-1 lg:order-2 lg:w-3/4'>{children}</div>
  </div>
)
