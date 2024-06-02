module.exports = {
  env: {
    browser: true, // 浏览器环境
    es2021: true
  },
  // eslint-config-standard
  extends: [
    'standard',
    'plugin:vue/strongly-recommended'
  ],
  // vue
  // 额外的rules+ 提供一套现成的规范
  plugins: [
    'vue'
  ],
  parserOptions: { // 解析配置
    ecmaVersion: 6,  //es6
    sourceType: 'module',  // es6 module
    ecmaFeature: {
      jsx: true
    }
  },
  rules: {
    "no-console": 2   // 2 error 1 warn  0 ignore  
  }
}
