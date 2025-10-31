import { ReactNode } from 'react'
import { generateMetadata as generateCarMetadata } from './metadata'

type Props = {
  children: ReactNode
  params: Promise<{ slug: string; locale: string }>
}

export { generateCarMetadata as generateMetadata }

export default function CarLayout({ children }: Props) {
  return <>{children}</>
}
