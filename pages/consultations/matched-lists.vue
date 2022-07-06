<template>
  <div>
    <div v-if="isLoading" id="matching-results">
      <div class="searchHead">
        <p>{{ $t('consultations.matched_travel_meister') }}<span>{{ total }}</span>人</p>
      </div>
      <p class="pre-formatted">
        {{ !_.isEmpty(matchingLists) ? $t('consultations.matched_travel_meister_addition') : $t('consultations.no_meister_matched') }}
      </p>

      <template v-if="!_.isEmpty(matchingLists)">
        <p class="baseBtn ico-consult js-modal-open" data-target="mdConsult" @click="$modal.show('filterData')">
          {{ $t('consultations.matched_travel_meister_button') }}
        </p>

        <div v-for="(meister, index) in matchingLists" :key="index">
          <result-card :meister="meister" :destination="destination" />
        </div>

        <pagination
          :total-pages="totalPage"
          :current-page="currentPage"
          :per-page="perPage"
          @pagechanged="onPageChange"
        />
      </template>
    </div>
    <div v-else>
      <matched-list />
    </div>
    <consul-modal :meister-list="meisterList" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MATCHING_MEISTER } from '@/config/consts'
import ResultCard from '@/components/Consultations/ResultCard'
import pagination from '@/components/Common/Pagination'
import MatchedList from '@/components/Skeleton/matchedLists'
import ConsulModal from '@/components/Consultations/ConsultModal'
import { TransformHelper } from '@/helpers/TransformHelper'

export default {
  name: 'MatchingResults',
  layout: 'guest',
  components: { ResultCard, pagination, MatchedList, ConsulModal },
  data () {
    return {
      isLoading: false,
      currentPage: 1,
      totalPage: 1,
      perPage: 5,
      total: '',
      matchingLists: [],
      meisterList: []
    }
  },
  computed: {
    ...mapState({
      isFilterData: state => state.guestFilterData.isFilterData,
      showFilterData: state => state.guestFilterData.showFilterData
    }),
    destination () {
      return this.showFilterData?.destination || {}
    }
  },
  created () {
    const cache = localStorage.getItem(MATCHING_MEISTER.CACHE_FILTER_DATA)
    if (cache) {
      const data = JSON.parse(cache)
      this.$store.commit('guestFilterData/setTravelerData', data)
      this.$store.commit('guestFilterData/setIsFilterData', true)
    }
    this.$store.commit('guestLayout/setShowTravellerCollectInfo', true)
    this.getMatchingList()
  },
  mounted () {
    if (!this.isFilterData) {
      this.$store.commit('guestLayout/setShowTravellerCollectInfo', false)
      this.$router.push('/')
    }
  },
  methods: {
    async getMatchingList () {
      // const destinationId = this.showFilterData.destination.id || '0'
      const { destination, favorites, purposes } = this.showFilterData
      delete destination.name
      const params = {
        filter: {
          ...destination,
          favorites: favorites.map(item => item.hash_id),
          purposes: purposes.map(item => item.hash_id)
        }
      }
      const res = await this.$repositories.consultation.getMatchingList(Object.assign({}, { page: this.currentPage, per_page: this.perPage }, params))
      if (res && res.status === 'success') {
        this.currentPage = res.results.current_page
        this.totalPage = res.results.last_page
        this.total = res.results.total
        this.matchingLists = res.results.data.map(TransformHelper.transformHashIdToId)
        if (!_.isEmpty(this.matchingLists)) {
          _.map(this.matchingLists, (val) => {
            this.meisterList.push(val.id)
          })
        }
      }
      this.isLoading = true
    },
    onPageChange (page) {
      this.isLoading = false
      this.currentPage = page
      this.getMatchingList()
    }
  },
  head () {
    return {
      title: this.$t('consultations.matching_result.title'),
      titleTemplate: this.$t('common.screen.long_suffix')
    }
  }
}
</script>

<style>
.pre-formatted {
  white-space: pre-line;
  margin-bottom: 20px;
}
</style>
