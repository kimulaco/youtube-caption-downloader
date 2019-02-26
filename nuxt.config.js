const pkg = require('./package')

module.exports = {
  mode: 'spa',
  htmlAttrs: {
    lang: 'ja'
  },
  head: {
    title: 'YouTube Caption Downloader',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ]
  },
  loading: false,
  modules: [
    '@nuxtjs/axios',
    'nuxt-buefy'
  ],
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
