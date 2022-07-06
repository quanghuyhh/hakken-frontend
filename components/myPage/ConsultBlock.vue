<template>
  <div class="consultBlock">
    <div class="inner">
      <div class="consultationList">
        <my-page-consult-detail
          v-for="(consultation, index) in currentConsultations"
          :key="index"
          :consultation="consultation"
        />
      </div>
      <pagination
        v-if="consultations.length > limitConsultation"
        :current-page="currentPage"
        :per-page="limitConsultation"
        :total="consultations.length"
        :total-pages="Math.ceil(consultations.length/limitConsultation)"
        @pagechanged="currentPage = $event"
      />
    </div>
  </div>
</template>

<script>
import { CACHE_NEED_BACK_PREVIOUS_POSITION, CACHE_CONSULTATION_VIEW_POSITION } from '@/config/localstorage'
import { MYPAGE } from '@/config/event'
import { CacheHelper } from '@/helpers/CacheHelper'

export default {
  name: 'ConsultBlock',
  props: {
    consultations: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentPage: 1,
      limitConsultation: 3
    }
  },
  computed: {
    currentConsultations () {
      const itemList = this.consultations
      const startPage = (this.currentPage - 1) * this.limitConsultation
      return itemList.slice(startPage, startPage + this.limitConsultation)
    }
  },
  mounted () {
    this.$bus.on(MYPAGE.VIEW_PLAN_DETAIL, this.handleViewPlan)
    this.handleDefaultPage()
  },
  methods: {
    handleViewPlan (pos) {
      localStorage.setItem(CACHE_CONSULTATION_VIEW_POSITION, JSON.stringify({
        pos,
        page: this.currentPage
      }))
    },
    handleDefaultPage () {
      const positionData = CacheHelper.getCacheViewConsultation()
      if (!positionData) {
        return
      }
      this.currentPage = positionData.page || 1
      localStorage.setItem(CACHE_NEED_BACK_PREVIOUS_POSITION, null)
    }
  }
}
</script>

<style scoped>
.consultationList div + div {
  margin-top: 30px;
}
</style>
