import { ReactNode } from 'react'
import { generateMetadata as generateHotelMetadata } from './metadata'

type Props = {
  children: ReactNode
  params: Promise<{ slug: string; locale: string }>
}

export { generateHotelMetadata as generateMetadata }

export default function HotelLayout({ children }: Props) {
  return <>{children}</>
}
