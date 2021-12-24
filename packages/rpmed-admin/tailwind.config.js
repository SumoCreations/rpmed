module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    inset: {
      0: 0,
      auto: 'auto',
      '1/2': '50%',
      100: '100%',
    },
    extend: {
      colors: {
        body: '#3b3a3d',
        destructive: '#d73a49',
        button: '#66cd00',
        background: '#fefefe',
        active: '#4b5472',
        navigation: { primary: '#fcfaff', secondary: '#4b5472' },
        primary: '#4b5472',
        secondary: '#e6e5e8',
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['first', 'last'],
    },
  },
  plugins: [],
}
