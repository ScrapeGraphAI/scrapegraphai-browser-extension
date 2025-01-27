import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

export default (env) => {
  return {
    entry: {
      app: './src/index.js',
      background: './src/workers/background.js',
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve('./manifest_firefox.json'),
            to: path.resolve('dist/manifest.json'),
            filter: () => env?.firefox,
          },
          {
            from: path.resolve('./manifest_chromium.json'),
            to: path.resolve('dist/manifest.json'),
            filter: () => env?.chromium,
          },
          {
            from: path.resolve('./public'),
            to: path.resolve('dist/public'),
          },
        ],
      }),
    ],
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
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    mode: 'production',
  };
};
