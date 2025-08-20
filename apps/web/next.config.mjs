/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Remove/avoid invalid experimental.serverActions boolean;
  // If you need server actions, you can configure them properly later.
};
export default nextConfig;