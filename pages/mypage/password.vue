<template>
  <main>
    <div class="mypageTop">
      <a href="javascript:void(0)" @click.prevent="handleBackToMypage">
        {{ $t('profile.back_button_title') }}
      </a>
    </div>

    <h1 class="mainTit">
      {{ $t('change_password.page_title') }}
    </h1>

    <div class="inner">
      <div id="passEdit">
        <p>{{ $t('change_password.notice') }}</p>
        <validation-observer
          ref="updateUserInfo"
          #default="{invalid}"
        >
          <ul class="editList">
            <li v-if="!user.isChangeTemporaryPass">
              <validation-provider
                v-slot="{ errors }"
                name="current_password"
                rules="required|min:6"
              >
                <span class="inputLabel">{{ $t('fields.current_password') }}</span>
                <input
                  v-model="user.current_password"
                  type="password"
                  name="current_password"
                  :placeholder="$t('password_placeholder')"
                >
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="field_new_password"
                rules="required|min:6|password_strength"
                vid="password"
              >
                <span class="inputLabel">{{ $t('fields.field_new_password') }}</span>
                <input v-model="user.password" type="password" name="password" :placeholder="$t('password_placeholder')">
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="field_new_password_confirmation"
                rules="required|confirmed:password"
              >
                <span class="inputLabel">{{ $t('fields.field_new_password_confirmation') }}</span>
                <input
                  v-model="user.password_confirmation"
                  type="password"
                  name="password_confirmation"
                  :placeholder="$t('password_placeholder')"
                  data-vv-as="password"
                >
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>
          </ul>
          <ul class="editControl">
            <li class="sendBtn">
              <input type="submit" :value="$t('update')" :disabled="invalid" @click="changePassword">
            </li>
            <li v-if="!user.isChangeTemporaryPass" class="backBtn">
              <input type="button" :value="$t('back')" class="js-modal-close" @click="$router.back()">
            </li>
          </ul>
        </validation-observer>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import { Auth } from '@aws-amplify/auth'
import { CONSULTATION_TAB, TOAST_CONFIG } from '@/config/consts'
import routers from '@/utils/routers'

export default {
  middleware: 'guest',
  data () {
    return {
      user: {
        current_password: '',
        password: '',
        password_confirmation: '',
        isChangeTemporaryPass: this.$route?.query?.isChangeTemporaryPass ?? false
      }
    }
  },
  computed: {
    loggedInUser () {
      return this.$auth.user
    },
    ...mapState({
      loginInfo: state => state.login.loginInfo
    })
  },
  mounted () {
    if (
      (!this.user.isChangeTemporaryPass && !this.loggedInUser?.cognito?.username) ||
      (this.user.isChangeTemporaryPass && (!this.loginInfo.userName || !this.loginInfo.password))
    ) {
      this.$router.push(routers.login.route)
    }
  },
  methods: {
    changePassword () {
      this.$refs.updateUserInfo.validate().then((success) => {
        if (success) {
          const { user } = this

          this.$nuxt.$loading.start()
          try {
            // Change temporary password at the first time login
            if (user.isChangeTemporaryPass && this.loginInfo.userName && this.loginInfo.password) {
              Auth.signIn(this.loginInfo.userName, this.loginInfo.password).then((auth) => {
                if (auth.challengeName === 'NEW_PASSWORD_REQUIRED') {
                  Auth.completeNewPassword(auth, user.password)
                    .then((res) => {
                      if (res) {
                        this.$nuxt.$loading.finish()
                        this.$toast.success(this.$t('change_password.messages.change_password_success')).goAway(TOAST_CONFIG.goAwayTime)
                        this.goToLogin()
                      }
                    })
                }
              })
            } else {
              this.$cognito.changePassword(this, this.loggedInUser.cognito.username, user.current_password, user.password)
              this.$nuxt.$loading.finish()
            }
          } catch (error) {
            this.$toast.error(this.$t('change_password.messages.change_password_failed')).goAway(TOAST_CONFIG.goAwayTime)
            this.$nuxt.$loading.finish()
          }
        }
      })
    },
    goToLogin () {
      this.$auth.logout()
      this.$router.push(routers.login.route)
    },
    handleBackToMypage () {
      localStorage.setItem(CONSULTATION_TAB.CACHE_KEY, 0)
      this.$router.push(routers.myPage.route)
    }
  },
  head () {
    return {
      title: this.$t('mypage.edit_profile.title', { name: this.loggedInUser.name })
    }
  }
}
</script>
