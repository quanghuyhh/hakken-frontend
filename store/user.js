import { CONSULTATION_TAB } from '~/config/consts'

export const state = () => ({
  auth: {
    loggedIn: false,
    user: {}
  },
  mypageTab: localStorage.getItem(CONSULTATION_TAB.CACHE_KEY) || 0
})

export const mutations = {
  setMypageTab (state, value) {
    localStorage.setItem(CONSULTATION_TAB.CACHE_KEY, value)
    state.mypageTab = parseInt(value)
  }
}

export const getters = {
  isAuthenticated (state) {
    return state.auth.loggedIn
  },

  loggedInUser (state) {
    return state.auth.user
  },

  mypageTab: state => parseInt(state.mypageTab)
}
