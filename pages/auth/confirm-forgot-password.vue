<template>
  <div id="join" class="confirm-forgot-password">
    <h1>
      <span>{{ $t('confirm_forgot_password.title_page') }}</span>
    </h1>
    <div class="desc text-center">
      {{ $t('confirm_forgot_password.confirm_forgot_guide') }}
    </div>
    <validation-observer
      ref="confirmForgotPasswordForm"
      #default="{invalid}"
    >
      <ul class="joinForm">
        <li>
          <validation-provider
            #default="{ errors }"
            name="password"
            vid="password"
            rules="required|password_strength"
          >
            <span class="formLabel">{{ $t('confirm_forgot_password.input.new_password') }}</span>
            <input
              v-model="password"
              type="password"
              :placeholder="$t('confirm_forgot_password.input.new_password_placeholder')"
            >  <small class="text-danger">{{ $t(errors[0]) }}</small>
          </validation-provider>
        </li>

        <li>
          <validation-provider
            #default="{ errors }"
            name="confirm_password"
            vid="confirm_password"
            rules="required|confirmed:password"
          >
            <span class="formLabel">{{ $t('confirm_forgot_password.input.confirm_new_password') }}</span>
            <input
              v-model="confirmPassword"
              type="password"
              :placeholder="$t('confirm_forgot_password.input.confirm_password_placeholder')"
            >  <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </li>

        <li class="sendBtn">
          <input type="submit" :value="$t('confirm_forgot_password.btn.change_password')" :disabled="invalid" @click="confirmForgotPassword">
        </li>
      </ul>
    </validation-observer>
  </div>
</template>

<script>
import { TOAST_CONFIG } from '~/config/consts'

export default {
  layout: 'guest',
  middleware: 'guest',
  data () {
    return {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      verificationCode: ''
    }
  },
  created () {
    this.$store.commit('guestLayout/setShowTravellerCollectInfo', true)
    this.email = this.$route.query.email ?? (this.$route.query.user_name ?? null)
    this.verificationCode = this.$route.query.confirmation_code ?? null
  }, // end created
  methods: {
    confirmForgotPassword () {
      const { email, password, verificationCode } = this

      if (!email || !verificationCode) {
        this.$toast.error(this.$t('login_page.validation.email_or_verification_code_is_empty')).goAway(TOAST_CONFIG.goAwayTime)
        return
      }

      this.isLoading = true

      this.$refs.confirmForgotPasswordForm.validate().then((success) => {
        if (success) {
          this.$cognito.resetPassword(this, email, verificationCode, password)
        }
      })
      this.isLoading = false
    }
  } // end methods
}
</script>
<style scoped>
  .confirm-forgot-password .desc {
    margin: 40px auto;
    width: 330px;
    font-size: 18px;
  }
</style>
