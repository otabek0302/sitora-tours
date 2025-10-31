import { ReactNode } from 'react'
import { generateMetadata as generateCityMetadata } from './metadata'

type Props = {
  children: ReactNode
  params: Promise<{ slug: string; locale: string }>
}

export { generateCityMetadata as generateMetadata }

export default function CityLayout({ children }: Props) {
  return <>{children}</>
}
