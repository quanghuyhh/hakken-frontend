import { USER as resource, PROFILE } from '@/config/apis'

export default axios => ({
  getProfile () {
    return axios.get(`${PROFILE}`)
  },
  updateProfile (params) {
    return axios.put(`${PROFILE}`, params)
  },

  list (params) {
    return axios.get(`${resource}`, params)
  },

  get (id) {
    return axios.get(`${resource}/${id}`)
  },

  add (user) {
    return axios.post(`${resource}`, user)
  },

  update (user) {
    return axios.patch(`${resource}/${user.id}`, user)
  },

  destroy (id) {
    return axios.delete(`${resource}/${id}`)
  },

  upload (user, image) {
    const payload = new FormData()
    payload.append('attachment', image)

    const nuxtAxios = axios.create()
    delete nuxtAxios.defaults.headers.common['content-type']
    delete nuxtAxios.defaults.headers.post['content-type']

    return nuxtAxios({
      method: 'POST',
      url: `${resource}/${user.id}/profile-image`,
      data: payload,
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    })
  }
})
