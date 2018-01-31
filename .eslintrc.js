module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'no-useless-escape': 0,
    'space-before-function-paren': 0,
    'indent': 0,
    'quotes': 1,
    'space-before-blocks': 0,
  },
  globals: {
    _PROJECTNAME:true,
    _PROJECTNAME:true
  }
}
