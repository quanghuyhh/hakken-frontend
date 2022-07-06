
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { AUTH_EXCEPTION_CODE, COGNITO_MESSAGE_ERROR, TOAST_CONFIG } from '~/config/consts'
import routers from '~/utils/routers'

class CognitoService {
  constructor () {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID
    })
  }

  /**
    * Send a password reset code to a user.
    * https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ForgotPassword.html
    */
  sendResetLink (self, email) {
    const userData = {
      Username: email,
      Pool: this.userPool
    }
    const cognitoUser = new CognitoUser(userData)

    cognitoUser.forgotPassword({
      onSuccess () {
        self.$toast.success(self.$t('forgot_password.cognito.forgot_success')).goAway(TOAST_CONFIG.goAwayTime)
      },
      onFailure () {
        self.$toast.error(err.message).goAway(TOAST_CONFIG.goAwayTime)
      }
    })
    return true
  }

  /**
   * complete register step (FORCE_CHANGE_PASSWORD)
   */
  newPasswordCompleteRegister (cognitoUser, newPassword) {
    return new Promise(function (resolve, reject) {
      cognitoUser.completeNewPasswordChallenge(newPassword, null, {
        onSuccess: resolve,
        onFailure: reject
      })
    })
  }

  /**
    * Reset a users password based on reset code.
    * https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ConfirmForgotPassword.html
    */
  resetPassword (self, email, verificationCode, password) {
    const userData = {
      Username: email,
      Pool: this.userPool
    }

    const cognitoUser = new CognitoUser(userData)

    return cognitoUser.confirmPassword(verificationCode, password, {
      onSuccess () {
        self.$toast.success(self.$t('confirm_forgot_password.cognito.password_confirmed')).goAway(TOAST_CONFIG.goAwayTime)
        self.$router.push('/login')
      },
      onFailure (err) {
        self.$toast.error(err.message).goAway(TOAST_CONFIG.goAwayTime)
      }
    })
  }

  /**
   * check url register expired
   */
  isUrlLinkRegisterExpired (error) {
    if (error.code === AUTH_EXCEPTION_CODE.notAuthorizedException && error.message === COGNITO_MESSAGE_ERROR.LINK_REGISTER_EXPIRED) {
      return true
    }
    return false
  }

  changePassword (self, username, oldPassword, newPassword) {
    const cognitoUser = this.getCognitoUser(username)
    const authDetails = this.getAuthDetails(username, oldPassword)
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: () => {
        cognitoUser.changePassword(oldPassword, newPassword, (error) => {
          if (error) {
            return self.$toast.error(error.message).goAway(TOAST_CONFIG.goAwayTime)
          }
          self.$toast.success(self.$t('change_password.messages.change_password_success')).goAway(TOAST_CONFIG.goAwayTime)
          setTimeout(() => self.$router.push(routers.myPage.route), TOAST_CONFIG.goAwayTime)
        })
      },
      onFailure: error => self.$toast.error(error.message).goAway(TOAST_CONFIG.goAwayTime)
    })
  }

  getCognitoUser (username) {
    return new CognitoUser({
      Username: username,
      Pool: this.userPool
    })
  }

  getAuthDetails (username, password) {
    return new AuthenticationDetails({
      Username: username,
      Password: password
    })
  }
}
export default new CognitoService()
