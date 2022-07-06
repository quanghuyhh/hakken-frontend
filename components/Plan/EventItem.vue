<template>
  <li :class="[{'last': last}]">
    <div :class="['spotBlock', transportType]" :data-type="transportType">
      <template v-if="!isEmpty(mealEvent)">
        <div class="time">
          {{ mealEvent.hour_start_at }}
        </div>
        <div v-if="!isEmpty(endEvent)" class="time">
          {{ endEvent['hour_end_at'] }}
        </div>
      </template>
      <template v-else>
        <div v-if="!isEmpty(startEvent)" class="time">
          {{ startEvent.hour_start_at }}
        </div>
        <div v-if="!isEmpty(endEvent)" class="time">
          {{ endEvent.hour_end_at }}
        </div>
      </template>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <h4 :class="[{'pickup': isPickup}]" v-html="title + stayTime" />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-if="!last" v-html="description" />
    </div>
  </li>
</template>
<script>
import { isEmpty } from 'lodash'
import { computed } from '@vue/composition-api'
import { useScheduleHelper } from '~/compositions/Plan/useScheduleHelper'

export default {
  name: 'EventItem',
  props: {
    eventItem: {
      type: Object,
      default: () => {}
    },
    last: {
      type: Boolean,
      default: () => {}
    }
  },
  setup (props) {
    const startEvent = computed(() => props.eventItem?.start || {})
    const endEvent = computed(() => props.eventItem?.end || {})
    const mealEvent = computed(() => props.eventItem?.meal || {})
    const { transportationType } = useScheduleHelper({})
    const transportType = computed(() => {
      if (props.last) {
        return
      }
      if (!isEmpty(endEvent.value)) {
        return transportationType(endEvent.value?.subtype)
      }
      if (!isEmpty(startEvent.value)) {
        return transportationType(startEvent.value?.subtype)
      }
    })

    const title = computed(() => {
      return mealEvent.value?.facility_name || startEvent.value?.origin || startEvent.value?.destination || ''
    })
    const stayTime = computed(() => {
      const duration = mealEvent.value?.duration || startEvent.value?.duration || null
      return !isEmpty(duration) && !props.last ? `<span>${duration}分滞在</span>` : ''
    })
    const description = computed(() => {
      return mealEvent.value?.location || startEvent.value?.note || endEvent.value?.note || ''
    })

    const isPickup = computed(() => {
      return (props.eventItem?.start?.is_pickup || props.eventItem?.end?.is_pickup) === true
    })

    return {
      startEvent,
      endEvent,
      mealEvent,
      transportType,

      title,
      stayTime,
      description,
      isPickup,

      // methods
      isEmpty
    }
  }
}
</script>
