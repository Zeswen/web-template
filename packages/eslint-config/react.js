/** @type import('eslint').ESLint.ConfigData */
module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'prettier'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'react/button-has-type': 'off',
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
      },
    },
  ],
};
