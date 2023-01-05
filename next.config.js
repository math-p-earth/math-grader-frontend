/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REACT_APP_BACKEND_URL: 'http://localhost:3001/api'
  }
}

module.exports = nextConfig
