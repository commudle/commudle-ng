import * as CompressionPlugin from 'compression-webpack-plugin';
import * as webpack from 'webpack';

export default {
  plugins: [
    new CompressionPlugin({
      algorithm: 'brotliCompress',
      filename: '[path][base].br',
      test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  ],
} as webpack.Configuration;
