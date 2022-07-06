<template>
  <swiper-slide>
    <div class="wapper">
      <div class="stepTit">
        <div class="stepNum">
          <span>10</span>/10
        </div>
        <h2>{{ $t('traveller_request_page.step10.title') }}</h2>
      </div>
      <div class="confirmList">
        <ul class="dayPlace">
          <li>
            <span>{{ $t('traveller_request_page.travel_day') }}</span>
            <p>
              {{ renderSeasonText() }}
              <span v-if="hankakuToZenkaku(String(showFilterData.qty)) > 1" class="confirmListStartDate">({{ showFilterData.qty }}{{ $t('consultations.modal.day') }})</span>
              <span v-else class="confirmListStartDate">(日帰り)</span>
            </p>
          </li>
          <li>
            <span>{{ $t('traveller_request_page.destination_address') }}</span>
            <p>{{ showFilterData.destination.name || $t('traveller_request_page.step9.destination_undecided') }}</p>
          </li>

          <li>
            <span>{{ $t('traveller_request_page.departure_address') }}</span>
            <p>{{ showFilterData.departure.name }}</p>
            <span>{{ showFilterData.address_optionals }}</span>
          </li>
        </ul>
        <div>
          <ul class="confInfo01">
            <li>
              <span>{{ $t('traveller_request_page.number_of_customers') }}</span>

              <ul class="parsonList">
                <li>{{ $t('traveller_request_page.human') }}<span>{{ showFilterData.adult }}</span>{{ $t('human_unit') }}</li>
                <li>{{ $t('traveller_request_page.children') }}<span>{{ showFilterData.child }}</span>{{ $t('human_unit') }}</li>
                <li>{{ $t('traveller_request_page.kid') }}<span>{{ showFilterData.infant }}</span>{{ $t('human_unit') }}</li>
              </ul>
            </li>
            <li>
              <span>{{ $t('traveller_request_page.purpose_of_travel') }}</span>
              <ul v-if="!_.isEmpty(showFilterData.purposes)" class="intList">
                <li v-for="(purpose, index) in showFilterData.purposes" :key="index">
                  {{ purpose.name }}
                </li>
              </ul>
            </li>
            <li>
              <span>{{ $t('traveller_request_page.budget_of_travel') }}</span>
              <p>総額{{ showFilterData.estimated.amount | toCurrency }}円</p>
            </li>
          </ul>
          <ul class="confInfo02">
            <li>
              <span>{{ $t('traveller_request_page.interested_in') }}</span>

              <ul v-if="!_.isEmpty(showFilterData.favorites)" class="intList">
                <li v-for="(favorite, index) in showFilterData.favorites" :key="index">
                  {{ favorite.name }}
                </li>
              </ul>
            </li>
            <li>
              <span>{{ $t('traveller_request_page.step10.request') }}</span>
              <p class="note">
                <textarea v-model="showFilterData.note" rows="7" disabled />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <stepFooterButton :is-submit="true" @submit-form="submitForm" />
  </swiper-slide>
</template>

<script>
import { mapState } from 'vuex'
import StepFooterButton from '@/components/TravellerRequest/StepFooterButton'
import { MATCHING_MEISTER } from '@/config/consts'
export default {
  components: { StepFooterButton },
  data () {
    return {
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
      showFilterData: state => state.guestFilterData.showFilterData
    })
  },
  methods: {
    submitForm () {
      localStorage.setItem(MATCHING_MEISTER.CACHE_FILTER_DATA, JSON.stringify(this.showFilterData))
      this.$store.commit('guestFilterData/setIsFilterData', true)
      this.$router.push('/consultations/matching-results')
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
.wapper::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.wapper::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}

.confirmList span.confirmListStartDate {
    color: #000000;
    display: inline;
    margin-bottom: 5px;
}

.confirmList .confInfo02 .note textarea{
  border: none;
  resize: none;
}
</style>
