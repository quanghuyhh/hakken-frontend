import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import SwiperCore, { Autoplay, Navigation } from 'swiper'

import 'swiper/swiper-bundle.css'

SwiperCore.use([Navigation, Autoplay])
Vue.use(VueAwesomeSwiper)
