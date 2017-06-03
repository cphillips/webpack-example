const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = function (env) {
  const appDir = __dirname + '/' + env.appName
  const buildDir = appDir + '/build'
  let plugins = null
  let cssLoader = null
  let devtools = null

  if (env.production) {
    devtools = 'source-map'
    plugins = [
      new HtmlWebpackPlugin({ title: env.AppName }),
      new ExtractTextPlugin("style.css")
    ]
    cssLoader = {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{ loader: 'css-loader', options: { importLoaders: 1 } },
              'postcss-loader']
      })
    }
  } else {
    devtools=false
    plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({ title: env.AppName })
    ]
    cssLoader = {
      test: /\.css$/,
      use: ['style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader']
    }
  }

  return {
    devtool: devtools,
    entry: {
      app: appDir + '/app.js',
    },
    output: {
      path: appDir + '/build',
      filename: '[name].js',
    },
    plugins: plugins,
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [["env", { "targets": { "browsers": ["last 2 versions", "safari >= 7"] } }]]
            },
          }],
        },
        cssLoader,
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
      port: 9000,
      hot: true
    }
  }
}