<template>
  <modal name="filterData" height="76%">
    <div class="modal">
      <div class="modal-content">
        <h2 class="mdTit consult">
          {{ modalTitle }}
        </h2>
        <ul class="searchConf">
          <li>
            <span class="confLabel">{{ $t('traveller_request_page.travel_day') }}</span>
            <p>
              {{ renderSeasonText() }}({{ showFilterData.qty }}{{
                $t('consultations.modal.day')
              }})
            </p>
          </li>
          <li>
            <span class="confLabel">{{ $t('traveller_request_page.destination_address') }}</span>
            <p>{{ showFilterData.destination.name || $t('traveller_request_page.step9.destination_undecided') }}</p>
          </li>
          <li>
            <span class="confLabel">{{ $t('traveller_request_page.departure_address') }}</span>
            <p>{{ showFilterData.departure.name }}</p>
            <span>{{ showFilterData.address_optionals }}</span>
          </li>
          <li>
            <span class="confLabel">{{ $t('traveller_request_page.number_of_customers') }}</span>

            <ul class="parsonList">
              <li>大人<span>{{ showFilterData.adult }}</span>名</li>
              <li>子供<span>{{ showFilterData.child }}</span>名</li>
              <li>幼児<span>{{ showFilterData.infant }}</span>名</li>
            </ul>
          </li>
          <li>
            <span class="confLabel">{{ $t('traveller_request_page.purpose_of_travel') }}</span>
            <ul v-if="!_.isEmpty(showFilterData.purposes)" class="intList">
              <li v-for="(purpose, index) in showFilterData.purposes" :key="index">
                {{ purpose.name }}
              </li>
            </ul>
          </li>
          <li>
            <span class="confLabel">{{ $t('traveller_request_page.budget_of_travel') }}</span>
            <dd>総額{{ showFilterData.estimated.amount | toCurrency }}円</dd>
          </li>
          <li>
            <span class="confLabel">{{ $t('traveller_request_page.interested_in') }}</span>

            <ul v-if="!_.isEmpty(showFilterData.favorites)" class="intList">
              <li v-for="(favorite, index) in showFilterData.favorites" :key="index">
                {{ favorite.name }}
              </li>
            </ul>
          </li>
          <li>
            <span class="confLabel">{{ $t('traveller_request_page.note') }}</span>
            <textarea v-model="showFilterData.note" class="autoHeight note" disabled />
          </li>
        </ul>
        <ul class="consultCont">
          <li v-if="!$auth.loggedIn" class="sendBtn">
            <a href="javascript:void(0);" class="goToRegister" @click.prevent="handleRedirect('/register')">
              {{ $t('traveller_request_page.register_member') }}
            </a>
          </li>
          <li v-if="!$auth.loggedIn" class="sendBtn">
            <a href="javascript:void(0);" class="goToLogin" @click.prevent="handleRedirect('/login')">
              {{ $t('traveller_request_page.login_to_consul') }}
            </a>
          </li>

          <li v-else :class="{'button-loading': isLoading, sendBtn: true}">
            <button class="goToConsultation" @click="createConsultation">
              {{ $t('consultations.modal.create_consultations') }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </modal>
</template>
<script>
import { mapState } from 'vuex'
import { MATCHING_MEISTER } from '@/config/consts'
import routers from '~/utils/routers'

export default {
  props: {
    meisterList: {
      type: [Array, Object],
      required: false,
      default () {
        return {}
      }
    },
    modalTitle: {
      type: String,
      default: '全ての旅行マイスターに相談'
    }
  },
  data () {
    return {
      isLoading: false,
      date: '',
      hour: '10',
      minute: '30',
      season: {
        spring: this.$t('season.spring'),
        summer: this.$t('season.summer'),
        autumn: this.$t('season.autumn'),
        winter: this.$t('season.winter'),
        noseason: this.$t('season.no_season')
      }
    }
  },
  computed: {
    ...mapState({
      showTravellerCollectInfo: state => state.guestLayout.showTravellerCollectInfo,
      showFilterData: state => state.guestFilterData.showFilterData
    })
  },
  methods: {
    async createConsultation () {
      this.isLoading = true
      const params = {
        point_of_departure_hash_id: this.showFilterData.departure.id,
        formatted_address: this.showFilterData.destination.formatted_address,
        start_date: this.showFilterData.date ? this.$dayjs(this.showFilterData.date).format('YYYY-MM-DD') : null,
        end_date: this.showFilterData.date ? this.$dayjs(this.showFilterData.date).add(this.showFilterData.qty, 'days').format('YYYY-MM-DD') : null,
        number_of_adult: this.showFilterData.adult,
        number_of_children: this.showFilterData.child,
        number_of_infant: this.showFilterData.infant,
        total_day: this.showFilterData.qty,
        purposes: this.showFilterData.purposes || [],
        favorites: this.showFilterData.favorites || [],
        budget: this.showFilterData.estimated.amount,
        season: this.showFilterData.season,
        note: this.showFilterData.note,
        agent_id: this.$route.params.id ? [this.$route.params.id] : this.meisterList,
        expected_meeting_time: this.date ? this.$dayjs(this.date + ' ' + this.hour + ':' + this.minute).format('YYYY-MM-DD HH:mm') : ''
      }

      await this.$repositories.consultation.createConsultations(params)
        .then((res) => {
          if (res.status && res.status === 'success') {
            this.$store.commit('guestFilterData/setIsFilterData', false)
            this.$store.commit('guestFilterData/resetShowFilterData')
            this.$router.push(routers.consultationRequested.route)
            this.isLoading = false
          }
        }).catch((error) => {
          const _this = this
          _this.isLoading = false
          _.map(error.message_internal, function (v, k) {
            const err = _.first(v)
            _this.$toast.error(_this.$t(k + ': ' + err))
          })
        })

      localStorage.removeItem(MATCHING_MEISTER.CACHE_FILTER_DATA)
    },

    handleRedirect (redirectPath) {
      localStorage.setItem(MATCHING_MEISTER.CACHE_REDIRECT, location.pathname)
      this.$router.push(redirectPath)
    },

    renderSeasonText () {
      if (!this.showFilterData.season || this.showFilterData.date) {
        return this.$options.filters.travelerFormatDate(this.showFilterData.date)
      } else {
        let seasonText = ''
        Object.keys(this.season).forEach((key) => {
          if (key === this.showFilterData.season) {
            seasonText = this.season[key]
          }
        })
        return seasonText
      }
    }
  }
}
</script>

<style scoped>

.modal {
  height: 100%;
  position: initial;
  top: 0;
  width: 100%;
  z-index: 100;
  display: block;
  overflow: auto;
}

.modal-content {
  width: 100%;
  box-shadow: none;
  left: 50%;
  height: calc(100% - 40px);
  overflow: auto;
  padding: 30px;
}

.searchConf {
  min-height: 490px;
  overflow-x: hidden;
  overflow-y: auto;
}

.sendBtn .goToRegister,
.sendBtn .goToLogin,
.sendBtn .goToConsultation,
.sendBtn .goToConsultationLoader {
  border-radius: 100px;
  background: #f8b62d;
  border: none;
  font-weight: bold;
  width: 100%;
  padding: 15px 40px 15px 30px;
}

.sendBtn .goToConsultationLoader {
  padding: 0px;
}

.sendBtn .goToConsultation {
  padding: 15px 50px;
}

.sendBtn .goToRegister:hover,
.sendBtn .goToLogin:hover,
.sendBtn .goToConsultation:hover {
  color: #000;
}

.note {
  border: none;
  resize: none;
}

.sendBtn {
  width: fit-content;
  display: flex;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .consultCont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
