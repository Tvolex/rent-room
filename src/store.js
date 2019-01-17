import Vue from 'vue'
import Vuex from 'vuex'
import BoardStore from './components/Board/store'

import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ...BoardStore.state,
    },
    getters: {
        ...BoardStore.getters,

    },
    mutations: {
        ...BoardStore.mutations,
    },
    actions: {
        ...BoardStore.actions,
    }
})
