import axios from 'axios'

const state = {
    page: 1,
    count: 10,
    room: null,
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
    async getRooms({commit}) {
        const { filter, search, page, count , sort } = state;

        let res;

        try {
            res = await axios.get('/api/room/list', {
                params: {
                    filter,
                    search,
                    page,
                    count,
                    sort,
                }
            });

            return {
                total: res.data.total,
                rooms: res.data && res.data.items ? res.data.items.map(el => {
                    el.expandDescription = false;
                    return el
                }) : [],
            }

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
