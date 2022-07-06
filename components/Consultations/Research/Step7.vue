<template>
  <div>
    <dt>
      <span>STEP<span>07</span></span>
      <p class="title">
        興味がある事を選択してください。(複数可)
      </p>
    </dt>
    <dd>
      <ul class="checkArea baseCheck inter">
        <li v-for="(favorite, index) in favorites" :key="index">
          <input :id="`favorite-${favorite.hash_id}`" v-model="favorite_id" type="checkbox" :value="favorite.hash_id">
          <label :for="`favorite-${favorite.hash_id}`">{{ favorite.name }}</label>
        </li>
      </ul>
    </dd>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TransformHelper } from '@/helpers/TransformHelper'
export default {
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
          data.push({ hash_id: favoriteData.hash_id, name: favoriteData.name.trim() })
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
