const { guessProductionMode } = require('@ngneat/tailwind')

module.exports = {
  mode: 'jit',
  prefix: '',
  content: {
    enabled: guessProductionMode(),
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    debugScreens: {
      position: ['top', 'left'],
    },
    extend: {
      border: {
        skin: {
          button: 'var(--color-button-border)',
        },
      },
      textColor: {
        skin: {
          base: 'var(--color-text-base)',
          contrast: 'var(--color-text-contrast)',
          links: 'var(--color-text-links)',
          highlight: 'var(--color-text-highlight)',
          error: 'var(--color-text-error)',
          'button-hover': 'var(--color-text-button-hover)',
          buttonText: 'var(--color-text-button)',

          formInput: 'var(--color-form-input)',
        },
      },
      backgroundColor: {
        skin: {
          base: 'var(--color-base)',

          fill: 'var(--color-secondary)',
          button: 'var(--color-button-bg-submit)',
          buttonDisable: 'var(--color-button-bg-disabled)',

          formMainBg: 'var(--color-form-bg)',
          formLightBg: 'var(--color-form-light-bg)',
          formError: 'var(--color-form-error)',
          buttonLight: 'var(--color-button-bg-light)',
          backgroundColor: 'var(--color-bg)',
        },
      },
      fontFamily: {
        'EB-Garamond': ['"EB Garamond"'],
        Montserrat: 'Montserrat',
      },
      colors: {
        width: {
          '128': '32rem',
        },
        dz: {
          dark: '#ffffff',
          light: '#FFFFFF',

          //buttons
          active: '#01B0D3',
          danger: '#f6f9fa',
          dangerhover: '#0f172a',
          activehover: '#234234',
        },
        slate: {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
        },
        cyan: {
          '50': '#f6f9fa',
          '100': '#e4f1fb',
          '200': '#c5ddf7',
          '300': '#99bbeb',
          '400': '#6c94db',
          '500': '#5470cc',
          '600': '#4554b6',
          '700': '#363f92',
          '800': '#252b68',
          '900': '#151a41',
        },
      },
    },
  },
  variants: {
    extend: { transform: ['hover'] },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('tailwindcss-debug-screens'),
  ],
}
