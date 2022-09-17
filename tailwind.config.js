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
        'Sonic-Silver': '#777777',
        'Blue-Jeans': ' #29a5ff',
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
        '2px': '2px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '9px': '9px',
        '10px': '10px',
        '14px': '14px',
        '17px': '17px',
        '20px': '20px',
        '30px': '30px',
        '68px': '68px',
        '72px': '72px',
        '76px': '76px',
        '78px': '78px',
        '86px': '86px',
        '120px': '120px',
        '140px': '140px',
        '152px': '152px',
        '156px': '156px',
        '169px': '169px',
        '212px': '212px',
        '220px': '220px',
        '260px': '260px',
        '296px': '296px',
        '300px': '300px',
        '307px': '307px',
        '318px': '318px',
        '500px': '500px',
        '630px': '630px',
        '800px': '800px',
        '95vh': '95vh',
        '95vw': '95vw',
        '100vw': '100vw',
      },
      borderWidth: {
        /* Setting the default border width to 1px and 3px. */
        DEFAULT: '1px',
        3: '3px',
      },
      lineHeight: {
        /* Adding custom line height to the tailwind config. */
        '14px': '14px',
        '21px': '21px',
        '30px': '30px',
      },
      boxShadow: {
        /* Adding a box shadow to the element. */
        Card: '0 5px 15px #dae0ff',
        'Chat-box': '0 7px 29px 0 #64646f33 '
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
