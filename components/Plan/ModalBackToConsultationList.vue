<template>
  <custom-modal
    id="mdReserveEdit"
    :is-display="isDisplay"
    :hide="hideModal"
    @closed="hideModal"
  >
    <h2 class="mdTit">
      {{ $t('plan_page.popup.back_consultation_list.title') }}
    </h2>
    <ul class="modalControl">
      <li>
        <input
          type="submit"
          :value="$t('plan_page.popup.back_consultation_list.cancel')"
          class="js-modal-close"
          @click.prevent="confirmCancel"
        >
      </li>
      <li class="requestBtn">
        <input
          type="submit"
          :value="$t('plan_page.popup.back_consultation_list.send_message')"
          :data-url="localePath({ name: routers.messageDetail.name, params: { id: planDetail ? planDetail.hash_id : '' } })"
          @click.prevent="sendDefaultMessage"
        >
      </li>
    </ul>
  </custom-modal>
</template>

<script>
import CustomModal from '@/components/Common/CustomModal'
import routers from '@/utils/routers'

export default {
  name: 'ModalBackToConsultationList',
  components: { CustomModal },
  props: {
    isDisplay: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Function,
      default: () => {}
    },
    planDetail: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      routers
    }
  },
  computed: {
    messageUrl () {
      const params = { name: routers.messageDetail.name, params: { id: this.planDetail?.hash_id || '' } }
      return this.localePath(params)
    }
  },
  methods: {
    hideModal () {
      this.hide()
      this.$emit('closed')
    },
    showModal () {
      this.$emit('opened')
    },
    sendDefaultMessage () {
      // @TODO: send default message
      this.$router.push(this.messageUrl)
    },
    confirmCancel () {
      this.$emit('confirmed')
    }
  }
}
</script>
