/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Important for containerized deployments
  experimental: {
    serverActions: true,
  },
};
export default nextConfig;
