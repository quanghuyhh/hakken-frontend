<template>
  <div :class="isSender ? 'user' : 'agent'">
    <time>{{ messageTime }}</time>
    <p>{{ message.content }}</p>
  </div>
</template>

<script>
import { DATETIME_FORMAT } from '@/config/datetime_format'

export default {
  name: 'MessageItem',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    isSender () {
      return this.message.sender === this.$auth.user.cognito_id
    },
    messageTime () {
      return this.$dayjs(parseInt(this.message.createdAt)).format(DATETIME_FORMAT.VIEW_DATE_TIME_MESSAGE)
    }
  }
}
</script>

<style scoped>
p {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
