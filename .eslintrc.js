module.exports = {
  root: true,
  extends: [
    'airbnb-typescript/base'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-console': ['warn', { allow: ['error', 'info', 'time', 'timeEnd'] }],
    'comma-dangle': ["error", "never"],
    "import/prefer-default-export": "off",
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc' }
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc' }
      }
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts']
      }
    }
  }
};
