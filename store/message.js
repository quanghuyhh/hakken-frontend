import { uniqBy } from 'lodash'
import { CHAT_SCREEN } from '~/config/event'
export const state = () => ({
  messages: [],
  nextToken: null
})

function isMessageExists (messages, message) {
  return messages.includes(msg => parseInt(msg.id) === parseInt(message.id))
}

export const actions = {
  async initMessage ({ commit, dispatch }, { receiverUser }) {
    const { $chat } = this._vm
    await $chat.init()
    await $chat.createConversation(receiverUser)
    dispatch('subscribeMessage')
    const messages = await $chat.getMessage()
    commit('setMessages', { messages })
  },
  subscribeMessage ({ commit }) {
    const { $chat, $bus } = this._vm
    $chat.subscribeThread().subscribe({
      next: ({ value: { data: { subscribeToNewMessage: message } } }) => {
        commit('addMessage', { message })
        $bus.emit(CHAT_SCREEN.NEW_MESSAGE)
      }
    })
  },
  addMessages ({ commit }, messages) {
    commit('addMessages', messages)
  },
  prependMessages ({ commit }, messages) {
    commit('prependMessages', messages)
  },
  setNextToken ({ commit }, nextToken) {
    commit('setNextToken', nextToken)
  }
}

export const mutations = {
  setMessages (state, { messages: { messages, nextToken } }) {
    state.messages = messages.reverse()
    state.nextToken = nextToken
  },
  addMessage (state, { message }) {
    const messages = [...state.messages]
    if (!isMessageExists(messages, message)) {
      messages.push(message)
    }

    state.messages = uniqBy(messages, 'id')
  },

  addMessages (state, newMessages) {
    const messages = [...state.messages]
    newMessages.forEach((message) => {
      if (!isMessageExists(messages, message)) {
        messages.push(message)
      }
    })

    state.messages = uniqBy(messages, 'id')
  },

  prependMessages (state, newMessages) {
    const messages = [...(newMessages.reverse()), ...state.messages]
    state.messages = uniqBy(messages, 'id')
  },

  setNextToken (state, nextToken) {
    state.nextToken = nextToken
  }
}

export const getters = {}
