/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    runtime: 'edge',
    serverActions: { allowedOrigins: ['*'] }
  },
  webpack: (config) => {
    // 讓任何依賴 node:stream / stream 的套件在 Edge 上可用
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'node:stream': 'stream-browserify'
    };
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      stream: require.resolve('stream-browserify'),
      // 有些 bundler 也會嘗試用 async_hooks；這裡直接忽略以避免報錯
      async_hooks: false
    };
    return config;
  }
};
export default nextConfig;
