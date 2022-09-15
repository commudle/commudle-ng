/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'com-',
  content: ['./dist/**/*.html', './projects/**/*.{html,scss,ts}'],
  theme: {
    extend: {
      colors: {
        /* Adding custom colors to the tailwind config. by www.color-name.com */
        'Spiro-Disco': '#1ac7e340',
        'Brilliant-Azure': '#2aa5ff',
        'Caribbean-Green': '#00d68f',
        'gunmetal': '#2f2e41',
        'Silver-Sand': '#c4c4c4',
        'Azureish-White': '#dae0ff',
        'Very-Light-Blue': '#536eff',
        'Sonic-Silver': '#777777'
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
       /* Adding custom spacing to the tailwind config. */
        '5px': '5px',
        '6px': '6px',
        '20px': '20px',
        '30px': '30px',
        '72px': '72px',
        '140px': '140px',
        '152px': '152px',
        '156px': '156px',
        '212px': '212px',
        '260px': '260px',
        '296px': '296px',
        '630px': '630px',
        '800px': '800px',
        '95vh': '95vh',
        '95vw': '95vw',
      },
      borderWidth: {
        /* Setting the default border width to 1px. */
        DEFAULT: '1px',
      },
      lineHeight: {
        /* Adding custom line height to the tailwind config. */
        '14px': '14px',
        '30px': '30px',
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
