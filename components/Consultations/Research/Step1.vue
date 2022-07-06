<template>
  <div>
    <dt>
      <span>STEP<span>01</span></span>
      <p class="title">
        目的地を教えてください
      </p>
    </dt>
    <dd>
      <div class="selectBox areaSelect">
        <select v-model="destination">
          <option
            v-for="(dest, index) in destinations"
            :key="index"
            :value="dest.id"
          >
            {{ dest.name }}
          </option>
        </select>
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
      destinations: [],
      destination: ''
    }
  },
  computed: {
    ...mapState({
      showFilterData: state => state.guestFilterData.showFilterData,
      showDestinationsData: state => state.guestFilterData.destinations_data
    })
  },
  watch: {
    destination (val) {
      if (!_.isEmpty(this.destinations) && val) {
        const data = this.destinations.filter(i => i.id === val).shift()
        const { id, name } = data
        this.$store.commit('guestFilterData/setTravelerData', { destination: { id, name } })
      }
    }
  },
  mounted () {
    this.getDestinations()
    this.destination = this.showFilterData.destination.id || 1
  },
  methods: {
    async getDestinations () {
      if (!_.isEmpty(this.showDestinationsData)) {
        this.destinations = this.showDestinationsData
        return
      }
      this.destinations = await this.$repositories.destination
        .getDestinations()
        .then(({ results }) => results || [])
        .then(items => items.map(TransformHelper.transformHashIdToId))
      this.$store.commit('guestFilterData/setDestinationsData', this.destinations)
    }
  }
}
</script>
