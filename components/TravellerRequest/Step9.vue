<template>
  <swiper-slide>
    <div class="wapper">
      <div class="stepTit">
        <div class="stepNum">
          <span>09</span>/10
        </div>
        <h2>{{ $t('traveller_request_page.step9.title') }}</h2>
      </div>
      <div class="etcInput">
        <textarea v-model="note" rows="5" :placeholder="$t('traveller_request_page.step9.request_placeholder')" />
      </div>
    </div>
    <stepFooterButton :is-next="isNext" />
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
      note: null
    }
  },
  computed: {
    ...mapState({
      showFilterData: state => state.guestFilterData.showFilterData
    })
  },
  watch: {
    note (note) {
      if (!_.isEmpty(note)) {
        this.$store.commit('guestFilterData/setTravelerData', { note })
      }
    }
  },
  mounted () {
    if (!_.isEmpty(this.showFilterData.note)) {
      this.note = this.showFilterData.note
    }
  }
}
</script>
