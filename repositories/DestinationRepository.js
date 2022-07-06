import { TRAVELLERS_URL } from '~/config/apis'

export default axios => ({
  getDestinations (params) {
    const url = `${TRAVELLERS_URL}/get-destinations`
    return axios.get(url, { params })
  }
})
