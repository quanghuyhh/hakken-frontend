<template>
  <footer>
    <div v-if="showFooterNewTopic" id="topNews">
      <div id="topNewsIn">
        <h2>{{ $t('guest_footer.new_and_toppics') }}</h2>

        <div class="bx-wrapper">
          <div class="bx-viewport">
            <swiper :options="swiperOption">
              <swiper-slide>
                <div class="slide-content">
                  <span class="slide-date">2021.09.20</span>
                  <p class="news-title">
                    {{ $t('common.footer.news_title') }}
                  </p>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="slide-content">
                  <span class="slide-date">2021.09.21</span>
                  <p class="news-title">
                    {{ $t('common.footer.news_title') }}
                  </p>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="slide-content">
                  <span class="slide-date">2021.09.22</span>
                  <p class="news-title">
                    {{ $t('common.footer.news_title') }}
                  </p>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="slide-content">
                  <span class="slide-date">2021.09.23</span>
                  <p class="news-title">
                    {{ $t('common.footer.news_title') }}
                  </p>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>

    <div id="footerIn">
      <ul>
        <li>
          <a href="javascript:void(0)">{{
            $t('guest_footer.company')
          }}</a>
        </li>
        <li>
          <a href="javascript:void(0)">{{
            $t('guest_footer.privacy')
          }}</a>
        </li>
        <li>
          <a href="javascript:void(0)">{{
            $t('guest_footer.travel')
          }}</a>
        </li>
        <li>
          <a href="javascript:void(0)">{{
            $t('guest_footer.terms_of_service')
          }}</a>
        </li>
        <li>
          <a href="javascript:void(0)">{{
            $t('guest_footer.contact')
          }}</a>
        </li>
      </ul>

      <p id="copy">
        {{ $t('guest_footer.copy_right') }}
      </p>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GuestFooter',
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        allowTouchMove: false,
        speed: 800,
        autoplay: {
          delay: 5000
        },
        autoHeight: true,
        slidesPerView: 1
      }
    }
  },
  computed: {
    ...mapState({
      showFooterNewTopic: state => state.guestLayout.showFooterNewTopic
    })
  }
}
</script>

<style scoped>
@import 'assets/scss/footer.scss';

.bx-wrapper {
  max-width: 100%;
}
.bx-viewport {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.slide-content {
  display: flex;
  align-items: center;
  height: 55px;
  padding: 0;
}
.swiper-slide {
  display: flex;
  align-items: top;
  max-height: 250px;
  font-size: 18px;
}
.slide-content .slide-date {
  margin-right: 40px;
  font-weight: bold;
}
.slide-content .news-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
