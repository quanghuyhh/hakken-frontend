<template>
  <div id="join">
    <h1>
      <span>{{ $t('login_page.title_page') }}</span>
    </h1>

    <p>{{ $t('login_page.login_guide') }}</p>

    <ul class="joinForm">
      <li>
        <span class="formLabel">{{ $t('email_address') }}</span>
        <input
          v-model="email"
          type="email"
          placeholder="info@hakken.jp"
        >
      </li>

      <li>
        <span class="formLabel">{{ $t('password') }}</span>
        <input
          v-model="password"
          type="password"
          :placeholder="$t('password_placeholder')"
          @keyup.enter="login"
        >
      </li>

      <li class="sendBtn" :class="{'button-loading': isLoading}">
        <input type="submit" :value="$t('login_button')" :disabled="isLoading || !email || !password" @click="login">
      </li>
    </ul>

    <p class="forgetPass">
      <a :href="$utils.routers.forgotPassword.route">{{ $t('forgot_password_link') }}</a>
    </p>
  </div>
</template>

<script>
import { AUTH_EXCEPTION_CODE, TOAST_CONFIG, MATCHING_MEISTER } from '~/config/consts'
import { AuthHelper } from '@/helpers/AuthHelper'
import routers from '~/utils/routers'

export default {
  layout: 'guest',
  middleware: 'guest',
  data () {
    return {
      isLoading: false,
      email: '',
      password: ''
    }
  },
  created () {
    this.$store.commit('guestLayout/setShowTravellerCollectInfo', true)
  },
  methods: {
    async login () {
      const { email, password } = this
      if (!email || !password) {
        this.$toast.error(this.$t('login_page.validation.email_or_password_is_empty')).goAway(TOAST_CONFIG.goAwayTime)
        return
      }

      try {
        this.isLoading = true
        const response = await this.$auth.loginWith('cognito', {
          data: {
            username: email,
            password
          }
        })
        // Change password if login with temporary password at the first time
        if (response && response.challengeName === 'NEW_PASSWORD_REQUIRED') {
          const storageLoginInfo = { userName: response.userName, password }
          this.$store.commit('login/setLoginInfo', storageLoginInfo)
          this.goToChangePassword()
        } else {
          this.isLoading = false
          if (!AuthHelper.isTraveler(this.$auth.user?.roles)) {
            await this.$auth.logout()
            return this.$toast.error(this.$t('errors.403'))
          }

          this.$toast.success(this.$t('login_page.messages.login_success')).goAway(TOAST_CONFIG.goAwayTime)
          this.redirectAfterLogin()
        }
      } catch (error) {
        this.isLoading = false
        if (error.code && error.code === AUTH_EXCEPTION_CODE.notAuthorizedException) {
          this.$toast.error(this.$t('login_page.exception.not_authorized')).goAway(TOAST_CONFIG.goAwayTime)
        } else {
          this.$toast.error(this.$t('login_page.exception.default')).goAway(TOAST_CONFIG.goAwayTime)
        }
      }
    },

    redirectAfterLogin () {
      let redirect = '/'
      const previousScreen = localStorage.getItem(MATCHING_MEISTER.CACHE_REDIRECT)
      if (previousScreen && previousScreen !== 'undefined') {
        redirect = previousScreen
      } else if (this.$auth.$state.redirect) {
        redirect = this.$auth.$state.redirect
      }
      localStorage.removeItem(MATCHING_MEISTER.CACHE_REDIRECT)
      this.$router.push(redirect)
    },

    goToChangePassword () {
      this.$router.push({ path: routers.changePassword.route, query: { isChangeTemporaryPass: true } })
    }
  },
  head () {
    return {
      title: this.$t('login_page.title_page'),
      titleTemplate: this.$t('common.screen.long_suffix')
    }
  }
}
</script>

<style scoped>
.btnLoader{
  height: 50px;
  width: 100%;
  border: none;
  background-color: #f8b62e;
  border-radius: 50px;
}
</style>
