/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Remove/avoid invalid experimental.serverActions boolean;
  // If you need server actions, you can configure them properly later.
};
export default nextConfig;