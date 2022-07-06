import Vue from 'vue'
import dayjs, { unix } from 'dayjs'
import { DATETIME_FORMAT } from '~/config/datetime_format'
import { parseApiTimestamp } from '~/utils/datetime'

Vue.filter('travelerFormatDate', (value) => {
  const dateObj = new Date(value)
  return $nuxt.$dayjs(dateObj).format('ll')
})

Vue.filter(
  'planFormatDate',
  (
    value,
    input = DATETIME_FORMAT.API_TIME,
    output = DATETIME_FORMAT.VIEW_HOUR_MINUTE
  ) => {
    if (!value) {
      return value
    }
    return $nuxt.$dayjs(value, input).format(output)
  }
)

Vue.filter('toCurrency', function (value) {
  if (isNaN(value)) {
    return '-'
  }
  return new Intl.NumberFormat().format(value)
})

Vue.filter(
  'consultationFormatDate',
  function (
    timestamp,
    format = DATETIME_FORMAT.API_DATETIME,
    formatDisplay = DATETIME_FORMAT.DISPLAY_DATETIME
  ) {
    if (!timestamp) {
      return timestamp
    }
    return parseApiTimestamp(timestamp, format).format(formatDisplay)
  }
)

Vue.filter(
  'renderListName',
  function (listItem, key = 'name', breakType = ', ') {
    if (!Array.isArray(listItem)) {
      return null
    }
    return listItem.map(item => item[key]).join(breakType)
  }
)

Vue.filter(
  'dateUnixFormat',
  function (value, format = DATETIME_FORMAT.VIEW_FULL_DATE) {
    if (!value) {
      return ''
    }
    return unix(value).format(format)
  }
)

Vue.filter(
  'dateFormat',
  function (value, format = DATETIME_FORMAT.VIEW_FULL_DATE) {
    if (!value) {
      return ''
    }
    return dayjs(value).format(format)
  }
)

Vue.filter(
  'addDateFormat',
  function (
    value,
    day = 1,
    type = 'day',
    format = DATETIME_FORMAT.VIEW_FULL_DATE
  ) {
    if (!value) {
      return ''
    }
    return dayjs(value).add(day, type).format(format)
  }
)

Vue.filter(
  'subDateFormat',
  function (
    value,
    day = 1,
    type = 'day',
    format = DATETIME_FORMAT.VIEW_FULL_DATE
  ) {
    if (!value) {
      return ''
    }
    return dayjs(value).subtract(day, type).format(format)
  }
)

Vue.filter('aws_photo', (path) => {
  if (!path || path.includes(process.env.AWS_S3_URL)) {
    return path
  }
  return process.env.AWS_S3_URL + '/' + path
})
