import path from 'path'
import webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import Dotenv from 'dotenv-webpack'

const config: webpack.Configuration = {
  mode: 'development',

  entry: {
    app: './src/index.tsx',
    test: './src/test.tsx',
  },

  output: {
    filename: `[name].js`,
    path: path.resolve(process.cwd(), 'dist'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
    modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
      },

      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[name]__[local]--[hash:base64:7]',
            },
          },
        ],
      },

      {
        test: /\.styl$/,
        exclude: /\.module\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },

      {
        test: /\.module\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              localIdentName: '[name]__[local]--[hash:base64:7]',
            },
          },
          'stylus-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: '__test',
      templateContent: '<div id="test"></div>',
      chunks: ['test'],
    }),
  ],

  devServer: {
    stats: {
      modules: false,
    },
    historyApiFallback: true,
    port: 3000,
    // compress: true,
    // hot: true,
    // quiet: true,
  },
}

export default config
