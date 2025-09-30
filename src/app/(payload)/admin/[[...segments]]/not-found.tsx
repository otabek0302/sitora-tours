import type { Metadata } from 'next'
import config from '@payload-config'

import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

export const generateMetadata = ({ params, searchParams }: { params: Promise<{ segments: string[] }>; searchParams: Promise<{ [key: string]: string | string[] }> }): Promise<Metadata> => generatePageMetadata({ config, params, searchParams })

const NotFound = ({ params, searchParams }: { params: Promise<{ segments: string[] }>; searchParams: Promise<{ [key: string]: string | string[] }> }) => NotFoundPage({ config, params, searchParams, importMap })

export default NotFound
