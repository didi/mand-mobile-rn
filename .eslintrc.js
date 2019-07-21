module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: ['plugin:prettier/recommended', 'plugin:react/recommended'],
  plugins: ['react', 'react-native'],
  rules: {
    'prettier/prettier': 'warn',
    'max-len': 120,
    'no-console': 'off'
  },
}
