<template>
  <div>
    <div class="stepTit">
      <div class="stepNum">
        <span>01</span>/10
      </div>
      <h2>
        {{ $t('traveller_request_page.step1.title') }}
      </h2>
    </div>
    <div class="d-flex body-step1">
      <form class="search" @submit.prevent="search">
        <traveller-request-place-auto-complete @add="handleChangePlace" />
      </form>
    </div>
    <div class="text-right">
      <button class="btn-skip" @click="destination_undecided">
        {{ $t('skip_button') }}
      </button>
      <button
        ref="afterClick"
        :class="`${searchValue && isDisabled ? 'btn-next' : 'btn-next-disabled'}`"
        @click="showModal"
      >
        {{ $t('next_button') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TransformHelper } from '@/helpers/TransformHelper'
import { usePlaceHelper } from '~/compositions/Consultation/usePlaceHelper'

export default {
  data () {
    return {
      destinations: [],
      isSearching: false,
      isDisabled: false,
      searchValue: '',
      timeout: null,
      toggle: false
    }
  },
  computed: {
    ...mapState({
      showDestination: state => state.guestFilterData.showDestination
    })
  },
  mounted () {
    this.getDestinations()
  },
  methods: {
    search () {
      const self = this
      if (!self.searchValue) {
        self.isSearching = false
        return false
      }
      self.isSearching = true
      // clear timeout variable
      clearTimeout(this.timeout)
      this.timeout = setTimeout(function () {
        // enter this block of code after 1 second, handle stuff, call search API etc.
        self.getDestinations()
      }, 500)
    },
    async getDestinations () {
      await this.$repositories.destination.getDestinations({ search: this.searchValue })
        .then(({ results }) => {
          if (_.isEmpty(results)) {
            this.isDisabled = false
          }
          this.destinations = results.map(TransformHelper.transformHashIdToId)
          this.isSearching = false
        })
    },
    selectDestination (id, name) {
      this.toggle = false
      this.isDisabled = true
      this.searchValue = name
      this.$nextTick(function () {
        this.$refs.afterClick.focus()
      })
      this.$store.commit('guestFilterData/setTravelerData', { destination: { id, name } })
    },
    selectEmpty () {
      this.toggle = false
      this.searchValue = ''
    },
    showModal () {
      if (this.searchValue && this.isDisabled) {
        this.$modal.show('presentation')
      }
    },
    destination_undecided () {
      this.searchValue = ''
      this.$store.commit('guestFilterData/setTravelerData', { destination: {} })
      this.$modal.show('presentation')
    },
    handleChangePlace (place) {
      this.toggle = false
      this.isDisabled = true
      this.searchValue = place.name

      const { getPlaceData } = usePlaceHelper()

      const placeData = getPlaceData(place, false)

      this.$store.commit('guestFilterData/setTravelerData', {
        destination: {
          ...placeData
        }
      })
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
@import "assets/css/search.css";

.body-step1 {
  margin-top: 50px;
  margin-bottom: 200px;
}

.text-right {
  text-align: right;
}

.btn-next {
  width: 130px;
  border: 1px solid #F7B62D;
  background-color: #F7B62D;
  border-radius: 100px;
  padding: 10px 20px;
  cursor: pointer;
}

.btn-next-disabled {
  width: 130px;
  border: 1px solid #e8ded3;
  background-color: #e8ded3;
  border-radius: 100px;
  padding: 10px 20px;
  cursor: pointer;
}

.btn-skip {
  width: 130px;
  border: 1px solid #403b2e;
  background-color: #403b2e;
  color: #fff;
  border-radius: 100px;
  padding: 10px 20px;
  cursor: pointer;
}

.btn-next:hover,
.btn-skip:hover {
  opacity: 0.7;
}

.dropdown-destinations {
  max-height: 200px;
  display: block;
}

form.search {
  position: relative;
}

form.search  input{
  width: 100%;
  font-size: 20px;
  box-sizing: border-box;
}

.icon-container {
  position: absolute;
  right: 10px;
  top: calc(50% - 10px);
}
.loader {
  position: relative;
  height: 20px;
  width: 20px;
  display: inline-block;
  animation: around 5.4s infinite;
}

@keyframes around {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}

.loader::after, .loader::before {
  content: "";
  background: white;
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-color: #333 #333 transparent transparent;
  border-style: solid;
  border-radius: 20px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  animation: around 0.7s ease-in-out infinite;
}

.loader::after {
  animation: around 0.7s ease-in-out 0.1s infinite;
  background: transparent;
}
@media screen and (max-width: 450px) {
  .btn-next, .btn-skip, .btn-next-disabled  {
    width: 43%;
  }
}

</style>
