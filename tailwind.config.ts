import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--white)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },

        /* 🚀 SITORA TOUR BRAND COLORS */
        sitora: {
          primary: 'var(--color-sitora-primary)',
          'primary-light': 'var(--color-sitora-primary-light)',
          'primary-dark': 'var(--color-sitora-primary-dark)',

          'gold-light': 'var(--color-sitora-gold-light)',
          'gold-medium': 'var(--color-sitora-gold-medium)',
          'gold-dark': 'var(--color-sitora-gold-dark)',

          heading: 'var(--color-sitora-text-heading)',
          subtitle: 'var(--color-sitora-text-subtitle)',
          body: 'var(--color-sitora-text-body)',
          muted: 'var(--color-sitora-text-muted)',

          white: 'var(--color-sitora-white)',
          black: 'var(--color-sitora-black)',

          error: 'var(--color-sitora-error)',
          warning: 'var(--color-sitora-warning)',
          success: 'var(--color-sitora-success)',

          outline: 'var(--color-sitora-outline)',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
