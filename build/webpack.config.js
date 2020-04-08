const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    hot: true,
    inline: true,
    historyApiFallback: true,
    compress: true,
    port: 3000,
    overlay: true
  },
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /(\.css|\.scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      { 
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        } 
      },
      {
        test: /\.(eot|woff|woff2|otf|ttf)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}

// module.exports = {
//   devServer: {
//     contentBase: join(__dirname, "dist"),
//     hot: true,
//     inline: true,
//     historyApiFallback: true,
//     compress: true,
//     port: 3000,
//     overlay: true
//   },
//   devtool: 'source-map',
//   entry: "./src/index.js",
//   cache: true,
//   target: 'web',
//   output: {
//     path: `${__dirname}/dist`,
//     publicPath: 'http://localhost:3000/',
//     filename: "main.js"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader'
//         },
//       },
//       {
//         test: /(\.css|\.scss)$/,
//         loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
//       },
//       { test: /\.(jpe?g|png|gif)$/i, loaders: ['file-loader'] },
//       { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
//       {
//         test: /\.(eot|svg|woff|woff2|otf|ttf)$/,
//         exclude: /node_modules/,
//         loader: 'file-loader',
//         options: {
//             name: '[path][name].[ext]'
//         }
//       }
//     ]
//   }
// };
