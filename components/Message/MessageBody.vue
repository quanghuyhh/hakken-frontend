<template>
  <div id="messageBody" ref="messagesContainer" @scroll="handleScroll">
    <p v-if="loading" class="load">
      以前のやり取り
    </p>
    <message-item v-for="(message, index) in messages" :key="index" :message="message" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { CHAT_SCREEN } from '@/config/event'

export default {
  name: 'MessageBody',
  data () {
    return {
      loading: false,
      previousHeight: 0,
      newMessage: false
    }
  },
  computed: {
    ...mapState({
      messages: state => state.message.messages,
      nextToken: state => state.message.nextToken
    })
  },
  updated () {
    if (this.newMessage) {
      this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight
      this.newMessage = false
    }
  },
  mounted () {
    this.newMessage = true
    this.$bus.on(CHAT_SCREEN.NEW_MESSAGE, () => { this.newMessage = true })
  },
  methods: {
    ...mapActions('message', ['prependMessages', 'setNextToken']),
    async handleScroll () {
      const scrollTop = this.$refs.messagesContainer.scrollTop
      if (
        scrollTop > 0 ||
        this.loading ||
        !this.nextToken ||
        this.nextToken.length <= 0
      ) {
        return
      }

      this.loading = true
      const response = await this.$chat.getMessage(this.nextToken)
      this.previousHeight = this.$refs.messagesContainer.scrollHeight
      this.prependMessages(response.messages)
      this.setNextToken(response.nextToken)
      this.loading = false

      this.$nextTick(() => {
        const newHeight = this.$refs.messagesContainer.scrollHeight
        this.$refs.messagesContainer.scrollTop = newHeight - this.previousHeight
      })
    }
  }
}
</script>

<style scoped>

</style>
