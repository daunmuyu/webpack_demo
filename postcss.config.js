const autoprefixer = require('autoprefixer');
const precss = require('precss');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    precss(),
    presetEnv(),
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9',
      ],
      flexbox: 'no-2009',
    }),
  ],
};
