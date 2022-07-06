<template>
  <div id="joinForm">
    <h1>
      <span>{{ $t('register_page.title_page') }}</span>
    </h1>
    <validation-observer ref="registerForm" #default="{ invalid }">
      <dl :class="{ conf: confirm }">
        <dt>
          {{ $t('register_page.field_name')
          }}<span>{{ $t('register_page.required') }}</span>
        </dt>
        <dd v-if="!confirm">
          <validation-provider
            #default="{ errors }"
            name="name"
            rules="required|min:8|max:64"
          >
            <input
              v-model="registerData.name"
              type="text"
              :placeholder="$t('register_page.placeholder_name')"
            >
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </dd>
        <dd v-else>
          {{ registerData.name }}
        </dd>

        <dt>
          {{ $t('register_page.field_name_kana')
          }}<span>{{ $t('register_page.required') }}</span>
        </dt>
        <dd v-if="!confirm">
          <validation-provider
            #default="{ errors }"
            name="name_kana"
            rules="required|katakana|max:8"
          >
            <input
              v-model="registerData.nameKana"
              type="text"
              :placeholder="$t('register_page.placeholder_name_kana')"
            >
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </dd>
        <dd v-else>
          {{ registerData.nameKana }}
        </dd>

        <dt>{{ $t('register_page.field_phone_number') }}</dt>
        <dd v-if="!confirm">
          <validation-provider
            v-slot="{ errors, validate }"
            mode="aggressive"
            name="phone_number"
            rules="mobile_jp"
          >
            <the-mask
              id="vue-the-mask-directive"
              v-model="registerData.phoneNumber"
              class="form-control"
              :mask="'###-####-####'"
              :masked="false"
              :name="'mobile'"
              replacer="[-]"
              :placeholder="$t('register_page.placeholder_phone_number')"
              @change.native="validate($event)"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </dd>
        <dd v-else>
          {{ maskPhoneNumberDisplay }}
        </dd>
        <dt>
          {{ $t('register_page.field_password')
          }}<span>{{ $t('register_page.required') }}</span>
        </dt>
        <dd v-if="!confirm">
          <validation-provider
            #default="{ errors }"
            name="password"
            rules="required|min:8|max:64|password_strength"
          >
            <input
              v-model="registerData.password"
              type="password"
              :placeholder="$t('register_page.placeholder_password')"
            >
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </dd>
        <dd v-else>
          {{ passwordHint }}
        </dd>
        <dt v-if="!confirm">
          {{ $t('register_page.field_confirm_password')
          }}<span>{{ $t('register_page.required') }}</span>
        </dt>
        <dd v-if="!confirm">
          <validation-provider
            #default="{ errors }"
            name="confirm_password"
            :rules="'required|confirmed:password'"
          >
            <input
              v-model="registerData.confirmPassword"
              type="password"
              :placeholder="$t('register_page.placeholder_confirm_password')"
            >
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </dd>
      </dl>
      <div v-if="!confirm" class="termCheck">
        <validation-provider
          #default="{ errors }"
          name="accept_term"
          :rules="{ required: { allowFalse: false } }"
        >
          <input
            id="agreement"
            v-model="registerData.acceptTerm"
            type="checkbox"
            class="approvedAgreement"
          >
          <label for="agreement" class="approvedAgreement">{{
            $t('register_page.accept_term')
          }}</label>
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </div>
      <div v-if="!confirm" class="stepBtn">
        <input
          type="submit"
          :value="$t('register_page.register_button')"
          :disabled="invalid"
          @click="confirmForm"
        >
      </div>
      <div v-else>
        <ul class="confirmBtn">
          <li class="sendBtn" :class="{ 'button-loading': isSubmit }">
            <input
              type="submit"
              :value="$t('register_page.register_submit_button')"
              :disabled="isSubmit"
              @click="submitForm"
            >
          </li>
          <li>
            <input
              type="submit"
              :value="$t('register_page.cancel_submit_button')"
              :disabled="isSubmit"
              @click="cancelConfirm"
            >
          </li>
        </ul>
      </div>
    </validation-observer>
  </div>
</template>
<script>
import { MATCHING_MEISTER } from '@/config/consts'

export default {
  name: 'Register',
  layout: 'guest',
  middleware: 'guest',
  data () {
    return {
      registerData: {
        name: '',
        nameKana: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        acceptTerm: false
      },
      confirm: false,
      isSubmit: false,
      cognitoSession: {
        cognitoUser: null,
        userAttributes: null
      },
      maskPhoneNumberDisplay: null
    }
  },
  computed: {
    passwordHint () {
      const passwordLength = this.registerData.password.length
      return '*'.repeat(passwordLength)
    }
  },
  watch: {
    'registerData.phoneNumber' (newValue) {
      const convertPhoneNumber = String(newValue)
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,4})(\d{0,4})/)
      this.maskPhoneNumberDisplay =
        convertPhoneNumber?.input?.length === 11
          ? `${convertPhoneNumber[1]}-${convertPhoneNumber[2]}-${convertPhoneNumber[3]}`
          : ''
    }
  },
  created () {
    this.checkUrlRegister()
  },
  methods: {
    confirmForm () {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          this.confirm = true
        }
      })
    },
    cancelConfirm () {
      this.confirm = false
    },
    async submitForm () {
      this.isSubmit = true
      const { name, nameKana, phoneNumber, password } = this.registerData
      const username = (this.$route.query.username || '').replace(' ', '+')
      const { cognitoUser } = this.cognitoSession
      try {
        const newPasswordChallenge =
          await this.$cognito.newPasswordCompleteRegister(cognitoUser, password)

        if (newPasswordChallenge) {
          const userSub = newPasswordChallenge.getIdToken().decodePayload().sub
          const paramRegister = {
            name,
            email: username,
            kana_name: nameKana,
            mobile: phoneNumber,
            cognito_id: userSub
          }
          const resultRegister = await this.$repositories.register.register(
            paramRegister
          )
          if (resultRegister.message === 'OK') {
            this.actionLogin(username, password)
          }
        }
      } catch (e) {
        this.isSubmit = false
        this.$refs.registerForm.setErrors(e.message_internal || {})
        this.$toast.error(this.$t('register_page.exception.register_failed'))
      }
    },

    checkUrlRegister () {
      const { temporary = '' } = this.$route.query
      const username = (this.$route.query.username || '').replace(' ', '+')

      this.cognitoSession.cognitoUser = this.$cognito.getCognitoUser(username)
      const authDetails = this.$cognito.getAuthDetails(username, temporary)
      if (username && temporary) {
        this.cognitoSession.cognitoUser.authenticateUser(authDetails, {
          onFailure: (error) => {
            if (this.$cognito.isUrlLinkRegisterExpired(error)) {
              this.$toast.error(
                this.$t('register_page.exception.verify_expire')
              )
              return this.$router.push(this.$utils.routers.register.route)
            }
            this.$toast.error(this.$t('register_page.exception.verify_invalid'))
            return this.$router.push(this.$utils.routers.login.route)
          },
          newPasswordRequired: (userAttributes) => {
            delete userAttributes.email_verified
            this.cognitoSession.userAttributes = userAttributes
          }
        })
      } else {
        this.$toast.error(this.$t('register_page.exception.verify_invalid'))
        return this.$router.push(this.$utils.routers.login.route)
      }
    },
    actionLogin (username, password) {
      this.$auth
        .loginWith('cognito', {
          data: {
            username,
            password
          }
        })
        .then(() => {
          let redirect = '/mypage'
          const previousScreen = localStorage.getItem(
            MATCHING_MEISTER.CACHE_REDIRECT
          )
          if (previousScreen && previousScreen !== 'undefined') {
            redirect = previousScreen
          }
          localStorage.removeItem(MATCHING_MEISTER.CACHE_REDIRECT)
          this.$router.push(redirect)
        })
    }
  }
}
</script>

<style scoped>
.approvedAgreement {
  cursor: pointer;
}
</style>
