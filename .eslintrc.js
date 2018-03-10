// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // 全局变量使用
  globals: {
    "eventBus": true,
    "eventCookie": true,
    "axios": true
  },
  // add your custom rules here
  'rules': {
    // 允许使用箭头函数
    'arrow-parens': 0,
    // 允许使用async-await
    'generator-star-spacing': 0,
    // 开发中可以使用debuger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 不使用var声明
    "no-var": "error",
    // 必须添加分号
    "semi": ["error", "always"],
  }
}
