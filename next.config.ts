import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'aerosolscientific.com' },
    ],
  },
}

export default nextConfig