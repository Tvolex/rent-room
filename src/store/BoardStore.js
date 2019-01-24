import axios from 'axios'

const state = {
    page: 1,
    count: 6,
    room: null,
    rooms: [],
    total: 1,
    sort: { by: "price", order: -1 },
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

    rooms (state, { type, value }) {
        state[type] = value
    },

    total (state, { type, value }) {
        state[type] = value
    },

    sort (state, { type, value }) {
        state[type] = value
    }
};

const actions = {
    async getRooms({commit, state}) {
        const { filter, search, page, count , sort } = state;

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

            commit('total', { type: 'total', value: data && data.total ? data.total : 0} );
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
