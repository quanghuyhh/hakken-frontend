<template>
  <custom-modal :is-display="isDisplay" @closed="hideModal" @opened="showModal">
    <div class="wrapper">
      <template v-if="step === 1">
        <validation-observer
          ref="cancelPlanRequested"
          #default="{invalid}"
        >
          <h2 class="mdTit ml00">
            {{ $t('plan_page.popup.cancel_reservation.title') }}
          </h2>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="$t('plan_page.popup.cancel_reservation.description')" />

          <div class="popup-group mt30">
            <div class="group-label">
              {{ $t('plan_page.popup.cancel_reservation.input_reason') }}<span class="label-required">{{ $t('require') }}</span>
            </div>
            <div class="note">
              <validation-provider
                v-slot="{ errors }"
                name="cancel_reservation.reason"
                rules="required|max:255"
              >
                <textarea
                  v-model="form.reason"
                  rows="5"
                  :placeholder="$t('plan_page.popup.cancel_reservation.placeholder_reason')"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </div>
          </div>

          <div class="popup-group mt30">
            <div class="group-label">
              {{ $t('plan_page.popup.cancel_reservation.input_policy') }}
            </div>
            <div ref="policyContent" class="policy-content" @scroll="onScroll">
              株式会社キャブステーションでは、個人情報を以下のように定義しています。 個人情報とは、個人に関する情報であって、
              当該情報に含まれる氏名、住所、メールアドレス、アクセス記録、その他の記述又は個人別に付与された番号や記号、その 他の符号、画像若しくは音声により、その個人を識別できるもの(
              当該情報のみでは識別できないが、他の情報と容易に照 合することができ、それにより当該個人を識別できるものを含む）を言う。
              <br>
              個人情報の利用範囲について
              <br>
              個人情報を収集する目的は、株式会社キャブステーションおよびパートナーや各協力企業が、弊社の提供する各種WEBサービスを遂行するため、および、株式会社キャブステーションが利用者にカスタマイズされた情報を御覧いただいたり、個々人の登録内容に基づいて、最適な情報をお届けするためです。
            </div>
          </div>

          <div :class="['termCheck mt15', {'disabled': !isBottom}]">
            <validation-provider
              v-slot="{ errors }"
              name="form.agreement"
              rules="required"
            >
              <input id="agreement" v-model="form.agreement" type="checkbox" :disabled="!isBottom">
              <label for="agreement">{{ $t('plan_page.popup.cancel_reservation.checkbox_term_and_policy') }}</label>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </div>

          <div class="modalControl step-1">
            <li>
              <input
                type="button"
                :value="$t('plan_page.popup.cancel_reservation.btn_exit')"
                class="js-modal-close mt15"
                @click.prevent="hideModal"
              >
            </li>
            <li class="deleteBtn">
              <input
                type="button"
                :value="$t('plan_page.popup.cancel_reservation.btn_cancel')"
                :disabled="!form.agreement || invalid"
                @click.prevent="handleClickCancel"
              >
            </li>
          </div>
        </validation-observer>
      </template>

      <template v-if="step === 2">
        <h2 class="mdTit ml00">
          {{ $t('plan_page.popup.cancel_step_2.title') }}
        </h2>
        <ul class="modalControl">
          <li>
            <input
              type="submit"
              :value="$t('plan_page.popup.cancel_step_2.no')"
              class="js-modal-close"
              @click.prevent="hideModal"
            >
          </li>
          <li class="requestBtn">
            <input
              type="submit"
              :value="$t('plan_page.popup.cancel_step_2.yes')"
              @click.prevent="handleConfirmCancel"
            >
          </li>
        </ul>
      </template>

      <template v-if="step === 3">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <h2 class="mdTit ml00 title-result" v-html="$t('plan_page.popup.cancel_step_3.description')" />
        <ul class="modalControl">
          <li>
            <input
              type="submit"
              :value="$t('plan_page.popup.cancel_step_3.close')"
              class="js-modal-close"
              @click.prevent="hideModal"
            >
          </li>
        </ul>
      </template>
    </div>
  </custom-modal>
</template>

<script>
export default {
  name: 'ModalCancelReservation',
  props: {
    isDisplay: {
      type: Boolean,
      default: false
    },
    show: {
      type: Function,
      default: () => {
      }
    },
    hide: {
      type: Function,
      default: () => {
      }
    },
    planDetail: {
      type: Object,
      default: () => {
      },
      required: true
    }
  },
  data () {
    return {
      form: {
        reason: null,
        agreement: false
      },
      isBottom: false,
      submitted: false,
      step: 1
    }
  },
  methods: {
    hideModal () {
      this.hide()
      this.reset()
      this.$emit('closed')
    },
    showModal () {
      this.$emit('opened')
    },
    async handleClickCancel () {
      const isValid = await this.$refs.cancelPlanRequested.validate()
      if (!isValid) {
        this.$toast.error(this.$t('plan_page.popup.cancel_reservation.form_error'))
        return
      }
      try {
        await this.$repositories.plan.cancel(this.planDetail.hash_id, this.form)
        await this.$bus.emit('canceling_plan')
        this.step = 2
      } catch (error) {
        this.$toast.error('Fail to cancel this plan')
      }
    },
    handleConfirmCancel () {
      this.step = 3
    },
    onScroll ({
      target: {
        scrollTop,
        clientHeight,
        scrollHeight
      }
    }) {
      const padding = 15
      this.isBottom = scrollTop + clientHeight + padding >= scrollHeight
    },
    reset () {
      this.step = 1
      this.isBottom = false
      this.form.agreement = false
      this.form.reason = null
    }
  }
}
</script>

<style scoped>
input[type="submit"][disabled], input[type="submit"]:disabled {
  cursor: not-allowed;
  opacity: .7;
}

input[type="submit"], input[type="button"] {
  font-weight: bold;
}

.policy-content {
  width: 100%;
  border-radius: 5px;
  background: #fff;
  padding: 15px;
  font-size: 16px;
  box-sizing: border-box;
  border: solid 2px #ebebeb;
  max-height: 200px;
  overflow: hidden;
  overflow-y: auto;
}

.policy-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, .5);
  border-radius: 10px;
}

.policy-content::-webkit-scrollbar-corner {
  background-color: transparent;
}

.policy-content::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}

.termCheck {
  background: #fff;
  border: solid #C4C4C4 1px;
  padding: 15px;
  border-radius: 10px;
}

.termCheck.disabled {
  opacity: .4;
}

.termCheck label {
  padding-left: 40px;
  display: block;
  position: relative;
}

.termCheck label:before {
  content: "";
  background: url("/images/icons/ico_check_out.svg") center center no-repeat;
  background-size: 100%;
  position: absolute;
  width: 30px;
  height: 30px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.termCheck input[type="checkbox"]:checked + label:before {
  background: url("/images/icons/ico_check.svg") center center no-repeat;
}

.termCheck input[type="checkbox"]:checked + label {
  color: #0082bc;
}

@media screen and (min-width: 1159px) {
  .termCheck {
    width: 450px;
    text-align: center;
    margin: 0 auto;
  }
}

.modalControl.step-1 {
  flex-direction: column;
  align-items: center;
}

.title-result {
  text-align: center;
  font-size: 20px;
}

span.label-required {
  color: #E40003;
  font-size: 12px;
  margin-left: 5px;
}

.modalControl li.deleteBtn input:disabled {
  background: rgba(188, 0, 0, .5);
}
</style>
