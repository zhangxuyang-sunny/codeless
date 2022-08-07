module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-rational-order'
  ],
  overrides: [
      {
          files: ['**/*.{scss,css,sass}'], // css 相关文件由 postcss-scss 处理
          customSyntax: 'postcss-scss'
      },
  ],
}
