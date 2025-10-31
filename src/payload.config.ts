import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import path from 'path'
import sharp from 'sharp'

import { Users, Media, Categories, Cities, Tours, Hotels, Cars, Reviews } from './collections'
import { Pages } from './globals'
import { env } from './lib/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  localization: {
    locales: ['uz', 'ru', 'en'],
    defaultLocale: 'en',
  },
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: '- Sitora Tours',
    },
  },
  collections: [Users, Media, Categories, Cities, Tours, Hotels, Cars, Reviews],
  globals: [Pages],
  secret: env.PAYLOAD_SECRET,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: env.DATABASE_URI },
    push: true,
  }),
  sharp,
  plugins: [payloadCloudPlugin()],

  // CORS Configuration for VPS deployment
  cors: ['http://localhost:3000', 'http://localhost:3000/en', 'http://45.144.178.238:3000', 'http://45.144.178.238', 'http://ubuntu.orb.local', 'https://sitoratour.uz', 'https://www.sitoratour.uz', 'http://www.sitoratour.com', 'https://www.sitoratour.com', 'http://sitoratour.com', 'http://sitoratour.com/en', 'https://sitoratour.com', 'https://sitoratour.com/en'],

  // CSRF Configuration (same as CORS)
  csrf: ['http://localhost:3000', 'http://localhost:3000/en', 'http://45.144.178.238:3000', 'http://45.144.178.238', 'http://ubuntu.orb.local', 'https://sitoratour.uz', 'https://www.sitoratour.uz', 'http://www.sitoratour.com', 'https://www.sitoratour.com', 'http://sitoratour.com', 'http://sitoratour.com/en', 'https://sitoratour.com', 'https://sitoratour.com/en'],

  // Express middleware CORS settings
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://sitoratour.com',
})
