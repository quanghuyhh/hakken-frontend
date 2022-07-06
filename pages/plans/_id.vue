<template>
  <main>
    <div class="consultBlock">
      <div class="inner">
        <tab :items="tabs" :active-tab="activeTab" @change="onTabChanged" />

        <div class="consultList headBlock">
          <div class="consultInfo">
            <div class="profile">
              <div class="ph">
                <img
                  :src="agent ? agent.avatar : ''"
                  :alt="agentName"
                  onerror="this.src='/images/plan/avatar.jpg'"
                >
              </div>

              <h3>
                <span>{{ agentCompany ? agentCompany.name : '' }}</span>
                <nuxt-link :to="localePath({path: routers.matchingResult.route, params: {consultations_hash_id: (planDetail.matching ? planDetail.matching.code : '')}})">
                  {{ agentName }}
                </nuxt-link>
              </h3>
            </div>

            <div class="price">
              <span class="inputLabel">{{ $t('plan_page.plan_total_price') }}</span>
              <p>{{ $t('plan_page.quantity') }}<span class="total-amount">{{ (activeSchedule ? activeSchedule.total_amount : null) || '-' | toCurrency }}</span>{{ $t('plan_page.quantity_suffix') }}（{{ $t('mypage.consult_list.include_tax') }})</p>
            </div>

            <div class="planBtn btn-request-plan">
              <a
                type="button"
                :class="['requestPlan', {'disabled': isRequested}]"
                href="javascript:void(0);"
                :disabled="isRequested"
                @click.prevent="handleClickApprove"
              >
                {{ $t(isRequested ? 'plan_page.requested' : 'plan_page.detail') }}
              </a>
            </div>

            <div class="consultControl">
              <ul>
                <li>
                  <nuxt-link
                    target="_blank"
                    :to="localePath({name: routers.messageDetail.name, params: {id: planDetail ? planDetail.hash_id : ''}})"
                  >
                    &nbsp;
                  </nuxt-link>
                </li>

                <li class="videoFix">
                  <a
                    v-tooltip="{theme: callStatus, content: itemMeeting ? callContent : ''}"
                    href="javascript:void(0)"
                    class="js-modal-open"
                    data-target="mdRequest"
                    @click.prevent="handleShowModalCreateOnlineMeeting"
                  >&nbsp;</a>
                </li>

                <elements-consultation-file-download-button :documents="documents" :show-popup-file="showPopupFile" @toggle_download="(evt) => showPopupFile = evt" />
              </ul>
            </div>
          </div>

          <div class="planHead">
            <div class="planHeadWrapper">
              <span class="title">{{ $t('plan_page.head.title') }}</span>
              <a class="reloadBtn" @click.prevent="updatePlan">
                {{ $t('plan_page.update_plan') }}
              </a>
            </div>
          </div>

          <plan-event-group
            v-for="(eventGroup, date) in mappedEvents"
            :key="date"
            :date="date"
            :event-group="eventGroup"
            :events="events"
          />

          <div class="planHead topBd planFoot">
            <p class="reserveBtn backToTop" @click="() => CommonHelper.scrollToTop()">
              {{ $t('plan_page.foot.back_to_top') }}
            </p>
            <p :class="['reserveBtn backToList', {'disabled': isCancel}]" :disabled="isCancel" @click="handleBackToConsultation">
              {{ canBack ? $t('plan_page.foot.back_to_mypage') : $t('plan_page.foot.back_to_matching') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <elements-consultation-modal-download-file
      :is-display="showPopupFile"
      :document-list="documentList"
      :show="() => showPopupFile = true"
      :hide="() => showPopupFile = false"
      @closed="showPopupFile = false"
    />

    <modal-register-plan
      :is-display="isShowRegisterPlan"
      :show="showRegisterPlanModal"
      :hide="hideRegisterPlanModal"
      :plan-detail="planDetail"
      @requested="handleApprovedPlan"
      @closed="isShowRegisterPlan = false"
    />
    <modal-edit-profile
      :is-display="showRequestModal"
      :hide="() => showRequestModal = false"
      @closed="showRequestModal = false"
    />
    <modal-back-to-consultation-list
      :is-display="showBackToConsultationList"
      :hide="() => showBackToConsultationList = false"
      :plan-detail="planDetail"
      @closed="showBackToConsultationList = false"
      @confirmed="handleConfirmCancel"
    />
    <modal-cancel-reservation
      :is-display="showCancelReservation"
      :hide="() => showCancelReservation = false"
      :plan-detail="planDetail"
      @closed="showCancelReservation = false"
    />

    <my-page-create-online-meeting
      v-if="planDetail"
      ref="modalCreateOnlineMeeting"
      :item-meeting="itemMeeting"
      :itinerary-id="planDetail.id || ''"
    />
  </main>
</template>

<script>
import { groupBy, sortBy } from 'lodash'
import { ref, computed, onMounted } from '@vue/composition-api'
import { UserService } from '@/services/UserService'
import { CommonHelper } from '@/helpers/CommonHelper'
import ModalEditProfile from '@/components/Plan/ModalEditProfile'
import ModalBackToConsultationList from '@/components/Plan/ModalBackToConsultationList'
import ModalCancelReservation from '@/components/Plan/ModalCancelReservation'
import ModalRegisterPlan from '@/components/Plan/ModalRegisterPlan'
import routers from '@/utils/routers'
import { CONSULTATION_TAB, ONLINE_MEETING_STATUS, RESERVATION_STATUS } from '@/config/consts'
import { MYPAGE } from '@/config/event'
import { MAPPING_TRANSPORTATION_ICONS } from '@/constants/planing'
import { DATETIME_FORMAT } from '@/config/datetime_format'
import { displayFormat, parseApiTimestamp } from '@/utils/datetime'
import { ImageHelper } from '@/helpers/ImageHelper'
import { TransformHelper } from '@/helpers/TransformHelper'
import { useFileDownload } from '@/compositions/Consultation/useFileDownload'

export default {
  name: 'MeisterPlan',
  layout: 'default',
  components: {
    ModalCancelReservation,
    ModalEditProfile,
    ModalRegisterPlan,
    ModalBackToConsultationList
  },
  setup (props, context) {
    const { $repositories, $route, $router, $bus, $i18n, $auth, $refs } = context.root

    // data
    const planDetail = ref({})
    const activeTab = ref(0)
    const isCancel = ref(false)
    const isShowRegisterPlan = ref(false)
    const isRequested = ref(false)
    const canBack = ref(true)
    const showRequestModal = ref(false)
    const showBackToConsultationList = ref(false)
    const showCancelReservation = ref(false)
    const showPopupFile = ref(false)

    // computed
    const planId = computed(() => $route.params.id)
    const auth = computed(() => UserService.getUserData($auth.user))
    const canApprovePlan = computed(() => {
      let flag = true
      const checkFields = ['name', 'kana_name', 'prefecture']
      checkFields.forEach((field) => {
        const value = auth.value[field]
        const parseValue = parseInt(value)
        if (
          (Number.isInteger(parseValue) && parseValue < 0) ||
          (Number.isNaN(parseValue) && (!value || !value.length))
        ) {
          flag = false
        }
      })
      if (
        [RESERVATION_STATUS.PROCESSING].includes(planDetail.value.status)
      ) {
        flag = false
      }
      return flag
    })
    const activeSchedule = computed(() => planDetail.value?.schedule || {})
    const schedules = computed(() => {
      if (!activeSchedule.value) {
        return []
      }
      const events = sortBy(activeSchedule.value.events, ['departure_time', 'created_at'])

      const groups = groupBy(events, 'date')
      Object.keys(groups).forEach((key) => {
        const _eventPhotos = []
        const _events = groups[key].map((item) => {
          const photo = item?.photo ? JSON.parse(item.photo) : {}
          item.photo = photo
          if (photo?.path) {
            item.photo.preview = ImageHelper.getAWSImage(photo.path)
            item.pickup = true
            _eventPhotos.push(item)
          }
          item.icon = MAPPING_TRANSPORTATION_ICONS[item?.transportation_type]
          return item
        })
        groups[key] = {
          events: _events,
          eventPhotos: _eventPhotos
        }
      })
      return groups
    })
    const mappedEvents = computed(() => planDetail.value?.mappedEvents || {})
    const events = computed(() => activeSchedule.value?.events || {})
    const user = computed(() => {
      if (!planDetail.value?.meister) {
        return {}
      }
      return planDetail.value.meister
    })

    const meister = computed(() => {
      return user.value ? user.value.meister : {}
    })
    const agent = computed(() => {
      if (!meister.value) {
        return {}
      }
      return {
        ...user.value,
        ...meister.value?.agent
      }
    })
    const agentCompany = computed(() => agent.value || {})
    const agentName = computed(() => {
      return agent.value ? agent.value.name || agent.value?.kana_name || agent.value?.romaji_name : null
    })

    const callStatus = computed(() => {
      if (!itemMeeting.value) {
        return
      }
      if (itemMeeting.value?.previous_meeting_time && itemMeeting.value?.meeting_time !== itemMeeting.value?.previous_meeting_time) {
        return 'danger'
      }
      switch (itemMeeting.value?.status) {
        case ONLINE_MEETING_STATUS.REQUESTED:
          return 'gray'

        case ONLINE_MEETING_STATUS.ACCEPTED:
          return 'info'

        case ONLINE_MEETING_STATUS.CHANGED:
          return 'danger'

        default:
          return ''
      }
    })
    const callContent = computed(() => {
      const inputFormat = DATETIME_FORMAT.API_DATETIME
      const outputFormat = DATETIME_FORMAT.LOCALE_DATE
      if (!itemMeeting.value) {
        return
      }
      const getOutput = displayFormat(
        parseApiTimestamp(itemMeeting.value?.meeting_time, inputFormat),
        outputFormat
      )
      switch (itemMeeting.value?.status) {
        case ONLINE_MEETING_STATUS.REQUESTED:
          return $i18n.t('mypage.tooltip.requested') + ` ${getOutput}～`

        case ONLINE_MEETING_STATUS.ACCEPTED:
          return $i18n.t('mypage.tooltip.accepted') + ` ${getOutput}～`

        case ONLINE_MEETING_STATUS.CHANGED:
          return $i18n.t('mypage.tooltip.changed') + ` ${getOutput}～`

        default:
          return ''
      }
    })
    const itemMeeting = computed(() => planDetail.value?.matching?.online_meeting)
    const matching = computed(() => planDetail.value?.matching || {})

    // use service
    const documents = computed(() => {
      const { documents } = useFileDownload(planDetail.value)
      return documents.value
    })

    const documentList = computed(() => {
      const { documentList } = useFileDownload(planDetail.value)
      return documentList.value
    })

    // methods
    const fetchData = async () => {
      planDetail.value = await $repositories.plan.getPlanDetail(planId.value).then(({ results }) => results)
        .then(results => TransformHelper.transformHashIdToId(results))
      initData()
    }

    const handleCancelingPlan = () => {
      isCancel.value = true
    }

    const handleApprovedPlan = () => {
      isShowRegisterPlan.value = false
      isRequested.value = true
      canBack.value = false
      localStorage.setItem(CONSULTATION_TAB.CACHE_KEY, 1)
      activeTab.value = 1
    }

    const initData = () => {
      isRequested.value = planDetail.value && planDetail.value?.status === RESERVATION_STATUS.PROCESSING
      canBack.value = !isRequested.value
      isCancel.value = planDetail.value && [RESERVATION_STATUS.CANCELING, RESERVATION_STATUS.CANCELLED].includes(planDetail.value?.status)
    }

    const showRegisterPlanModal = () => {
      isShowRegisterPlan.value = true
    }

    const hideRegisterPlanModal = () => {
      isShowRegisterPlan.value = false
    }

    const onTabChanged = (tabIndex) => {
      localStorage.setItem(CONSULTATION_TAB.CACHE_KEY, tabIndex)
      return $router.push(routers.myPage.route)
    }

    const handleClickApprove = () => {
      if (isRequested.value) {
        return
      }

      if (canApprovePlan.value) {
        isShowRegisterPlan.value = true
      } else {
        showRequestModal.value = true
      }
    }

    const handleCloseBackToList = () => {
      showBackToConsultationList.value = false
      showCancelReservation.value = true
    }
    const handleBackToConsultation = () => {
      if (isCancel.value) {
        return
      }
      if (canBack.value) {
        $bus.emit(MYPAGE.BACK_TO_CONSULTATION_LIST, true)
        $router.push(routers.myPage.route)
      } else {
        showBackToConsultationList.value = true
      }
    }

    const handleConfirmCancel = () => {
      showBackToConsultationList.value = false
      showCancelReservation.value = true
    }
    const updatePlan = () => {
      window.location.reload()
    }

    const handleShowModalCreateOnlineMeeting = () => {
      $refs.modalCreateOnlineMeeting.showModal()
    }

    onMounted(async () => {
      await fetchData()
      activeTab.value = parseInt(localStorage.getItem(CONSULTATION_TAB.CACHE_KEY)) || 0
      $bus.on('canceling_plan', handleCancelingPlan)
    })

    return {
      // inject
      documents,
      documentList,

      // data
      planDetail,
      activeTab,
      isCancel,
      isShowRegisterPlan,
      isRequested,
      canBack,
      showRequestModal,
      showBackToConsultationList,
      showCancelReservation,
      showPopupFile,

      // computed
      planId,
      auth,
      canApprovePlan,
      activeSchedule,
      schedules,
      mappedEvents,
      events,
      user,
      meister,
      agent,
      agentCompany,
      agentName,
      callStatus,
      callContent,
      itemMeeting,
      matching,

      // methods
      fetchData,
      handleCancelingPlan,
      handleApprovedPlan,
      initData,
      showRegisterPlanModal,
      hideRegisterPlanModal,
      onTabChanged,
      handleClickApprove,
      handleCloseBackToList,
      handleBackToConsultation,
      handleConfirmCancel,
      updatePlan,
      handleShowModalCreateOnlineMeeting
    }
  },
  data () {
    return {
      tabs: [
        this.$t('mypage.tabs.requested'),
        this.$t('mypage.tabs.confirmed'),
        this.$t('mypage.tabs.completed')
      ],
      routers,
      CommonHelper
    }
  },
  head () {
    return {
      title: this.$t('plan_page.page_title', { meister_name: this.agentName })
    }
  }
}
</script>

<style lang="scss">
.consultBlock {
  font-family: futura-pt, 'Noto Sans JP', "Hiragino Kaku Gothic Pro", "Meiryo", sans-serif;
}

.mdTit {
  margin-left: 0 !important;
}

input[type="submit"], input[type="button"] {
  font-weight: bold;
}

.consultInfo {
  .btn-request-plan a {
    background: #f8b62d;
  }
}

.planHead {
  .planHeadWrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #EBEBEB;
    border-left: solid 3px #f8b62d;
    border-radius: 0 3px 3px 0;
    padding: 10px 20px;
  }
}

.planFoot {
  display: flex;
  justify-content: flex-end;

  .reserveBtn {
    &:before {
      background-size: 60%;
    }
  }

  .reserveBtn.backToTop {
    &:before {
      background: url(~/static/images/icons/ico_home.svg) center center no-repeat, #fff;
      background-size: 60%;
    }
  }

  .reserveBtn.backToList {
    background: #DDDDDD;

    &:before {
      background: url(~/static/images/icons/ico_change.svg) center center no-repeat, #fff;
      background-size: 60%;
    }
    &:disabled {
      opacity: .5;
      background: red;
    }
  }
}

@media screen and (min-width: 1099px) {
  .planHead {
    .reserveBtn {
      margin-right: 0;
    }

    .reserveBtn + .reserveBtn, .reserveBtn ~ .reserveBtn {
      margin-left: 20px;
    }
  }
}

.consultInfo .planBtn {
  .requestPlan {
    text-decoration: none;
    background: #f8b62d;
    color: #fff;
    display: block;
    padding: 18px 15px;
    text-align: center;
    border-radius: 100px;
    font-weight: bold;
    border: none;
    outline: none;
    width: 100%;
    cursor: pointer;

    &:disabled, &.disabled {
      cursor: not-allowed;
      opacity: .6;
    }
  }
}
.total-amount {
  min-width: 80px;
  display: inline-block;
  text-align: center;
}

.reserveBtn, .planHead .reserveBtn, .planFoot .reserveBtn.backToList {
  &:disabled, &.disabled {
    opacity: .5 !important;
    cursor: not-allowed;
  }
}
</style>
