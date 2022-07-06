/* eslint-disable */
import {API, graphqlOperation} from 'aws-amplify'
import {createConversation, createMessage, createUser, createUserConversations} from '~/src/graphql/mutations'
import {allMessage, me} from '~/src/graphql/queries'
import {subscribeToNewMessage} from '~/src/graphql/subscriptions'
import {map} from "lodash";

class ChatService {

  me = null
  app = null
  currentConversation = null

  constructor(app) {
    this.app = app
  }

  async init() {
    const {data} = await this.getMeAppSync()
    if (!data.me) {
      const responseCreateUser = await this.createMeAppSync(this.app.$auth.user.cognito.username, this.app.$auth.user.cognito_id)
        .catch(error => {
          return error.data
        })
      this.me = responseCreateUser.createUser
    } else {
      this.me = data.me
    }
  }

  /**
   * Get all message in conversation
   */
  async getMessage(after = null, first = 20) {
    const params = {
      conversationId: this.currentConversation.id,
      after: after,
      first: first
    }
    const result = await API.graphql(graphqlOperation(allMessage, params))
    return result.data ? result.data.allMessage : []
  }

  /**
   * get profile appsync
   */
  getMeAppSync() {
    return API.graphql(graphqlOperation(me))
  }

  /**
   * create new user
   */
  createMeAppSync() {
    const cognitoUsername = this.app.$auth.user.cognito.username
    const cognitoSub = this.app.$auth.user.cognito_id
    const userData = {
      username: cognitoUsername,
      id: cognitoSub,
      cognitoId: cognitoSub,
      registered: false
    }

    return API.graphql(graphqlOperation(createUser, userData))
  }

  /**
   * Send message for conversation
   */
  sendMessage(content) {
    const messageData = {
      content,
      conversationId: this.currentConversation.id,
      createdAt: `${Date.now()}`,
      id: `${Date.now()}`
    }

    return API.graphql(graphqlOperation(createMessage, messageData))
  }

  /**
   * create conversation chat
   * @param userReceiverId
   */
  async createConversation(userReceiverId) {
    const authUserId = this.app.$auth.user.cognito_id

    const conversationId = map([userReceiverId, authUserId]).sort().join('-')
    const variables = {
      id: conversationId,
      name: conversationId,
      createdAt: `${Date.now()}`
    };
    const { data } = await API.graphql(graphqlOperation(createConversation, variables));
    this.currentConversation = data.createConversation
    this.createUserConversation(conversationId, userReceiverId)
    this.createUserConversation(conversationId, authUserId)
  }

  /**
   * createUserConversation
   *
   * @param conversationId
   * @param userId
   * @returns {Promise<GraphQLResult<any>> | Observable<object>}
   */
  createUserConversation(conversationId, userId) {
    const variables = {
      conversationId,
      userId
    }
    return API.graphql(graphqlOperation(createUserConversations, variables))
  }

  getInfoConversation() {
  }

  /**
   * listen thread chat current
   */
  subscribeThread() {
    const variables = {
      conversationId: this.currentConversation.id,
    }
    return API.graphql(graphqlOperation(subscribeToNewMessage, variables));
  }
}

export default ChatService
