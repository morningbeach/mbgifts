/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ 移除 output:'export'，避免 Next 在 build 階段強行靜態導出動態頁
  experimental: {
    runtime: 'edge',
    serverActions: { allowedOrigins: ['*'] },
  },
  webpack: (config, { isServer }) => {
    // ✅ 只在瀏覽器端提供 polyfill，避免 SSR 期觸發 self/window
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
      // ✅ Server/Edge 端禁用 browser polyfills
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
