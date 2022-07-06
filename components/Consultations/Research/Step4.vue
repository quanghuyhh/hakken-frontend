<template>
  <div>
    <dt>
      <span>STEP<span>04</span></span>
      <p class="title">
        人数は何人(くらい)ですか？
      </p>
    </dt>
    <dd>
      <dl class="passenger">
        <dt>大人</dt>
        <dd>
          <div class="num">
            <money v-model="adult" v-bind="money" />
          </div>
        </dd>
        <dt>子供</dt>
        <dd>
          <div class="num">
            <money v-model="child" v-bind="money" />
          </div>
        </dd>
        <dt>幼児</dt>
        <dd>
          <div class="num">
            <money v-model="infant" v-bind="money" />
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
      adult: 0,
      child: 0,
      infant: 0,
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
    adult (adult) {
      this.$store.commit('guestFilterData/setTravelerData', { adult })
    },
    child (child) {
      this.$store.commit('guestFilterData/setTravelerData', { child })
    },
    infant (infant) {
      this.$store.commit('guestFilterData/setTravelerData', { infant })
    }
  },
  mounted () {
    this.adult = this.showFilterData.adult
    this.child = this.showFilterData.child
    this.infant = this.showFilterData.infant
  }
}
</script>
