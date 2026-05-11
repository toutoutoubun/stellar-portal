/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        stellar: {
          bg: '#081014',
          panel: '#10191d',
          panel2: '#141f23',
          border: '#2e3c3f',
          text: '#e7e1d2',
          muted: '#8e978f',
          accent: '#b58a4a',
          accent2: '#7f8f7a',
          danger: '#9b4d42'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        body: ['system-ui', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'YuGothic', 'Meiryo', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'Hiragino Mincho ProN', 'Yu Mincho', 'serif']
      },
      boxShadow: {
        terminal: '0 0 0 1px rgba(46,60,63,.85), 0 18px 60px rgba(0,0,0,.25)'
      }
    }
  },
  plugins: []
};
