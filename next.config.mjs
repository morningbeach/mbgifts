/** @type {import('next').NextConfig} */
const nextConfig = {
  // 不使用 experimental.runtime；每頁用 `export const runtime = 'edge'`
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 只在瀏覽器端提供 polyfills
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
      // Server/Edge 端禁用瀏覽器 polyfills，避免 `self is not defined`
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
