import Vue from 'vue'
import Vuex from 'vuex'
import BoardStore from './BoardStore';
import UserStore from './UserStore';
import RoomStore from './RoomStore';

import axios from 'axios'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ...BoardStore.state,
        ...UserStore.state,
        ...RoomStore.state,
    },
    getters: {
        ...BoardStore.getters,
        ...UserStore.getters,
        ...RoomStore.getters,
    },
    mutations: {
        ...BoardStore.mutations,
        ...UserStore.mutations,
        ...RoomStore.mutations,
    },
    actions: {
        ...BoardStore.actions,
        ...UserStore.actions,
        ...RoomStore.actions,
    }
})
