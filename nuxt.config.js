const pkg = require('./package')

const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/youtube-caption-downloader/'
  }
} : {}

module.exports = {
  mode: 'spa',
  loading: false,
  ...routerBase,
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
  modules: [
    '@nuxtjs/axios',
    'nuxt-buefy'
  ],
  css: [
    '@/assets/scss/buefy.scss'
  ],
  generate: {
    dir: 'docs'
  },
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
