module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "quotes": ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
    "semi": ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "no-console": "warn",
  },
  env: {
    node: true,
    jest: true,
  },
}; 