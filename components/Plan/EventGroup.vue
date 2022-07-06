<template>
  <div class="planGroup">
    <div :class="['dispCourse', {single: !photos.length}]">
      <div class="dispPlan">
        <h3>{{ date | travelerFormatDate }}(金)</h3>
        <div class="inner">
          <ul class="spotList">
            <plan-event-item
              v-for="(eventItem, index) in eventGroup.events"
              :key="index"
              :event-item="eventItem"
              :last="index === eventGroup.events.length - 1"
            />
          </ul>
        </div>
      </div>

      <div v-if="hasPickup" class="dispPh">
        <div v-for="(event, index) in pickups" :key="index" class="dispSpotPh">
          <div class="ph">
            <img :src="event.reservation.photo | aws_photo" onerror="this.src = '/images/plan/thumbnail.jpg'" alt="">
          </div>
          <h4>{{ event.pickup_title }}</h4>
          <p>
            {{ event.reservation.photo_description }}
          </p>
        </div>
      </div>
    </div>

    <plan-stay-events :events="stayEvents" />
    <plan-meal-events :events="mealEvents" />
  </div>
</template>
<script>
import { ref, computed } from '@vue/composition-api'
// import { MEAL, STAY } from '~/constants/planing'
export default {
  name: 'EventGroup',
  props: {
    events: {
      type: Array,
      default: () => []
    },
    eventGroup: {
      type: Object,
      default: () => []
    },
    date: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const photos = ref([])
    const demo = computed(() => [])

    const isPickup = (evt) => {
      return evt?.is_pickup === true
    }

    const pickups = computed(() => {
      return props.eventGroup?.events.filter((event) => {
        return isPickup(event?.start) || isPickup(event?.end)
      })
        .map((eventGroup) => {
          const mealEvent = eventGroup?.meal || {}
          const result = isPickup(eventGroup?.start) ? eventGroup?.start : eventGroup?.end
          result.pickup_title = result?.reservation.title || mealEvent?.facility_name || result?.origin || result?.destination || ''

          return result
        })
    })

    const hasPickup = computed(() => pickups.value.length)

    const mealEvents = computed(() => props.eventGroup?.mealEvents || [])
    const stayEvents = computed(() => props.eventGroup?.stayEvents || [])

    return {
      photos,
      demo,

      pickups,
      hasPickup,
      mealEvents,
      stayEvents
    }
  }
}
</script>
