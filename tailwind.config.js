module.exports = {
  prefix: 'com-',
  mode: 'jit',
  purge: ['./dist/**/*.html', './projects/**/*.{html,scss,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      lineClamp: {
        14: '14',
      },
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
      },
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
  corePlugins: {
    preflight: false,
  },
};
