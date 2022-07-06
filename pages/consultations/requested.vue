<template>
  <div>
    <div id="sendConsult">
      <h1>{{ $t('consultations.send_consult.title') }}</h1>
      <p>
        なお相談内容によってはマイスターからの連絡がない場合もあります。
        <br>
        旅行マイスターからのご連絡はマイページでご確認頂けます。<br>
        他のマイスターを選ぶ場合は一覧へお戻りください。
      </p>
      <nuxt-link :to="routers.myPage.route" class="baseBtn">
        {{ $t('common.screen.mypage') }}
      </nuxt-link>
      <nuxt-link :to="routers.matchingResult.route" class="baseBtn">
        {{ $t('consultations.send_consult.back_to_meister_list') }}
      </nuxt-link>
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
    this.$store.commit('guestLayout/setShowTravellerCollectInfo', true)
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

<style scoped>

</style>
