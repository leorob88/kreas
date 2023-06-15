// must install "ESLint" and "Prettier" VS Code extensions to take advantage of auto code formatting
// ESLint: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
// Prettier: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  plugins: ['prettier'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        arrowParens: 'avoid',
        trailingComma: 'none',
        semi: false
      }
    ]
  }
}
