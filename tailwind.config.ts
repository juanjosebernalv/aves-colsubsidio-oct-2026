import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // OLED base — pixels off = battery saved
        canvas: '#000000',

        // Surface layers (tonal elevation)
        surface: {
          DEFAULT: '#0B0F12',
          obsidian: '#0B0F12',   // darkest background
          elevated: '#12181F',   // modals, sheets, filter pills
          hover: '#1A232D',      // hover / focus state
          dim: '#101417',        // background fallback
          low: '#181c1f',
          high: '#262a2e',
          bright: '#363a3d',
          highest: '#313539',
          variant: '#313539',
          container: '#1c2023',
          'container-low': '#181c1f',
          'container-high': '#262a2e',
          'container-highest': '#313539',
        },

        // Primary — emerald bio-green (vitality, endemic, positive log)
        'primary-container': '#10b981',
        'on-primary-container': '#00422b',
        primary: {
          DEFAULT: '#10b981',
          light: '#34D399',
          fixed: '#6ffbbe',
          'fixed-dim': '#4edea3',
          dim: '#4edea3',
          dark: '#059669',
          container: '#10b981',
          on: '#003824',
        },

        // Secondary — scientific cyan (taxonomy, metrics, bioacoustics)
        secondary: {
          DEFAULT: '#06B6D4',
          light: '#4cd7f6',
          container: '#03b5d3',
          fixed: '#acedff',
          'fixed-dim': '#4cd7f6',
          on: '#003640',
          'on-container': '#00424e',
          'on-fixed': '#001f26',
          'on-fixed-variant': '#004e5c',
        },

        // Amber — conservation alert (IUCN threatened categories)
        'conservation-alert': '#F59E0B',
        amber: {
          DEFAULT: '#F59E0B',
          light: '#ffb95f',
          container: '#e29100',
          on: '#472a00',
        },

        tertiary: {
          DEFAULT: '#ffb95f',
          fixed: '#ffddb8',
          'fixed-dim': '#ffb95f',
          on: '#472a00',
          'on-fixed': '#2a1700',
          'on-fixed-variant': '#653e00',
          container: '#e29100',
          'on-container': '#523200',
        },

        // Error state
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
          on: '#690005',
          'on-container': '#ffdad6',
        },

        // Text on dark surfaces
        'on-surface': '#e0e3e7',
        'on-surface-variant': '#bbcabf',

        // Border / outline system
        'border-tactical': '#334155',
        tactical: '#334155',  // main hairline border
        outline: {
          DEFAULT: '#86948a',
          subtle: '#3c4a42',
          variant: '#3c4a42',
        },

        // Muted content tones
        muted: '#94A3B8',
        'text-muted': '#94A3B8',
        'text-dim': '#64748B',
        dim: '#64748B',

        // Scientific theme
        'scientific-teal': '#06B6D4',

        // Bio shades
        'emerald-bio-light': '#34D399',
        'emerald-bio-dark': '#059669',

        // Additional
        'true-black': '#000000',
        'inverse-surface': '#e0e3e7',
        'inverse-primary': '#006c49',
        'inverse-on-surface': '#2d3134',
      },

      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],  // Space Grotesk — headlines
        body: ['var(--font-body)', 'sans-serif'],        // Inter — body, descriptions
        mono: ['var(--font-mono)', 'monospace'],         // JetBrains Mono — metrics, taxonomy
      },

      fontSize: {
        // Headlines (Space Grotesk)
        'headline-xl': ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-xl-mobile': ['1.625rem', { lineHeight: '2rem', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-lg': ['1.5rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-md': ['1.25rem', { lineHeight: '1.625rem', fontWeight: '600' }],
        // Body (Inter)
        'body-lg': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-md': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'body-sm': ['0.75rem', { lineHeight: '1.125rem', fontWeight: '400' }],
        'scientific': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em', fontWeight: '400' }],
        // Mono labels (JetBrains Mono)
        'label-mono': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em', fontWeight: '700' }],
        'label-mono-sm': ['0.6875rem', { lineHeight: '0.875rem', letterSpacing: '0.04em', fontWeight: '500' }],
        'tag-mono': ['0.625rem', { lineHeight: '0.75rem', letterSpacing: '0.06em', fontWeight: '500' }],
      },

      spacing: {
        gutter: '0.75rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '0.75rem',
        'space-lg': '1.25rem',
        'space-xl': '2rem',
      },

      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideUp: 'slideUp 0.4s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
