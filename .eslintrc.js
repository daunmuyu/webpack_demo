module.exports = {
  root: true,
  extends: "airbnb",
  parser: "babel-eslint",
  globals: {
    Babel: true
  },
  parserOptions: {
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ["html"],
  rules: {
    "global-require": "off",
    "no-alert": "off",
    "quotes": 0,
    "import/newline-after-import": 0,
    "no-unused-vars": 0,
    "arrow-parens": 0,
    "comma-dangle": 0,
    "import/no-unresolved": "off",
    "no-underscore-dangle": "off",
    "no-new-func": "off",
    "no-new": "off",
    "new-cap": "off",
    "no-param-reassign": "off",
    "import/extensions": "off",
    "no-restricted-syntax": "off",
    "import/no-extraneous-dependencies": "off",
    "arrow-body-style": "off",
    "linebreak-style": "off",
    "no-console": "off",
    "max-len": "off",
    "import/no-dynamic-require": "off",
    "no-useless-escape": "warn",
    "guard-for-in": "off",
    "jsx-a11y/href-no-hash": 0,
    "no-shadow": [1, {"builtinGlobals": false, "hoist": "functions", "allow": []}],
    "consistent-return": 0
  }
};
