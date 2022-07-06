<template>
  <main>
    <div class="mypageTop">
      <nuxt-link :to="routers.myPage.route">
        {{ $t('profile.back_button_title') }}
      </nuxt-link>
    </div>

    <h1 class="mainTit">
      {{ $t('mypage.message.title') }}
    </h1>

    <div class="consultBlock">
      <div class="inner">
        <div class="consultList headBlock">
          <message-info
            :agent="agent"
            :agent-name="agentName"
            :agent-company="agentCompany"
            :itinerary="itinerary"
            :active-schedule="activeSchedule"
            :is-public-plan="isPublicPlan"
            :item-meeting="itemMeeting || {}"
            :call-status="callStatus"
            :call-content="callContent"
          />
          <message-body />
          <message-input />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import { groupBy, sortBy } from 'lodash'
import MessageInfo from '@/components/Message/MessageInfo'
import MessageBody from '@/components/Message/MessageBody'
import MessageInput from '@/components/Message/MessageInput'
import routers from '@/utils/routers'
import { UserService } from '@/services/UserService'
import { MATCHING_MEISTER_STATUS, ONLINE_MEETING_STATUS, RESERVATION_STATUS } from '@/config/consts'
import { ImageHelper } from '@/helpers/ImageHelper'
import { MAPPING_TRANSPORTATION_ICONS } from '@/constants/planing'
import { DATETIME_FORMAT } from '@/config/datetime_format'
import { displayFormat, parseApiTimestamp } from '@/utils/datetime'
import { TransformHelper } from '@/helpers/TransformHelper'

export default {
  name: 'MessageDetail',
  middleware: 'auth',
  components: {
    MessageInfo,
    MessageBody,
    MessageInput
  },
  data () {
    return {
      isLoading: false,
      itinerary: {},
      routers
    }
  },
  computed: {
    itineraryId () {
      return this.$route.params.id
    },
    auth () {
      return UserService.getUserData(this.$auth.user)
    },
    canApprovePlan () {
      let flag = true
      const checkFields = ['name', 'kana_name', 'prefecture']
      checkFields.forEach((field) => {
        const value = this.auth[field]
        const parseValue = parseInt(value)
        if (
          (Number.isInteger(parseValue) && parseValue < 0) ||
          (Number.isNaN(parseValue) && (!value || !value.length))
        ) {
          flag = false
        }
      })
      if (
        [RESERVATION_STATUS.PROCESSING].includes(this.itinerary.status)
      ) {
        flag = false
      }
      return flag
    },
    planId () {
      return this.$route.params.id
    },
    activeSchedule () {
      return this.itinerary?.schedule || {}
    },
    schedules () {
      if (!this.activeSchedule) {
        return []
      }
      const events = sortBy(this.activeSchedule.events, ['departure_time', 'created_at'])

      const groups = groupBy(events, 'date')
      Object.keys(groups).forEach((key) => {
        const _eventPhotos = []
        const _events = groups[key].map((item) => {
          const photo = item?.photo ? JSON.parse(item.photo) : {}
          item.photo = photo
          if (photo.path) {
            item.photo.preview = ImageHelper.getAWSImage(photo.path)
            item.pickup = true
            _eventPhotos.push(item)
          }
          item.icon = MAPPING_TRANSPORTATION_ICONS[item.transportation_type]
          return item
        })
        groups[key] = {
          events: _events,
          eventPhotos: _eventPhotos
        }
      })
      return groups
    },
    user () {
      if (!this.planDetail.meister) {
        return {}
      }
      return this.planDetail.meister
    },
    meister () {
      if (!this.user) {
        return {}
      }

      return this.user.meister
    },
    agent () {
      return this.getAgentData(this.itinerary)
    },
    agentCompany () {
      return this.agent || {}
    },
    agentName () {
      return this.agent ? this.agent.name || this.agent.kana_name || this.agent.romaji_name : null
    },
    callStatus () {
      return (colorIcon = false) => {
        if (!this.itemMeeting) {
          return
        }
        if (this.itemMeeting.previous_meeting_time && this.itemMeeting.meeting_time !== this.itemMeeting.previous_meeting_time) {
          return colorIcon ? 'videoAlart' : 'tooltipDanger'
        }
        switch (this.itemMeeting.status) {
          case ONLINE_MEETING_STATUS.REQUESTED:
            return colorIcon ? 'videoGray' : 'tooltipGray'

          case ONLINE_MEETING_STATUS.ACCEPTED:
            return colorIcon ? 'videoFix' : 'tooltipInfo'

          case ONLINE_MEETING_STATUS.CHANGED:
            return colorIcon ? 'videoAlart' : 'tooltipDanger'

          default:
            return ''
        }
      }
    },
    callContent () {
      const inputFormat = DATETIME_FORMAT.API_DATETIME
      const outputFormat = DATETIME_FORMAT.LOCALE_DATE
      if (!this.itemMeeting) {
        return
      }
      const getOutput = displayFormat(
        parseApiTimestamp(this.itemMeeting.meeting_time, inputFormat),
        outputFormat
      )
      if (this.itemMeeting.previous_meeting_time && this.itemMeeting.meeting_time !== this.itemMeeting.previous_meeting_time) {
        return this.$t('mypage.tooltip.changed') + ` ${getOutput}～`
      }
      switch (this.itemMeeting.status) {
        case ONLINE_MEETING_STATUS.REQUESTED:
          return this.$t('mypage.tooltip.requested') + ` ${getOutput}～`

        case ONLINE_MEETING_STATUS.ACCEPTED:
          return this.$t('mypage.tooltip.accepted') + ` ${getOutput}～`

        case ONLINE_MEETING_STATUS.CHANGED:
          return this.$t('mypage.tooltip.changed') + ` ${getOutput}～`

        default:
          return ''
      }
    },
    itemMeeting () {
      return this.matching?.online_meeting
    },
    isPublicPlan () {
      return ![
        RESERVATION_STATUS.NEW,
        RESERVATION_STATUS.ESTIMATING,
        MATCHING_MEISTER_STATUS.REQUESTED
      ].includes(this.matching?.status) &&
        (
          this.itinerary &&
          ![
            RESERVATION_STATUS.NEW,
            RESERVATION_STATUS.ESTIMATING,
            MATCHING_MEISTER_STATUS.REQUESTED
          ].includes(this.itinerary?.status)
        )
    },
    matching () {
      return this.itinerary?.matching
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    ...mapActions({
      initMessage: 'message/initMessage'
    }),
    async fetchData () {
      this.itinerary = await this.$repositories.itinerary.show(this.itineraryId).then(({ results }) => results)
        .then(results => TransformHelper.transformHashIdToId(results))
      const agentData = this.getAgentData(this.itinerary)
      await this.initMessage({ receiverUser: agentData.cognito_id })
    },
    getAgentData (itinerary) {
      if (!itinerary.meister) {
        return {}
      }
      return {
        ...{ cognito_id: itinerary.meister.cognito_id },
        ...itinerary.meister,
        ...itinerary?.meister?.meister?.agent
      }
    }
  }
}
</script>
