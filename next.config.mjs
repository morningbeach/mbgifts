/** @type {import('next').NextConfig} */
const nextConfig = {
  // 讓 next-on-pages 產出 .vercel/output
  output: 'export',

  // Edge/Workers 環境避免拉到 Node 核心模組
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // 若有相依誤用 node:stream，直接禁用（或用瀏覽器替代）
      'node:stream': false,
    };
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      stream: false,
      async_hooks: false,
    };
    return config;
  },
};

export default nextConfig;
