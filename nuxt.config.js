import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - at',
    title: 'at',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)

  router: {
    middleware: 'router-auth'
  },
  plugins: [
    // '~/plugins/fireauth.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],
  firebase: {
    lazy: false,
    config: {
      apiKey: 'AIzaSyBaglTYdI8UVzTJO_IIx5jC--FaGIAtyCE',
      authDomain: 'az-company-ltd.firebaseapp.com',
      databaseURL: 'https://az-company-ltd-default-rtdb.firebaseio.com',
      projectId: 'az-company-ltd',
      storageBucket: 'az-company-ltd.appspot.com',
      messagingSenderId: '740280241247',
      appId: '1:740280241247:web:eb3fb9349addfbd4a69fea',
      measurementId: 'G-W281R96YG2'
    },
    onFirebaseHosting: false,
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged'
        },
        ssr: true,
        // emulatorPort: process.env.NODE_ENV === 'development' ? 9099 : undefined,
        disableEmulatorWarnings: false
      },
      firestore: {
        memoryOnly: false,
        emulatorPort: process.env.NODE_ENV === 'development' ? 8080 : undefined
      },
      functions: {
        emulatorPort:
          process.env.NODE_ENV === 'development' ? 12345 : undefined
      },
      storage: true,
      database: true,
      performance: true,
      analytics: true,
      remoteConfig: {
        settings: {
          fetchTimeoutMillis: 60000,
          minimumFetchIntervalMillis: 43200000
        },
        defaultConfig: {
          welcome_message: 'Welcome'
        }
      },
      messaging: {
        createServiceWorker: true,
        actions: [
          {
            action: 'goToLupasGithub',
            url: 'https://github.com/lupas'
          },
          {
            action: 'goToModuleGithub',
            url: 'https://github.com/nuxt-community/firebase-module'
          }
        ],
        fcmPublicVapidKey:
          'BL_xoiuOe5vbb2vJkCNnuswn03NwCsyCkJUgRbuQA5tpg7J4E4z50MO8b-wrrad6fcysYAaFjHqU7D9o0oCWL8w'
      }
    }
  },
  // auth: {
  //   persistence: 'local', // default
  //   initialize: {
  //     onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
  //     onAuthStateChangedAction: 'onAuthStateChangedAction',
  //     subscribeManually: false
  //   },
  //   ssr: false, // default
  //   emulatorPort: 9099,
  //   emulatorHost: 'http://localhost',
  // },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
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

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
