<template>
  <div class="extra-event-item text-center">
    {{ startAt }}～{{ endAt }}<br>
    {{ mealData.location }} <br>
    {{ mealData.facility_name }}<br>
    TEL: {{ reservation.tel }} 住所: {{ reservation.fax }}<br>
  </div>
</template>
<script>
import { computed } from '@vue/composition-api'
export default {
  name: 'MealEvent',
  props: {
    mealEvent: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, context) {
    const { $dayjs } = context.root
    const reservation = computed(() => props.mealEvent?.reservation)
    const mealData = computed(() => reservation.value?.meal)
    const mealFormat = 'YYYY年MM月DD日(火) H:ss'
    const startAt = computed(() => $dayjs(props.mealEvent?.start_at).format(mealFormat))
    const endAt = computed(() => $dayjs(props.mealEvent?.end_at).format(mealFormat))

    return {
      mealFormat,
      reservation,
      mealData,
      startAt,
      endAt
    }
  }
}
</script>
