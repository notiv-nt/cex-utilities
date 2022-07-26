module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint'],

  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  rules: {
    'no-console': 'off',
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
