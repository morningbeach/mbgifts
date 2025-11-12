/** @type {import('next').NextConfig} */
const nextConfig = {
  // 不做 export，讓動態頁交給 Functions 執行
  experimental: {
    runtime: 'edge',
    serverActions: { allowedOrigins: ['*'] },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // ✅ 僅瀏覽器端提供 polyfill
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        'node:stream': 'stream-browserify',
      };
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        stream: 'stream-browserify',
        async_hooks: false,
      };
    } else {
      // ✅ Server/Edge 端禁用瀏覽器 polyfills
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
