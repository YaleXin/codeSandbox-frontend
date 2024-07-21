const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = defineConfig({
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
  configureWebpack: {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
  },
});
