export class UserService {
  static getUserData (user = {}) {
    const { traveler, email, ...userData } = user || {}
    return {
      ...traveler,
      email,
      ...userData
    }
  }
}
