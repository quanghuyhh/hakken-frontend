
<template>
  <div class="planBtn">
    <a
      v-if="planPublished"
      @click.prevent="handleViewPlanDetail"
    >
      {{ $t('mypage.consult_list.detail_consult') }}
    </a>
    <a v-else href="javascript:void(0);" class="disabled">{{ $t('mypage.consult_list.detail_consult') }}</a>
  </div>
</template>

<script>
import { MYPAGE } from '@/config/event'
import { CONSULTATION_STATUS } from '@/config/consts'
import { CACHE_VIEW_DETAIL_CONSULTATION_COMPLETED } from '@/config/localstorage'
import routers from '@/utils/routers'
import { useConsultationItem } from '@/compositions/Consultation/useConsultationItem'
export default {
  name: 'ViewPlanDetail',
  props: {
    consultation: {
      type: Object,
      required: true,
      default: () => {}
    },
    matching: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  setup (props) {
    const { planPublished } = useConsultationItem(props)
    return {
      planPublished
    }
  },
  methods: {
    handleViewPlanDetail () {
      const currentPos = document.documentElement.scrollTop || document.body.scrollTop
      this.$bus.emit(MYPAGE.VIEW_PLAN_DETAIL, currentPos)
      if ([CONSULTATION_STATUS.COMPLETED, CONSULTATION_STATUS.CANCELLED].includes(this.consultation.status)) {
        localStorage.setItem(CACHE_VIEW_DETAIL_CONSULTATION_COMPLETED, this.matching.hash_id)
      }
      this.$router.push(this.localePath({
        name: routers.planDetail.name,
        params: { id: this.matching.itinerary.hash_id }
      }))
    }
  }
}
</script>

<style scoped>
.planBtn a.disabled {
  background: #bbb;
  pointer-events: none;
}
</style>
