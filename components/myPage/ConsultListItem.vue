<template>
  <div
    :class="[
      'consultInfo',
      itemStage
    ]"
  >
    <div class="profile">
      <div class="ph">
        <img
          :src="agent ? agent.avatar : ''"
          :alt="agentName"
        >
      </div>

      <h3>
        <span>{{ agent && agent.company ? agent.company.name : '' }}</span>
        <nuxt-link
          :to="localePath({path: routers.matchingResult.route, params: {consultations_hash_id: matching.code}})"
        >
          {{ agentName }}
        </nuxt-link>
      </h3>
    </div>

    <div class="price">
      <span class="inputLabel">{{ $t('mypage.consult_list.price_total') }}</span>
      <p>
        {{ $t('plan_page.quantity') }}<span class="total-amount">{{
          matching.total_amount || '-' | toCurrency
        }}</span>{{ $t('plan_page.quantity_suffix') }}（{{ $t('mypage.consult_list.include_tax') }})
      </p>
    </div>

    <elements-consultation-view-plan-detail :consultation="consultation" :matching="matching" />

    <div class="consultControl">
      <ul>
        <li>
          <nuxt-link
            :to="localePath({name: routers.messageDetail.name, params: {id: matching.itinerary ? matching.itinerary.hash_id : ''}})"
          >
            <!--            &nbsp;<span class="alart">10</span>-->
          </nuxt-link>
        </li>
        <li :class="`meetingBase ${callStatus(true)}`">
          <div
            v-if="itemMeeting ? true : false"
            :class="`meetingTooltip ${callStatus()}`"
          >
            {{ callContent }}
          </div>
          <a
            href="javascript:void(0)"
            class="js-modal-open"
            data-target="mdRequest"
            @click.prevent="handleShowModalCreateOnlineMeeting"
          >
            <span v-if="callStatus() === 'tooltipDanger'" class="alart">!</span>
          </a>
        </li>
        <elements-consultation-file-download-button :documents="documents" :show-popup-file="showPopupFile" @toggle_download="(evt) => showPopupFile = evt" />
      </ul>
    </div>

    <elements-consultation-modal-download-file
      :is-display="showPopupFile"
      :document-list="documentList"
      :show="() => showPopupFile = true"
      :hide="() => showPopupFile = false"
      @closed="showPopupFile = false"
    />

    <my-page-create-online-meeting
      v-if="matching.itinerary"
      ref="modalCreateOnlineMeeting"
      :item-meeting="itemMeeting"
      :itinerary-id="matching.itinerary.hash_id"
    />
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'
import {
  ONLINE_MEETING_STATUS,
  MATCHING_STATUS,
  RESERVATION_STATUS,
  CONSULTATION_STATUS,
  MATCHING_MEISTER_STATUS
} from '@/config/consts'
import { CACHE_VIEW_DETAIL_CONSULTATION_COMPLETED } from '@/config/localstorage'
import { MYPAGE } from '@/config/event'
import routers from '@/utils/routers'
import { parseApiTimestamp, displayFormat } from '@/utils/datetime'
import { DATETIME_FORMAT } from '@/config/datetime_format'
import { useFileDownload } from '@/compositions/Consultation/useFileDownload'

export default {
  name: 'ConsultListItem',
  props: {
    matching: {
      type: Object,
      required: true
    },
    consultation: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const itinerary = computed(() => props.matching?.itinerary)
    const documents = computed(() => {
      const { documents } = useFileDownload(itinerary.value)
      return documents.value
    })
    const documentList = computed(() => {
      const { documentList } = useFileDownload(itinerary.value)
      return documentList.value
    })
    return {
      // computed
      itinerary,
      documents,
      documentList
    }
  },
  data () {
    return {
      RESERVATION_STATUS,
      routers,
      showPopupFile: false,
      DATETIME_FORMAT
    }
  },
  computed: {
    agent () {
      return this.matching.meister
    },
    agentName () {
      return this.agent ? this.agent.name || this.agent.kana_name || this.agent.romaji_name : null
    },
    status () {
      return this.matching.status
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
      const outputFormat = DATETIME_FORMAT.LOCALE_DATE_WITH_TIME
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
    itemStage () {
      let stage = ''
      if (!this.matching.itinerary) {
        switch (this.matching.status) {
          case MATCHING_STATUS.REQUESTED:
            stage = 'disable waiting'
            break

          case MATCHING_STATUS.ACCEPTED:
            stage = ''
            break

          case MATCHING_STATUS.REJECTED:
            stage = 'rejected'
            break

          case MATCHING_STATUS.CANCELLED:
            stage = 'disable'
            break

          default:
            stage = 'noFix'
            break
        }
      } else {
        switch (this.matching.itinerary.status) {
          case RESERVATION_STATUS.ESTIMATING:
          case RESERVATION_STATUS.PROCESSING:
          case RESERVATION_STATUS.ESTIMATED:
          case RESERVATION_STATUS.CHANGE_REQUESTED:
          case RESERVATION_STATUS.CHANGE_PROCESSING:
            stage = ''
            break

          case RESERVATION_STATUS.REJECTED:
            stage = 'rejected'
            break

          case RESERVATION_STATUS.CANCELING:
          case RESERVATION_STATUS.CANCELLED:
            stage = 'disable'
            break

          case RESERVATION_STATUS.COMPLETED:
          case RESERVATION_STATUS.CHANGE_COMPLETED:
            stage = 'reserveFix'
            break

          default:
            stage = ''
            break
        }
      }

      return stage
    },
    itemStageContent () {
      switch (this.matching.status) {
        case RESERVATION_STATUS.CANCELLED:
          return this.$t('itineraries.status.cancelled')
        case RESERVATION_STATUS.PROCESSING:
          return this.$t('itineraries.status.processing')
        default:
          return ''
      }
    },
    isPublicPlan () {
      return ![
        RESERVATION_STATUS.NEW,
        RESERVATION_STATUS.ESTIMATING,
        MATCHING_MEISTER_STATUS.REQUESTED
      ].includes(this.matching.status) &&
        (
          this.matching.itinerary &&
          ![
            RESERVATION_STATUS.NEW,
            RESERVATION_STATUS.ESTIMATING,
            MATCHING_MEISTER_STATUS.REQUESTED
          ].includes(this.matching.itinerary.status)
        )
    },
    isWaiting () {
      return [MATCHING_MEISTER_STATUS.REQUESTED].includes(this.matching.status)
    }
  },
  methods: {
    handleShowModalCreateOnlineMeeting () {
      this.$refs.modalCreateOnlineMeeting.showModal()
    },
    handleViewPlanDetail () {
      const currentPos = document.documentElement.scrollTop || document.body.scrollTop
      this.$bus.emit(MYPAGE.VIEW_PLAN_DETAIL, currentPos)

      if ([CONSULTATION_STATUS.COMPLETED, CONSULTATION_STATUS.CANCELLED].includes(this.consultation.status)) {
        localStorage.setItem(CACHE_VIEW_DETAIL_CONSULTATION_COMPLETED, this.matching.hash_id)
      }

      this.$router.push(this.localePath({
        name: routers.planDetail.name,
        params: { id: this.matching.itinerary.hash_id }
      }))
    }
  }
}
</script>
<style scoped>
.normal-modal .mdTit {
  width: 100%;
  padding: 0;
  margin-left: 0;
}

.consultInfo.disable, .consultInfo.noFix {
  opacity: 0.6;
  background: #eee;
  position: relative;
}

.consultInfo.disable:before {
  content: "誠に申し訳ありませんがご依頼を承れませんでした。";
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  color: #bc0000;
  top: 0;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.30);
}

.consultInfo.disable.waiting:before {
  content: '受付までしばらくお待ちください。';
  color: #0082BC;
}

.consultInfo.disable.rejected:before {
  content: '受付までしばらくお待ちください。';
  color: #0082BC;
}

.consultInfo .planBtn a.disabled {
  background: #bbb;
  pointer-events: none;
}

.total-amount {
  min-width: 80px;
  display: inline-block;
  text-align: center;
}
</style>
