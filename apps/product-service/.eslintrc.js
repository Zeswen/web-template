/** @type import('eslint').ESLint.ConfigData */
module.exports = {
  extends: ['@zeswen/eslint-config/base'],
  parserOptions: {
    project: './apps/product-service/tsconfig.json',
  },
};
