const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlWebPackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cleanWebpackPlugin = new CleanWebpackPlugin();
const CopyWebpackPlugin = require('copy-webpack-plugin');
const copyWebpackPlugin = new CopyWebpackPlugin([{ from: 'assets/style', to: 'style' }])

module.exports = {
  devtool: false,
  entry: {
    app: './src/js/app.js'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      enforce: "pre",
      exclude: /node_modules/,
    },
    {
        test:/\.css$/,
        use:['style-loader','css-loader']
    }]
  },
  plugins: [htmlWebPackPlugin, cleanWebpackPlugin, copyWebpackPlugin],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
