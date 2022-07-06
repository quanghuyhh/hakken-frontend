import { ITINERARIES } from '~/config/apis'
export default axios => ({
  show (id) {
    return axios.get(`${ITINERARIES}/${id}`)
  }
})
