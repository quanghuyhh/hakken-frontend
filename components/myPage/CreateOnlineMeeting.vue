<template>
  <LazyCustomModal ref="modalMeeting" class="modal-video-call normal-modal">
    <div>
      <h2 class="mdTit">
        {{ $t('mypage.popup.video.no_request.title') }}
      </h2>
      <div v-if="showMessageCreate" id="onlineWait">
        <p class="startTime">
          {{ timeMeeting }}～
        </p>
        <a v-if="!isCreated" :href="'/online-meeting/' + itemMeeting.hash_id" target="_blank"><img src="/images/icons/ico_video_fix.svg" alt="オンライン相談">
          <p>
            <span>オンライン相談はこちらからご参加可能です。</span>
            開始時間までにこちらからオンライン相談画面を開いてお待ちください。
          </p>
        </a>
        <a v-else target="_blank"><img src="/images/icons/ico_video_fix.svg" alt="オンライン相談">
          <p>
            <span>ご希望相談日時を受け付けました。</span>
            マイスターは相談日時を調整中です。
          </p>
        </a>
      </div>
      <div v-else>
        <ul class="selectDay mt20">
          <li>
            <div class="calendar">
              <date-picker
                v-model="onlineMeetingTime.date"
                :format="DATETIME_FORMAT.VIEW_DATE_CROSS"
                :placeholder="$t('mypage.popup.video.select_date')"
                :min-date="todayDate"
              />
            </div>
          </li>
          <li>
            <div class="selectBox">
              <select v-model="onlineMeetingTime.hour">
                <option v-for="(hour, index) in availableHours" :key="index" :value="hour | displayMinute">
                  {{ hour | displayMinute }}
                </option>
              </select>
            </div>
          </li>
          <li>
            <div class="selectBox">
              <select v-model="onlineMeetingTime.minute">
                <option v-for="(minute, index) in availableMinutes" :key="index" :value="minute | displayMinute">
                  {{ minute | displayMinute }}
                </option>
              </select>
            </div>
          </li>
          <li v-if="error">
            <small class="text-danger date_error">{{ error }}</small>
          </li>
        </ul>
      </div>
      <ul class="modalControl">
        <li v-if="!showMessageCreate" class="requestBtn" :class="{'button-loading': isLoading}">
          <input type="submit" :disabled="isLoading" :value="$t('mypage.popup.video.save_change_request')" @click="handleCreateOnlineMeeting">
        </li>
        <li><input type="submit" :value="$t('custom_modal.close')" class="js-modal-close" @click="handleCancel"></li>
      </ul>
    </div>
  </LazyCustomModal>
</template>

<script>
import { range } from 'lodash'
import DatePicker from '../Common/DatePicker.vue'
import { DATETIME_FORMAT } from '@/config/datetime_format'
import { ONLINE_MEETING_STATUS } from '@/config/consts'

export default {
  name: 'CreateOnlineMeeting',
  components: { DatePicker },
  filters: {
    displayMinute (value) {
      return value < 10 ? '0' + value : value
    }
  },
  props: {
    itineraryId: {
      type: [String, Number],
      required: true
    },
    itemMeeting: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      onlineMeetingTime: {
        date: '',
        hour: '10',
        minute: '00'
      },
      error: '',
      isLoading: false,
      isCreated: false,
      DATETIME_FORMAT,
      ONLINE_MEETING_STATUS
    }
  },
  computed: {
    availableHours () {
      return range(6, 22)
    },
    availableMinutes () {
      return range(0, 60, 5)
    },
    todayDate () {
      return this.$dayjs().format(DATETIME_FORMAT.API_DATE)
    },
    showMessageCreate () {
      return this.isCreated || this.itemMeeting
    },
    timeMeeting () {
      if (this.itemMeeting) {
        return this.$dayjs(this.itemMeeting.meeting_time).format(DATETIME_FORMAT.VIEW_DATE_TIME_JP)
      } else {
        const { date, hour, minute } = this.onlineMeetingTime
        const onlineMeetingTime = `${date} ${hour}:${minute}:00`
        return this.$dayjs(onlineMeetingTime, DATETIME_FORMAT.API_DATETIME).format(DATETIME_FORMAT.VIEW_DATE_TIME_JP)
      }
    }
  },
  methods: {
    async handleCreateOnlineMeeting () {
      const { date, hour, minute } = this.onlineMeetingTime
      const now = this.$dayjs()
      const onlineMeetingTime = `${date} ${hour}:${minute}:00`
      if (date && this.$dayjs(onlineMeetingTime, DATETIME_FORMAT.API_DATETIME).isAfter(now)) {
        try {
          this.isLoading = true
          const params = {
            itinerary_hash_id: this.itineraryId,
            meeting_time: onlineMeetingTime
          }
          await this.$repositories.onlineMeeting.createOnlineMeeting(params)
          this.isCreated = true
        } catch (e) {
          this.error = e.getMessage()
        }
        this.error = ''
      } else {
        this.error = this.$t('mypage.popup.cancel.date_select_error')
      }
    },
    handleCancel () {
      if (this.isCreated) {
        location.reload()
      } else {
        this.$refs.modalMeeting.hide()
      }
    },
    showModal () {
      this.$refs.modalMeeting.show()
    }
  }
}
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  background: url(/images/icons/ico_calendar.svg) center center no-repeat;
  margin-right: -5px;
}
.calendar:after {
  display: none;
}
.notification_center {
  text-align: center;
}
.date_error {
  white-space: nowrap;
}
</style>
