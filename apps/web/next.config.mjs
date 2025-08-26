/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      // Allow GitHub Codespaces and development environments
      allowedOrigins: process.env.NODE_ENV === 'development' 
        ? ['localhost:3000', '*.app.github.dev', 'friendly-space-tribble-jjr7qqg6q6qg2qpx-3000.app.github.dev'] 
        : ['localhost:3000']
    }
  },
  // Handle GitHub Codespaces forwarded headers
  async rewrites() {
    return []
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development' ? '*' : 'same-origin'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Forwarded-Host'
          }
        ]
      }
    ]
  }
};
export default nextConfig;