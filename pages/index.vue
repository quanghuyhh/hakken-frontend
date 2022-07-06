<template>
  <div id="topSearch">
    <get-started />
    <modal
      id="modal-presentation"
      name="presentation"
      width="65%"
      height="80%"
      @opened="hideScrollbar"
      @closed="showScrollbar"
    >
      <div class="modal-body">
        <swiper :options="swiperOption">
          <step2 />
          <step3 />
          <step5 />
          <step7 />
          <step8 />
          <step9 />
          <step10 />
        </swiper>
      </div>
    </modal>
  </div>
</template>

<script>
import getStarted from '@/components/TravellerRequest/getStarted'
import Step2 from '@/components/TravellerRequest/Step2'
import Step3 from '@/components/TravellerRequest/Step3'
import Step5 from '@/components/TravellerRequest/Step5'
import Step7 from '@/components/TravellerRequest/Step7'
import Step8 from '@/components/TravellerRequest/Step8'
import Step9 from '@/components/TravellerRequest/Step9'
import Step10 from '@/components/TravellerRequest/Step10'

export default {
  components: { getStarted, Step2, Step3, Step5, Step7, Step8, Step9, Step10 },
  layout: 'guest',
  data () {
    return {
      step: 5,
      swiperOption: {
        navigation: {
          nextEl: '.nextSlide',
          prevEl: '.backSlide'
        },
        autoHeight: false,
        allowTouchMove: false,
        observer: true,
        observeParents: true
      }
    }
  },
  created () {
    this.$store.commit('guestLayout/setShowFooterNewTopic', true)
    this.$store.commit('guestLayout/setShowTravellerCollectInfo', false)
  },
  mounted () {
    this.showScrollbar()
  },
  beforeDestroy () {
    this.showScrollbar()
  },
  methods: {
    hideScrollbar () {
      const body = document.getElementsByTagName('html')[0]
      body.classList.add('overflow-hidden')
    },
    showScrollbar () {
      const body = document.getElementsByTagName('html')[0]
      body.classList.remove('overflow-hidden')
    }
  }
}
</script>

<style>
@import 'assets/css/top.css';
@import 'assets/css/modal.css';
@import 'assets/css/swiper.css';
@import 'assets/css/calendar.css';

.overflow-hidden {
  overflow: hidden;
}
</style>
