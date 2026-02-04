import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep blue backgrounds
        'dark-base': '#0A0E1A',
        'dark-elevated': '#0F1629',
        'dark-card': '#1A2332',
        
        // Rich blue palette
        'blue-50': '#EBF8FF',
        'blue-100': '#BEE3F8',
        'blue-200': '#90CDF4',
        'blue-300': '#63B3ED',
        'blue-400': '#4299E1',
        'blue-500': '#3182CE',
        'blue-600': '#2B77CB',
        'blue-700': '#2C5AA0',
        'blue-800': '#2A4A7C',
        'blue-900': '#1A365D',
        
        // Primary blue accents
        'accent-blue': '#2563EB',
        'accent-blue-light': '#3B82F6',
        'accent-blue-dark': '#1D4ED8',
        'accent-blue-bright': '#60A5FA',
        
        // Cyan accents for highlights
        'cyan-400': '#22D3EE',
        'cyan-500': '#06B6D4',
        'cyan-600': '#0891B2',
        
        // Text colors with blue tints
        'text-primary': '#F1F5F9',
        'text-body': '#CBD5E1',
        'text-muted': '#94A3B8',
        'text-secondary': '#64748B',
        
        // Blue-tinted borders
        'border-subtle': 'rgba(59, 130, 246, 0.1)',
        'border-blue': 'rgba(37, 99, 235, 0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px rgba(0, 0, 0, 0.6)',
        'glow-blue': '0 0 20px rgba(37, 99, 235, 0.4)',
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.3)',
        'inner-blue': 'inset 0 1px 0 rgba(59, 130, 246, 0.1)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
    },
  },
  plugins: [],
}
export default config