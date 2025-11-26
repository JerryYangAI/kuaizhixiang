/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#1E40AF',      // 专业蓝色
          green: '#059669',     // 专业绿色
          gold: '#F59E0B',      // 专业金色
          dark: '#111827',      // 深色
        },
        secondary: {
          light: '#F0F8FF',     // 淡蓝背景
          gray: '#6B7280',      // 中性灰
          dark: '#374151',      // 深灰文字
        },
        accent: {
          blue: '#3B82F6',      // 强调蓝
          green: '#10B981',     // 强调绿
          orange: '#F59E0B',    // 强调橙
        }
      },
      fontFamily: {
        'noto': ['Noto Sans SC', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}