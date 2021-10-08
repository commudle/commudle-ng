module.exports = {
  prefix: 'com-',
  jit: 'true',
  purge: {
    enabled: true,
    content: ['./projects/**/*.{html,scss,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
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
