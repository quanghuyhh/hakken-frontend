export default axios => ({
  findByPostCode (postCode) {
    return this.request('get', `/postcodes/${postCode}`)
  },

  request (method, path, data = {}, headers = {}) {
    const defaultHeaders = {
      apikey: $nuxt.$config.postcode.apiKey
    }
    return axios[method](
      `${$nuxt.$config.postcode.baseUrl}${path}`,
      {
        headers: Object.assign(defaultHeaders, headers)
      },
      data
    )
  }
})
