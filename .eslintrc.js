module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/jsx-props-no-spreading': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'react/destructuring-assignment': 'off',
    'no-unused-vars': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
