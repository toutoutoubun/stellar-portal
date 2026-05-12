/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        stellar: {
          bg: '#eee8df',
          panel: '#f4efe7',
          panel2: '#e5dccf',
          border: '#c9bdae',
          text: '#131313',
          muted: '#6d675f',
          accent: '#d6532e',
          accent2: '#315a73',
          danger: '#b6402b'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        body: ['system-ui', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', 'YuGothic', 'Meiryo', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'Hiragino Mincho ProN', 'Yu Mincho', 'serif']
      },
      boxShadow: {
        terminal: 'none'
      }
    }
  },
  plugins: []
};
