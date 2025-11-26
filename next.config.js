/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  output: 'export',
  basePath: '/AI-Visualizer-Neural-Network-Architecture',
  assetPrefix: '/AI-Visualizer-Neural-Network-Architecture/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
