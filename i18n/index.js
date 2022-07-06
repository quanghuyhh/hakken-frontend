module.exports = {
  locales: [
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en.js'
    },
    {
      code: 'ja',
      iso: 'ja-ES',
      name: 'Japanese',
      file: 'ja.js'
    }
  ],
  defaultLocale: 'ja',
  seo: false,
  lazy: true,
  langDir: 'i18n/',
  parsePages: false,
  vuex: {
    moduleName: 'i18n',
    mutations: {
      setLocale: false,
      setMessages: false
    },
    preserveState: false
  },
  pages: {},
  vueI18n: {
    fallbackLocale: 'ja'
  }
}
