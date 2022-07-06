import { CONSULTATIONS, MATCHING_CONSULTATION_MEISTER } from '~/config/apis'
import { paramsSerializer } from '~/utils/api'

export default axios => ({
  getConsultations (params) {
    return axios.get(CONSULTATIONS, { params, paramsSerializer })
  },
  createConsultations (params) {
    return axios.post(CONSULTATIONS, params)
  },
  cancelConsultation (id) {
    return axios.put(`${CONSULTATIONS}/${id}/cancel`)
  },
  getMatchingList (params) {
    return axios.get(`${MATCHING_CONSULTATION_MEISTER}/match`, { params, paramsSerializer })
  },
  getMeisterMatching (hashId) {
    return axios.get(`${MATCHING_CONSULTATION_MEISTER}/meister/${hashId}`)
  }
})
