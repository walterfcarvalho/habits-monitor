/*
  https://dev.to/ansonh/simplest-way-to-install-babel-plugins-in-create-react-app-7i5
*/

const { useBabelRc, override } = require('customize-cra')

module.exports = override(useBabelRc())