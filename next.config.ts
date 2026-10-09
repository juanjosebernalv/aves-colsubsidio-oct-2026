import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/aves-colsubsidio-oct-2026',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
