<template>
  <swiper-slide>
    <div class="stepTit">
      <div class="stepNum">
        <span>01</span>/10
      </div>

      <h2>{{ $t('traveller_request_page.step1.title') }}</h2>
    </div>
    <div class="d-flex body-step1">
      <button v-show="destination" slot="button-next" class="no-address nextSlide mr-10">
        {{ $t('traveller_request_page.step1.no_address_button') }}
      </button>
      <button v-show="!destination" class="no-address mr-10">
        {{ $t('traveller_request_page.step1.no_address_button') }}
      </button>

      <v-multi-select
        v-model="destination"
        :options="options"
        class="address-select"
        :custom-label="nameWithLang"
        :show-labels="false"
        :placeholder="$t('traveller_request_page.step1.address_select')"
      />
    </div>
  </swiper-slide>
</template>

<script>
import { Multiselect as VMultiSelect } from 'vue-multiselect'

export default {
  components: {
    VMultiSelect
  },
  data () {
    return {
      destination: '',
      options: []
    }
  },
  watch: {
    destination (val) {
      this.$emit('selected-destination', val)
    }
  },
  mounted () {
    this.getDestinations()
  },
  methods: {
    nameWithLang ({ name }) {
      return `${name}`
    },
    getDestinations () {
      const _this = this
      this.$axios.get('/destinations')
        .then(function (response) {
          _this.options = response.data.results
        })
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.body-step1 {
  margin-top: 50px;
  margin-bottom: 200px;
}
.no-address {
  width: 140px;
  border: 1px solid #F7B62D;
  background-color: #F7B62D;
  border-radius: 5px;
  padding: 5px 20px;
}
@media screen and (max-width: 450px) {
  .no-address {
    padding: 5px;
  }
}
.no-address:hover {
  opacity: 0.7;
}
.address-select {
  border-bottom-left-radius: 0!important;
  border-top-left-radius: 0!important;
  z-index: 999;
}
</style>
