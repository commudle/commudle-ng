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
