import { DATETIME_FORMAT } from '~/config/datetime_format'

export const parseApiTimestamp = (timestamp, format = DATETIME_FORMAT.API_DATETIME) => {
  const { $dayjs } = self.$nuxt
  if (!timestamp) {
    return timestamp
  }
  return $dayjs(timestamp, format)
}

export const displayFormat = (datetime, displayFormat = DATETIME_FORMAT.LOCALE_DATE) => {
  if (!datetime) {
    return datetime
  }

  return datetime.format(displayFormat)
}
