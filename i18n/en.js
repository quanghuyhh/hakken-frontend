import en from 'vee-validate/dist/locale/en.json'

export default {
  welcome: 'Welcome back!',
  nuxt: 'Nuxt Auth',
  username: 'Username',
  email: 'Email',
  password: 'Password',
  register: 'Register',
  login: 'Login',
  logout: 'Logout',
  my_profile: 'My Profile',
  title: 'Hakken',
  already_account: 'Already got an account?',
  login_success: 'Successfully authenticated',
  fields: {
    Email: 'email',
    Password: 'password'
  },
  validations: {
    ...en.messages
  }
}
