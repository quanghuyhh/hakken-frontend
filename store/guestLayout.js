export const state = () => ({
  showTravellerCollectInfo: false,
  showFooterNewTopic: false,
  refreshPage: false
})

export const mutations = {
  setShowTravellerCollectInfo (state, value) {
    state.showTravellerCollectInfo = value
  },
  setShowFooterNewTopic (state, value) {
    state.showFooterNewTopic = value
  },
  refreshPage (state, value) {
    state.refreshPage = value
  }
}

export const getters = {
  showTravellerCollectInfo (state) {
    return state.showTravellerCollectInfo
  },
  showFooterNewTopic (state) {
    return state.showFooterNewTopic
  }
}
