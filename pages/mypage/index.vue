<template>
  <main>
    <tab :items="tabs" :active-tab="activeTab" @change="onTabChanged" />

    <div v-show="activeTab === 0" class="tab-processing">
      <consult-block
        v-if="requestedConsultations && requestedConsultations.length"
        :consultations="requestedConsultations"
      />
      <no-request v-else />
    </div>

    <div v-show="activeTab === 1" class="tab-reversed">
      <!--      <older-consult-->
      <!--        v-if="reversedConsultations && reversedConsultations.length"-->
      <!--        :consultations="reversedConsultations"-->
      <!--      />-->
      <consult-block
        v-if="reversedConsultations && reversedConsultations.length"
        :consultations="reversedConsultations"
      />
      <no-request v-else>
        <p>{{ $t('mypage.no_request.no_reserved_title') }}</p>
      </no-request>
    </div>

    <div v-show="activeTab === 2" class="tab-completed">
      <older-consult
        v-if="completedConsultations && completedConsultations.length"
        :consultations="completedConsultations"
      />
      <no-request v-else>
        <p>{{ $t('mypage.no_request.no_completed_title') }}</p>
      </no-request>
    </div>
  </main>
</template>

<script>
import { CACHE_NEED_BACK_PREVIOUS_POSITION, CACHE_CONSULTATION_VIEW_POSITION } from '@/config/localstorage'
import ConsultBlock from '@/components/myPage/ConsultBlock'
import OlderConsult from '@/components/myPage/OlderConsult'
import NoRequest from '@/components/myPage/NoRequest'
import { CommonHelper } from '@/helpers/CommonHelper'
import { CONSULTATION_GROUP_STATUS, CONSULTATION_TAB } from '@/config/consts'
import { MYPAGE } from '@/config/event'
import { CacheHelper } from '@/helpers/CacheHelper'
import { TransformHelper } from '@/helpers/TransformHelper'

export default {
  name: 'MyPage',
  middleware: 'auth',
  components: {
    ConsultBlock,
    OlderConsult,
    NoRequest
  },
  data () {
    return {
      tabs: [
        this.$t('mypage.tabs.requested'),
        this.$t('mypage.tabs.confirmed'),
        this.$t('mypage.tabs.completed')],
      requestedConsultations: [],
      reversedConsultations: [],
      completedConsultations: []
    }
  },
  computed: {
    activeTab: {
      get () {
        return this.$store.getters['user/mypageTab']
      },
      set (value) {
        this.$store.commit('user/setMypageTab', value)
      }
    },
    currentStatus () {
      switch (this.activeTab) {
        case 1:
          return CONSULTATION_GROUP_STATUS.RESERVED
        case 2:
          return CONSULTATION_GROUP_STATUS.COMPLETED
        default:
          return CONSULTATION_GROUP_STATUS.REQUESTED
      }
    },
    consultations: {
      get () {
        switch (this.activeTab) {
          case 1:
            return this.reversedConsultations
          case 2:
            return this.completedConsultations
          default:
            return this.requestedConsultations
        }
      },
      set (values) {
        switch (this.activeTab) {
          case 1:
            this.reversedConsultations = values
            break
          case 2:
            this.completedConsultations = values
            break
          default:
            this.requestedConsultations = values
            break
        }
      }
    }
  },
  mounted () {
    this.activeTab = parseInt(localStorage.getItem(CONSULTATION_TAB.CACHE_KEY)) || 0
    this.$nextTick(() => {
      this.fetchData()
    })
    this.$bus.on(MYPAGE.BACK_TO_CONSULTATION_LIST, this.markBack)
  },
  methods: {
    async fetchData () {
      /**
       * @TODO: process logic for tab 2 and tab 3.
       * Temporary just fetch data for tab 1.
       */
      if (this.activeTab === 2) {
        return
      }

      this.$nuxt.$loading.start()
      const filterData = {
        filter: {
          statuses: this.currentStatus
        }
      }
      this.$nuxt.$loading.start()
      this.consultations = await this.$repositories.consultation.getConsultations(filterData)
        .then(({ results }) => results.data || [])
        .then(results => results.map(TransformHelper.transformHashIdToId))
        .finally(() => {
          setTimeout(() => this.$nuxt.$loading.finish(), 1000)
        })
      this.$nextTick(() => {
        this.handleBackToConsultation()
      })
    },
    async onTabChanged (tabIndex) {
      localStorage.setItem(CONSULTATION_TAB.CACHE_KEY, tabIndex)
      if (tabIndex === this.activeTab) {
        return
      }
      this.activeTab = tabIndex
      if (this.consultations.length) {
        return
      }

      await this.fetchData()
    },
    markBack () {
      localStorage.setItem(CACHE_NEED_BACK_PREVIOUS_POSITION, true)
    },
    handleBackToConsultation () {
      const positionData = CacheHelper.getCacheViewConsultation()
      if (!positionData) {
        return
      }
      CommonHelper.scrollToTop(positionData.pos)
      this.currentPage = positionData.page
      localStorage.setItem(CACHE_CONSULTATION_VIEW_POSITION, null)
    }
  },
  head () {
    return {
      title: this.$t('common.screen.mypage')
    }
  }
}
</script>
