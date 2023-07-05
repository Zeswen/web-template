/** @type import('eslint').ESLint.ConfigData */
module.exports = {
  root: true,
  extends: ['@zeswen/eslint-config/react', 'plugin:storybook/recommended'],
  parserOptions: {
    project: './packages/ui/tsconfig.json',
  },
};
