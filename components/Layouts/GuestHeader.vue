<template>
  <header>
    <div id="logo">
      <nuxt-link to="/">
        <img src="~assets/images/logo.svg" :alt="$t('guest_header.logo_alt')">
      </nuxt-link>
    </div>

    <nav v-if="!$auth.loggedIn">
      <ul>
        <li>
          <nuxt-link
            :to="$utils.routers.register.route"
            @click.native="toRegisterPage"
          >
            {{ $t('guest_header.register_button') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="$utils.routers.login.route">
            {{ $t('guest_header.login_button') }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <p class="topCatch01">
      <nuxt-link to="/mypage">
        {{ $t('guest_header.online_travel_consultation') }}
      </nuxt-link>
    </p>
    <p class="topCatch02">
      {{ $t('guest_header.travel_online_title') }}<br>{{
        $t('guest_header.consult_online')
      }}
    </p>

    <div
      v-if="(showTravellerCollectInfo && isFilterData) || isFilterData"
      id="searchInfo"
      class="underCont"
    >
      <h2 class="toggleList">
        {{ $t('guest_header.collect_info.toggle_button') }}
      </h2>

      <div>
        <dl>
          <dt>{{ $t('guest_header.collect_info.travel_date') }}</dt>
          <dd>
            {{ renderSeasonText() }}
            ({{ showFilterData.qty }}
            {{ $t('consultations.modal.day') }})
          </dd>

          <dt>{{ $t('guest_header.collect_info.destination') }}</dt>
          <dd>
            {{
              showFilterData.destination.name ||
                $t('traveller_request_page.step9.destination_undecided')
            }}
          </dd>

          <dt>{{ $t('guest_header.collect_info.point_of_departure') }}</dt>
          <dd>
            <p>{{ showFilterData.departure.name }}</p>
            <span>{{ showFilterData.address_optionals }}</span>
          </dd>

          <dt>{{ $t('guest_header.collect_info.number_of_customers') }}</dt>
          <dd>
            <ul class="parsonList">
              <li>
                {{ $t('traveller_request_page.human') }}
                <span>{{ showFilterData.adult }}</span>名
              </li>
              <li>
                {{ $t('traveller_request_page.children') }}
                <span>{{ showFilterData.child }}</span>名
              </li>
              <li>
                {{ $t('traveller_request_page.kid') }}
                <span>{{ showFilterData.infant }}</span>名
              </li>
            </ul>
          </dd>

          <dt>{{ $t('guest_header.collect_info.purpose_of_travel') }}</dt>
          <dd>
            <ul v-if="!_.isEmpty(showFilterData.purposes)" class="intList">
              <li
                v-for="(purpose, index) in showFilterData.purposes"
                :key="index"
              >
                {{ purpose.name }}
              </li>
            </ul>
          </dd>

          <dt>{{ $t('guest_header.collect_info.budget_of_travel') }}</dt>
          <dd>
            {{ $t('plan_page.quantity') }}
            {{ showFilterData.estimated.amount | toCurrency }}
            {{ $t('plan_page.quantity_suffix') }}
          </dd>

          <dt>{{ $t('guest_header.collect_info.interested_in') }}</dt>
          <dd>
            <ul v-if="!_.isEmpty(showFilterData.favorites)" class="intList">
              <li
                v-for="(favorite, index) in showFilterData.favorites"
                :key="index"
              >
                {{ favorite.name }}
              </li>
            </ul>
          </dd>

          <dt>{{ $t('guest_header.collect_info.request') }}</dt>
          <dd>{{ showFilterData.note }}</dd>
        </dl>
        <nuxt-link to="/" class="research">
          {{ $t('guest_header.update_consultation_request') }}
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GuestHeader',
  data () {
    return {
      filterData: [],
      season: {
        spring: this.$t('season.spring'),
        summer: this.$t('season.summer'),
        autumn: this.$t('season.autumn'),
        winter: this.$t('season.winter'),
        noseason: this.$t('season.no_season')
      }
    }
  },
  computed: {
    ...mapState({
      showTravellerCollectInfo: state =>
        state.guestLayout.showTravellerCollectInfo,
      showFilterData: state => state.guestFilterData.showFilterData,
      isFilterData: state => state.guestFilterData.isFilterData
    })
  },
  methods: {
    toRegisterPage () {
      this.$store.commit('guestLayout/refreshPage', true)
    },
    renderSeasonText () {
      if (!this.showFilterData.season || this.showFilterData.date) {
        return this.$options.filters.travelerFormatDate(this.showFilterData.date)
      } else {
        let seasonText = ''
        Object.keys(this.season).forEach((key) => {
          if (key === this.showFilterData.season) {
            seasonText = this.season[key]
          }
        })
        return seasonText
      }
    }
  }
}
</script>
