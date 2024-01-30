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
      { hid: 'description', name: 'description', content: 'Программа долгосрочных сбережений. Копите на любые цели с поддержкой от государства' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      // { rel: 'icon', type: 'image/x-icon', href: '/promo/pds/test/favicon.ico' }
      // { rel: 'icon', type: 'image/x-icon', href: '/promo/pds/favicon.ico' }
    ],
    script: [
      { src: '/gtm.js', type: 'text/javascript', async: true }
      // { src: '/promo/pds/test/gtm.js', type: 'text/javascript', async: true }
      // { src: '/promo/pds/gtm.js', type: 'text/javascript', async: true }
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
    },
    {
      src: '~plugins/tippy.js',
      ssr: false
    },
    {
      src: '~plugins/gsap.js',
      ssr: false
    },
    {
      src: '~plugins/aos.js',
      ssr: false
    },
    {
      src: '~plugins/vue-js-modal.js',
      ssr: false
    },
    {
      src: '~plugins/vue-plyr.js',
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
    'nuxt-svg-loader'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['vue-scrollto/nuxt', { duration: 500, offset: -80 }],
    'nuxt-lazy-load'
  ],

  server: {
    host: '192.168.1.101', // TODO временно для тестирования
    port: 8080
  },

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
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true
          },
          js: {
            name: 'js',
            test: /\.js$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }
  },

  router: {
    base: '/'
    // base: '/promo/pds/test'
    // base: '/promo/pds'
  },

  generate: {
    dir: 'dist'
  }
};
