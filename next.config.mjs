import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Add basePath for VPS deployment with subpath (leave empty for root domain)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // Ensure assets work correctly with basePath
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // Skip type checking during build (types are checked by IDE)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: webpackConfig => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
