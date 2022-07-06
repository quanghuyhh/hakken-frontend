import Vue from 'vue'
import FloatingVue from 'floating-vue'

import 'floating-vue/dist/style.css'
import '~/assets/css/tooltip.css'

Vue.use(FloatingVue, {
  disposeTimeout: 1000000,
  themes: {
    info: {
      $extend: 'tooltip'
    },
    danger: {
      $extend: 'tooltip'
    },
    gray: {
      $extend: 'tooltip'
    }
  }
})
