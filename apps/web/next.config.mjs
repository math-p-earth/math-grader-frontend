import './src/env.mjs'

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
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
	transpilePackages: ['ui'],
}

export default nextConfig
