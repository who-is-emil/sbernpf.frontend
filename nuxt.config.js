export default {
  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'СберНПФ (НПФ Сбербанка)',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    './assets/scss/main.scss'
  ],

  styleResources: {
    scss: [
      './assets/scss/vars/index.scss',
      './assets/scss/mixins/index.scss'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~plugins/vue-slider-component.js',
      ssr: false
    },
    {
      src: '~plugins/vue-select.js',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    // '@nuxtjs/svg'
    'nuxt-svg-loader'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  svg: {
    vueSvgLoader: {
      // options
    },
    svgSpriteLoader: {
      // options
    },
    fileLoader: {
      // options
    }
  },

  env: {
    API_URL: process.env.API_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    // base: process.env.NODE_ENV === 'production' ? '/sbernpf.frontend/dist/' : './'
    base: './'
  },

  generate: {
    dir: 'dist'
  }
};
