<template>
  <custom-modal :is-display="isDisplay" @closed="hideModal" @opened="showModal">
    <template v-if="!submitted">
      <h2 class="mdTit">
        {{ $t('plan_page.register_plan_modal.title') }}
      </h2>

      <p>
        このプランを予約すると登録された会員情報が旅行会社に送付されます。<br>
        <a href="https://cab-station.com/privacy.html" target="_blank">プライバシーポリシー</a>・<a href="http://idealgrow.jp/tarm/">利用規約</a>・<a href="http://idealgrow.jp/hakken/front_new/mypage/plan.html#">旅行業約款</a>・<a href="http://idealgrow.jp/hakken/front_new/mypage/plan.html#">取引条件説明書麺(共通事項)</a>に同意の上、ご予約ください。
      </p>

      <ul class="termCheck">
        <li v-for="(item, index) in items" :key="index" class="baseCheck">
          <input :id="`policyCheck${index}`" v-model="item.selected" type="checkbox"><label :for="`policyCheck${index}`">{{ item.text }}</label>
        </li>
      </ul>

      <ul class="modalControl">
        <li class="requestBtn">
          <input type="submit" :value="$t('custom_modal.save')" :disabled="!canSubmit" @click.prevent="onClickSubmit">
        </li>

        <li @click="hideModal">
          <input type="submit" :value="$t('custom_modal.close')" class="js-modal-close">
        </li>
      </ul>
    </template>

    <template v-else>
      <h2 class="mdTit">
        {{ $t('plan_page.popup.approved_policy.title') }}
      </h2>
      <p class="text-center">
        {{ $t('plan_page.popup.approved_policy.description') }}
      </p>
      <ul class="modalControl mt10">
        <li @click="handleRequested">
          <input type="submit" :value="$t('plan_page.popup.approved_policy.btn_close')" class="js-modal-close">
        </li>
      </ul>
    </template>
  </custom-modal>
</template>

<script>
export default {
  name: 'ModalRegisterPlan',
  props: {
    isDisplay: {
      type: Boolean,
      default: false
    },
    show: {
      type: Function,
      default: () => {}
    },
    hide: {
      type: Function,
      default: () => {}
    },
    planDetail: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  data () {
    return {
      items: [
        {
          selected: false,
          text: this.$t('plan_page.popup.policy.accept_policy')
        },
        {
          selected: false,
          text: this.$t('plan_page.popup.policy.accept_term')
        },
        {
          selected: false,
          text: this.$t('plan_page.popup.policy.accept_agency_agreement')
        },
        {
          selected: false,
          text: this.$t('plan_page.popup.policy.accept_transaction')
        },
        {
          selected: false,
          text: this.$t('plan_page.popup.policy.accept_consent')
        },
        {
          selected: false,
          text: this.$t('plan_page.popup.policy.accept_provider_data')
        }
      ],
      submitted: false
    }
  },
  computed: {
    canSubmit () {
      return !this.items.filter(item => !item.selected).length
    }
  },
  methods: {
    hideModal () {
      this.hide()
      this.reset()
      this.$emit('closed')
    },
    showModal () {
      this.reset()
      this.$emit('opened')
    },
    async onClickSubmit () {
      try {
        await this.$repositories.plan.acceptPlan(this.planDetail.hash_id)
        this.submitted = true
      } catch (error) {
        this.$toast.error('Fail to accept this plan')
      }
    },
    reset () {
      this.submitted = false
      this.items.forEach((item) => { item.selected = false; return item })
    },
    handleRequested () {
      this.hide()
      this.reset()
      this.$emit('requested')
    }
  }
}
</script>

<style scoped>
input[type="submit"][disabled], input[type="submit"]:disabled {
  cursor: not-allowed;
}
.text-center {
  text-align: center
}
</style>
