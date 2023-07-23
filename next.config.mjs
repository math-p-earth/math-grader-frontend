import './src/env.mjs'

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  compiler: {
    removeConsole: isProd && {
      exclude: ['error', 'warn'],
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
