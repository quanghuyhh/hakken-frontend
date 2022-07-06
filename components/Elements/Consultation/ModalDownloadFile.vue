<template>
  <LazyCustomModal
    class="modal-download-file normal-modal"
    :is-display="isDisplay"
    :hide="() => hideModal"
    @closed="hideModal"
  >
    <h2 class="mdTit">
      {{ $t('mypage.popup.pdf.title') }}
    </h2>
    <ul v-if="Object.keys(documentList).length" class="documentList">
      <li v-if="documentList.estimate">
        <a :href="documentList.estimate.path" target="_blank">{{ documentList.estimate.label }}</a>
      </li>
      <li v-if="documentList.reservation">
        <a :href="documentList.reservation.path" target="_blank">{{ documentList.reservation.label }}</a>
      </li>
      <li v-if="documentList.invoice">
        <a :href="documentList.invoice.path" target="_blank">{{ documentList.invoice.label }}</a>
      </li>
      <li v-if="documentList.receipt">
        <a :href="documentList.receipt.path" target="_blank">{{ documentList.receipt.label }}</a>
      </li>
      <li v-if="documentList.schedule">
        <a :href="documentList.schedule.path" target="_blank">{{ $t('plan_page.itinerary') }} - {{ documentList.schedule.code }}</a>
      </li>
      <li v-if="documentList.other">
        <a :href="documentList.other.path" target="_blank">{{ documentList.other.label }}</a>
      </li>
    </ul>
    <ul class="modalControl">
      <li>
        <input
          type="submit"
          :value="$t('custom_modal.close')"
          class="js-modal-close"
          @click.prevent="hideModal"
        >
      </li>
    </ul>
  </LazyCustomModal>
</template>

<script>
export default {
  name: 'ModalDownloadFile',
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
    },
    documentList: {
      type: Object,
      default: () => []
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

<style>
.modal.modal-download-file .documentList {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 1fr;
  gap: 10px;
}
.modal.modal-download-file .documentList li {
  margin: 0;
}
.modal.modal-download-file .documentList a {
  height: 100%;
  display: flex;
  align-items: center;
}
@media screen and (min-width: 1099px) {
  .modal.modal-download-file .documentList {
    grid-template-columns: repeat(2, 1fr);
    display: grid;
    grid-auto-rows: 1fr;
    gap: 10px;
  }
  .modal.modal-download-file .documentList li {
    width: inherit;
    margin: 0;
  }
}
</style>
