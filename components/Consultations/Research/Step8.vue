<template>
  <div>
    <dt>
      <span>STEP<span>08</span></span>
      <p class="title">
        出発地を教えてください
      </p>
    </dt>
    <dd class="place">
      <div class="selectBox">
        <select v-model="departure_id">
          <option v-for="(departure, index) in departures" :key="index" :value="departure.id">
            {{ departure.name }}
          </option>
        </select>
      </div>
      <div class="address">
        <input v-model="address_optionals" class="address_optionals" type="text" placeholder="住所・駅・ビル名など(任意)">
      </div>
    </dd>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TransformHelper } from '@/helpers/TransformHelper'

export default {
  data () {
    return {
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
      if (!_.isEmpty(this.departures) && val) {
        const departureData = this.departures.filter(i => i.id === val).shift()
        const { id, name } = departureData
        this.$store.commit('guestFilterData/setTravelerData', { departure: { id, name } })
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
    this.departure_id = this.showFilterData.departure.id || 1
    this.address_optionals = this.showFilterData.address_optionals
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
