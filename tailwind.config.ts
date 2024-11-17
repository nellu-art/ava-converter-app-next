import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: '#a6ce39',
        dark: '#001300',
        grey: '#121712',
        lightGrey: '#D9D9D9',
        opacity3: 'rgba(255, 255, 255, 0.03)',
        opacity10: 'rgba(255, 255, 255, 0.1)',
      },
      spacing: {
        '18': '1.125rem',
        '24': '1.5rem',
      },
      fontFamily: {
        miriam: ['var(--font-miriam)', 'sans-serif'],
        rammetto: ['var(--font-rammetto)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
