import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
import {
  required,
  alpha,
  email,
  confirmed,
  digits,
  is,
  max,
  min,
  length,
  numeric,
  is_not as isNot
} from 'vee-validate/dist/rules'

const availableValidationRules = {
  required,
  alpha,
  is,
  email,
  confirmed,
  digits,
  length,
  numeric,
  min,
  max,
  is_not: isNot
}

for (const keyExtend in availableValidationRules) {
  extend(keyExtend, availableValidationRules[keyExtend])
}

extend('password_strength', (value) => {
  // Minimum eight characters
  // at least 1 letter, 1 number haft-width and special characters optional
  const rule = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d!@#$%^&*/,.;\\)(+=._-]{8,}$/
  if (value.match(rule)) {
    return true
  }
})

extend('mobile_jp', (value) => {
  if (value.match(/^0[789]0[0-9]{8}$/)) {
    return true
  }
})

extend('mobile', (value) => {
  if (value.match(/^[\d]{11}$/)) {
    return true
  }
})

extend('phone', (value) => {
  if (value.match(/^[\d]{10}$/)) {
    return true
  }
})

extend('katakana', (value) => {
  if (value.match(/^[ァ-ヶｦ-ﾟー]+$/u)) {
    return true
  }
})

export default function ({ app }) {
  configure({
    defaultMessage: (field, values) => {
      values._field_ = app.i18n.t(`fields.${field}`)
      return app.i18n.t(`validations.${values._rule_}`, values)
    }
  })
}
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
