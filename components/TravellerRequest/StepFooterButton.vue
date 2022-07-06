<template>
  <ul class="slideCont">
    <li class="float-right">
      <div v-if="!$props.isSubmit">
        <p v-show="isNext" slot="button-next" class="nextSlide scrollTop">
          {{ $t('traveller_request_page.next_slide') }}
        </p>

        <p v-show="!isNext" class="nextDisabled">
          {{ $t('traveller_request_page.next_slide') }}
        </p>
      </div>

      <div v-else class="submitNext">
        <input
          type="submit"
          :value="$t('traveller_request_page.submit_request')"
          @click="submit"
        >
      </div>
    </li>

    <li slot="button-next" class="float-left">
      <p class="backSlide scrollTop" @click="hide">
        {{ $t('traveller_request_page.back_slide') }}
      </p>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    isNext: {
      required: false,
      type: Boolean,
      default: true
    },
    isSubmit: {
      required: false,
      type: Boolean,
      default: false
    },
    firstSlide: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    submit () {
      this.$emit('submit-form', true)
    },
    hide () {
      if (!this.firstSlide) {
        return
      }
      this.$modal.hide('presentation')
    }
  }
}
</script>
<style scoped>
.float-right {
  float: right;
  width: 49%;
}
.float-left {
  float: left;
  width: 49%;
}
.backSlide {
  line-height: 1.9;
}
.submitNext {
  height: 100%;
}
.submitNext input {
  height: 100%;
}
@media screen and (max-width: 950px) {
  .submitNext input {
    font-size: 10px;
    white-space: break-spaces;
    line-height: 2em;
    height: 5em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
}
</style>
