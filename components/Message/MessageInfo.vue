<template>
  <div class="consultInfo">
    <div class="profile">
      <div class="ph">
        <img src="common/img/sample_prof04.jpg" alt="山田太郎" class="hoverZoomLink">
        <img
          :src="agent ? agent.avatar : ''"
          :alt="agentName"
          onerror="this.src='/images/plan/avatar.jpg'"
        >
      </div>
      <h3>
        <span>{{ agentCompany ? agentCompany.name : '' }}</span>
        <nuxt-link :to="meisterDetailURL">
          {{ agentName }}
        </nuxt-link>
      </h3>
    </div>
    <div class="price">
      <span class="inputLabel">{{ $t('plan_page.plan_total_price') }}</span>
      <p>{{ $t('plan_page.quantity') }}<span class="total-amount">{{ (activeSchedule ? activeSchedule.total_amount : null) || '-' | toCurrency }}</span>{{ $t('plan_page.quantity_suffix') }}（{{ $t('mypage.consult_list.include_tax') }})</p>
    </div>
    <div class="planBtn">
      <a
        v-if="isPublicPlan"
        @click.prevent="handleViewPlanDetail"
      >
        {{ $t('mypage.consult_list.detail_consult') }}
      </a>
      <a v-else href="javascript:void(0);" class="disabled">{{ $t('mypage.consult_list.detail_consult') }}</a>
    </div>
    <div class="consultControl">
      <ul>
        <li class="disable">
          <a href="#">&nbsp;</a>
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
        <li>
          <a href="javascript:void(0)" @click.prevent="showPopupFile = true">
            &nbsp;
          </a>
        </li>
      </ul>
    </div>

    <my-page-create-online-meeting
      v-if="itinerary"
      ref="modalCreateOnlineMeeting"
      :item-meeting="itemMeeting && Object.keys(itemMeeting).length ? itemMeeting : null"
      :itinerary-id="itinerary.id || ''"
    />

    <LazyCustomModal
      class="modal-download-file normal-modal"
      :is-display="showPopupFile"
      :hide="() => showPopupFile = !showPopupFile"
      @closed="showPopupFile = false"
    >
      <h2 class="mdTit">
        {{ $t('mypage.popup.pdf.title') }}
      </h2>
      <ul class="documentList">
        <li><a href="" target="_blank">{{ $t('mypage.popup.pdf.estimation') }}</a></li>
        <li><a href="" target="_blank">{{ $t('mypage.popup.pdf.reverse_confirmation') }}</a></li>
        <li><a href="" target="_blank">{{ $t('mypage.popup.pdf.invoice') }}</a></li>
        <li><a href="" target="_blank">{{ $t('mypage.popup.pdf.receipt') }}</a></li>
      </ul>
      <ul class="modalControl">
        <li>
          <input
            type="submit"
            :value="$t('custom_modal.close')"
            class="js-modal-close"
            @click.prevent="showPopupFile = false"
          >
        </li>
      </ul>
    </LazyCustomModal>
  </div>
</template>

<script>
import routers from '@/utils/routers'
export default {
  name: 'MessageInfo',
  props: {
    agent: {
      type: Object,
      required: true,
      default: () => {}
    },
    agentCompany: {
      type: Object,
      required: true,
      default: () => {}
    },
    itinerary: {
      type: Object,
      required: true,
      default: () => {}
    },
    activeSchedule: {
      type: Object,
      required: true,
      default: () => {}
    },
    isPublicPlan: {
      type: Boolean,
      required: true,
      default: false
    },
    itemMeeting: {
      type: Object,
      default: null
    },
    callContent: {
      type: String,
      required: true,
      default: ''
    },
    agentName: {
      type: String,
      default: ''
    },
    callStatus: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      routers,
      showPopupFile: false
    }
  },
  computed: {
    meisterDetailURL () {
      return this.localePath({
        path: routers.consultationsMeisterResult.route,
        params: {
          hashId: (this.itinerary.matching ? this.itinerary.matching.code : '')
        }
      })
    }
  },
  methods: {
    handleViewPlanDetail () {
      this.$router.push(this.localePath({
        name: routers.planDetail.name,
        params: { id: this.itinerary.hash_id }
      }))
    },
    handleShowModalCreateOnlineMeeting () {
      this.$refs.modalCreateOnlineMeeting.showModal()
    }
  }
}
</script>

<style scoped>
.total-amount {
  min-width: 80px;
  display: inline-block;
  text-align: center;
}
</style>
