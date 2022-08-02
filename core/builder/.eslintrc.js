module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "env": {
    node: true,
    es6: true
  },
  "plugins": ["@typescript-eslint"], //定义了该eslint文件所依赖的插件
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "import/no-deprecated": ["off"],
    "consistent-return": ["error", { treatUndefinedAsUnspecified: true }],
    "no-return-assign": ["error", "except-parens"],
    "no-shadow": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off",
    "no-void": "off",
    "no-use-before-define": ["error", { functions: false }],
    "no-console": "off",
    "no-debugger": process.env.MIGC_CLI_ENV === "production" ? "error" : "off",
    "global-require": "off",
    "prefer-template": "error",
    "no-useless-concat": "error",
    "quote-props": ["warn", "consistent"],
    "@typescript-eslint/no-explicit-any": "off",
    // Array object 解构
    "prefer-destructuring": ["error", { object: true, array: false }],
    "quotes": ["warn", "double", { "avoidEscape": true }]
  },
  "parserOptions": {
    ecmaVersion: 6,
    sourceType: "module"
  }
}
