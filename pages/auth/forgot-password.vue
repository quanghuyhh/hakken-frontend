<template>
  <div id="join" class="forgot-password">
    <h1>
      <span>{{ $t('forgot_password.title_page') }}</span>
    </h1>
    <div v-if="!isSend">
      <div class="desc text-center">
        {{ $t('forgot_password.forgot_guide') }}
      </div>
      <div class="form">
        <validation-observer
          ref="forgotPasswordForm"
          #default="{invalid}"
        >
          <ul class="joinForm">
            <li>
              <validation-provider
                #default="{ errors }"
                name="email"
                vid="email"
                rules="required|email"
              >
                <span class="formLabel">{{ $t('email_address') }}</span>
                <input
                  v-model="email"
                  type="email"
                  placeholder="info@hakken.jp"
                >
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <validation-provider
                #default="{ errors }"
                name="confirm_email"
                rules="required|email|confirmed:email"
              >
                <span class="formLabel">{{ $t('confirm_email_address') }}</span>
                <input
                  v-model="confirm_email"
                  type="email"
                  placeholder="info@hakken.jp"
                >
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li class="sendBtn">
              <input type="submit" :value="$t('forgot_button')" :disabled="invalid" @click="forgot_password">
            </li>
          </ul>
        </validation-observer>
      </div>
    </div>
    <div v-else>
      <div class="desc text-center">
        {{ $t('forgot_password.forgot_guide_success') }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'guest',
  middleware: 'guest',
  data () {
    return {
      isSend: false,
      isLoading: false,
      email: null,
      confirm_email: null
    }
  },
  created () {
    this.$store.commit('guestLayout/setShowTravellerCollectInfo', true)
  }, // end created
  methods: {
    forgot_password () {
      this.isLoading = true
      this.$refs.forgotPasswordForm.validate().then((success) => {
        if (success) {
          if (this.$cognito.sendResetLink(this, this.email)) {
            this.isSend = true
          }
          this.isLoading = false
        }
      })
    }
  } // end methods
}
</script>
<style scoped>
  .forgot-password .desc {
    margin: 40px auto;
    width: 400px;
    font-size: 18px;
    text-align: center;
  }
  @media screen and (min-width: 375px) {
     .forgot-password .desc {
      width: 340px;
    }
  }
</style>
