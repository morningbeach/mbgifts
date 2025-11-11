/** @type {import('next').NextConfig} */
const nextConfig = {
  // 仍讓 next-on-pages 做靜態輸出，但動態頁會交給 Functions
  output: 'export',
  experimental: {
    runtime: 'edge',
    serverActions: { allowedOrigins: ['*'] },
  },
  webpack: (config, { isServer }) => {
    // ✅ 瀏覽器端：提供 node:stream 的瀏覽器替代
    if (!isServer) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'node:stream': 'stream-browserify',
      };
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        stream: require.resolve('stream-browserify'),
        async_hooks: false,
      };
    } else {
      // ✅ Server/Edge 端：不要載入 browser polyfills，避免使用 self/window
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'node:stream': false,
      };
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        stream: false,
        async_hooks: false,
      };
    }
    return config;
  },
};

export default nextConfig;
