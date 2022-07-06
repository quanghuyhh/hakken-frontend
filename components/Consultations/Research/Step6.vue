<template>
  <div>
    <dt>
      <span>STEP<span>06</span></span>
      <p class="title">
        旅行の目的を教えてください
      </p>
    </dt>
    <dd>
      <ul class="checkArea baseCheck reason">
        <li v-for="(purpose, index) in purposes" :key="index">
          <input :id="`purpose-${purpose.hash_id}`" v-model="purpose_id" type="checkbox" :value="purpose.hash_id">
          <label :for="`purpose-${purpose.hash_id}`">{{ purpose.name }}</label>
        </li>
      </ul>
    </dd>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TransformHelper } from '@/helpers/TransformHelper'
export default {
  data () {
    return {
      isNext: false,
      purposes: [],
      purpose_id: []
    }
  },
  computed: {
    ...mapState({
      showFilterData: state => state.guestFilterData.showFilterData,
      showPurposesData: state => state.guestFilterData.purposes_data
    })
  },
  watch: {
    purpose_id (val) {
      this.isNext = !_.isEmpty(this.purpose_id)
      if (!_.isEmpty(this.purposes)) {
        const data = []
        val.forEach((element) => {
          const purposeData = this.purposes.filter(i => i.hash_id === element).shift()
          data.push({ hash_id: purposeData.hash_id, name: purposeData.name.trim() })
        })
        this.$store.commit('guestFilterData/setTravelerData', { purposes: data })
      }
    }
  },
  mounted () {
    this.getPurposes()
    const { purposes } = this.showFilterData
    if (!_.isEmpty(purposes)) {
      purposes.forEach((element) => {
        this.purpose_id.push(element.hash_id)
      })
    }
  },
  methods: {
    async getPurposes () {
      if (!_.isEmpty(this.showPurposesData)) {
        this.purposes = this.showPurposesData
        return
      }
      this.purposes = await this.$repositories.purpose.getPurposes().then(({ results }) => results || [])
        .then(items => items.map(TransformHelper.transformHashIdToId))
      this.$store.commit('guestFilterData/setPurposesData', this.purposes)
    },
    choose (event) {
      this.purpose_id = event.target.hash_id
    }
  }
}
</script>
