/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    runtime: 'edge',
    serverActions: { allowedOrigins: ['*'] },
  },
  webpack: (config) => {
    config.resolve.fallback = {
      async_hooks: false, // 防止 Cloudflare Pages build error
    };
    return config;
  },
};
export default nextConfig;
