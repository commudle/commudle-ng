module.exports = {
  prefix: 'com-',
  content: ['./dist/**/*.html', './projects/**/*.{html,scss,ts}'],
  theme: {
    extend: {
      colors: {
        'Spiro-Disco': '#1ac7e340',
        'Brilliant-Azure':'#2aa5ff',
      },
      lineClamp: {
        14: '14',
      },
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-22': 'span 22 / span 22',
      },
      spacing: {
        5: '5px',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide'),
  ],
  corePlugins: {
    preflight: false,
  },
};
