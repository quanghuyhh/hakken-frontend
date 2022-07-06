<template>
  <div>
    <dt>
      <span>STEP<span>03</span></span>
      <p class="title">
        旅の日数は何日ですか？
      </p>
    </dt>
    <dd>
      <!-- <div class="selectBox stay">
        <select>
          <option value="1">
            1日
          </option>
          <option value="3日">
            3日
          </option>
          <option value="4日">
            4日
          </option>
          <option value="5日">
            5日
          </option>
          <option value="6日">
            6日
          </option>
          <option value="7日">
            7日
          </option>
          <option value="8日">
            8日
          </option>
          <option value="9日">
            9日
          </option>
          <option value="10日">
            10日
          </option>
        </select>
      </div> -->
      <dl class="passenger">
        <dd>
          <div class="day">
            <money v-model="quantity" v-bind="money" />
          </div>
        </dd>
      </dl>
    </dd>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Money } from 'v-money'
export default {
  components: { Money },
  data () {
    return {
      quantity: 0,
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
    quantity (qty) {
      this.$store.commit('guestFilterData/setTravelerData', { qty })
    }
  },
  mounted () {
    this.quantity = this.showFilterData.qty
  }
}
</script>
