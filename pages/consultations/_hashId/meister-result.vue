<template>
  <div class="matching-details">
    <div v-if="isLoading">
      <div class="searchHead">
        <div class="backList">
          <nuxt-link
            to="/consultations/matching-results"
          >
            {{ $t('consultations.matching_detail.back_travel_meisters') }}
          </nuxt-link>
        </div>
      </div>
      <div id="profInfo">
        <div class="resultCard">
          <div class="mainCard">
            <div class="bgImg">
              <img :src="meisterCover | aws_photo" onerror="this.src = '~assets/images/consultations/sample_ph01.jpg'" alt="">
            </div>
            <div class="profCard">
              <div class="profImg">
                <img :src="meisterAvatar | aws_photo" :alt="meisterAvatar">
              </div>
              <h3><span>{{ agentName }}</span>{{ meister.name }}<span>[{{ currentLocation.name || '' }}]</span></h3>
            </div>
            <ul class="valuation">
              <li>相談件数<span>113</span>件</li>
              <li><a href="#voice">評価<span>3.5</span>pt</a></li>
            </ul>
          </div>
          <p class="tagTitle">
            {{ $t('consultations.matching_result.category') }}
          </p>
          <elements-consultation-favorite-list :items="favorites" />
          <p class="prTxt">
            {{ meisterIntroduction }}
          </p>

          <div class="allConsul">
            <p class="baseBtn ico-consult js-modal-open" data-target="mdConsult" @click="handleOpenReserve">
              {{ $t('consultations.matching_detail.talk_to_travel_meister') }}
            </p>
          </div>
        </div>

        <div class="samplePlan">
          <h2> {{ $t('consultations.matching_detail.travel_plan') }}</h2>
          <ul class="halfColumn">
            <li>
              <travel-plan />
            </li>
            <li>
              <travel-plan />
            </li>
            <li>
              <travel-plan />
            </li>
            <li>
              <travel-plan />
            </li>
          </ul>
        </div>
        <div id="voice">
          <ul class="valuationList">
            <li>{{ $t('consultations.matching_result.number_of_consultations') }}<span>113</span>{{ $t('consultations.matching_result.subject') }}</li>
            <li>{{ $t('consultations.matching_result.evaluation') }}<span>3.5</span>pt</li>
          </ul>
          <voice-box />
          <voice-box />
          <voice-box />
          <voice-box />
          <voice-box />
          <voice-box />
        </div>
      </div>
      <!-- Start modal  -->
      <consul-modal :meister-list="meisterId" :modal-title="$t('consultations.matching_detail.talk_to_travel_meister')" />
    <!-- End modal -->
    </div>
    <div v-else>
      <matched-detail />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { findLast, isEmpty } from 'lodash'
import { MATCHING_MEISTER } from '@/config/consts'
import TravelPlan from '@/components/Consultations/TravelPlan.vue'
import VoiceBox from '@/components/Consultations/VoiceBox.vue'
import ConsulModal from '@/components/Consultations/ConsultModal.vue'
import MatchedDetail from '@/components/Skeleton/matchedDetail.vue'

export default {
  layout: 'guest',
  components: { TravelPlan, VoiceBox, ConsulModal, MatchedDetail },
  data () {
    return {
      isLoading: false,
      isPreview: false,
      meister: []
    }
  },
  computed: {
    ...mapState({
      isFilterData: state => state.guestFilterData.isFilterData,
      showFilterData: state => state.guestFilterData.showFilterData
    }),
    meisterId () {
      return [this.meister.hash_id || null]
    },
    agentName () {
      return this.meister?.meister?.agent.name
    },
    meisterAvatar () {
      return this.meister?.meister?.avatar
    },
    meisterCover () {
      return this.meister?.meister?.cover
    },
    meisterIntroduction () {
      return this.meister?.meister?.introduction
    },
    favorites () {
      return this.meister?.meister?.favorites || []
    },
    purposes () {
      return this.meister?.meister?.purposes || []
    },
    meisterLocations () {
      return this.meister?.meister?.meister_location || []
    },
    destination () {
      return this.showFilterData?.destination || {}
    },
    currentLocation () {
      if (isEmpty(this.meisterLocations) || isEmpty(this.destination)) {
        return ''
      }
      return findLast(this.meisterLocations, location => location?.place_id === this.destination?.place_id)
    }
  },
  created () {
    this.isPreview = this.$route.query?.preview === 'true'
    const cache = localStorage.getItem(MATCHING_MEISTER.CACHE_FILTER_DATA)
    if (cache && !this.isPreview) {
      const data = JSON.parse(cache)
      this.$store.commit('guestFilterData/setTravelerData', data)
      this.$store.commit('guestFilterData/setIsFilterData', true)
    }
    this.$store.commit('guestLayout/setShowTravellerCollectInfo', true)
    if (!this.isFilterData && !this.isPreview) {
      this.$store.commit('guestLayout/setShowTravellerCollectInfo', false)
      this.$router.push('/')
    }
  },
  mounted () {
    this.getAgentById()
    this.$nextTick(() => {
      setTimeout(() => { this.isLoading = true }, 1000)
    })
  },
  methods: {
    async getAgentById () {
      const { hashId } = this.$route.params
      await this.$repositories.consultation.getMeisterMatching(hashId).then((res) => {
        if (res && res.status === 'success') {
          this.meister = res.results
        }
      })
    },
    handleOpenReserve () {
      if (this.isPreview) {
        return false
      }
      this.$modal.show('filterData')
    }
  },
  head () {
    return {
      title: this.$t(
        'consultations.matching_detail.title', {
          company_name: (this.meister.company ? this.meister.company.name : ''),
          meister_name: (this.meister ? this.meister.name : '')
        }
      ),
      titleTemplate: this.$t('common.screen.hakken_suffix')
    }
  }
}
</script>
