import { HTTP_CODE } from '~/config/apis'
import { TOAST_CONFIG } from '~/config/consts'

export default function ({ app, $axios }) {
  $axios.onResponse((response) => {
    return response.data
  })
  // handle api errors
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    switch (code) {
      case HTTP_CODE.HTTP_UNPROCESSABLE_ENTITY: {
        return Promise.reject(error.response.data)
      }
      case HTTP_CODE.HTTP_NOT_FOUND: {
        // not found - show page
        app.$toast.error('not found').goAway(TOAST_CONFIG.goAwayTime)
        break
      }
      case HTTP_CODE.HTTP_BAD_REQUEST: {
        app.$toast.error(error.response.data.results.message)
        break
      }
      case HTTP_CODE.HTTP_UNAUTHORIZED: case 419: {
        // logout the user if the session expired
        if (app.$auth.loggedIn) {
          app.$auth.logout()
        }
        break
      }
      default: {
        return Promise.reject(error)
      }
    }
  })
}
