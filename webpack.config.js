const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (env) {
  const appDir = __dirname + '/' + env.appName
  const buildDir = appDir + '/build'
  return {
    entry: {
      app: appDir + '/app.js',
    },
    output: {
      path: appDir + '/build',
      filename: '[name].js',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({ title: 'AppName' })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ["env", {
                  "targets": {
                    "browsers": ["last 2 versions", "safari >= 7"]
                  }
                }]
              ]
            },
          }],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
          loader: 'url-loader',
          query: {
            limit: 10000, // use data url for assets <= 10KB
            name: 'assets/[name].[hash].[ext]'
          },
        }
      ],
    },
    devServer: {
      contentBase: buildDir,
      compress: true,
      port: 9000,
      hot: true
    }
  }
}