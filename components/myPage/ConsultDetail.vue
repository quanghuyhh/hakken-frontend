<template>
  <div>
    <my-page-consult-summary :consultation="consultation" />

    <my-page-consult-wait v-if="isWaiting" />

    <div v-else-if="!consultation.matching.length && !isSearching" class="consultList">
      <div class="consultWait">
        <p class="pre-formatted">
          {{ $t('consultations.no_meister_matched') }}
        </p>
      </div>
    </div>

    <template v-else>
      <my-page-consult-list v-if="selectedItineraries.length" :itineraries="selectedItineraries" :consultation="consultation">
        <template #title>
          {{ CONSULTATION_GROUP_STATUS.COMPLETED.includes(consultation.status) ? $t('mypage.consult_list.title_completed') : $t('mypage.consult_list.title_reserved') }}
        </template>
      </my-page-consult-list>
      <my-page-consult-list
        v-if="unselectedItineraries.length"
        :itineraries="unselectedItineraries"
        :consultation="consultation"
        :disabled="selectedItineraries.length > 0"
      />
    </template>
  </div>
</template>

<script>
import { RESERVATION_STATUS, CONSULTATION_LIMIT, CONSULTATION_STATUS, CONSULTATION_GROUP_STATUS } from '@/config/consts'

export default {
  name: 'ConsultationDetail',
  props: {
    consultation: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      CONSULTATION_STATUS,
      CONSULTATION_GROUP_STATUS
    }
  },
  computed: {
    matching () {
      return this.consultation && this.consultation.matching ? this.consultation.matching : []
    },
    isWaiting () {
      return this.isSearching && !this.consultation.matching.length
    },
    isSearching () {
      return this.$dayjs().diff(this.$dayjs(this.consultation.created_at), 'hours') < CONSULTATION_LIMIT.WAITING_HOURS
    },
    selectedItineraries () {
      return this.matching.filter(
        (matching) => {
          return matching.itinerary && (
            [RESERVATION_STATUS.PROCESSING, RESERVATION_STATUS.COMPLETED].includes(matching.itinerary.status)
          )
        })
    },
    unselectedItineraries () {
      return this.matching.filter(matching => (
        !matching.itinerary ||
        !this.selectedItineraries.find(_matching => _matching.id === matching.id)
      ))
    }
  }
}
</script>

<style>
.pre-formatted {
  white-space: pre-line;
}
</style>
