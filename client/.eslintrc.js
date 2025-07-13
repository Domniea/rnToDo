// module.exports = {
//   root: true,
//   extends: '@react-native',
// };
// module.exports = {
//   root: true,
//   parser: '@babel/eslint-parser',
//   extends: ['@react-native'],
//   parserOptions: {
//     requireConfigFile: false,
//     babelOptions: {
//       presets: ['module:@react-native/babel-preset'],
//     },
//     sourceType: 'module',
//   },
// };

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: ['@react-native'],
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['module:@react-native/babel-preset'],
    },
    sourceType: 'module',
  },
};
