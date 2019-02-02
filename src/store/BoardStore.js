import axios from 'axios'
import _ from 'lodash'

const state = {
    page: 1,
    count: 6,
    room: null,
    rooms: [],
    total: 1,
    search: null,
    sort: { by: "price", order: -1 },
    filter: {},
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
    rooms (state) {
        return state.rooms
    },
    total (state) {
        return state.total
    },
    search (state) {
        return state.search
    },
    sort (state) {
        return state.sort
    },
    filter (state) {
        return state.filter
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

    rooms (state, { type, value }) {
        state[type] = value
    },

    total (state, { type, value }) {
        state[type] = value
    },

    search (state, { type, value }) {
        state[type] = value
    },

    sort (state, { type, value }) {
        state[type] = value
    },

    filter (state, { type, value }) {
        state[type] = value
    }
};

const actions = {
    async getRooms({commit, state}) {
        const { filter, search, page, count, sort } = state;

        try {
            const { data }= await axios.get('/api/room/list', {
                params: {
                    filter,
                    search,
                    page,
                    count,
                    sort,
                }
            });

            commit('total', { type: 'total', value: data && data.total ? data.total : 0 } );
            commit('rooms', { type: 'rooms', value: data && data.items ? data.items : [] });

        } catch (err) {
            throw err;
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}
