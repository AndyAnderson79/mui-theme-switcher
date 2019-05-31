const path = require('path');
const BrotliPlugin = require('brotli-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

require('dotenv-defaults').config({
  path: __dirname + '/.env',
  encoding: 'utf8',
  defaults: __dirname + '/.env.defaults',
});

const config = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.html$/,
        exclude: /template\.html$/,
        use: {
          loader: 'html-loader',
          options: { 
            minimize: true,
            removeComments: false,
            collapseWhitespace: true,
          },
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          }
        }
      },
      {
        test: /\.geojson$/,
        loader: 'json-loader',
      },
    ]
  },
  plugins: [
    new Dotenv({
      defaults: __dirname + '/.env.defaults',
      path: __dirname + '/.env',
    }),
    new HtmlWebPackPlugin({
      template: './src/template.html',
      title: process.env.APP_TITLE,
      filename: 'index.html'
    }),
  ],
};

module.exports = (env, argv={ mode: 'development'}) => {
  switch (argv.mode) {
    default:
    case 'development': {
      return {
        ...config,
        devServer: {
          compress: true,
          historyApiFallback: true,
          host: process.env.DEV_HOST,
          open: true,
          port: process.env.DEV_PORT,
        },
        devtool: 'eval-source-map',
      }
    }

    case 'production': {
      return {
        ...config,
        output: {
          path: path.resolve(__dirname, 'build'),
          filename: '[name].bundle.js',
        },
        optimization: {
          splitChunks: {
            cacheGroups: {
              commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
              },
            },
          },
        },
        plugins: [
          ...config.plugins,
          new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
          }),
        ],
      }
    }
  }
}
