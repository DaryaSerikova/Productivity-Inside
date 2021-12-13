const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',

  output: {
    // path: path.resolve(__dirname, 'build'),
    path: path.resolve(__dirname, 'dist'),
    //path: path.join(basePath, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      bootstrapPath: path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.min.css'),
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
  module: {
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      hot: true
   },
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
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};