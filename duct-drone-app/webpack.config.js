const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, './build');
const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});
// NOTE BUNDLE JS DIRECTORY GENERATION IN PRODUCTION AND DEV SERVER ARE NOT THE SAME!?!?
module.exports = {
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  plugins: [htmlPlugin],
};
