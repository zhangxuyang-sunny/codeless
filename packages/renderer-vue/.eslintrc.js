module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  plugins: ["simple-import-sort", "import"],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-undef": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-reserved-component-names": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "import/no-cycle": "warn"
  }
};
