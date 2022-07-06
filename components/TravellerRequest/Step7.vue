<template>
  <swiper-slide>
    <div class="wapper">
      <div class="stepTit">
        <div class="stepNum">
          <span>07</span>/10
        </div>
        <h2>{{ $t('traveller_request_page.step7.title') }}</h2>
      </div>
      <ul class="radioCheck interestList">
        <li v-for="(favorite, index) in favorites" :key="index">
          <input :id="`favorite-${favorite.hash_id}`" v-model="favorite_id" type="checkbox" :value="favorite.hash_id">
          <label :for="`favorite-${favorite.hash_id}`">{{ favorite.name }}</label>
        </li>
      </ul>
    </div>
    <stepFooterButton :is-next="isNext" />
  </swiper-slide>
</template>
<script>
import { mapState } from 'vuex'
import StepFooterButton from '@/components/TravellerRequest/StepFooterButton'
import { TransformHelper } from '@/helpers/TransformHelper'
export default {
  components: { StepFooterButton },
  data () {
    return {
      isNext: false,
      favorites: [],
      favorite_id: []
    }
  },
  computed: {
    ...mapState({
      showFilterData: state => state.guestFilterData.showFilterData,
      showFavoritesData: state => state.guestFilterData.favorites_data
    })
  },
  watch: {
    favorite_id (val) {
      this.isNext = !_.isEmpty(this.favorite_id)
      if (!_.isEmpty(this.favorites)) {
        const data = []
        val.forEach((element) => {
          const favoriteData = this.favorites.filter(i => i.hash_id === element).shift()
          data.push({ hash_id: favoriteData?.hash_id, name: favoriteData ? favoriteData.name.trim() : '' })
        })
        this.$store.commit('guestFilterData/setTravelerData', { favorites: data })
      }
    }
  },
  mounted () {
    this.getFavorites()
    const { favorites } = this.showFilterData
    if (!_.isEmpty(favorites)) {
      favorites.forEach((element) => {
        this.favorite_id.push(element.hash_id)
      })
    }
  },
  methods: {
    async getFavorites () {
      if (!_.isEmpty(this.showFavoritesData)) {
        this.favorites = this.showFavoritesData
        return
      }
      this.favorites = await this.$repositories.favorite.getFavorites().then(({ results }) => results || [])
        .then(items => items.map(TransformHelper.transformHashIdToId))
      this.$store.commit('guestFilterData/setFavoritessData', this.favorites)
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
