/** @type import('eslint').ESLint.ConfigData */
module.exports = {
  extends: ['@zeswen/eslint-config/base'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
