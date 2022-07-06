import Vue from 'vue'
import CreateRepository from '~/repositories/Repository'

export default (ctx) => {
  Vue.prototype.$repositories = new CreateRepository(ctx.$axios)
}
