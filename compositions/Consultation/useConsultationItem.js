import { computed } from '@vue/composition-api'
import { ConsultationHelpers } from '~/helpers/ConsultationHelpers'
import { CONSULTATION_GROUP_STATUS } from '~/config/consts'

export function useConsultationItem (props) {
  // methods
  const isPublicPlan = (matching) => {
    return ConsultationHelpers.isPublicPlan(matching)
  }

  // computed
  const planPublished = computed(() => isPublicPlan(props.matching))
  const canCancelConsultation = computed(() => !CONSULTATION_GROUP_STATUS.COMPLETED.includes(props.consultation.status))

  return {
    // computed
    isPublicPlan,

    planPublished,
    canCancelConsultation
  }
}
