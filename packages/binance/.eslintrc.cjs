const { resolve } = require('path');

module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: resolve(__dirname, './tsconfig.json'),
  },

  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
  },
};
