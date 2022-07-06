<template>
  <div class="modal js-modal" :class="display ? 'show' : 'hide'">
    <div class="modal__bg js-modal-close" @click="hide" />
    <div class="modal__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomModal',
  props: {
    isDisplay: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      display: false
    }
  },
  watch: {
    isDisplay (val) {
      this.display = val
    }
  },
  methods: {
    hide () {
      this.display = false
      this.$emit('closed')
    },
    show () {
      this.display = true
      this.$emit('opened')
    }
  }
}
</script>

<style scoped>
.show {
  display: block;
}
.hide {
  display: none;
}
</style>
