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
        background: '#F7F9FF',
        surface: '#FFFFFF',
        'surface-2': '#F0F4FF',
        'surface-3': '#E6EDFF',
        blue: {
          DEFAULT: '#1B4FD8',
          dark: '#1039A8',
          light: '#EEF3FF',
          50:  '#EEF3FF',
          100: '#D9E4FF',
          200: '#B3C8FF',
          300: '#80A4FF',
          400: '#4D7BFF',
          500: '#2558F0',
          600: '#1B4FD8',
          700: '#1039A8',
          800: '#0D2D82',
          900: '#0A2060',
        },
        teal: {
          DEFAULT: '#0891B2',
          50:  '#F0FBFF',
          100: '#CCEFFA',
          600: '#0891B2',
          700: '#0E7490',
        },
        indigo: {
          DEFAULT: '#4F46E5',
          50: '#EEF2FF',
          600: '#4F46E5',
        },
        text: {
          primary:   '#0B1221',
          secondary: '#3D4E6B',
          muted:     '#8094B4',
        }
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero': 'linear-gradient(135deg,#EEF3FF 0%,#F7F9FF 50%,#E8F4F8 100%)',
        'section-alt': 'linear-gradient(180deg,#EEF2FB 0%,#F7F9FF 100%)',
        'blue-gradient': 'linear-gradient(135deg,#1B4FD8 0%,#0891B2 100%)',
        'blue-gradient-dark': 'linear-gradient(135deg,#1039A8 0%,#1B4FD8 100%)',
        'card-hover': 'linear-gradient(135deg,rgba(27,79,216,0.04) 0%,rgba(8,145,178,0.04) 100%)',
      },
      boxShadow: {
        'sm':      '0 1px 6px rgba(15,30,80,0.06)',
        'md':      '0 4px 24px rgba(15,30,80,0.10)',
        'lg':      '0 12px 48px rgba(15,30,80,0.14)',
        'xl':      '0 24px 80px rgba(15,30,80,0.18)',
        'blue':    '0 4px 20px rgba(27,79,216,0.25)',
        'blue-lg': '0 8px 40px rgba(27,79,216,0.30)',
        'card':    '0 2px 12px rgba(15,30,80,0.08)',
        'card-hover': '0 12px 40px rgba(15,30,80,0.14)',
        'inner-blue': 'inset 0 1px 0 rgba(27,79,216,0.15)',
      },
      borderColor: {
        DEFAULT: 'rgba(27,79,216,0.12)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'ticker':     'ticker 35s linear infinite',
        'fade-up':    'slideUp 0.6s ease forwards',
        'spin-slow':  'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#3D4E6B',
            h1: { color: '#0B1221', fontFamily: 'var(--font-display)' },
            h2: { color: '#0B1221', fontFamily: 'var(--font-display)' },
            h3: { color: '#0B1221' },
            strong: { color: '#0B1221' },
            a: { color: '#1B4FD8' },
          }
        }
      }
    },
  },
  plugins: [],
}