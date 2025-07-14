// module.exports = {
//   presets: ["metro-react-native-babel-preset"],
//   plugins: ["@babel/plugin-syntax-jsx", "@babel/plugin-transform-react-jsx", "react-native-reanimated/plugin"]
// };

export default function (api) {
  api.cache(true);
  return {
    presets: ['@react-native/babel-preset'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
