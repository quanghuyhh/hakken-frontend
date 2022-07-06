
import { TRAVELLERS_URL } from '~/config/apis'
export default axios => ({
  getPurposes (params) {
    const url = `${TRAVELLERS_URL}/get-purposes`
    return axios.get(url, params)
  }
})
