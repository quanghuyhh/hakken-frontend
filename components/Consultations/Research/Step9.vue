<template>
  <div>
    <dt>
      <span>STEP<span>09</span></span>
      <p class="title">
        何かご質問・ご要望はございますか？
      </p>
    </dt>
    <dd>
      <div class="etc">
        <textarea v-model="note" rows="5" :placeholder="$t('traveller_request_page.step9.request_placeholder')" />
      </div>
    </dd>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
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
      this.isNext = true
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
