<template>
  <swiper-slide>
    <div class="wapper">
      <!-- Step 3 -->
      <div class="stepTit">
        <div class="stepNum">
          <span>03</span>/10
        </div>

        <h2>{{ $t('traveller_request_page.step4.step3_title') }}</h2>
      </div>

      <div class="sideSelect">
        <ul class="selectNum single">
          <li>
            <input
              type="button"
              name="spinner_up"
              class="spinner_down"
              @click="down('quantity')"
            >
          </li>
          <li>
            <span class="day">
              <input
                v-model="quantity"
                type="text"
                name="quantity"
                pattern="\d*"
                @keypress="numbersOnly"
              >
            </span>
          </li>
          <li>
            <input
              type="button"
              name="spinner_up"
              class="spinner_up"
              @click="up('quantity')"
            >
          </li>
        </ul>
      </div>
      <!-- Step 4 -->
      <div class="stepTit bdTop">
        <div class="stepNum">
          <span>04</span>/10
        </div>

        <h2>{{ $t('traveller_request_page.step4.step4_title') }}</h2>
      </div>

      <div class="sideSelect">
        <dl class="parson">
          <dt>{{ $t('traveller_request_page.human') }}</dt>
          <dd>
            <ul class="selectNum">
              <li>
                <input
                  type="button"
                  name="spinner_up"
                  class="spinner_down"
                  @click="down('adult')"
                >
              </li>
              <li>
                <span class="num">
                  <input
                    v-model="adult"
                    type="text"
                    name="adult"
                    pattern="\d*"
                    @keypress="numbersOnly"
                  >
                </span>
              </li>
              <li>
                <input
                  type="button"
                  name="spinner_up"
                  class="spinner_up"
                  @click="up('adult')"
                >
              </li>
            </ul>
          </dd>

          <dt>{{ $t('traveller_request_page.children') }}</dt>
          <dd>
            <ul class="selectNum">
              <li>
                <input
                  type="button"
                  name="spinner_up"
                  class="spinner_down"
                  @click="down('child')"
                >
              </li>
              <li>
                <span class="num">
                  <input
                    v-model="child"
                    type="text"
                    name="child"
                    pattern="\d*"
                    @keypress="numbersOnly"
                  >
                </span>
              </li>
              <li>
                <input
                  type="button"
                  name="spinner_up"
                  class="spinner_up"
                  @click="up('child')"
                >
              </li>
            </ul>
          </dd>

          <dt>{{ $t('traveller_request_page.kid') }}</dt>
          <dd>
            <ul class="selectNum">
              <li>
                <input
                  type="button"
                  name="spinner_up"
                  class="spinner_down"
                  @click="down('infant')"
                >
              </li>
              <li>
                <span class="num">
                  <input
                    v-model="infant"
                    type="text"
                    name="infant"
                    pattern="\d*"
                    @keypress="numbersOnly"
                  >
                </span>
              </li>
              <li>
                <input
                  type="button"
                  name="spinner_up"
                  class="spinner_up"
                  @click="up('infant')"
                >
              </li>
            </ul>
          </dd>
        </dl>
      </div>

      <!-- Step 5 -->

      <div class="stepTit bdTop">
        <div class="stepNum">
          <span>05</span>/10
        </div>
        <h2>{{ $t('traveller_request_page.step6.title') }}</h2>
      </div>
      <div class="cost">
        <ul class="baseRadio">
          <li>
            <input id="cTotal" v-model="cost" type="radio" value="0">
            <label for="cTotal">{{
              $t('traveller_request_page.step6.total')
            }}</label>
          </li>
          <li>
            <input id="cParson" v-model="cost" type="radio" value="1">
            <label for="cParson">{{
              $t('traveller_request_page.step6.per_person')
            }}</label>
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
      quantity: 1,
      adult: 0,
      child: 0,
      infant: 0,
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
    quantity (qty) {
      this.$store.commit('guestFilterData/setTravelerData', { qty: (qty ? this.hankakuToZenkaku(qty) : '1') })
    },
    adult (adult) {
      this.$store.commit('guestFilterData/setTravelerData', { adult: (adult ? this.hankakuToZenkaku(adult) : '0') })
    },
    child (child) {
      this.$store.commit('guestFilterData/setTravelerData', { child: (child ? this.hankakuToZenkaku(child) : '0') })
    },
    infant (infant) {
      this.$store.commit('guestFilterData/setTravelerData', { infant: (infant ? this.hankakuToZenkaku(infant) : '0') })
    },
    amount () {
      const { amount, cost } = this
      this.$store.commit('guestFilterData/setTravelerData', {
        estimated: { amount, cost }
      })
      this.isNext = amount >= 0
    },
    cost () {
      const { amount, cost } = this
      this.$store.commit('guestFilterData/setTravelerData', {
        estimated: { amount, cost }
      })
    }
  },
  mounted () {
    this.quantity = this.showFilterData.qty
    this.adult = this.showFilterData.adult
    this.child = this.showFilterData.child
    this.infant = this.showFilterData.infant
    this.amount = this.showFilterData.estimated.amount
    this.cost = this.showFilterData.estimated.cost
  },
  methods: {
    numbersOnly (event) {
      return this.typeNumbersOnly(event)
    },
    up (type) {
      let number = this.hankakuToZenkaku(String(this[type]))
      number++
      this[type] = number
    },
    down (type) {
      let number = this.hankakuToZenkaku(String(this[type]))
      const min = _.includes(['quantity', 'adult'], type) ? 1 : 0
      if (number > min) {
        number--
        this[type] = number
      }
    }
  }
}
</script>

<style scoped>
ul.selectNum .day,
ul.selectNum .num {
  position: relative;
  height: 100%;
}
ul.selectNum .day input,
ul.selectNum .num input {
  padding: 10px 0;
  text-align: right !important;
  width: 55%;
}

ul.selectNum .day:after {
  content: '日';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  font-size: 18px;
}
ul.selectNum .num:after {
  content: '名';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  font-size: 18px;
}
.wapper::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.wapper::-webkit-scrollbar-thumb {
  background-color: darkgrey;
}
</style>
