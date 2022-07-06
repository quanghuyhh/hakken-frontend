<template>
  <div class="extra-event-item text-center">
    {{ checkin }}～{{ checkout }}<br>
    {{ stayData.location }} <br>
    TEL: {{ reservation.tel }} 住所: {{ reservation.fax }}<br>
    {{ reservation.meal_detail }}<br>
    {{ reservation.description }}<br>
  </div>
</template>
<script>
import { computed } from '@vue/composition-api'
export default {
  name: 'StayEvent',
  props: {
    stayEvent: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, context) {
    const { $dayjs } = context.root
    const reservation = computed(() => props.stayEvent?.reservation)
    const stayData = computed(() => reservation.value?.stay)
    const stayFormat = 'YYYY年MM月DD日(火) H:ss'
    const checkin = computed(() => $dayjs(props.stayEvent?.checkin).format(stayFormat))
    const checkout = computed(() => $dayjs(props.stayEvent?.checkout).format(stayFormat))

    return {
      reservation,
      stayData,
      checkin,
      checkout
    }
  }
}
</script>
