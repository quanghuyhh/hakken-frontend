<template>
  <div>
    <dt>
      <span>STEP<span>02</span></span>
      <p class="title">
        出発日はいつですか？
      </p>
    </dt>
    <dd class="startTime">
      <div class="calendar">
        <date-picker v-model="selectDate" :min-date="minDate" class="flatpickr-input" />
      </div>
      <ul class="checkArea baseCheck">
        <li>
          <input id="noseason" v-model="noseason" type="checkbox" name="calendar01">
          <label for="noseason">時期未定</label>
        </li>
      </ul>
    </dd>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      selectDate: this.$dayjs().add(7, 'days').format('YYYY/MM/DD'),
      minDate: this.$dayjs().add(7, 'days').format('YYYY/MM/DD'),
      noseason: false
    }
  },
  computed: {
    ...mapState({
      showFilterData: state => state.guestFilterData.showFilterData
    })
  },
  watch: {
    selectDate (date) {
      const d = this.$dayjs(date).format('MM/DD/YYYY')
      this.$store.commit('guestFilterData/setTravelerData', { d })
    }
  },
  mounted () {
    this.selectDate = this.showFilterData.date
  }
}
</script>
