/** @type import('eslint').Linter.Config */
module.exports = {
  root: true,
  extends: ['next/core-web-vitals', '@zeswen/eslint-config/react'],
  settings: {
    next: {
      rootDir: './apps/web/',
    },
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
