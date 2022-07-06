const END_POINT = {
  // online-meeting/access_token/{onlineMeeting}
  GET_TOKEN_ONLINE_MEETING: 'online-meeting/access_token/',

  // /online-meeting
  CREATE_ONLINE_MEETING: 'online-meeting'
}

export default axios => ({
  createOnlineMeeting (params) {
    return axios.post(END_POINT.CREATE_ONLINE_MEETING, params)
  },

  getTokenOnlineMeeting (onlineMeeting) {
    return axios.get(END_POINT.GET_TOKEN_ONLINE_MEETING + onlineMeeting)
  }
})
