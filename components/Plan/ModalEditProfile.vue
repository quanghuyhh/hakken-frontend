<template>
  <custom-modal
    id="mdReserveEdit"
    :is-display="isDisplay"
    :hide="hideModal"
    @closed="hideModal"
  >
    <h2 class="mdTit">
      {{ $t('plan_page.register_plan_modal.title') }}
    </h2>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-html="$t('plan_page.register_plan_modal.description')" />
    <ul class="modalControl">
      <li class="requestBtn">
        <nuxt-link :tag="'input'" :type="'submit'" :to="routers.editAccount.route" :value="$t('common.screen.mypage')" />
      </li>
      <li>
        <input
          type="submit"
          :value="$t('custom_modal.close')"
          class="js-modal-close"
          @click.prevent="hideModal"
        >
      </li>
    </ul>
  </custom-modal>
</template>

<script>
import CustomModal from '@/components/Common/CustomModal'
import routers from '@/utils/routers'

export default {
  name: 'ModalEditProfile',
  components: { CustomModal },
  props: {
    isDisplay: {
      type: Boolean,
      default: false
    },
    hide: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      routers
    }
  },
  methods: {
    hideModal () {
      this.hide()
      this.$emit('closed')
    },
    showModal () {
      this.$emit('opened')
    }
  }
}
</script>
