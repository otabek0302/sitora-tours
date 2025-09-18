import { postgresAdapter } from '@payloadcms/db-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';

import path from 'path';
import sharp from 'sharp';

import { Users, Media, Categories, Cities, Tours, Hotels, Cars, Reviews } from './collections';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  localization: {
    locales: ['uz', 'ru', 'en'],
    defaultLocale: 'en',
  },
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Categories, Cities, Tours, Hotels, Cars, Reviews],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || '' } }),
  sharp,
  plugins: [payloadCloudPlugin()],
});
