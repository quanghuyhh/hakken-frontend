export default {
  register: {
    route: '/register'
  },
  registerInfo: {
    route: '/register-info'
  },
  login: {
    route: '/login'
  },
  forgotPassword: {
    route: '/reset-password'
  },
  myPage: {
    route: '/mypage'
  },
  changePassword: {
    // name: 'change-password',
    route: '/change-password'
  },
  matchingResult: {
    route: '/consultations/matching-results'
  },
  consultationRequested: {
    route: '/consultations/requested'
  },
  consultationsMeisterResult: {
    name: 'consultations-meister-result',
    route: '/consultations/:hashId/matching-results'
  },
  planDetail: {
    name: 'plans-detail',
    route: '/reservations/:id'
  },
  messageDetail: {
    name: 'message-detail',
    route: '/messages/:id'
  },
  editAccount: {
    name: 'account-edit',
    route: '/account/edit'
  }
}
