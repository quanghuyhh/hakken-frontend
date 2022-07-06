<template>
  <div>
    <span class="inputLabel">{{ $t('fields.birthday') }}</span>

    <ul class="birth">
      <li class="selectBox">
        <select v-model="year" @change="onChangeYear">
          <option key="-1" value="">
            {{ $t('calendar.year') }}
          </option>

          <option v-for="(yearOption, index) in years" :key="index" :value="yearOption.value">
            {{ yearOption.label }}
          </option>
        </select>
      </li>

      <li class="selectBox">
        <select v-model="month" @change="onChangeMonth">
          <option :key="-1" value="">
            {{ $t('calendar.month') }}
          </option>

          <option v-for="(monthOption, index) in months" :key="index" :value="monthOption.value">
            {{ monthOption.label }}
          </option>
        </select>
      </li>

      <li class="selectBox">
        <select
          v-model="day"
          @change="onChangeDay"
        >
          <option :key="-1" value="">
            {{ $t('calendar.day') }}
          </option>

          <option v-for="(dayOption, index) in days" :key="index" :value="dayOption.value">
            {{ dayOption.label }}
          </option>
        </select>
      </li>
    </ul>
  </div>
</template>

<script>
import { DATETIME_FORMAT } from '~/config/datetime_format'

const START_YEAR = 1911

export default {
  name: 'BirthdayComponent',
  props: {
    change: {
      required: true,
      type: Function
    },
    value: {
      required: false,
      type: String,
      default: ''
    },
    format: {
      required: false,
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  data () {
    return {
      year: '',
      month: '',
      day: '',
      years: [],
      months: [],
      days: []
    }
  },
  computed: {
    date: {
      get () {
        return this.$dayjs(`${this.year}-${this.month}-${this.day}`, DATETIME_FORMAT.API_DATE)
      },
      set (value) {
        const newDate = this.$dayjs.isDayjs(value) ? value : this.$dayjs(value, this.format)
        this.year = !newDate.isValid() ? '' : newDate.year()
        this.month = !newDate.isValid() ? '' : newDate.month()
        this.day = !newDate.isValid() ? '' : newDate.date()
      }
    }
  },
  watch: {
    value (newVal) {
      this.init(newVal)
    }
  },
  created () {
    this.init(this.$dayjs(this.value, this.format))
  },
  methods: {
    init (newDate) {
      this.date = newDate
      this.getYears()
      this.getMonths()
      this.getDays()
    },
    getYears () {
      this.years = []
      const nowYear = this.$dayjs().year()
      this._.range(START_YEAR, nowYear + 1).reverse().map(year => this.years.push({
        label: `${year}${this.$t('calendar.year')}`,
        value: year
      }))
    },
    getMonths () {
      this.months = []
      if (this.year === '') {
        return
      }
      this._.range(0, 12).map(monthNumber => this.months.push({
        label: `${monthNumber + 1}${this.$t('calendar.month')}`,
        value: monthNumber
      }))
    },
    getDays () {
      this.days = []
      if (this.year === '' || this.month === '') {
        return
      }
      const maxDayInMonth = new Date(this.year, this.month + 1, 0).getDate()

      this._.range(1, maxDayInMonth + 1).map(dayNumber => this.days.push({
        label: `${dayNumber}${this.$t('calendar.day')}`,
        value: dayNumber
      }))
    },
    onChangeYear () {
      this.month = ''
      this.day = ''
      this.getMonths()
      this.getDays()
      if (!this.year) {
        this.$props.change(null)
      }
    },
    onChangeMonth () {
      this.day = ''
      this.getDays()
      if (!this.month) {
        this.$props.change(null)
      }
    },
    onChangeDay () {
      const fullDate = new Date(this.year, this.month, this.day)
      const birthOfDate = this.$dayjs(fullDate).format(this.format)
      if (!this.date) {
        this.$props.change(null)
        return
      }
      this.$props.change(birthOfDate)
    }
  }
}
</script>
