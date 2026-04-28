/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Temporarily reduce page generation to fix build
  generateEtags: false,
  // Optimize for static generation
  swcMinify: true,
  // Reduce memory usage during build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('fs', 'path')
    }
    return config
  }
}

module.exports = nextConfig
