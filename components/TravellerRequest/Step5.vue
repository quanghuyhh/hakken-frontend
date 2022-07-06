<template>
  <swiper-slide>
    <div class="wapper">
      <div class="stepTit">
        <div class="stepNum">
          <span>06</span>/10
        </div>
        <h2>{{ $t('traveller_request_page.step5.title') }}</h2>
      </div>
      <ul class="radioCheck purposeList">
        <li v-for="(purpose, index) in purposes" :key="index">
          <input :id="`purpose-${purpose.hash_id}`" v-model="purpose_id" type="checkbox" :value="purpose.hash_id">
          <label :for="`purpose-${purpose.hash_id}`">{{ purpose.name }}</label>
        </li>
      </ul>
    </div>
    <stepFooterButton :is-next="isNext" />
  </swiper-slide>
</template>

<script>
import { mapState } from 'vuex'
import StepFooterButton from '@/components/TravellerRequest/StepFooterButton'
import { TransformHelper } from '@/helpers/TransformHelper'
export default {
  components: { StepFooterButton },
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
          data.push({ hash_id: purposeData?.hash_id, name: purposeData ? purposeData.name.trim() : '' })
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
