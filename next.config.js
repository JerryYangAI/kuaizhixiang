const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Cloudflare Pages 配置
  // 注意：headers() 会导致动态渲染，对于静态站点生成，这些安全头应该在 Cloudflare Pages 的配置中设置
  // 如果需要这些安全头，可以在 Cloudflare Pages 的 Dashboard 中通过 Page Rules 或 Workers 设置
}

module.exports = withNextIntl(nextConfig);