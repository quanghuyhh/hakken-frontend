<template>
  <swiper-slide>
    <div class="wapper">
      <div class="stepTit">
        <div class="stepNum">
          <span>06</span>/10
        </div>
        <h2>{{ $t('traveller_request_page.step6.title') }}</h2>
      </div>
      <div class="cost">
        <ul class="baseRadio">
          <li>
            <input
              id="cTotal"
              v-model="cost"
              type="radio"
              value="0"
            >
            <label for="cTotal">{{ $t('traveller_request_page.step6.total') }}</label>
          </li>
          <li>
            <input id="cParson" v-model="cost" type="radio" value="1">
            <label for="cParson">{{ $t('traveller_request_page.step6.per_person') }}</label>
          </li>
        </ul>
        <ul class="costInput">
          <li>
            <money v-model="amount" v-bind="money" />
          </li>
          <li>{{ $t('traveller_request_page.step6.yen') }}</li>
        </ul>
      </div>
    </div>
    <stepFooterButton :is-next="isNext" />
  </swiper-slide>
</template>

<script>
import { mapState } from 'vuex'
import { Money } from 'v-money'
import StepFooterButton from '@/components/TravellerRequest/StepFooterButton'

export default {
  components: { StepFooterButton, Money },
  data () {
    return {
      isNext: false,
      amount: '',
      cost: 0,
      money: {
        thousands: ',',
        precision: 0,
        masked: false
      }
    }
  },
  computed: {
    ...mapState({
      showFilterData: state => state.guestFilterData.showFilterData
    })
  },
  watch: {
    amount () {
      const { amount, cost } = this
      this.$store.commit('guestFilterData/setEstimated', JSON.stringify({ amount, cost }))
      this.isNext = amount > 0
    },
    cost () {
      const { amount, cost } = this
      this.$store.commit('guestFilterData/setEstimated', JSON.stringify({ amount, cost }))
    }
  },
  mounted () {
    if (!_.isEmpty(this.showFilterData.estimated)) {
      this.amount = JSON.parse(this.showFilterData.estimated).amount
      this.cost = JSON.parse(this.showFilterData.estimated).cost
    }
  }
}
</script>

<style scoped>
.wapper::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.wapper::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}
</style>
