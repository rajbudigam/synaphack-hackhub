const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
      bodySizeLimit: "2mb"
    }
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily ignore ESLint errors during build
  }
}

export default nextConfig