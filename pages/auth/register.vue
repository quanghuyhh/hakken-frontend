<template>
  <div id="join">
    <h1>
      <span class="white-space-pre">{{
        $t('verify_register_page.title_page')
      }}</span>
    </h1>
    <div v-if="!sent">
      <pre class="guideTitle">{{ $t('verify_register_page.guide_page') }}</pre>
      <validation-observer ref="verifyRegisterForm" #default="{ invalid }">
        <ul class="joinForm">
          <li>
            <span class="formLabel">{{
              $t('verify_register_page.field_email')
            }}</span>
            <validation-provider
              v-slot="{ errors, validate }"
              mode="aggressive"
              name="email"
              rules="email"
              slim
            >
              <input
                v-model="email"
                type="email"
                placeholder="info@hakken.jp"
                @keyup.enter="sendVerifyRegister"
                @change="validate($event)"
              >
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </li>
          <li :class="{ 'button-loading': isSubmit }">
            <input
              type="submit"
              :disabled="isSubmit || !email.length || invalid"
              :value="$t('verify_register_page.button_send')"
              @click="sendVerifyRegister"
            >
          </li>
        </ul>
      </validation-observer>
    </div>
    <div v-else>
      <pre class="guideTitle">{{
        $t('verify_register_page.guide_sent_page')
      }}</pre>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'VerifyRegister',
  layout: 'guest',
  middleware: 'guest',
  data () {
    return {
      email: '',
      isSubmit: false,
      sent: false
    }
  },
  computed: {
    ...mapState({
      refreshPage: state => state.guestLayout.refreshPage
    })
  },
  watch: {
    refreshPage (newValue) {
      if (newValue) {
        this.sent = false
        this.email = ''
        this.$store.commit('guestLayout/refreshPage', false)
      }
    }
  },
  methods: {
    async sendVerifyRegister () {
      if (!(await this.$refs.verifyRegisterForm.validate())) {
        return
      }

      this.isSubmit = true
      const params = {
        email: this.email
      }
      try {
        await this.$repositories.register.registerStart(params)
        this.sent = true
        this.email = ''
        this.isSubmit = false
      } catch (e) {
        this.$refs.verifyRegisterForm.setErrors(e.message_internal || {})
      }
    }
  },
  head () {
    return {
      title: this.$t('register_page.title_page'),
      titleTemplate: this.$t('common.screen.long_suffix')
    }
  }
}
</script>

<style scoped>
.guideTitle {
  text-align: center;
  margin-bottom: 20px;
}
</style>
