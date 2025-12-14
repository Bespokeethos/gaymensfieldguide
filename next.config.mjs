import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  
  // Performance & Security
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  
  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  

  // Temporary: Debugging Build Crash
  typescript: {
    ignoreBuildErrors: true,
  },

  // Bundle Optimization
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns', 'framer-motion'],
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as needed
})

export default withMDX(nextConfig)
