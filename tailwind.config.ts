import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
        display: ['var(--font-geist)', 'Geist', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '16px',
            lineHeight: '1.6',
            letterSpacing: '-0.011em',
          }
        }
      }
    },
  },
  plugins: [],
}
export default config