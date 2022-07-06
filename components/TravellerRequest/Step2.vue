<template>
  <swiper-slide>
    <div class="wapper">
      <div class="stepTit">
        <div class="stepNum">
          <span>02</span>/10
        </div>
        <h2>{{ $t('traveller_request_page.step3.title') }}</h2>
      </div>
      <div class="column">
        <div class="calendar">
          <v-date-picker
            v-model="selectedDate"
            mode="range"
            :min-date="minDate"
            :first-day-of-week="2"
            show-caps
            is-expanded
            :locale="{ id: 'ja', firstDayOfWeek: 2, masks: { weekdays: 'WW' } }"
          />
        </div>
        <div class="subOption">
          <ul class="btnRadio">
            <li>
              <input
                id="spring"
                v-model="season"
                value="spring"
                type="radio"
                name="calendar01"
                @click="toggleSeason"
              >
              <label for="spring">{{ $t('season.spring') }}</label>
            </li>
            <li>
              <input
                id="summer"
                v-model="season"
                value="summer"
                type="radio"
                name="calendar01"
                @click="toggleSeason"
              >
              <label for="summer">{{ $t('season.summer') }}</label>
            </li>
            <li>
              <input
                id="autumn"
                v-model="season"
                value="autumn"
                type="radio"
                name="calendar01"
                @click="toggleSeason"
              >
              <label for="autumn">{{ $t('season.autumn') }}</label>
            </li>
            <li>
              <input
                id="winter"
                v-model="season"
                value="winter"
                type="radio"
                name="calendar01"
                @click="toggleSeason"
              >
              <label for="winter">{{ $t('season.winter') }}</label>
            </li>
            <li>
              <input
                id="noseason"
                v-model="season"
                value="noseason"
                type="radio"
                name="calendar01"
                @click="toggleSeason"
              >
              <label for="noseason">{{ $t('season.no_season') }}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <stepFooterButton :first-slide="true" :is-next="isNext" />
  </swiper-slide>
</template>

<script>
import { mapState } from 'vuex'
import StepFooterButton from '@/components/TravellerRequest/StepFooterButton'

export default {
  components: { StepFooterButton },
  data () {
    return {
      isNext: true,
      minDate: this.$dayjs().add(7, 'days').format('MM/DD/YYYY'),
      selectedDate: '',
      season: ''
    }
  },
  computed: {
    ...mapState({
      showFilterData: state => state.guestFilterData.showFilterData
    })
  },
  watch: {
    selectedDate (date) {
      if (!date && !this.season) {
        this.isNext = false
        this.$store.commit('guestFilterData/setTravelerData', { date })
        return
      }
      this.season = ''
      this.$store.commit('guestFilterData/setTravelerData', { date })
      this.isNext = true
    },
    season (season) {
      if (!this.selectedDate && !season) {
        this.isNext = false
        return
      }
      this.isNext = true
      this.$store.commit('guestFilterData/setTravelerData', { season })
    }
  },
  mounted () {
    this.selectedDate = this.showFilterData.date
    this.season = this.showFilterData.season
  },
  methods: {
    toggleSeason (event) {
      const { value } = event.target
      this.season = this.season ? '' : value
      this.selectedDate = ''
      this.$store.commit('guestFilterData/setTravelerData', { date: this.selectedDate })
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
</style>
