module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 'warn',
    'max-len': 120,
    "react-native/no-inline-styles": 0,
    "jsx-quotes": "prefer-single",
    "object-curly-spacing": ["error", "always", { "arraysInObjects": false }],
  }
};
