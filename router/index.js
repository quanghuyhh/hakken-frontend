/* CUSTOM ROUTER */

module.exports = {
  extendRoutes (routes, resolve) {
    routes.push(
      {
        name: 'register',
        path: '/register',
        components: {
          default: resolve(__dirname, '../pages/auth/register.vue')
        }
      },
      {
        name: 'register-info',
        path: '/register-info',
        components: {
          default: resolve(__dirname, '../pages/auth/register-info.vue')
        }
      },
      {
        name: 'change-password',
        path: '/change-password',
        components: {
          default: resolve(__dirname, '../pages/mypage/password.vue')
        }
      },
      {
        name: 'forgot-password',
        path: '/reset-password',
        components: {
          default: resolve(__dirname, '../pages/auth/forgot-password.vue')
        }
      },
      {
        name: 'confirm-forgot-password',
        path: '/confirm-forgot-password',
        components: {
          default: resolve(__dirname, '../pages/auth/confirm-forgot-password.vue')
        }
      },
      {
        name: 'consultations/matching-results',
        path: '/consultations/matching-results',
        components: {
          default: resolve(__dirname, '../pages/consultations/matched-lists.vue')
        }
      },
      {
        name: 'consultations-meister-result',
        path: '/consultations/:hashId/matching-results',
        components: {
          default: resolve(__dirname, '../pages/consultations/_hashId/meister-result.vue')
        }
      },
      {
        name: 'consultations/create',
        path: '/consultations/create',
        components: {
          default: resolve(__dirname, '../pages/consultations/requested.vue')
        }
      },
      {
        name: 'consultations/research',
        path: '/consultations/research',
        components: {
          default: resolve(__dirname, '../pages/consultations/research.vue')
        }
      },
      {
        name: 'plans-detail',
        path: '/reservations/:id',
        components: {
          default: resolve(__dirname, '../pages/plans/_id.vue')
        }
      },
      {
        name: 'message-detail',
        path: '/messages/:id',
        components: {
          default: resolve(__dirname, '../pages/mypage/message/_id.vue')
        }
      },
      {
        name: 'account-edit',
        path: '/account/edit',
        components: {
          default: resolve(__dirname, '../pages/mypage/edit.vue')
        }
      }
    )
  },
  middleware: [
    // 'auth',
  ]
}
