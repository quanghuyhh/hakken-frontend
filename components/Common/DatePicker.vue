<template>
  <div>
    <flat-pickr
      v-model="model"
      :placeholder="placeHolder"
      class="flatpickr"
      :config="config"
    />
  </div>
</template>

<script>
import { Japanese } from 'flatpickr/dist/l10n/ja'
import { DATETIME_FORMAT } from '~/config/datetime_format'

export default {
  name: 'DatePicker',
  props: {
    value: {
      type: String,
      default: null
    },
    placeHolder: {
      type: String,
      default: '希望相談日時'
    },
    minDate: {
      type: String,
      default: null
    },
    format: {
      type: String,
      default: DATETIME_FORMAT.VIEW_DATE
    }
  },
  data () {
    return {
      // Get more form https://flatpickr.js.org/options/
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: this.format,
        altInput: true,
        disableMobile: 'true',
        dateFormat: this.format,
        locale: Japanese,
        minDate: this.minDate
      }
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
