import axios from 'axios'
import webpack from 'webpack'
import whitelister from 'purgecss-whitelister'

export default {
  target: process.env.TARGET,
  env: {
    BASE_URL: process.env.BASE_URL,
    APP_TITLE: process.env.APP_TITLE,
    CMS_URL: process.env.CMS_URL,
    TARGET: process.env.TARGET,
    GA_ID: process.env.GA_ID,
  },
  head: {
    title: process.env.APP_TITLE || 'DMBK',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { 
    color: '#fff'
  },
  css: [
    '~assets/css/main.css',
    '~assets/css/app.css',
    '~assets/css/flickity.css'
  ],
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  },
  plugins: [
    { src: '~plugins/event-bus' },
    { src: '~plugins/vue-fragment' },
    { src: '~plugins/vue-scroll-lock' },
    { src: '~plugins/vuekonva', mode: 'client' },
    { src: '~plugins/vue-intersect', mode: 'client' },
    { src: '~plugins/observer', mode: 'client' },
    { src: '~plugins/vue-flickity', mode: 'client' },
    { src: `~plugins/vimeo-player`, mode: 'client' },
    { src: '~plugins/youtube-player', mode: 'client' },
    { src: '~plugins/vue-inline-svg' },
    { src: '~plugins/youtube-parser'},
    { src: '~plugins/vimeo-parser'},
    { src: '~plugins/stringToSlug'},
    { src: "~plugins/components" },
    { src: "~plugins/global" },
  ],
  buildModules: [
    'nuxt-purgecss',
    '@nuxtjs/google-analytics'
  ],
  purgeCSS: {
    whitelist: [
      ...whitelister([
        'assets/css/flickity.css',
        'assets/css/app.css'
      ])
    ]
  },
  googleAnalytics: {
    id: process.env.GA_ID,
  },
  modules: [
    '@nuxt/http',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'portal-vue/nuxt'
  ],
  http: {},
  server: {
    port: 8080,
    host: '0.0.0.0'
  },
  generate: {
    interval: 500,
    fallback: '404.html'
  },
  build: {
    vendor: [
      'vue-vimeo-player',
      'vue-youtube-embed'
    ],
    postcss: {
      plugins: {
        autoprefixer: {},
        'postcss-custom-media': {
          importFrom: [
            () => {
              const { screens } = require('./globals.json')
              const customMedia = {}
              for (let size in screens) {
                customMedia[`--${size}`] = `(min-width: ${screens[size]}px)`
              }
              return { customMedia }
            }
          ]
        }
      }
    }
  }
}
