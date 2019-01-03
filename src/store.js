import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    page: 1,
    count: 1,
    room: null
  },
  getters: {
    page (state) {
      return state.page
    },
    count (state) {
      return state.count
    },
    room (state) {
      return state.room
    }
  },
  mutations: {
    page (state, { type, value }) {
      state[type] = value
    },

    count (state, { type, value }) {
      state[type] = value
    },

    room (state, { type, value }) {
      state[type] = value
    }
  },
  actions: {
  }
})
