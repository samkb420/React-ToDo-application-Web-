import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {HotModuleReplacementPlugin} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const defaultEnv = {
    dev: true,
    production: false,
};

export default (env = defaultEnv) => ({
  entry: [
    ...env.dev ? [
      'react-hot-loader/patch', // Needed to preserve state
      'webpack-dev-server/client?http://localhost:8080', // webpack dev server host and port
    ] : [],
    path.join(__dirname, 'src/index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    ...env.dev ? [
      new HotModuleReplacementPlugin(), // Globally enable hot code replacement
    ] : [
      new ExtractTextPlugin('[name].css'), //Create a css file when we run in production
    ],
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './public/index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /.js?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel',
            options: {
              plugins: ['react-hot-loader/babel'],
              babelrc: false,
              presets: [
                ['es2015', { modules: false }],
                'stage-2',
                'react'
              ]
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: env.dev ? 'style!css!sass' : ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css!sass'
        })
      },
      {
          test   : /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
          loader : 'file-loader'
      }
    ]
  },
  devServer: {
    hot: env.dev,
  }
});
