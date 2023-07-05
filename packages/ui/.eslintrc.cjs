/** @type import('eslint').ESLint.ConfigData */
module.exports = {
  root: true,
  extends: ['@zeswen/eslint-config/react', 'plugin:storybook/recommended'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
