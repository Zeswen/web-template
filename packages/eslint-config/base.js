/** @type import('eslint').ESLint.ConfigData */
module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
