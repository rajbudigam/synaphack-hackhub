/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    serverActions: {
      allowedOrigins: process.env.NODE_ENV === 'development' 
        ? ['localhost:3000', '*.app.github.dev'] 
        : undefined
    }
  },
  images: { 
    remotePatterns: [{ protocol: 'https', hostname: '**' }] 
  },
};
export default nextConfig;