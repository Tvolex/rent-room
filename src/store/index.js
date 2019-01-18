import Vue from 'vue'
import Vuex from 'vuex'
import BoardStore from './BoardStore';
import UserStore from './UserStore'

import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ...BoardStore.state,
        ...UserStore.state,
    },
    getters: {
        ...BoardStore.getters,
        ...UserStore.getters,
    },
    mutations: {
        ...BoardStore.mutations,
        ...UserStore.mutations,
    },
    actions: {
        ...BoardStore.actions,
        ...UserStore.actions,
    }
})
