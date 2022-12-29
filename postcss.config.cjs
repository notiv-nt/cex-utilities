const { resolve } = require('path');

module.exports = {
  plugins: [require('tailwindcss')(resolve(__dirname, './tailwind.config.cjs')), require('autoprefixer')],
};
