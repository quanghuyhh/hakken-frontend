
// eslint-disable-next-line import/named
import { PLANS } from '~/config/apis'
export default axios => ({
  getPlanDetail (id) {
    return axios.get(`${PLANS}/${id}`)
  },

  acceptPlan (id) {
    return axios.post(`${PLANS}/${id}/accept`)
  },

  cancel (id, params = {}) {
    return axios.post(`${PLANS}/${id}/cancel`, params)
  }
})
