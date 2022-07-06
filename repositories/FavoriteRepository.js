
import { TRAVELLERS_URL } from '~/config/apis'
export default axios => ({
  getFavorites (params) {
    const url = `${TRAVELLERS_URL}/get-favorites`
    return axios.get(url, params)
  }
})
