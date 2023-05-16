module.exports = {
  plugins: [
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-optional-chaining",
  ],
  presets: ["@babel/preset-env", "@babel/preset-react"],
};
