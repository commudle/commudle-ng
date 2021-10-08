module.exports = {
  prefix: 'com-',
  jit: 'true',
  purge: {
    enabled: true,
    content: ['./projects/**/*.{html,scss,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      lineClamp: {
        15: '15'
      }
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
  corePlugins: {
    preflight: false,
  },
};
