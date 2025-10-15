import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Disable memory-intensive optimizations for VPS
    optimizeCss: false,
    // Reduce memory usage
    memoryBasedWorkersCount: true,
    workerThreads: false,
    // Disable other memory-intensive features
    webpackBuildWorker: false,
    serverComponentsExternalPackages: [],
  },
  // Disable SWC for memory savings
  swcMinify: false,
  // Reduce build concurrency
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      aggregateTimeout: 300,
      poll: false,
    }

    // Reduce parallelism for memory efficiency
    config.parallelism = 1

    // Memory optimization
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    }

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Disable source maps to save memory
  productionBrowserSourceMaps: false,
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })
