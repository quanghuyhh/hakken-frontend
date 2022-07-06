import i18n from './i18n'
import router from './router'
import { TOAST_CONFIG } from './config/consts'

export default {
  ssr: false,
  server: {
    port: process.env.APP_PORT // 5000 // default: 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'hakken-sougo-frontend',
    titleTemplate: '%s｜【HAKKEN】',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.typekit.net/ifs1xzg.css'
      }
    ],
    script: [
      {
        hid: 'google-map',
        src: 'https://maps.googleapis.com/maps/api/js?libraries=places&&language=ja&key=' + process.env.GOOGLE_API_KEY
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/lodash.js',
    '~/plugins/repository.js',
    '~/plugins/lazy-load-images.js',
    '~/plugins/vee-validate.js',
    '~/plugins/utils.js',
    '~/plugins/services.js',
    '~/plugins/swiper.js',
    '~/plugins/filters.js',
    '~/plugins/helpers.js',
    '~/plugins/vue-js-modal.js',
    '~/plugins/mask.js',
    '~/plugins/v-tooltip',
    '~/plugins/flatpickr.js',
    '~/plugins/event-bus.js',
    { src: '~/plugins/aws-amplify.js', ssr: false },
    { src: '~/plugins/calendar.js', ssr: false },
    { src: '~/plugins/composition-api.js', ssr: false }
  ],

  router,

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/Layouts',
      '~/components/Common'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    ['@nuxtjs/eslint-module', {
      fix: true
    }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    '@nuxtjs/universal-storage',
    ['@nuxtjs/i18n', i18n],
    '@nuxt/content',
    '@nuxtjs/pwa',
    '@nuxt/components',
    '@nuxtjs/dayjs',
    '@nuxtjs/sentry'
  ],

  // Axios module configuration
  axios: {
    baseURL: process.env.API_BASE_URL
  },

  toast: {
    duration: TOAST_CONFIG.goAwayTime
  },

  publicRuntimeConfig: {
    postcode: {
      baseUrl: process.env.POSTCODE_JP_API_BASE_URL || 'https://apis.postcode-jp.com/api/v5',
      apiKey: process.env.POSTCODE_JP_API_KEY
    }
  },

  loading: '~/components/Layouts/Loading.vue',

  dayjs: {
    locales: ['en', 'ja'],
    defaultLocale: 'ja',
    plugins: [
      'duration',
      'localizedFormat',
      'customParseFormat'
    ]
  },

  auth: {
    strategies: {
      cognito: {
        scheme: '~/auth/schemes/cognito.js',
        credentials: {
          userPoolId: process.env.COGNITO_USER_POOL_ID,
          userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
          region: process.env.COGNITO_REGION
        },
        user: {
          property: 'results',
          autoFetch: true
        },
        endpoints: {
          user: { url: '/auth/profile', method: 'get' }
        }
      }
    },
    localStorage: {
      prefix: ''
    },
    cookie: {
      prefix: ''
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: false,
      callback: false
    }
  },
  env: {
    COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID || '',
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID || '',
    AWS_PROJECT_REGION: process.env.AWS_PROJECT_REGION || '',
    AWS_APPSYNC_GRAPHQL_ENDPOINT: process.env.AWS_APPSYNC_GRAPHQL_ENDPOINT || '',
    AWS_APPSYNC_REGION: process.env.AWS_APPSYNC_REGION || '',
    AWS_APPSYNC_AUTHENTICATION_TYPE: process.env.AWS_APPSYNC_AUTHENTICATION_TYPE || '',
    COGNITO_REGION: process.env.COGNITO_REGION || '',
    APP_NAME: process.env.APP_NAME || 'HAKKEN SOUGO',
    APP_TITLE: process.env.APP_TITLE || 'HAKKEN SOUGO',
    APP_DESCRIPTION: process.env.APP_TITLE || 'HAKKEN SOUGO description',
    APP_HID: process.env.APP_TITLE || 'HAKKEN SOUGO description',
    AWS_S3_URL: process.env.AWS_S3_URL || '',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || ''
  },
  storage: {

  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      '@nuxtjs/auth-next',
      'vee-validate/dist/rules'
    ]
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
    disabled: process.env.NODE_ENV !== 'production',
    publishRelease: {
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'fab-one',
      project: 'hakken-sougo-frontend',
      // Attach commits to the release (requires that the build triggered within a git repository).
      setCommits: {
        auto: true
      }
    },
    sourceMapStyle: 'hidden-source-map',
    config: {
      environment: process.env.SENTRY_ENV || 'production'
      // release: process.env.GITHUB_SHA
    }
  }
}
