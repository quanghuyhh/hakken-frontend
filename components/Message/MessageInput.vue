<template>
  <div id="messageInput">
    <form ref="formChat" action="#" @submit.prevent="send">
      <div class="inputArea">
        <div class="FlexTextarea__dummy" aria-hidden="true" />
        <textarea
          id="FlexTextarea"
          :value="input"
          class="FlexTextarea__textarea"
          placeholder="メッセージを入力"
          @keydown="handleKeyDown"
          @keyup="handleSubmit"
        />
      </div>
      <button type="submit">
        <img src="/images/icons/ico_send.svg" alt="send">
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { StringHelper } from '@/helpers/StringHelper'
import { CHAT_SCREEN } from '@/config/event'

export default {
  name: 'MessageInput',
  data () {
    return {
      input: '',
      tempMsg: null
    }
  },
  methods: {
    ...mapActions({
      sendMessage: 'message/sendMessage'
    }),
    async send () {
      const message = StringHelper.escapeString(this.input)
      this.input = ''
      if (
        this.tempMsg === this.input ||
        this.tempMsg === message ||
        message.length <= 0
      ) {
        return
      }
      await this.$chat.sendMessage(message)
        .catch((error) => {
          this.$toast.error(this.$t('chat.send_message_failed'))
          // eslint-disable-next-line no-console
          console.log('error', error.errors[0].message)
        })
      this.$bus.emit(CHAT_SCREEN.NEW_MESSAGE)
    },

    handleKeyDown (evt) {
      if (evt.keyCode === 13) {
        evt.preventDefault()
        return
      }
      this.input = evt.target.value
    },
    async handleSubmit (evt) {
      this.input = evt.target.value
      const isEnter = evt.keyCode === 13
      const isBreakLine = evt.shiftKey
      if (isEnter && isBreakLine) {
        this.input += '\n'
        return
      }
      if (isEnter) {
        evt.preventDefault()
        await this.send()
        evt.target.value = ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  align-items: flex-start;
  width: 100%;
}
</style>
