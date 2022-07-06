<template>
  <div id="oldConsult">
    <div class="inner">
      <my-page-consult-detail v-if="selectedConsultation" :consultation="selectedConsultation" />

      <div v-for="(consultation, index) in activeConsultations" :key="index" class="consultCard">
        <ul>
          <li>
            <span class="inputLabel">{{ $t('mypage.consult_block.no') }}</span>
            <p>{{ consultation.code }}</p>
          </li>

          <li>
            <span class="inputLabel">{{ $t('consultDay') }}</span>
            <p>{{ consultation.created_at | consultationFormatDate }}</p>
          </li>

          <li>
            <span class="inputLabel">{{ $t('travel_date') }}</span>
            <p>
              {{ consultation.start_date | consultationFormatDate(DATETIME_FORMAT.API_DATE) }}~[{{
                duration(consultation)
              }}泊]
            </p>
          </li>

          <li>
            <span class="inputLabel">{{ $t('mypage.old_consult.destination') }}</span>
            <p>{{ consultation.destination ? consultation.destination.name : null }}</p>
          </li>

          <li>
            <span class="inputLabel">{{ $t('number_of_customers') }}</span>
            <ul class="parsonList">
              <li>{{ $t('human') }}<span>{{ consultation.number_of_adult || 0 }}</span>{{ $t('human_unit') }}</li>
              <li>{{ $t('children') }}<span>{{ consultation.number_of_children || 0 }}</span>{{ $t('human_unit') }}</li>
              <li>{{ $t('kid') }}<span>{{ consultation.number_of_infant || 0 }}</span>{{ $t('human_unit') }}</li>
            </ul>
          </li>

          <li>
            <a href="javascript:void(0);" @click.prevent="setSelectedConsultation(consultation)">
              {{ $t('mypage.old_consult.detail_consult') }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <pagination
      v-if="consultations.length > 1"
      :current-page="currentPage"
      :per-page="perPage"
      :total="consultations.length"
      :total-pages="totalPages"
      @pagechanged="onPageChanged"
    />
  </div>
</template>

<script>
import { DATETIME_FORMAT } from '@/config/datetime_format'

export default {
  name: 'OldConsult',
  props: {
    consultations: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      DATETIME_FORMAT,
      perPage: 2,
      currentPage: 1,
      selectedConsultation: null
    }
  },
  computed: {
    totalPages () {
      return Math.round(this.consultations.length / this.perPage)
    },
    activeConsultations () {
      const start = (this.currentPage - 1) * this.perPage
      return this.consultations.slice(start, start + this.perPage)
    }
  },
  methods: {
    duration (consultation) {
      return this.$dayjs(consultation.end_date).diff(consultation.start_date, 'days')
    },
    setSelectedConsultation (consultation) {
      scrollTo({ top: 0, behavior: 'smooth' })
      this.selectedConsultation = consultation
    },
    onPageChanged (page) {
      this.selectedConsultation = null
      this.currentPage = page
    }
  }
}
</script>

<style>
#oldConsult {
  background: #fff;
  padding-top: 0;
}
</style>
