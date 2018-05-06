const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPLugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  // Entorno Base
  config = {
    entry: './src/js/main.js',
    output: {
      filename: 'application.js',
      sourceMapFilename: 'application.map'
    },
    module: {
      rules: [
        {
          test: /\.js$/, // compile javascript files
          include: [
            path.resolve(__dirname, 'src/js')
          ],
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
            plugins: ['transform-object-rest-spread', 'transform-object-assign']
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i, // compile scss files
          include: [
            path.resolve(__dirname, 'src/assets'),
            path.resolve(__dirname, 'src/scss/assets')
          ],
          loader: 'file-loader?name=assets/[hash].[ext]'
        },
        {
          test: /\.pug$/, // compile .pug templates
          include: [
            path.resolve(__dirname, 'src/js')
          ],
          loader: 'pug-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },
    resolve: {
      modules: [
        path.resolve('./src'),
        'node_modules'
      ],
      alias: { // make vue global accesible
        'vue$': 'vue/dist/vue.common.js'
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        API_HOST: JSON.stringify(process.env.API_HOST) || "'http://localhost:3000'",
      }),
      new HtmlWebpackPLugin({ // compile index.ejs and inject js
        template: 'src/index.ejs',
        favicon: 'src/assets/favicon.ico'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Vue: 'vue',
        API: [path.resolve(__dirname, 'src/js/services/api.js'), 'default']
      })
    ],
    devtool: 'source-map'

  };

  // Entorno de Desarrollo
  if (env === 'development') {
    config.output.path = path.resolve(__dirname, 'dev');

    config.module.rules.push({
      test: /\.scss$/, // compile scss files
      include: [
        path.resolve(__dirname, 'src/scss')
      ],
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    });

    config.devServer = {
      disableHostCheck: true,
      contentBase: path.join(__dirname, 'dev'),
      port: process.env.PORT || 8000
    };

    config.plugins.push(new CleanWebpackPlugin(['dev']));
  }
  // Entorno de Producción
  else {
    config.output.path = path.resolve(__dirname, 'dist');
    config.output.filename = 'application.[hash].js';

    config.module.rules.push({
      test: /\.scss$/, // compile scss files
      include: [
        path.resolve(__dirname, 'src/scss')
      ],
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader']
      })
    });

    config.plugins.push(new CleanWebpackPlugin(['dist']));
    config.plugins.push(new ExtractTextPlugin('application.[contentHash].css'));
  }

  return config;
};
