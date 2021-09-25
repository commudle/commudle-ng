module.exports = {
  prefix: "com-",
  jit: "true",
  purge: {
    enabled: true,
    content: ["./projects/**/*.{html,scss,ts}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
