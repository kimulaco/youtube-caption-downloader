module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs'
  ],
  rules: {
    'no-console': 0,
    'vue/multiline-html-element-content-newline': 0
  }
}
