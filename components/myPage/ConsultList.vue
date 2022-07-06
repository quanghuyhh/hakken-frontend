<template>
  <div class="consultList">
    <div class="consultHead">
      <h2>
        <slot name="title">
          {{ $t('mypage.consult_list.title') }}
        </slot>
      </h2>

      <ul class="consultNav">
        <li>{{ $t('mypage.consult_list.message') }}</li>
        <li>{{ $t('mypage.consult_list.call') }}</li>
        <li>{{ $t('mypage.consult_list.document') }}</li>
      </ul>
    </div>

    <template v-for="(itinerary, index) in sortedItineraries">
      <lazy-my-page-consult-list-waiting-item v-if="isWaiting(itinerary)" :key="index" :class="{'noFix': disabled}" :disabled="disabled" />
      <lazy-my-page-consult-list-item
        v-else
        :key="index"
        :matching="itinerary"
        :consultation="consultation"
        :class="{'noFix': disabled}"
        :disabled="disabled"
      />
    </template>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import { RESERVATION_STATUS, MATCHING_MEISTER_STATUS, CONSULTATION_LIMIT } from '@/config/consts'

export default {
  name: 'ConsultList',
  props: {
    itineraries: {
      type: Array,
      required: true,
      default: () => []
    },
    consultation: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      MATCHING_MEISTER_STATUS
    }
  },
  computed: {
    sortedItineraries () {
      const matches = this.itineraries.map((item) => {
        switch (item.status) {
          case MATCHING_MEISTER_STATUS.ACCEPTED:
            if (item.itinerary && [RESERVATION_STATUS.CANCELING].includes(item.itinerary.status)) {
              item.status_index = 15
            } else {
              item.status_index = 0
            }
            break

          case MATCHING_MEISTER_STATUS.REQUESTED:
            item.status_index = 5
            break

          case MATCHING_MEISTER_STATUS.REJECTED:
            item.status_index = 10
            break

          case MATCHING_MEISTER_STATUS.CANCELLED:
            item.status_index = 15
            break

          default:
            item.status_index = 50
            break
        }
        return item
      })

      return sortBy(matches, ['status_index', 'updated_at'])
    },
    isSearching () {
      return this.$dayjs().diff(this.$dayjs(this.consultation.created_at), 'hours') < CONSULTATION_LIMIT.WAITING_HOURS
    }
  },
  methods: {
    isWaiting (matching) {
      return this.itineraries.length > 1 && [MATCHING_MEISTER_STATUS.REQUESTED].includes(matching.status) && this.isSearching
    }
  }
}
</script>
