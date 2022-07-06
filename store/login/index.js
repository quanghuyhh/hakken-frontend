export const state = () => ({
  loginInfo: {
    userName: '',
    password: ''
  }
})

export const getters = {
  getLoginInfo (state) {
    return state.loginInfo
  }
}

export const actions = {

}

export const mutations = {
  setLoginInfo (state, value) {
    state.loginInfo = value
  }
}
