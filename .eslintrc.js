module.exports = {
  root: true,
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  env: {
    browser: true,
    node: true,
    es6: 'es2018',
  },
  rules: {
    indent: ["error", 2],
    "comma-dangle": 0,
  },
};
