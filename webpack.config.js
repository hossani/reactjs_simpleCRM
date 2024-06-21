// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, "src", "index.js"), // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: 'bundle.js' // Output bundle file name
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"), // Template for generating the HTML file
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Files to be processed by Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets
          },
        },
      },
      {
        test: /\.css$/, // Files to be processed by CSS loaders
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader', // Interprets @import and url() like import/require() and will resolve them
          'postcss-loader', // PostCSS loader
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // File extensions to be resolved
  },
  devServer: {
    port: 7000, // Port for the development server
  },
};