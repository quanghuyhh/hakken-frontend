import CognitoAuthScheme from '@a1ter/nuxt-auth-aws-cognito-scheme/scheme/scheme'
import Token from '@a1ter/nuxt-auth-aws-cognito-scheme/scheme/token'
import RefreshToken from '@a1ter/nuxt-auth-aws-cognito-scheme/scheme/refreshToken'
import { Auth } from '@aws-amplify/auth'

export function getProp (holder, propName) {
  if (!propName || !holder) {
    return holder
  }
  if (propName in holder) {
    return holder[propName]
  }
  const propParts = Array.isArray(propName) ? propName : (propName + '').split('.')
  let result = holder
  while (propParts.length && result) {
    result = result[propParts.shift()]
  }
  return result
}
export function getResponseProp (response, prop) {
  if (prop[0] === '.') {
    return getProp(response, prop.substring(1))
  } else {
    return getProp(response, prop)
  }
}

class CognitoAccessToken extends Token {
  get () {
    const type = this.scheme.options.token.type
    return (type ? type + ' ' : '') + this._getToken
  }
}

/**
 * Extends nuxt auth schema from @a1ter/nuxt-auth-aws-cognito-scheme/scheme/scheme
 */
export default class CognitoAPIAuthScheme extends CognitoAuthScheme {
  async login ({ data }) {
    // logout and reset auth
    await this.logout()

    // Sign in AWS Cognito service
    const user = await Auth.signIn(data.username, data.password)
      .then((response) => {
        if (response.username && response.challengeName && response.challengeName === 'NEW_PASSWORD_REQUIRED') {
          const cognitoResponse = {}
          cognitoResponse.challengeName = response.challengeName
          cognitoResponse.userName = response.username
          return cognitoResponse
        } else {
          return response
        }
      })
      .catch((err) => {
        throw new Error(err)
      })

    if (user && user.userName && user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      return user
    }

    const session = user.getSignInUserSession()

    // Set tokens
    this._initTokens(session)

    // Fetch user if `autoFetch` is enabled
    if (this.options.user.autoFetch) {
      await this.fetchUser()
    }

    return session
  }

  _initTokens (session) {
    if (!this.token) {
      this.token = new CognitoAccessToken(session, this, this.$auth.$storage)
    }

    if (!this.refreshToken) {
      this.refreshToken = new RefreshToken(session, this, this.$auth.$storage)
    }
  }

  _updateTokens (session) {
    if (!session) {
      throw new Error('Session error')
    }

    this.token = new CognitoAccessToken(session, this, this.$auth.$storage)
    this.refreshToken = new RefreshToken(session, this, this.$auth.$storage)
  }

  async fetchUser () {
    // Token is required but not available
    if (!this.check().valid) {
      return
    }

    let cognitoUser = null

    // Try to get the current pool user
    try {
      cognitoUser = await this._getCognitoUser()
    } catch (e) {
      // error handler placeholder
    }

    // Skip if no cognito user is logged in
    if (cognitoUser === null) {
      return
    }

    const user = {}

    // cognito user info
    user.cognito = {
      username: cognitoUser.username
    }

    // User endpoint is disabled
    if (!this.options.endpoints.user) {
      this.$auth.setUser(user)
      return
    }

    // Try to fetch user and then set
    return this.$auth
      .requestWith(this.name, {}, this.options.endpoints.user)
      .then((response) => {
        this.$auth.setUser({
          ...user,
          ...(getResponseProp(response, this.options.user.property) || {})
        })

        return response
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
        return Promise.reject(error)
      })
  }
}
