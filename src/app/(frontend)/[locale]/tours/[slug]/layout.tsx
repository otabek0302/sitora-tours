import { ReactNode } from 'react'
import { generateMetadata as generateTourMetadata } from './metadata'

type Props = {
  children: ReactNode
  params: Promise<{ slug: string; locale: string }>
}

export { generateTourMetadata as generateMetadata }

export default function TourLayout({ children }: Props) {
  return <>{children}</>
}
