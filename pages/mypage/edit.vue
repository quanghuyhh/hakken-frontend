<template>
  <main>
    <div class="mypageTop">
      <a href="javascript:void(0)" @click.prevent="handleBackToMypage">
        {{ $t('profile.back_button_title') }}
      </a>
    </div>

    <h1 class="mainTit">
      {{ $t('profile.page_title') }}
    </h1>

    <div v-if="isSuccess" id="success">
      <h2>{{ $t('profile.messages.update_info_success') }}</h2>
    </div>

    <div class="inner">
      <div id="edit">
        <validation-observer
          ref="updateUserInfo"
          #default="{invalid}"
        >
          <ul class="editType">
            <li>
              <validation-provider
                v-slot="{ errors }"
                name="type"
                rules="required"
              >
                <span class="inputLabel">{{ $t('fields.type') }}</span>
                <ul class="baseRadio typeSelect">
                  <li>
                    <input
                      id="person"
                      v-model="user.type"
                      type="radio"
                      name="type"
                      value="0"
                      readonly
                      disabled
                    >
                    <label for="person">{{ $t('fields.register_person_type') }}</label>
                  </li>

                  <li>
                    <input
                      id="company"
                      v-model="user.type"
                      type="radio"
                      name="type"
                      value="1"
                      readonly
                      disabled
                    >
                    <label for="company">{{ $t('fields.register_company_type') }}</label>
                  </li>
                </ul>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="company_name"
                rules="max:255"
              >
                <span class="inputLabel">{{ $t('fields.company_name') }}</span>
                <input
                  v-model="user.companyName"
                  type="text"
                  :placeholder="$t('fields_placeholder.company_name_example')"
                >
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>
          </ul>

          <ul class="editList">
            <li>
              <validation-provider
                v-slot="{ errors }"
                name="mypage.name"
                rules="required|max:255"
              >
                <span class="inputLabel">{{ $t('fields.mypage.name') }}<span>{{ $t('require') }}</span></span>
                <input v-model="user.name" type="text" :placeholder="$t('fields_placeholder.name')">
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="mypage.name_kana"
                rules="required|katakana|max:255"
              >
                <span class="inputLabel">{{ $t('fields.mypage.name_kana') }}<span>{{ $t('require') }}</span></span>
                <input v-model="user.kana_name" type="text" :placeholder="$t('fields_placeholder.name_kana')">
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="name_roman"
                rules="max:255"
              >
                <span class="inputLabel">{{ $t('fields.name_roman') }}</span>
                <input v-model="user.romaji_name" type="text" :placeholder="$t('fields_placeholder.name_roman')">
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="gender"
                rules=""
              >
                <span class="inputLabel">{{ $t('fields.gender') }}</span>
                <ul class="baseRadio genderSelect">
                  <li>
                    <input id="male" v-model="user.gender" type="radio" name="gender" value="1">
                    <label for="male">{{ $t('fields.male_gender') }}</label>
                  </li>

                  <li>
                    <input id="female" v-model="user.gender" type="radio" name="gender" value="0">
                    <label for="female">{{ $t('fields.female_gender') }}</label>
                  </li>

                  <li>
                    <input id="unknown" v-model="user.gender" type="radio" name="gender" value="2">
                    <label for="unknown">{{ $t('fields.unknown_gender') }}</label>
                  </li>
                </ul>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <birthday-component
                :change="handleChangeBirthday"
                :value="user.hasOwnProperty('birthdate') ? user.birthdate : ''"
              />
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="mobile"
                rules="mobile|max:11"
              >
                <span class="inputLabel">{{ $t('fields.mobile') }}</span>
                <mask-input-component
                  v-model="user.mobile"
                  type="tel"
                  :name="'mobile'"
                  :mask="'###-####-####'"
                  :replacer="'[-]'"
                  :placeholder="$t('fields_placeholder.mobile')"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="tel"
                rules="phone|max:11"
              >
                <span class="inputLabel">{{ $t('fields.tel') }}</span>
                <mask-input-component
                  v-model="user.tel"
                  type="tel"
                  :name="'tel'"
                  :mask="'##-####-####'"
                  :replacer="'[-]'"
                  :placeholder="$t('fields_placeholder.tel')"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="fax"
                rules="phone|max:11"
              >
                <span class="inputLabel">{{ $t('fields.fax') }}</span>
                <mask-input-component
                  v-model="user.fax"
                  type="tel"
                  :name="'fax'"
                  :mask="'##-####-####'"
                  :replacer="'[-]'"
                  :placeholder="$t('fields_placeholder.fax')"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="Email"
                rules="required|email"
              >
                <span class="inputLabel">{{ $t('fields.email') }}<span>{{ $t('cannot_edit') }}</span></span>
                <input type="email" disabled :value="user.email">
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <span class="inputLabel">{{ $t('fields.password') }}</span>
              <p>
                <nuxt-link :to="$utils.routers.changePassword.route">
                  {{ $t('profile.change_password') }}
                </nuxt-link>
              </p>
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="post_code"
                rules="numeric|max:7"
              >
                <span class="inputLabel">{{ $t('fields.post_code') }}</span>
                <ul class="adressCheck">
                  <li>
                    <mask-input-component
                      v-model="user.post_code"
                      type="text"
                      :name="'post_code'"
                      :mask="'###-####'"
                      :replacer="'[-]'"
                      :placeholder="$t('fields_placeholder.post_code')"
                    />
                  </li>
                  <li><input type="submit" :value="$t('search')" @click.prevent="findByPostCode"></li>
                </ul>
                <small class="text-danger">{{ errors[0] }}</small>
                <small v-if="errorBadges.post_code" class="text-danger">{{ errorBadges.post_code }}</small>
              </validation-provider>
            </li>

            <li>
              <city-component :value="(user.prefecture || '')" @input="handleChangeCity" />
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="municipalities"
                rules="max:255"
              >
                <span class="inputLabel">{{ $t('fields.municipalities') }}</span>
                <input v-model="user.municipalities" type="text">
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>

            <li>
              <validation-provider
                v-slot="{ errors }"
                name="address"
                rules="max:255"
              >
                <span class="inputLabel">{{ $t('fields.address') }}</span>
                <input v-model="user.address" type="text">
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </li>
          </ul>

          <ul class="editControl">
            <li class="sendBtn">
              <input type="submit" :value="$t('update')" :disabled="invalid && false" @click="updateProfile">
            </li>

            <li class="backBtn">
              <input type="button" :value="$t('back')" class="js-modal-close" @click.prevent="$router.back()">
            </li>
          </ul>
        </validation-observer>
      </div>
    </div>
  </main>
</template>

<script>
import Vue from 'vue'
import BirthdayComponent from '@/components/Common/BirthdayComponent'
import CityComponent from '@/components/Common/CityComponent'
import MaskInputComponent from '@/components/Common/MaskInputComponent'
import { CONSULTATION_TAB, TOAST_CONFIG } from '@/config/consts'
import routers from '@/utils/routers'

export default {
  components: {
    MaskInputComponent,
    BirthdayComponent,
    CityComponent
  },
  layout: 'default',
  middleware: 'auth',
  data () {
    return {
      isSuccess: false,
      errorBadges: {
        post_code: ''
      },
      user: {
        type: null,
        companyName: '',
        name: '',
        kana_name: '',
        romaji_name: '',
        gender: '2',
        mobile: '',
        tel: '',
        fax: '',
        email: '',
        post_code: '',
        prefecture: '-1',
        municipalities: '',
        address: ''
      }
    }
  },
  computed: {
    userData () {
      const { traveler, email, ...userData } = this.$auth.user || {}
      return {
        ...traveler,
        email,
        ...userData
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      try {
        const data = { ...this.userData }
        const keys = ['mobile', 'fax', 'tel']
        keys.forEach(
          (key) => {
            data[key] && (data[key] = (data[key]).replace(/\D/g, ''))
          }
        )
        Vue.set(this, 'user', Object.assign(this.user, data))
      } catch (error) {
        this.$toast.error(this.$t('mypage.edit_profile.fetch_profile_failed')).goAway(TOAST_CONFIG.goAwayTime)
      }
    },

    async updateProfile () {
      const isValid = await this.$refs.updateUserInfo.validate()
      if (!isValid) {
        this.$toast.error(this.$t('mypage.edit_profile.invalid_form_data')).goAway(TOAST_CONFIG.goAwayTime)
        return
      }
      const { user } = this

      this.$nuxt.$loading.start()
      try {
        await this.$repositories.user.updateProfile(user)
        await this.$auth.fetchUser()

        this.isSuccess = true
        setTimeout(() => {
          this.isSuccess = false
        }, 1500)
        scrollTo({ top: 0, behavior: 'smooth' })
        this.$nuxt.$loading.finish()
      } catch (error) {
        this.$toast.error(this.$t('mypage.edit_profile.update_failed')).goAway(TOAST_CONFIG.goAwayTime)
        this.$nuxt.$loading.finish()
      }
    },

    async findByPostCode () {
      this.errorBadges.post_code = ''
      if (!this.user.post_code) {
        return
      }
      try {
        const data = await this.$repositories.address.findByPostCode(this.user.post_code).then(data => data)
        if (!data || !data.length) {
          throw new Error(this.$t('mypage.edit_profile.find_post_code_fail'))
        }

        const { pref, city, town } = data[0]
        Vue.set(this.user, 'prefecture', pref)
        Vue.set(this.user, 'municipalities', `${city}${town}`)
      } catch (error) {
        this.$toast.error(this.$t('mypage.edit_profile.find_post_code_fail')).goAway(TOAST_CONFIG.goAwayTime)
        this.errorBadges.post_code = this.$t('mypage.edit_profile.find_post_code_fail')
      }
    },

    handleChangeBirthday (date) {
      this.user.birthdate = date
    },

    handleChangeCity (value) {
      this.user.prefecture = value
    },

    handleBackToMypage () {
      localStorage.setItem(CONSULTATION_TAB.CACHE_KEY, 0)
      this.$router.push(routers.myPage.route)
    }
  },
  head () {
    return {
      title: this.$t('mypage.edit_profile.title', { name: this.userData.name }),
      titleTemplate: '%s' + this.$t('common.screen.long_suffix')
    }
  }
}
</script>

<style>
header {
  /*min-height: auto !important;*/
}
</style>
