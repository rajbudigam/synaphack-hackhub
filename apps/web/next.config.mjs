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
      // Disable origin validation in development (GitHub Codespaces)
      allowedOrigins: process.env.NODE_ENV === 'development' 
        ? ['*'] 
        : [
            'localhost:3000',
            '*.app.github.dev',
            'friendly-space-tribble-jjr7qqg6q6qg2qpx-3000.app.github.dev'
          ]
    }
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ]
  }
};
export default nextConfig;