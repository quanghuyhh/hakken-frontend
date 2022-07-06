<template>
  <div>
    <dt>
      <span>STEP<span>05</span></span>
      <p class="title">
        旅の費用の目安を教えてください
      </p>
    </dt>
    <dd class="prices">
      <ul class="baseRadio">
        <li>
          <input id="cTotal" type="radio" name="cost" checked="">
          <label for="cTotal">総額</label>
        </li>
        <li>
          <input id="cParson" type="radio" name="cost">
          <label for="cParson">一人当たり</label>
        </li>
      </ul>
      <ul class="checkPrice baseCheck">
        <li>
          <div class="amount">
            <!-- <input type="text" value="10000"> -->
            <money v-model="amount" v-bind="money" />
          </div>
        </li>
      </ul>
    </dd>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Money } from 'v-money'

export default {
  components: { Money },
  filters: {
    quantityLabel (value) {
      return value + '日'
    },
    personLabel (value) {
      return value + '名'
    }
  },
  data () {
    return {
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
      this.$store.commit('guestFilterData/setTravelerData', { estimated: { amount, cost } })
      this.isNext = amount >= 0
    },
    cost () {
      const { amount, cost } = this
      this.$store.commit('guestFilterData/setTravelerData', { estimated: { amount, cost } })
    }
  },
  mounted () {
    this.amount = this.showFilterData.estimated.amount
    this.cost = this.showFilterData.estimated.cost
  }
}
</script>
