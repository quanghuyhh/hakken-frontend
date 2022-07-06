import dayjs from 'dayjs'

const startDate = dayjs().add(7, 'days').format('MM/DD/YYYY')

const data = {
  destination: {},
  date: startDate,
  season: '',
  qty: 1,
  adult: 2,
  child: 0,
  infant: 0,
  estimated: {
    amount: 0,
    cost: 0
  },
  purposes: [],
  favorites: [],
  departure: {
    id: '',
    name: ''
  },
  address_optionals: '',
  note: ''
}

export const state = () => ({
  isFilterData: false,
  showFilterData: data,
  destinations_data: [],
  purposes_data: [],
  favorites_data: [],
  poin_of_depatures_data: []
})

export const mutations = {
  resetShowFilterData (state) {
    state.showFilterData = data
  },
  setIsFilterData (state, value) {
    state.isFilterData = value
  },
  setTravelerData (state, value) {
    state.showFilterData = { ...state.showFilterData, ...value }
  },
  setDestinationsData (state, value) {
    state.destinations_data = value
  },
  setPurposesData (state, value) {
    state.purposes_data = value
  },
  setFavoritessData (state, value) {
    state.favorites_data = value
  },
  setPointOfDeparturesData (state, value) {
    state.poin_of_depatures_data = value
  }
}

export const getters = {
  isFilterData (state) {
    return state.isFilterData
  },
  showFilterData (state) {
    return state.showFilterData
  },
  showDestinationsData (state) {
    return state.destinations_data
  },
  showPurposesData (state) {
    return state.purposes_data
  },
  showFavoritesData (state) {
    return state.favorites_data
  },
  showPointOfDeparturesData (state) {
    return state.poin_of_depatures_data
  }
}
