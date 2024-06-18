module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/extensions': [
      'error',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-unresolved': 'off',
    // https://github.com/import-js/eslint-plugin-import/issues/422
    // vite and vite plugin react will be mostly used when building
    // its fine to have them inside dev-dependency
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
