import Vue from 'vue'
import VCalendar from 'v-calendar'

Vue.use(VCalendar, {
  screens: {
    tablet: '576px',
    laptop: '992px',
    desktop: '1200px'
  }
})
