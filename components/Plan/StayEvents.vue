<template>
  <div v-if="!isEmpty(events)" class="dispCourse meal-events single">
    <div class="dispPlan">
      <h3>
        {{ $t('plan_page.meal') }}
      </h3>
      <div class="inner">
        <plan-stay-event v-for="(stayEvent, index) in events" :key="index" :stay-event="stayEvent" />
      </div>
    </div>
    <div class="dispPh" />
  </div>
</template>

<script>
import { isEmpty } from 'lodash'
export default {
  name: 'StayEvents',
  props: {
    events: {
      type: [Array, Object],
      default: () => {}
    }
  },
  setup () {
    return {
      isEmpty
    }
  }
}
</script>

<style scoped>
.dispCourse.meal-events {
  justify-content: flex-start;
}
.meal-events .dispPlan h3 {
  background: #F3F3F3;
}

.text-center {
  text-align: center;
}

@media screen and (min-width: 1099px) {
  .dispCourse.meal-events {
    justify-content: flex-start;
  }
}
</style>
