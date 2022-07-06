import { ROLES } from '~/constants/roles'

export class AuthHelper {
  static isAdmin (roles = []) {
    return roles && roles.filter(role => role.name !== ROLES.TRAVELER).length > 0
  }

  static isTraveler (roles = []) {
    return !this.isAdmin(roles)
  }
}
