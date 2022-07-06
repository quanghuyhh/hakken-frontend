import { CACHE_CONSULTATION_VIEW_POSITION, CACHE_NEED_BACK_PREVIOUS_POSITION } from '~/config/localstorage'

export class CacheHelper {
  static getCacheViewConsultation () {
    const pos = localStorage.getItem(CACHE_CONSULTATION_VIEW_POSITION)
    const needBack = localStorage.getItem(CACHE_NEED_BACK_PREVIOUS_POSITION)
    if (!pos || !needBack) {
      return null
    }
    const posData = JSON.parse(pos)
    if (!posData) {
      return null
    }

    return posData
  }
}
