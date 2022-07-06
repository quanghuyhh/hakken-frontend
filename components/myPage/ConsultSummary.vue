<template>
  <div>
    <ul class="dataInfo">
      <li>
        {{ $t('mypage.consult_block.no') }}<span>{{ consultation.code }}</span>
      </li>
      <li>
        {{ $t('mypage.consult_block.consult_date')
        }}<span>{{
          consultation.created_at
            | consultationFormatDate(
              DATETIME_FORMAT.API_DATE,
              DATETIME_FORMAT.DISPLAY_DATETIME_AND_DAY
            )
        }}</span>
      </li>
    </ul>
    <div class="requestBlock">
      <ul class="headData">
        <li>
          <span class="inputLabel">{{ $t('travel_date') }}</span>
          <p>{{ renderSeasonText() }}</p>
        </li>

        <li>
          <span class="inputLabel">{{ $t('destination') }}</span>
          <p>
            {{
              consultation.formatted_address || null
            }}
          </p>
        </li>

        <li>
          <span class="inputLabel">{{ $t('departure_address') }}</span>
          <p>
            {{
              consultation.point_of_departure
                ? consultation.point_of_departure.name
                : null
            }}
          </p>
        </li>
      </ul>

      <div class="detailData">
        <ul class="data01">
          <li>
            <span class="inputLabel">{{ $t('number_of_customers') }}</span>
            <ul class="parsonList">
              <li>
                {{ $t('human')
                }}<span>{{ consultation.number_of_adult || 0 }}</span>{{ $t('human_unit') }}
              </li>
              <li>
                {{ $t('children')
                }}<span>{{ consultation.number_of_children || 0 }}</span>{{ $t('human_unit') }}
              </li>
              <li>
                {{ $t('kid')
                }}<span>{{ consultation.number_of_infant || 0 }}</span>{{ $t('human_unit') }}
              </li>
            </ul>
          </li>

          <li class="purposeList">
            <span class="inputLabel">{{ $t('purpose_of_travel') }}</span>
            <p>
              {{ consultation.purposes | renderListName('name', ', ') }}
            </p>
          </li>

          <li>
            <span class="inputLabel">{{ $t('budget_of_travel') }}</span>
            <p>総額{{ consultation.budget | toCurrency }}円</p>
          </li>
        </ul>

        <ul class="data02">
          <li>
            <span class="inputLabel">{{ $t('interested_in') }}</span>
            <ul v-if="consultation.favorites" class="intList">
              <li
                v-for="(favorite, index) in consultation.favorites"
                :key="index"
              >
                {{ favorite.name }}
              </li>
            </ul>
          </li>
        </ul>

        <ul class="data03">
          <li>
            <span class="inputLabel">{{ $t('request') }}</span>
            <p>{{ consultation.note }}</p>
          </li>
        </ul>

        <div
          v-if="canCancel"
          class="delete js-modal-open"
          data-target="mdDelete"
          @click.prevent="toggleModel = true"
        >
          {{ $t('mypage.consult_block.cancel_consult') }}
        </div>
        <LazyCustomModal
          ref="cancelModal"
          :is-display="toggleModel"
          @closed="toggleModel = false"
        >
          <h2 class="mdTit">
            {{ $t('mypage.popup.cancel.title') }}
          </h2>
          <ul class="modalControl">
            <li class="deleteBtn">
              <input
                type="button"
                :value="$t('mypage.popup.cancel.cancel')"
                @click.prevent="cancelRequest"
              >
            </li>
            <li>
              <input
                type="button"
                :value="$t('mypage.popup.cancel.submit')"
                class="js-modal-close"
                @click.prevent="toggleModel = false"
              >
            </li>
          </ul>
        </LazyCustomModal>
        <LazyCustomModal ref="successModal" @closed="beforeClose">
          <h2 class="mdTit" style="margin: 0">
            {{ $t('mypage.popup.cancel.cancel_successfully') }}
          </h2>
        </LazyCustomModal>
      </div>
    </div>
  </div>
</template>

<script>
import { DATETIME_FORMAT } from '@/config/datetime_format'
import { CONSULTATION_STATUS } from '@/config/consts'

export default {
  name: 'ConsultSummary',
  props: {
    consultation: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      DATETIME_FORMAT,
      toggleModel: false,
      season: {
        spring: this.$t('season.spring'),
        summer: this.$t('season.summer'),
        autumn: this.$t('season.autumn'),
        winter: this.$t('season.winter'),
        noseason: this.$t('season.no_season')
      }
    }
  },
  computed: {
    createdAt () {
      return this.getDisplayDateTime(
        this.consultation.created_at,
        DATETIME_FORMAT.API_DATETIME
      )
    },
    startDate () {
      return this.getDisplayDateTime(
        this.consultation.start_date,
        DATETIME_FORMAT.API_DATE
      )
    },
    days () {
      return this.$dayjs(this.consultation.end_date).diff(
        this.consultation.start_date,
        'days'
      )
    },
    canCancel () {
      return [
        CONSULTATION_STATUS.REQUESTED,
        CONSULTATION_STATUS.ACCEPTED
      ].includes(this.consultation.status)
    }
  },
  methods: {
    getDisplayDateTime (timestamp, format = DATETIME_FORMAT.API_DATETIME) {
      return this.$utils.datetime
        .parseApiTimestamp(timestamp, format)
        .format(DATETIME_FORMAT.DISPLAY_DATETIME)
    },
    async cancelRequest () {
      this.consultations = await this.$repositories.consultation
        .cancelConsultation(this.consultation.hash_id)
        .then(() => {
          this.$refs.cancelModal.hide()
          this.$refs.successModal.show()
        })
        .catch(() =>
          this.$toast.error(this.$t('mypage.popup.cancel.cancel_error'))
        )
    },
    beforeClose () {
      location.reload()
    },
    renderSeasonText () {
      if (!this.consultation.season || this.consultation.date) {
        return `${this.$options.filters.consultationFormatDate(this.consultation.start_date, DATETIME_FORMAT.API_DATE, DATETIME_FORMAT.DISPLAY_DATETIME_AND_DAY)}~[${this.days}${this.$t('consultations.modal.day')}]`
      } else {
        let seasonText = ''
        Object.keys(this.season).forEach((key) => {
          if (key === this.consultation.season) {
            seasonText = this.season[key]
          }
        })
        return seasonText
      }
    }
  }
}
</script>

<style scoped>
.purposeList {
  padding-left: 10px;
}
.modalControl input[type='button'] {
  cursor: pointer;
}
</style>
