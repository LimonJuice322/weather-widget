const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/weather-widget/' : '/',
  transpileDependencies: true,
  css: {
    extract: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.delete('type');
    svgRule.delete('generator');
    svgRule
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  }
})
