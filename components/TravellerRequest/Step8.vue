<template>
  <swiper-slide>
    <div class="wapper">
      <div class="stepTit">
        <div class="stepNum">
          <span>08</span>/10
        </div>
        <h2>{{ $t('traveller_request_page.step8.title') }}</h2>
      </div>
      <div class="area-select-departure">
        <v-multi-select
          v-model="departure_id"
          :options="departures"
          :close-on-select="false"
          :show-labels="true"
          :placeholder="$t('traveller_request_page.prefectures')"
          :select-label="$t('traveller_request_page.step8.select')"
          :selected-label="$t('traveller_request_page.step8.selected')"
          :deselect-label="$t('traveller_request_page.step8.remove')"
          label="name"
          track-by="id"
        />
      </div>
      <div class="area-input-address">
        <textarea v-model="address_optionals" class="address_optionals" rows="5" :placeholder="'住所・駅・ビル名など(任意)'" />
      </div>
    </div>
    <stepFooterButton :is-next="isNext" />
  </swiper-slide>
</template>

<script>
import { mapState } from 'vuex'
import { Multiselect as VMultiSelect } from 'vue-multiselect'

import StepFooterButton from '@/components/TravellerRequest/StepFooterButton'
import { TransformHelper } from '@/helpers/TransformHelper'
export default {
  components: { StepFooterButton, VMultiSelect },
  data () {
    return {
      isNext: false,
      departures: [],
      departure_id: '',
      address_optionals: null
    }
  },
  computed: {
    ...mapState({
      showFilterData: state => state.guestFilterData.showFilterData,
      showPointOfDeparturesData: state => state.guestFilterData.poin_of_depatures_data
    })
  },
  watch: {
    departure_id (val) {
      if (!val) {
        this.isNext = false
        return
      }
      if (!_.isEmpty(this.departures) && val) {
        const departureData = this.departures.filter(i => i.id === val.id).shift()
        const { id, name } = departureData
        this.$store.commit('guestFilterData/setTravelerData', { departure: { id, name } })
        this.isNext = true
      }
    },
    address_optionals (val) {
      if (!_.isEmpty(val)) {
        this.$store.commit('guestFilterData/setTravelerData', { address_optionals: val })
      }
    }
  },
  mounted () {
    this.getDepartures()
    this.departure_id = this.showFilterData.departure.id ? this.showFilterData.departure : ''
    this.address_optionals = this.showFilterData.address_optionals
    this.isNext = !!this.showFilterData.departure.id
  },
  methods: {
    async getDepartures () {
      if (!_.isEmpty(this.showPointOfDeparturesData)) {
        this.departures = this.showPointOfDeparturesData
        return
      }
      this.departures = await this.$repositories.departure.getPointOfDepatures().then(({ results }) => results || [])
        .then(items => items.map(TransformHelper.transformHashIdToId))
      this.$store.commit('guestFilterData/setPointOfDeparturesData', this.departures)
    }
  }
}
</script>
<style scoped>
.area-select-departure {
  width: 50%;
}
.area-input-address, .area-select-departure{
  padding: 0 3px;
}
.area-input-address .address_optionals {
  background-image: -moz-linear-gradient( 125deg, rgb(255,255,255) 0%, rgb(249,249,249) 100%);
  background-image: -webkit-linear-gradient( 125deg, rgb(255,255,255) 0%, rgb(249,249,249) 100%);
  background-image: -ms-linear-gradient( 125deg, rgb(255,255,255) 0%, rgb(249,249,249) 100%);
  box-shadow: 0px 1px 5px 0px rgba(9, 1, 3, 0.1),-1.118px -1.658px 5px 0px rgba(230, 230, 230, 0.4);
  background: #fff;
  margin-top: 20px;
}
</style>
