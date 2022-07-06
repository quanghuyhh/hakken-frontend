<template>
  <div id="videoChat">
    <div id="videoHead">
      <p class="tit">
        {{ $t('online_meeting.meeting_time') }}&nbsp; <span>{{
          meeting.meeting_time | planFormatDate(DATETIME_FORMAT.API_DATETIME, DATETIME_FORMAT.VIEW_DATE_TIME_CUSTOM)
        }}~</span>
      </p>
      <ul>
        <li>
          <span>{{ $t('online_meeting.customer_name') }}</span>
          <p>{{ meisterName }}</p>
        </li>
        <li>
          <span>{{ $t('online_meeting.total_estimated_price') }}</span>
          <p>
            <span class="total-amount">{{
              activeSchedule.total_amount || '-' | toCurrency
            }}</span>{{ $t('online_meeting.estimated_price_suffix') }}
          </p>
        </li>
        <li>
          <nuxt-link
            :to="localePath({name: routers.messageDetail.name, params: {id: itinerary.hash_id}})"
            target="_blank"
          >
            <span class="material-icons">videocam</span>{{ $t('online_meeting.chat_screen') }}
          </nuxt-link>
        </li>
        <li v-if="itinerary">
          <nuxt-link
            :to="localePath({name: routers.planDetail.name, params: { id: itinerary.hash_id } })"
            :data-path="JSON.stringify({name: routers.planDetail.name, params: { id: itinerary.hash_id } })"
            target="_blank"
          >
            <span class="material-icons">event_note</span>{{ $t('online_meeting.plan_detail') }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="videoContent">
      <div id="videoIn">
        <div class="userView">
          <div ref="remoteTrack" class="video" :class="{'user-share': twilio && twilio.userShare}" />
          <div v-show="twilio && twilio.userShare" ref="screenRemoteTrack" class="video" />
        </div>
        <div class="clientView">
          <div ref="localTrack" class="video" style="width: 300px; height: 200px" />
          <div v-if="!meetAction.video" class="disableLocalVideo">
            <span class="material-icons">person</span>
          </div>
        </div>
      </div>
    </div>
    <div class="videoFooter">
      <div class="action-meet">
        <div class="call-icons">
          <div />
          <ul class="call-items">
            <li class="call-item">
              <button v-if="meetAction.video" title="Enable Video" @click="handleToggleVideo(false)">
                <span class="material-icons">videocam</span>
              </button>
              <button v-else title="Enable Video" class="red-button" @click="handleToggleVideo(true)">
                <span class="material-icons">videocam_off</span>
              </button>
            </li>
            <li class="call-item">
              <button v-if="meetAction.micro" title="Mute Audio" @click="handleToggleMicro(false)">
                <span class="material-icons">mic</span>
              </button>
              <button v-else title="Mute Audio" class="red-button" @click="handleToggleMicro(true)">
                <span class="material-icons">mic_off</span>
              </button>
            </li>
            <li class="call-item">
              <button title="Full Screen" @click="handleShareScreen">
                <span class="material-icons">screen_share</span>
              </button>
            </li>
            <li class="call-item">
              <button title="Change background" @click="openChangeBackgroundModal">
                <span class="material-icons">apps</span>
              </button>
            </li>
            <li class="call-item">
              <button title="Full Screen" class="red-button" @click="handleEndVideoMeeting">
                <span class="material-icons">call_end</span>
              </button>
            </li>
          </ul>
          <div class="end-call" />
        </div>
      </div>
    </div>
    <modal
      name="modalBackground"
      width="40%"
      height="auto"
    >
      <div class="modal-background">
        <p class="background-title mb20">
          Change background video call
        </p>
        <ul class="background-processor">
          <li class="mr05">
            <button class="option-processor" @click="handleChangeBackgroundVideo('none')">
              <span class="material-icons">blur_off</span>
            </button>
          </li>
          <li class="mr05">
            <button class="option-processor" @click="handleChangeBackgroundVideo('blur')">
              <span class="material-icons">blur_on</span>
            </button>
          </li>
          <li class="mr05">
            <button class="option-processor" @click="handleChangeBackgroundVideo('image')">
              <img src="/meet/background_meet.jpeg" alt="">
            </button>
          </li>
        </ul>
      </div>
    </modal>
  </div>
</template>

<script>

import TwilioService from '~/services/TwilioService'
import { DATETIME_FORMAT } from '@/config/datetime_format'
import routers from '@/utils/routers'

export default {
  name: 'Meet',
  layout: 'empty',
  data () {
    return {
      accessToken: '',
      meetAction: {
        micro: true,
        video: true
      },
      twilio: null,
      meeting: {},
      DATETIME_FORMAT,
      routers
    }
  },
  computed: {
    meister () {
      return {
        ...this.meeting.meister,
        ...(this.meeting.meister?.user || {})
      }
    },
    meisterName () {
      return this.meister?.name
    },
    itinerary () {
      return this.meeting.itinerary || {}
    },
    activeSchedule () {
      return this.itinerary?.schedule || {}
    }
  },
  async created () {
    const meetId = this.$route.params.meet_id
    const response = await this.$repositories.onlineMeeting.getTokenOnlineMeeting(meetId)
    const {
      token,
      name,
      meeting
    } = response.results
    this.meeting = meeting

    if (token) {
      this.twilio = new TwilioService(
        token,
        this.$refs.remoteTrack,
        this.$refs.localTrack,
        this.$refs.screenRemoteTrack
      )
      this.twilio.connectTwilio(name)
    }
  },
  methods: {
    handleShareScreen () {
      this.twilio.shareScreen()
    },
    handleEndVideoMeeting () {
      try {
        this.twilio.leaveRoomIfJoined()
        this.$router.back()
      } catch (error) {
        this.$router.push(routers.myPage.route)
      }
    },
    handleToggleMicro (value) {
      if (value) {
        this.twilio.unmuteAudio()
      } else {
        this.twilio.muteAudio()
      }
      this.meetAction.micro = value
    },
    handleToggleVideo (value) {
      if (value) {
        this.twilio.startVideo()
      } else {
        this.twilio.stopVideo()
      }
      this.meetAction.video = value
    },
    handleChangeBackgroundVideo (type) {
      this.twilio.changeBackground(type, '/meet/background_meet.jpeg')
      this.$modal.hide('modalBackground')
    },
    openChangeBackgroundModal () {
      this.$modal.show('modalBackground')
    }
  }
}
</script>
<style scoped>
@import "../../assets/css/online-meeting.css";

.total-amount {
  min-width: 80px;
  display: inline-block;
  text-align: center;
}

#videoHead ul li a {
  color: #39aed2;
}
</style>
