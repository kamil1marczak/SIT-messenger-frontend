import colors from 'vuetify/es5/util/colors'

export default {

  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - sit-messenger',
    title: 'sit-messenger',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-build-optimisations'

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next', '@nuxtjs/toast', '@nuxt/http', '@nuxtjs/universal-storage', '@nuxtjs/date-fns'
  ],

  http: {
    // baseURL: process.env.APP_URL + '/api' || '/api' ||  'http://localhost:8000/api',
    baseURL: process.env.APP_URL || 'http://localhost:8000/api'
    // proxy: true
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.APP_URL || 'http://localhost:8000/api'
    // proxy: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  storage: {
    vuex: {
      namespace: 'storage'
    },
    cookie: {
      prefix: '',
      options: {
        path: '/'
      }
    },
    localStorage: {
      prefix: ''
    },
    ignoreExceptions: false,
  },

  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access',
          required: true,
          type: 'Bearer',
          maxAge: 60 * 60 * 24 * 3
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24,
        },
        user: {
          property: false,
          // autoFetch: true
        },
        endpoints: {
          login: {
            url: 'auth/jwt/create/',
            method: 'post',
          },
          logout: false,
          refresh: {
            url: 'auth/jwt/refresh',
            method: 'post'
          },
          user: {
            url: 'v1/users/me/',
            method: 'get'
          }
        }
      }
    }

  },

  toast: {
    position: 'top-center',
    iconPack: 'fontawesome',
    duration: 3000,
    register: [
      {
        name: 'defaultSuccess',
        message: payload =>
          !payload.msg ? 'Operation success' : payload.msg,
        options: {
          type: 'success',
          icon: 'check'
        }
      },
      {
        name: 'defaultError',
        message: payload =>
          !payload.msg ? 'Operation error' : payload.msg,
        options: {
          type: 'error',
          icon: 'times'
        }
      }
    ]
  },

  dateFns: {
    /* module options */
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

}
