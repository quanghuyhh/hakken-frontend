const REGISTER_START = '/auth/register/start'
const REGISTER = '/auth/register'
export default axios => ({
  registerStart (params) {
    return axios.post(REGISTER_START, params)
  },

  register (params) {
    return axios.post(REGISTER, params)
  }
})
