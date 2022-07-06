<template>
  <header>
    <div id="logo">
      <nuxt-link to="/">
        <img src="~assets/images/logo.svg" :alt="$t('guest_header.logo_alt')">
      </nuxt-link>
      <p>MYPAGE</p>
    </div>

    <div class="headNav">
      <p>
        ようこそ<a href="javascript:void(0)" @click.prevent="handleBackToMypage">{{ displayName }}</a>様
      </p>
      <nav>
        <ul>
          <li>
            <a href="javascript:void(0)" @click.prevent="handleBackToMypage">
              {{ $t('header.home_button') }}
            </a>
          </li>
          <li>
            <nuxt-link :to="routers.editAccount.route">
              {{ $t('header.edit_profile_button') }}
            </nuxt-link>
          </li>
          <li>
            <a href="javascript:void(0)" @click.prevent="logout">
              {{ $t('header.logout_button') }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import routers from '@/utils/routers'
export default {
  name: 'Header',
  data () {
    return {
      routers
    }
  },
  computed: {
    displayName () {
      return this.$auth.user.name
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    },
    handleBackToMypage () {
      this.$store.commit('user/setMypageTab', 0)
      this.$router.replace(routers.myPage.route).catch(() => {})
    }
  }
}
</script>
