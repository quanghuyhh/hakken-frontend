<template>
  <div class="searchHead">
    <div class="backList">
      <nuxt-link to="/">
        旅行マイスター 一覧へ
      </nuxt-link>
    </div>
    <div id="research">
      <h1>旅行マイスター再検索</h1>
      <div class="inner">
        <dl>
          <consultations-research-step1 />
          <consultations-research-step2 />
          <consultations-research-step3 />
          <consultations-research-step4 />
          <consultations-research-step5 />
          <consultations-research-step6 />
          <consultations-research-step7 />
          <consultations-research-step8 />
          <consultations-research-step9 />

          <dd>
            <ul class="searchCont">
              <li>
                <nuxt-link id="btnResearch" to="/consultations/matching-results">
                  この条件で探す
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">
                  戻る
                </nuxt-link>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routers from '~/utils/routers'
export default {
  name: 'ConsultationRequested',
  layout: 'guest',
  data () {
    return {
      routers
    }
  },
  computed: {
    ...mapState({
      isFilterData: state => state.guestFilterData.isFilterData
    })
  },
  created () {
    this.$store.commit('guestLayout/setShowTravellerCollectInfo', false)
  },
  mounted () {
    if (!this.isFilterData) {
      this.$store.commit('guestLayout/setShowTravellerCollectInfo', false)
    }
  },
  head () {
    return {
      title: this.$t('consultations.matching_result.title'),
      titleTemplate: this.$t('common.screen.long_suffix')
    }
  }
}
</script>
