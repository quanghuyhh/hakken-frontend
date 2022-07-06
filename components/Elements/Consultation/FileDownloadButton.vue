<template>
  <li :class="{'disable': documents && !documents.length}">
    <a href="javascript:void(0)" @click.prevent="toggleDownloadModal(true)">
      &nbsp;
    </a>
  </li>
</template>

<script>
export default {
  name: 'FileDownloadButton',
  props: {
    documents: {
      type: Array,
      required: true,
      default: () => []
    },
    showPopupFile: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    // methods
    const toggleDownloadModal = (status) => {
      context.emit('toggle_download', status)
    }

    return {
      // methods
      toggleDownloadModal
    }
  }
}
</script>
