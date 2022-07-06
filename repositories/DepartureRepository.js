import { TRAVELLERS_URL } from '~/config/apis'
export default axios => ({
  getPointOfDepatures (params) {
    const url = `${TRAVELLERS_URL}/get-point-of-departures`
    return axios.get(url, { params })
  }
})
