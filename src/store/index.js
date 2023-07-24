import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    duration: 5000,
  },
  mutations: {
    setDuration(state, duration) {
      Object.assign(state, { duration });
    },
  },
  actions: {
  },
  modules: {
  }
})
