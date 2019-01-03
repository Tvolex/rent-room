const state = {
    page: 1,
    count: 1,
    room: null,
    sort: { price: -1 },
};

const getters = {
    page (state) {
        return state.page
    },
    count (state) {
        return state.count
    },
    room (state) {
        return state.room
    },

    sort (state) {
        return state.sort
    }
};

const mutations = {
    page (state, { type, value }) {
        state[type] = value
    },

    count (state, { type, value }) {
        state[type] = value
    },

    room (state, { type, value }) {
        state[type] = value
    },

    sort (state, { type, value }) {
        state[type] = value
    }
};

const actions = {

};

export default {
    state,
    getters,
    mutations,
    actions,
}
